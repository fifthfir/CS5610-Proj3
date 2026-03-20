import crypto from "crypto";
import { getDB } from "../config/mongo.js";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function getAdminUsernames() {
  return (process.env.ADMIN_USERNAMES || "")
    .split(",")
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);
}

function getRoleForUsername(username) {
  const adminUsernames = getAdminUsernames();
  return adminUsernames.includes(username.trim().toLowerCase())
    ? "admin"
    : "user";
}

export async function registerUser(req, res) {
  const db = getDB();
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const trimmedUsername = username.trim();

  const existingUser = await db
    .collection(process.env.USERS_COLLECTION)
    .findOne({ username: trimmedUsername });

  if (existingUser) {
    return res.status(409).json({ message: "Username already exists." });
  }

  const result = await db.collection(process.env.USERS_COLLECTION).insertOne({
    username: trimmedUsername,
    passwordHash: hashPassword(password),
    createdAt: new Date(),
  });

  res.json({
    message: "registered",
    userId: String(result.insertedId),
    username: trimmedUsername,
    role: getRoleForUsername(trimmedUsername),
  });
}

export async function loginUser(req, res) {
  const db = getDB();
  const { username, password } = req.body;

  const trimmedUsername = username.trim();

  const user = await db
    .collection(process.env.USERS_COLLECTION)
    .findOne({ username: trimmedUsername });

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
    username: user.username,
    role: getRoleForUsername(user.username),
  });
}
