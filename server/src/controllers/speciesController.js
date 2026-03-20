import { ObjectId } from "mongodb";
import { getDB } from "../config/mongo.js";

function buildSpeciesQuery(queryParams) {
  const query = {};

  if (queryParams.q && queryParams.q.trim()) {
    const searchRegex = new RegExp(queryParams.q.trim(), "i");
    query.$or = [
      { commonName: searchRegex },
      { scientificName: searchRegex },
      { description: searchRegex },
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

export async function getAllSpecies(req, res) {
  try {
    const db = getDB();
    const query = buildSpeciesQuery(req.query);

    const species = await db
      .collection("species")
      .find(query)
      .sort({ commonName: 1 })
      .toArray();

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

    const species = await db.collection("species").findOne({
      _id: new ObjectId(id),
    });

    if (!species) {
      return res.status(404).json({ error: "Species not found." });
    }

    res.json(species);
  } catch (error) {
    console.error("Error fetching species by id:", error);
    res.status(500).json({ error: "Failed to fetch species." });
  }
}

export async function createSpecies(req, res) {
  try {
    const db = getDB();

    const newSpecies = {
      commonName: req.body.commonName?.trim() || "",
      scientificName: req.body.scientificName?.trim() || "",
      category: req.body.category?.trim() || "animal",
      subtype: req.body.subtype?.trim() || "",
      habitat: req.body.habitat?.trim() || "",
      hasWings: req.body.hasWings?.trim() || "no",
      tailType: req.body.tailType?.trim() || "none",
      legCount: req.body.legCount?.toString()?.trim() || "0",
      size: req.body.size?.trim() || "",
      color: req.body.color?.trim() || "",
      region: req.body.region?.trim() || "",
      description: req.body.description?.trim() || "",
      imageUrl: req.body.imageUrl?.trim() || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (!newSpecies.commonName || !newSpecies.scientificName) {
      return res.status(400).json({
        error: "commonName and scientificName are required.",
      });
    }

    const result = await db.collection("species").insertOne(newSpecies);

    const createdSpecies = await db.collection("species").findOne({
      _id: result.insertedId,
    });

    res.status(201).json(createdSpecies);
  } catch (error) {
    console.error("Error creating species:", error);
    res.status(500).json({ error: "Failed to create species." });
  }
}

export async function updateSpecies(req, res) {
  try {
    const db = getDB();
    const { id } = req.params;

    const updatedFields = {
      commonName: req.body.commonName?.trim() || "",
      scientificName:
        req.body.scientName?.trim() || req.body.scientificName?.trim() || "",
      category: req.body.category?.trim() || "animal",
      subtype: req.body.subtype?.trim() || "",
      habitat: req.body.habitat?.trim() || "",
      hasWings: req.body.hasWings?.trim() || "no",
      tailType: req.body.tailType?.trim() || "none",
      legCount: req.body.legCount?.toString()?.trim() || "0",
      size: req.body.size?.trim() || "",
      color: req.body.color?.trim() || "",
      region: req.body.region?.trim() || "",
      description: req.body.description?.trim() || "",
      imageUrl: req.body.imageUrl?.trim() || "",
      updatedAt: new Date(),
    };

    const result = await db
      .collection("species")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedFields });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Species not found." });
    }

    const updatedSpecies = await db.collection("species").findOne({
      _id: new ObjectId(id),
    });

    res.json(updatedSpecies);
  } catch (error) {
    console.error("Error updating species:", error);
    res.status(500).json({ error: "Failed to update species." });
  }
}

export async function deleteSpecies(req, res) {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection("species").deleteOne({
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
