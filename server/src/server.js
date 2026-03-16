import express from "express";
import { connectDB } from "./config/mongo.js";

import sightingsRoutes from "./routes/sightingsRoutes.js";
import matchingRoutes from "./routes/matchingRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/sightings", sightingsRoutes);
app.use("/api/matching", matchingRoutes);
app.use("/api/auth", authRoutes);

const PORT = 3000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
}

startServer();