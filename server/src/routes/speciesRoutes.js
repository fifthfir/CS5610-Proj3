import express from "express";
import {
    getAllSpecies,
    getSpeciesById,
    createSpecies,
    updateSpecies,
    deleteSpecies,
} from "../controllers/speciesController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllSpecies);
router.get("/:id", getSpeciesById);

router.post("/", requireAdmin, createSpecies);
router.put("/:id", requireAdmin, updateSpecies);
router.delete("/:id", requireAdmin, deleteSpecies);

export default router;