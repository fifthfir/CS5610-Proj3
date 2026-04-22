import { getDB } from "../config/mongo.js";
import {
  inferToxicOrVenomous,
  withDerivedSpeciesFields,
} from "../utils/speciesEnrichment.js";

const SPECIES_COLLECTION = process.env.SPECIES_COLLECTION || "species";

export async function getMatches(req, res) {
  try {
    const db = getDB();

    const {
      subtype,
      habitat,
      hasWings,
      tailType,
      legCount,
      size,
      color,
      region,
      toxicOrVenomous,
    } = req.body;

    const query = {
      category: "animal",
    };

    if (subtype) {
      query.subtype = subtype;
    }

    if (habitat) {
      query.habitat = habitat;
    }

    if (hasWings) {
      query.hasWings = hasWings;
    }

    if (tailType) {
      query.tailType = tailType;
    }

    if (legCount) {
      query.legCount = legCount;
    }

    if (size) {
      query.size = size;
    }

    if (color) {
      query.color = color;
    }

    if (region) {
      query.region = region;
    }

    let results = await db
      .collection(SPECIES_COLLECTION)
      .find(query)
      .sort({ commonName: 1 })
      .toArray();

    results = results.map(withDerivedSpeciesFields);

    if (toxicOrVenomous === "yes" || toxicOrVenomous === "no") {
      results = results.filter(
        (species) => inferToxicOrVenomous(species) === toxicOrVenomous
      );
    }

    res.json(results.slice(0, 24));
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Failed to fetch matches." });
  }
}