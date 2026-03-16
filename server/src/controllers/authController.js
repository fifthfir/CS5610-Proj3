import crypto from "crypto";
import { getDB } from "../config/mongo.js";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function registerUser(req, res) {
  const db = getDB();
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  const existingUser = await db
    .collection(process.env.USERS_COLLECTION)
    .findOne({ username });

  if (existingUser) {
    return res.status(409).json({ message: "Username already exists." });
  }

  const result = await db.collection(process.env.USERS_COLLECTION).insertOne({
    username,
    passwordHash: hashPassword(password),
    createdAt: new Date()
  });

  res.json({
    message: "registered",
    userId: String(result.insertedId),
    username
  });
}

export async function loginUser(req, res) {
  const db = getDB();
  const { username, password } = req.body;

  const user = await db
    .collection(process.env.USERS_COLLECTION)
    .findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  const incomingHash = hashPassword(password);

  if (incomingHash !== user.passwordHash) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  res.json({
    message: "logged_in",
    userId: String(user._id),
    username: user.username
  });
}