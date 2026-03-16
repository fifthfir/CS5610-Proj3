import express from "express";
import {
  getSightings,
  createSighting,
  updateSighting,
  deleteSighting
} from "../controllers/sightingsController.js";

const router = express.Router();

router.get("/", getSightings);
router.post("/", createSighting);
router.put("/:id", updateSighting);
router.delete("/:id", deleteSighting);

export default router;