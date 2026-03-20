import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import crypto from "crypto";

dotenv.config();

const uri = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const SPECIES_COLLECTION = process.env.SPECIES_COLLECTION;
const SIGHTINGS_COLLECTION = process.env.SIGHTINGS_COLLECTION;
const USERS_COLLECTION = process.env.USERS_COLLECTION || "users";

const client = new MongoClient(uri);

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

const baseSpecies = [
  {
    commonName: "Red Fox",
    category: "animal",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "bushy",
    legCount: "4",
    size: "medium",
    color: "orange",
    region: "north-america",
    imageUrl:
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=1200&auto=format&fit=crop",
    description:
      "A small adaptable mammal commonly found near forests and open woodland edges.",
  },
  {
    commonName: "White-tailed Deer",
    category: "animal",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "brown",
    region: "north-america",
    imageUrl:
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1200&auto=format&fit=crop",
    description:
      "A common herbivore often seen in forests, meadows, and woodland edges.",
  },
  {
    commonName: "Gray Wolf",
    category: "animal",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "gray",
    region: "north-america",
    imageUrl:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1200&auto=format&fit=crop",
    description:
      "A social wild canine often associated with forests, mountains, and northern habitats.",
  },
  {
    commonName: "River Otter",
    category: "animal",
    subtype: "mammal",
    habitat: "river",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "medium",
    color: "brown",
    region: "north-america",
    imageUrl:
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef3?q=80&w=1200&auto=format&fit=crop",
    description:
      "A semi-aquatic mammal often found near rivers, streams, and wetlands.",
  },
  {
    commonName: "Great Horned Owl",
    category: "animal",
    subtype: "bird",
    habitat: "forest",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "medium",
    color: "brown",
    region: "north-america",
    imageUrl:
      "https://images.unsplash.com/photo-1501706362039-c6e80948bb5c?q=80&w=1200&auto=format&fit=crop",
    description:
      "A powerful nocturnal bird of prey recognized by its large eyes and feather tufts.",
  },
  {
    commonName: "Bald Eagle",
    category: "animal",
    subtype: "bird",
    habitat: "lake",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "white",
    region: "north-america",
    imageUrl:
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?q=80&w=1200&auto=format&fit=crop",
    description:
      "A large raptor associated with lakes, rivers, and open skies.",
  },
  {
    commonName: "Mallard Duck",
    category: "animal",
    subtype: "bird",
    habitat: "wetland",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "medium",
    color: "green",
    region: "north-america",
    imageUrl:
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=1200&auto=format&fit=crop",
    description:
      "A common water bird frequently found on ponds, wetlands, and park lakes.",
  },
  {
    commonName: "American Bullfrog",
    category: "animal",
    subtype: "amphibian",
    habitat: "wetland",
    hasWings: "no",
    tailType: "none",
    legCount: "4",
    size: "medium",
    color: "green",
    region: "north-america",
    imageUrl:
      "https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=1200&auto=format&fit=crop",
    description:
      "A large frog usually found near ponds, marshes, and slow-moving water.",
  },
  {
    commonName: "Garter Snake",
    category: "animal",
    subtype: "reptile",
    habitat: "grassland",
    hasWings: "no",
    tailType: "long",
    legCount: "0",
    size: "small",
    color: "green",
    region: "north-america",
    imageUrl:
      "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?q=80&w=1200&auto=format&fit=crop",
    description:
      "A slender snake commonly found in grasslands, gardens, and wet areas.",
  },
  {
    commonName: "Brown Trout",
    category: "animal",
    subtype: "fish",
    habitat: "river",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "medium",
    color: "brown",
    region: "europe",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
    description:
      "A freshwater fish often associated with clean rivers and cool streams.",
  },
  {
    commonName: "Monarch Butterfly",
    category: "animal",
    subtype: "insect",
    habitat: "field",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "orange",
    region: "north-america",
    imageUrl:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=1200&auto=format&fit=crop",
    description:
      "A recognizable butterfly with orange and black wings, often found near flowers.",
  },
  {
    commonName: "Praying Mantis",
    category: "animal",
    subtype: "insect",
    habitat: "grassland",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "green",
    region: "asia",
    imageUrl:
      "https://images.unsplash.com/photo-1535930749574-1399327ce78f?q=80&w=1200&auto=format&fit=crop",
    description:
      "An insect with folded forelegs often found among leaves and grassy vegetation.",
  },
];

