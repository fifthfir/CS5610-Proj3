import { ObjectId } from "mongodb";
import { getDB } from "../config/mongo.js";
import {
  inferToxicOrVenomous,
  withDerivedSpeciesFields,
} from "../utils/speciesEnrichment.js";

const SPECIES_COLLECTION = process.env.SPECIES_COLLECTION || "species";

function cleanString(value, fallback = "") {
  if (typeof value !== "string") {
    return fallback;
  }

  return value.trim();
}

function cleanToxicOrVenomous(value) {
  return value === "yes" ? "yes" : "no";
}

function buildSpeciesQuery(queryParams) {
  const query = {};

  if (queryParams.q && queryParams.q.trim()) {
    const searchRegex = new RegExp(queryParams.q.trim(), "i");
    query.$or = [
      { commonName: searchRegex },
      { scientificName: searchRegex },
      { description: searchRegex },
      { overview: searchRegex },
      { appearance: searchRegex },
      { habitatDetails: searchRegex },
      { regionDetails: searchRegex },
      { behavior: searchRegex },
      { identificationTips: searchRegex },
      { riskToHumans: searchRegex },
      { benefitsToHumans: searchRegex },
      { category: searchRegex },
      { subtype: searchRegex },
      { habitat: searchRegex },
      { color: searchRegex },
      { region: searchRegex },
    ];
  }

  const exactMatchFields = [
    "category",
    "subtype",
    "habitat",
    "hasWings",
    "tailType",
    "legCount",
    "size",
    "color",
    "region",
  ];

  exactMatchFields.forEach((field) => {
    if (queryParams[field] && queryParams[field] !== "Any") {
      query[field] = queryParams[field];
    }
  });

  return query;
}

function normalizeSpeciesPayload(body) {
  return {
    commonName: cleanString(body.commonName),
    scientificName: cleanString(body.scientificName),
    category: "animal",
    subtype: cleanString(body.subtype),
    habitat: cleanString(body.habitat),
    hasWings: cleanString(body.hasWings, "no"),
    tailType: cleanString(body.tailType, "none"),
    legCount: cleanString(body.legCount?.toString(), "0"),
    size: cleanString(body.size),
    color: cleanString(body.color),
    region: cleanString(body.region),
    toxicOrVenomous: cleanToxicOrVenomous(body.toxicOrVenomous),
    imageUrl: cleanString(body.imageUrl),
    description: cleanString(body.description),
    overview: cleanString(body.overview),
    appearance: cleanString(body.appearance),
    habitatDetails: cleanString(body.habitatDetails),
    regionDetails: cleanString(body.regionDetails),
    behavior: cleanString(body.behavior),
    identificationTips: cleanString(body.identificationTips),
    riskToHumans: cleanString(body.riskToHumans),
    benefitsToHumans: cleanString(body.benefitsToHumans),
    updatedAt: new Date(),
  };
}

function applyDerivedFiltering(speciesList, queryParams) {
  if (
    queryParams.toxicOrVenomous !== "yes" &&
    queryParams.toxicOrVenomous !== "no"
  ) {
    return speciesList;
  }

  return speciesList.filter(
    (species) =>
      inferToxicOrVenomous(species) === queryParams.toxicOrVenomous
  );
}

export async function getAllSpecies(req, res) {
  try {
    const db = getDB();
    const query = buildSpeciesQuery(req.query);

    let species = await db
      .collection(SPECIES_COLLECTION)
      .find(query)
      .sort({ commonName: 1 })
      .toArray();

    species = species.map(withDerivedSpeciesFields);
    species = applyDerivedFiltering(species, req.query);

    res.json(species);
  } catch (error) {
    console.error("Error fetching species:", error);
    res.status(500).json({ error: "Failed to fetch species." });
  }
}

export async function getSpeciesById(req, res) {
  try {
    const db = getDB();
    const { id } = req.params;

    const species = await db.collection(SPECIES_COLLECTION).findOne({
      _id: new ObjectId(id),
    });

    if (!species) {
      return res.status(404).json({ error: "Species not found." });
    }

    res.json(withDerivedSpeciesFields(species));
  } catch (error) {
    console.error("Error fetching species by id:", error);
    res.status(500).json({ error: "Failed to fetch species." });
  }
}

export async function createSpecies(req, res) {
  try {
    const db = getDB();

    const newSpecies = {
      ...normalizeSpeciesPayload(req.body),
      createdAt: new Date(),
    };

    if (!newSpecies.commonName || !newSpecies.scientificName) {
      return res.status(400).json({
        error: "commonName and scientificName are required.",
      });
    }

    const result = await db.collection(SPECIES_COLLECTION).insertOne(newSpecies);

    const createdSpecies = await db.collection(SPECIES_COLLECTION).findOne({
      _id: result.insertedId,
    });

    res.status(201).json(withDerivedSpeciesFields(createdSpecies));
  } catch (error) {
    console.error("Error creating species:", error);
    res.status(500).json({ error: "Failed to create species." });
  }
}

export async function updateSpecies(req, res) {
  try {
    const db = getDB();
    const { id } = req.params;

    const updatedFields = normalizeSpeciesPayload(req.body);

    const result = await db
      .collection(SPECIES_COLLECTION)
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedFields });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Species not found." });
    }

    const updatedSpecies = await db.collection(SPECIES_COLLECTION).findOne({
      _id: new ObjectId(id),
    });

    res.json(withDerivedSpeciesFields(updatedSpecies));
  } catch (error) {
    console.error("Error updating species:", error);
    res.status(500).json({ error: "Failed to update species." });
  }
}

export async function deleteSpecies(req, res) {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection(SPECIES_COLLECTION).deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Species not found." });
    }

    res.json({ message: "Species deleted successfully." });
  } catch (error) {
    console.error("Error deleting species:", error);
    res.status(500).json({ error: "Failed to delete species." });
  }
}