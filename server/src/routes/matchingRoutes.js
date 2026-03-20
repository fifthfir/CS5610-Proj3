import express from "express";

import { getMatches } from "../controllers/matchingController.js";

const router = express.Router();

router.post("/", getMatches);

export default router;
