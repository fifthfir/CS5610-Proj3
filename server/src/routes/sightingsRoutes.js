import express from "express";
import {
  getSightings,
  createSighting,
  updateSighting,
  deleteSighting,
} from "../controllers/sightingsController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getSightings);
router.post("/", createSighting);
router.put("/:id", updateSighting);
router.delete("/:id", deleteSighting);

export default router;