import { getDB } from "../config/mongo.js";
import { ObjectId } from "mongodb";

export async function getSightings(req, res) {
  const db = getDB();
  const userId = String(req.user._id);

  const sightings = await db
    .collection(process.env.SIGHTINGS_COLLECTION)
    .find({ userId })
    .sort({ savedAt: -1 })
    .toArray();

  res.json(sightings);
}

export async function createSighting(req, res) {
  const db = getDB();
  const userId = String(req.user._id);
  const username = req.user.username;

  const { speciesId } = req.body;

  if (!speciesId) {
    return res.status(400).json({ message: "speciesId is required." });
  }

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
    userId,
    username,
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
  const userId = String(req.user._id);
  const { note } = req.body;

  const result = await db
    .collection(process.env.SIGHTINGS_COLLECTION)
    .updateOne(
      { _id: new ObjectId(id), userId },
      { $set: { note: note || "" } }
    );

  if (result.matchedCount === 0) {
    return res.status(404).json({ message: "Sighting not found." });
  }

  res.json({ message: "updated" });
}

export async function deleteSighting(req, res) {
  const db = getDB();
  const id = req.params.id;
  const userId = String(req.user._id);

  const result = await db
    .collection(process.env.SIGHTINGS_COLLECTION)
    .deleteOne({ _id: new ObjectId(id), userId });

  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "Sighting not found." });
  }

  res.json({ message: "deleted" });
}