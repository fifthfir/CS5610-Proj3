import express from "express";
import {
  getAllSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
} from "../controllers/speciesController.js";

const router = express.Router();

function getAdminUsernames() {
  return (process.env.ADMIN_USERNAMES || "")
    .split(",")
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);
}

function requireAdmin(req, res, next) {
  const username = (req.headers["x-username"] || "")
    .toString()
    .trim()
    .toLowerCase();
  const adminUsernames = getAdminUsernames();

  if (!username || !adminUsernames.includes(username)) {
    return res.status(403).json({ error: "Admin access required." });
  }

  next();
}

router.get("/", getAllSpecies);
router.get("/:id", getSpeciesById);

router.post("/", requireAdmin, createSpecies);
router.put("/:id", requireAdmin, updateSpecies);
router.delete("/:id", requireAdmin, deleteSpecies);

export default router;
