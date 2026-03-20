import { getDB } from "../config/mongo.js";

export async function getMatches(req, res) {
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

  const results = await db
    .collection(process.env.SPECIES_COLLECTION)
    .find(query)
    .limit(12)
    .toArray();

  res.json(results);
}
