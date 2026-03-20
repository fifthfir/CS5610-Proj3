import { getDB } from "../config/mongo.js";
import { ObjectId } from "mongodb";

export async function getSightings(req, res) {
  const db = getDB();
  const userId = req.query.userId;

  const query = userId ? { userId } : {};

  const sightings = await db
    .collection(process.env.SIGHTINGS_COLLECTION)
    .find(query)
    .sort({ savedAt: -1 })
    .toArray();

  res.json(sightings);
}

export async function createSighting(req, res) {
  const db = getDB();

  const { userId, speciesId } = req.body;

  const existing = await db
    .collection(process.env.SIGHTINGS_COLLECTION)
    .findOne({
      userId,
      speciesId,
    });

  if (existing) {
    return res.status(409).json({
      message: "This species is already saved in My Sightings.",
    });
  }

  const sighting = {
    ...req.body,
    savedAt: new Date(),
  };

  const result = await db
    .collection(process.env.SIGHTINGS_COLLECTION)
    .insertOne(sighting);

  res.json({
    insertedId: result.insertedId,
    message: "saved",
  });
}

export async function updateSighting(req, res) {
  const db = getDB();
  const id = req.params.id;
  const { note } = req.body;

  await db
    .collection(process.env.SIGHTINGS_COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { note } });

  res.json({ message: "updated" });
}

export async function deleteSighting(req, res) {
  const db = getDB();
  const id = req.params.id;

  await db
    .collection(process.env.SIGHTINGS_COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });

  res.json({ message: "deleted" });
}