const notePool = [
  "Saw this near the trail entrance.",
  "Observed during a morning hike.",
  "Found close to a shaded area.",
  "Very visible from the path.",
  "Interesting movement and color pattern.",
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function buildSpeciesList(totalCount = 240) {
  const result = [];
  const repeatsPerBase = Math.ceil(totalCount / baseSpecies.length);

  for (let i = 0; i < repeatsPerBase; i += 1) {
    baseSpecies.forEach((item) => {
      result.push({
        ...item,
        commonName: i === 0 ? item.commonName : `${item.commonName} ${i + 1}`,
      });
    });
  }

  return shuffle(result).slice(0, totalCount);
}

async function seed() {
  await client.connect();

  const db = client.db(DB_NAME);
  const speciesCollection = db.collection(SPECIES_COLLECTION);
  const sightingsCollection = db.collection(SIGHTINGS_COLLECTION);
  const usersCollection = db.collection(USERS_COLLECTION);

  console.log("Clearing old data...");
  await speciesCollection.deleteMany({});
  await sightingsCollection.deleteMany({});
  await usersCollection.deleteMany({});

  console.log("Seeding species...");
  const species = buildSpeciesList(240);
  await speciesCollection.insertMany(species);

  console.log("Creating indexes for faster search...");
  await speciesCollection.createIndex({ category: 1 });
  await speciesCollection.createIndex({ subtype: 1 });
  await speciesCollection.createIndex({ habitat: 1 });
  await speciesCollection.createIndex({ hasWings: 1 });
  await speciesCollection.createIndex({ tailType: 1 });
  await speciesCollection.createIndex({ legCount: 1 });
  await speciesCollection.createIndex({ size: 1 });
  await speciesCollection.createIndex({ color: 1 });
  await speciesCollection.createIndex({ region: 1 });

  //   await sightingsCollection.createIndex(
  //     { userId: 1, speciesId: 1 },
  //     { unique: true }
  //   );

  console.log("Seeding demo users...");
  const userDocs = [
    {
      username: "demo1",
      passwordHash: hashPassword("demo123"),
      createdAt: new Date(),
    },
    {
      username: "demo2",
      passwordHash: hashPassword("demo123"),
      createdAt: new Date(),
    },
  ];

  const userInsert = await usersCollection.insertMany(userDocs);
  const userIds = Object.values(userInsert.insertedIds).map((id) => String(id));

  console.log("Loading inserted species...");
  const insertedSpecies = await speciesCollection.find({}).toArray();

  console.log("Seeding sightings...");

  const usernameMap = {
    [userIds[0]]: "demo1",
    [userIds[1]]: "demo2",
  };

  const sightings = Array.from({ length: 1000 }, (_, index) => {
    const userId = randomItem(userIds);
    const sp = randomItem(insertedSpecies);

    return {
      userId,
      username: usernameMap[userId],
      speciesId: String(sp._id),
      speciesName: sp.commonName,
      category: sp.category,
      subtype: sp.subtype,
      habitat: sp.habitat,
      hasWings: sp.hasWings,
      tailType: sp.tailType,
      legCount: sp.legCount,
      size: sp.size,
      color: sp.color,
      region: sp.region,
      imageUrl: sp.imageUrl,
      description: sp.description,
      note: randomItem(notePool),
      status: index % 5 === 0 ? "mystery" : "saved",
      savedAt: new Date(),
    };
  });

  await sightingsCollection.insertMany(sightings);

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
