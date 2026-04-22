import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import { connectDB } from "./config/mongo.js";
import passport, { configurePassport } from "./config/passport.js";

import sightingsRoutes from "./routes/sightingsRoutes.js";
import matchingRoutes from "./routes/matchingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import speciesRoutes from "./routes/speciesRoutes.js";

const app = express();

app.set("trust proxy", 1);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "watwildlife-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

configurePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/sightings", sightingsRoutes);
app.use("/api/matching", matchingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/species", speciesRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../../client/dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientDistPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.use((error, req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Server error." });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();