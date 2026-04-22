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

const subtypeImageMap = {
  mammal:
    "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=1200&auto=format&fit=crop",
  bird:
    "https://images.unsplash.com/photo-1501706362039-c6e80948bb5c?q=80&w=1200&auto=format&fit=crop",
  reptile:
    "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?q=80&w=1200&auto=format&fit=crop",
  amphibian:
    "https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=1200&auto=format&fit=crop",
  fish:
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
  insect:
    "https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=1200&auto=format&fit=crop",
};

const speciesImageOverrides = {
  Lion: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1200&auto=format&fit=crop",
  Tiger: "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1200&auto=format&fit=crop",
  "African Elephant":
    "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=1200&auto=format&fit=crop",
  Giraffe:
    "https://images.unsplash.com/photo-1547721064-da6cfb341d50?q=80&w=1200&auto=format&fit=crop",
  Zebra:
    "https://images.unsplash.com/photo-1526095179574-86e545346ae6?q=80&w=1200&auto=format&fit=crop",
  Gorilla:
    "https://images.unsplash.com/photo-1535338454770-8be927b5a00f?q=80&w=1200&auto=format&fit=crop",
  Koala:
    "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1200&auto=format&fit=crop",
  Kangaroo:
    "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=1200&auto=format&fit=crop",
  Cheetah:
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop",
  Leopard:
    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1200&auto=format&fit=crop",
  Jaguar:
    "https://images.unsplash.com/photo-1598755257130-c2aaca1f061c?q=80&w=1200&auto=format&fit=crop",
  "Gray Wolf":
    "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=1200&auto=format&fit=crop",
  "Bald Eagle":
    "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?q=80&w=1200&auto=format&fit=crop",
  "Great Horned Owl":
    "https://images.unsplash.com/photo-1501706362039-c6e80948bb5c?q=80&w=1200&auto=format&fit=crop",
  "Scarlet Macaw":
    "https://images.unsplash.com/photo-1552728089-57bdde30beb3?q=80&w=1200&auto=format&fit=crop",
  Ostrich:
    "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=1200&auto=format&fit=crop",
  Rattlesnake:
    "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?q=80&w=1200&auto=format&fit=crop",
  "American Alligator":
    "https://images.unsplash.com/photo-1606676539940-12768ce0e762?q=80&w=1200&auto=format&fit=crop",
  "Komodo Dragon":
    "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?q=80&w=1200&auto=format&fit=crop",
  "Poison Dart Frog":
    "https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=1200&auto=format&fit=crop",
  "Great White Shark":
    "https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=1200&auto=format&fit=crop",
  "Black Widow Spider":
    "https://images.unsplash.com/photo-1520808663317-647b476a81b9?q=80&w=1200&auto=format&fit=crop",
  "Black Mamba":
    "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?q=80&w=1200&auto=format&fit=crop",
  "Blue-Ringed Octopus":
    "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=1200&auto=format&fit=crop",
  "Box Jellyfish":
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
  "Deathstalker Scorpion":
    "https://images.unsplash.com/photo-1610041321327-b7943df23b4a?q=80&w=1200&auto=format&fit=crop",
};

const toxicSpecies = new Set([
  "King Cobra",
  "Rattlesnake",
  "Black Widow Spider",
  "Poison Dart Frog",
  "Paper Wasp",
  "Jellyfish",
  "Platypus",
  "Komodo Dragon",
  "Black Mamba",
  "Gaboon Viper",
  "Inland Taipan",
  "Gila Monster",
  "Box Jellyfish",
  "Stonefish",
  "Blue-Ringed Octopus",
  "Brazilian Wandering Spider",
  "Deathstalker Scorpion",
  "Cane Toad",
  "European Adder",
  "Copperhead",
]);

function titleCase(value = "") {
  return value
    .toString()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function buildOverview(species) {
  return `${species.commonName} is a ${species.size.toLowerCase()} ${species.subtype.toLowerCase()} in the WatWildlife field guide. This profile gives users a practical starting point for recognizing the species, understanding where it is most often associated, and deciding whether it is a likely match for something they observed in the wild.`;
}

function buildAppearance(species) {
  const wingText =
    species.hasWings === "yes"
      ? "The presence of wings is one of the first identification clues users may notice."
      : "The lack of wings immediately narrows the possibilities when compared with birds and many insects.";

  return `${species.commonName} is usually described here by its ${species.color.toLowerCase()} coloration, ${species.size.toLowerCase()} body size, ${titleCase(
    species.tailType
  ).toLowerCase()} tail type, and ${species.legCount} visible legs. ${wingText} These traits are meant to help users compare what they saw in the field with the database entry instead of relying on the name alone.`;
}

function buildHabitatDetails(species) {
  return `This entry is associated with ${titleCase(
    species.habitat
  ).toLowerCase()} habitat. In WatWildlife, habitat means the kind of environment where the animal is likely to be encountered, such as forest, wetland, river, desert, or grassland. It should be treated as an environmental clue rather than a geographic one.`;
}

function buildRegionDetails(species) {
  return `This species is grouped under ${titleCase(
    species.region
  )} in the database. Region refers to the broader part of the world where the animal is commonly associated in this project. Users should combine region with habitat and visible traits instead of using any one clue by itself.`;
}

function buildBehavior(species) {
  if (species.subtype === "bird") {
    return `${species.commonName} is most useful to identify through movement, posture, and where it spends time in the landscape. Birds are often noticed by flight style, perching behavior, feeding habits, or how closely they stay to water, trees, cliffs, or open ground.`;
  }

  if (species.subtype === "fish") {
    return `${species.commonName} is best understood through the kind of water it is associated with, how it moves through that environment, and whether it appears near shore, near the bottom, or in open water. Aquatic animals are often identified just as much by context as by color.`;
  }

  if (species.subtype === "insect") {
    return `${species.commonName} can often be recognized by how it moves, where it lands, and whether it hovers, crawls, jumps, or builds nests or webs. Small body size makes behavior especially useful when visual detail is limited.`;
  }

  return `${species.commonName} can often be narrowed down through movement and posture as much as appearance. Users should pay attention to whether it seemed fast, slow, climbing, gliding, burrowing, swimming, or staying near cover, because these field behaviors often help confirm an identification.`;
}

function buildIdentificationTips(species) {
  return `The strongest way to identify ${species.commonName} is to compare several clues at once: ${titleCase(
    species.color
  ).toLowerCase()} coloration, ${species.size.toLowerCase()} size, ${titleCase(
    species.habitat
  ).toLowerCase()} habitat, ${titleCase(
    species.region
  )} region, and obvious body traits such as tail type or wings. Users should avoid relying on a single clue, because many unrelated animals can share one feature while differing in everything else.`;
}

function buildRiskToHumans(species, toxicOrVenomous) {
  if (toxicOrVenomous === "yes") {
    return `${species.commonName} is flagged in this project as toxic or venomous. That label is intentionally simplified for general users, especially hikers who are thinking first about safety rather than technical zoological distinctions. The safest assumption is to avoid touching, handling, cornering, or attempting to move the animal.`;
  }

  if (species.subtype === "mammal" || species.subtype === "bird") {
    return `${species.commonName} is not flagged here as toxic or venomous, but wild animals can still injure people through bites, claws, trampling, defensive behavior, or disease risk. The best practice is still to observe from a respectful distance and avoid feeding or provoking it.`;
  }

  return `${species.commonName} is not currently flagged here as toxic or venomous. Even so, users should avoid direct contact with wildlife, because stress, bites, defensive behavior, parasites, or contamination can still create risk.`;
}

function buildBenefitsToHumans(species) {
  switch (species.subtype) {
    case "insect":
      return `${species.commonName} may benefit humans through pollination, decomposition, food-web support, or natural pest control. Even species that people find annoying or intimidating can still play an important ecological role that indirectly supports agriculture and ecosystem stability.`;
    case "bird":
      return `${species.commonName} may benefit humans through seed dispersal, insect control, scavenging, ecological balance, and wildlife education. Birds are also important to recreation, tourism, and environmental monitoring because they are among the easiest wild animals for people to observe regularly.`;
    case "reptile":
      return `${species.commonName} may benefit humans by helping control prey populations such as rodents or insects and by supporting balanced ecosystems. Reptiles are also valuable for education, conservation, and scientific research on behavior, venom, heat regulation, and habitat change.`;
    case "amphibian":
      return `${species.commonName} may benefit humans by helping regulate insect populations and by acting as an environmental indicator. Amphibians are often sensitive to pollution and habitat damage, so their presence can tell people something important about ecosystem health.`;
    case "fish":
      return `${species.commonName} may benefit humans through food webs, fisheries, nutrient cycling, ecosystem monitoring, and scientific understanding of aquatic habitats. Even species that are not commonly eaten can still signal whether a water system is healthy or stressed.`;
    default:
      return `${species.commonName} may benefit humans through ecosystem balance, education, scientific study, seed dispersal, prey control, or tourism value. The exact benefit depends on the habitat and the role that species plays in the local food web.`;
  }
}

function buildImageUrl(species) {
  return (
    speciesImageOverrides[species.commonName] ||
    subtypeImageMap[species.subtype] ||
    subtypeImageMap.mammal
  );
}

const rawSpecies = [
  {
    commonName: "Lion",
    scientificName: "Panthera leo",
    subtype: "mammal",
    habitat: "grassland",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "yellow",
    region: "africa",
    description:
      "A powerful big cat known for living in prides across African grasslands.",
  },
  {
    commonName: "Tiger",
    scientificName: "Panthera tigris",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "striped",
    legCount: "4",
    size: "large",
    color: "orange",
    region: "asia",
    description:
      "A striped apex predator associated with forests, wetlands, and grasslands.",
  },
  {
    commonName: "African Elephant",
    scientificName: "Loxodonta africana",
    subtype: "mammal",
    habitat: "grassland",
    hasWings: "no",
    tailType: "thin",
    legCount: "4",
    size: "large",
    color: "gray",
    region: "africa",
    description:
      "The largest land animal, recognized by its trunk, tusks, and great size.",
  },
  {
    commonName: "Giraffe",
    scientificName: "Giraffa camelopardalis",
    subtype: "mammal",
    habitat: "grassland",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "yellow",
    region: "africa",
    description:
      "A tall browsing mammal famous for its long neck and spotted pattern.",
  },
  {
    commonName: "Zebra",
    scientificName: "Equus quagga",
    subtype: "mammal",
    habitat: "grassland",
    hasWings: "no",
    tailType: "striped",
    legCount: "4",
    size: "large",
    color: "white",
    region: "africa",
    description:
      "A hoofed grazer famous for its black-and-white striped coat.",
  },
  {
    commonName: "Gorilla",
    scientificName: "Gorilla gorilla",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "none",
    legCount: "4",
    size: "large",
    color: "black",
    region: "africa",
    description:
      "A large great ape that lives in family groups in African forests.",
  },
  {
    commonName: "Chimpanzee",
    scientificName: "Pan troglodytes",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "none",
    legCount: "4",
    size: "medium",
    color: "black",
    region: "africa",
    description:
      "An intelligent great ape known for tool use and social behavior.",
  },
  {
    commonName: "Giant Panda",
    scientificName: "Ailuropoda melanoleuca",
    subtype: "mammal",
    habitat: "mountain",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "white",
    region: "asia",
    description:
      "A bamboo-eating bear recognized by its distinctive black-and-white fur.",
  },
  {
    commonName: "Koala",
    scientificName: "Phascolarctos cinereus",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "none",
    legCount: "4",
    size: "medium",
    color: "gray",
    region: "australia",
    description:
      "A eucalyptus-feeding marsupial that spends much of its time in trees.",
  },
  {
    commonName: "Kangaroo",
    scientificName: "Osphranter rufus",
    subtype: "mammal",
    habitat: "grassland",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "brown",
    region: "australia",
    description:
      "A hopping marsupial famous for its powerful hind legs and large tail.",
  },
  {
    commonName: "Cheetah",
    scientificName: "Acinonyx jubatus",
    subtype: "mammal",
    habitat: "grassland",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "yellow",
    region: "africa",
    description:
      "The fastest land animal, built for speed with a slim body and long legs.",
  },
  {
    commonName: "Leopard",
    scientificName: "Panthera pardus",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "yellow",
    region: "africa",
    description:
      "A stealthy spotted big cat found in forests, grasslands, and mountains.",
  },
  {
    commonName: "Jaguar",
    scientificName: "Panthera onca",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "yellow",
    region: "south-america",
    description:
      "A powerful spotted cat that often lives near rivers and dense forests.",
  },
  {
    commonName: "Gray Wolf",
    scientificName: "Canis lupus",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "gray",
    region: "north-america",
    description:
      "A social wild canine often associated with forests and northern habitats.",
  },
  {
    commonName: "Red Fox",
    scientificName: "Vulpes vulpes",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "bushy",
    legCount: "4",
    size: "medium",
    color: "orange",
    region: "europe",
    description:
      "A clever and adaptable fox commonly found in forests and fields.",
  },
  {
    commonName: "Arctic Fox",
    scientificName: "Vulpes lagopus",
    subtype: "mammal",
    habitat: "mountain",
    hasWings: "no",
    tailType: "bushy",
    legCount: "4",
    size: "small",
    color: "white",
    region: "europe",
    description: "A cold-adapted fox with thick fur and a compact body.",
  },
  {
    commonName: "Brown Bear",
    scientificName: "Ursus arctos",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "brown",
    region: "north-america",
    description:
      "A large omnivorous bear found in forests, mountains, and river valleys.",
  },
  {
    commonName: "Polar Bear",
    scientificName: "Ursus maritimus",
    subtype: "mammal",
    habitat: "coastal",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "white",
    region: "north-america",
    description:
      "A massive white bear adapted for life on sea ice and cold coasts.",
  },
  {
    commonName: "Black Bear",
    scientificName: "Ursus americanus",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "black",
    region: "north-america",
    description:
      "A common North American bear often seen in forests and mountainous regions.",
  },
  {
    commonName: "Moose",
    scientificName: "Alces alces",
    subtype: "mammal",
    habitat: "wetland",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "brown",
    region: "north-america",
    description:
      "A giant deer with long legs, often associated with wetlands and northern forests.",
  },
  {
    commonName: "White-tailed Deer",
    scientificName: "Odocoileus virginianus",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "brown",
    region: "north-america",
    description:
      "A familiar grazing deer found in forests, edges, and open fields.",
  },
  {
    commonName: "American Bison",
    scientificName: "Bison bison",
    subtype: "mammal",
    habitat: "grassland",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "brown",
    region: "north-america",
    description:
      "A huge shaggy grazer historically associated with the North American plains.",
  },
  {
    commonName: "African Buffalo",
    scientificName: "Syncerus caffer",
    subtype: "mammal",
    habitat: "grassland",
    hasWings: "no",
    tailType: "thin",
    legCount: "4",
    size: "large",
    color: "black",
    region: "africa",
    description:
      "A muscular wild bovine often found in African savannas and grasslands.",
  },
  {
    commonName: "White Rhinoceros",
    scientificName: "Ceratotherium simum",
    subtype: "mammal",
    habitat: "grassland",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "gray",
    region: "africa",
    description:
      "A heavy herbivore recognized by its horns and massive body.",
  },
  {
    commonName: "Hippopotamus",
    scientificName: "Hippopotamus amphibius",
    subtype: "mammal",
    habitat: "river",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "gray",
    region: "africa",
    description:
      "A semi-aquatic giant that spends much of its time in rivers and lakes.",
  },
  {
    commonName: "Dromedary Camel",
    scientificName: "Camelus dromedarius",
    subtype: "mammal",
    habitat: "desert",
    hasWings: "no",
    tailType: "thin",
    legCount: "4",
    size: "large",
    color: "brown",
    region: "africa",
    description:
      "A desert-adapted camel known for its single hump and endurance.",
  },
  {
    commonName: "Horse",
    scientificName: "Equus ferus caballus",
    subtype: "mammal",
    habitat: "grassland",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "brown",
    region: "europe",
    description:
      "A fast-running hoofed mammal long associated with human history.",
  },
  {
    commonName: "Donkey",
    scientificName: "Equus africanus asinus",
    subtype: "mammal",
    habitat: "grassland",
    hasWings: "no",
    tailType: "thin",
    legCount: "4",
    size: "medium",
    color: "gray",
    region: "africa",
    description:
      "A sturdy hoofed mammal closely related to horses and adapted to dry regions.",
  },
  {
    commonName: "Cow",
    scientificName: "Bos taurus",
    subtype: "mammal",
    habitat: "field",
    hasWings: "no",
    tailType: "thin",
    legCount: "4",
    size: "large",
    color: "brown",
    region: "europe",
    description:
      "A common domestic grazer found in fields and agricultural landscapes.",
  },
  {
    commonName: "Goat",
    scientificName: "Capra hircus",
    subtype: "mammal",
    habitat: "mountain",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "medium",
    color: "white",
    region: "europe",
    description:
      "A nimble hoofed mammal known for climbing rocky and mountainous terrain.",
  },
  {
    commonName: "Sheep",
    scientificName: "Ovis aries",
    subtype: "mammal",
    habitat: "field",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "medium",
    color: "white",
    region: "europe",
    description:
      "A wool-bearing grazer often found in fields, hills, and managed pastures.",
  },
  {
    commonName: "Pig",
    scientificName: "Sus scrofa domesticus",
    subtype: "mammal",
    habitat: "field",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "medium",
    color: "pink",
    region: "europe",
    description:
      "A highly intelligent hoofed mammal commonly associated with farms.",
  },
  {
    commonName: "Dog",
    scientificName: "Canis lupus familiaris",
    subtype: "mammal",
    habitat: "field",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "medium",
    color: "brown",
    region: "north-america",
    description:
      "A domesticated canine with great variety in size, color, and behavior.",
  },
  {
    commonName: "Cat",
    scientificName: "Felis catus",
    subtype: "mammal",
    habitat: "field",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "small",
    color: "gray",
    region: "north-america",
    description:
      "A small domestic predator known for agility, curiosity, and independence.",
  },
  {
    commonName: "Rabbit",
    scientificName: "Oryctolagus cuniculus",
    subtype: "mammal",
    habitat: "field",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "small",
    color: "white",
    region: "europe",
    description:
      "A small hopping herbivore recognized by its long ears and quick movements.",
  },
  {
    commonName: "Eastern Gray Squirrel",
    scientificName: "Sciurus carolinensis",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "bushy",
    legCount: "4",
    size: "small",
    color: "gray",
    region: "north-america",
    description:
      "A common tree squirrel often seen in parks, yards, and woodlands.",
  },
  {
    commonName: "North American Beaver",
    scientificName: "Castor canadensis",
    subtype: "mammal",
    habitat: "river",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "4",
    size: "medium",
    color: "brown",
    region: "north-america",
    description:
      "A dam-building rodent famous for shaping wetlands and waterways.",
  },
  {
    commonName: "River Otter",
    scientificName: "Lontra canadensis",
    subtype: "mammal",
    habitat: "river",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "medium",
    color: "brown",
    region: "north-america",
    description:
      "A playful semi-aquatic mammal often found along rivers and wetlands.",
  },
  {
    commonName: "Harbor Seal",
    scientificName: "Phoca vitulina",
    subtype: "mammal",
    habitat: "coastal",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "gray",
    region: "europe",
    description:
      "A coastal marine mammal often seen resting on rocks, sandbars, or ice.",
  },
  {
    commonName: "Bottlenose Dolphin",
    scientificName: "Tursiops truncatus",
    subtype: "mammal",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "large",
    color: "gray",
    region: "north-america",
    description:
      "A highly intelligent marine mammal famous for its curved dorsal fin and social behavior.",
  },
  {
    commonName: "Orca",
    scientificName: "Orcinus orca",
    subtype: "mammal",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "large",
    color: "black",
    region: "north-america",
    description:
      "A striking black-and-white marine predator often called the killer whale.",
  },
  {
    commonName: "Humpback Whale",
    scientificName: "Megaptera novaeangliae",
    subtype: "mammal",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "large",
    color: "gray",
    region: "north-america",
    description:
      "A huge baleen whale known for breaching behavior and long migrations.",
  },
  {
    commonName: "Bald Eagle",
    scientificName: "Haliaeetus leucocephalus",
    subtype: "bird",
    habitat: "lake",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "white",
    region: "north-america",
    description:
      "A large raptor associated with lakes, rivers, and open skies.",
  },
  {
    commonName: "Golden Eagle",
    scientificName: "Aquila chrysaetos",
    subtype: "bird",
    habitat: "mountain",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "brown",
    region: "europe",
    description:
      "A powerful eagle often seen in mountains, cliffs, and open country.",
  },
  {
    commonName: "Great Horned Owl",
    scientificName: "Bubo virginianus",
    subtype: "bird",
    habitat: "forest",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "medium",
    color: "brown",
    region: "north-america",
    description:
      "A nocturnal bird of prey recognized by its large eyes and feather tufts.",
  },
  {
    commonName: "Peregrine Falcon",
    scientificName: "Falco peregrinus",
    subtype: "bird",
    habitat: "mountain",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "medium",
    color: "gray",
    region: "europe",
    description:
      "A famous falcon known for speed and dramatic hunting dives.",
  },
  {
    commonName: "Red-tailed Hawk",
    scientificName: "Buteo jamaicensis",
    subtype: "bird",
    habitat: "field",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "brown",
    region: "north-america",
    description:
      "A broad-winged hawk commonly seen soaring over fields and open country.",
  },
  {
    commonName: "American Robin",
    scientificName: "Turdus migratorius",
    subtype: "bird",
    habitat: "field",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "small",
    color: "orange",
    region: "north-america",
    description:
      "A familiar songbird often spotted in lawns, gardens, and woodland edges.",
  },
  {
    commonName: "Blue Jay",
    scientificName: "Cyanocitta cristata",
    subtype: "bird",
    habitat: "forest",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "small",
    color: "blue",
    region: "north-america",
    description: "A bold and noisy bird with bright blue feathers and a crest.",
  },
  {
    commonName: "Northern Cardinal",
    scientificName: "Cardinalis cardinalis",
    subtype: "bird",
    habitat: "forest",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "small",
    color: "red",
    region: "north-america",
    description:
      "A bright red songbird commonly seen in shrubs, gardens, and woodland edges.",
  },
  {
    commonName: "American Crow",
    scientificName: "Corvus brachyrhynchos",
    subtype: "bird",
    habitat: "field",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "medium",
    color: "black",
    region: "north-america",
    description:
      "An intelligent black bird often seen in groups in towns, fields, and forests.",
  },
  {
    commonName: "Common Raven",
    scientificName: "Corvus corax",
    subtype: "bird",
    habitat: "mountain",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "black",
    region: "europe",
    description:
      "A large black bird known for intelligence, deep calls, and scavenging behavior.",
  },
  {
    commonName: "Rock Pigeon",
    scientificName: "Columba livia",
    subtype: "bird",
    habitat: "field",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "small",
    color: "gray",
    region: "europe",
    description:
      "A highly familiar city and cliff-dwelling bird found around the world.",
  },
  {
    commonName: "Mourning Dove",
    scientificName: "Zenaida macroura",
    subtype: "bird",
    habitat: "field",
    hasWings: "yes",
    tailType: "long",
    legCount: "2",
    size: "small",
    color: "brown",
    region: "north-america",
    description:
      "A gentle dove known for its soft cooing call and long pointed tail.",
  },
  {
    commonName: "House Sparrow",
    scientificName: "Passer domesticus",
    subtype: "bird",
    habitat: "field",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "small",
    color: "brown",
    region: "europe",
    description:
      "A tiny, adaptable bird commonly found around human settlements.",
  },
  {
    commonName: "Ruby-throated Hummingbird",
    scientificName: "Archilochus colubris",
    subtype: "bird",
    habitat: "field",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "small",
    color: "green",
    region: "north-america",
    description:
      "A tiny hovering bird famous for visiting flowers and feeders.",
  },
  {
    commonName: "Scarlet Macaw",
    scientificName: "Ara macao",
    subtype: "bird",
    habitat: "forest",
    hasWings: "yes",
    tailType: "long",
    legCount: "2",
    size: "large",
    color: "red",
    region: "south-america",
    description:
      "A colorful tropical parrot recognized by its bright plumage and strong bill.",
  },
  {
    commonName: "Emperor Penguin",
    scientificName: "Aptenodytes forsteri",
    subtype: "bird",
    habitat: "coastal",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "black",
    region: "australia",
    description:
      "A flightless seabird famous for icy colonies and upright posture.",
  },
  {
    commonName: "Ostrich",
    scientificName: "Struthio camelus",
    subtype: "bird",
    habitat: "grassland",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "black",
    region: "africa",
    description:
      "The largest living bird, known for speed, long legs, and flightlessness.",
  },
  {
    commonName: "Greater Flamingo",
    scientificName: "Phoenicopterus roseus",
    subtype: "bird",
    habitat: "wetland",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "pink",
    region: "africa",
    description:
      "A wading bird famous for its pink feathers and long curved bill.",
  },
  {
    commonName: "Brown Pelican",
    scientificName: "Pelecanus occidentalis",
    subtype: "bird",
    habitat: "coastal",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "brown",
    region: "north-america",
    description:
      "A coastal bird recognized by its huge bill pouch and diving behavior.",
  },
  {
    commonName: "Mute Swan",
    scientificName: "Cygnus olor",
    subtype: "bird",
    habitat: "lake",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "white",
    region: "europe",
    description:
      "A graceful white waterbird often seen on lakes, ponds, and wetlands.",
  },
  {
    commonName: "Canada Goose",
    scientificName: "Branta canadensis",
    subtype: "bird",
    habitat: "lake",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "black",
    region: "north-america",
    description:
      "A familiar large goose known for V-shaped migratory flocks.",
  },
  {
    commonName: "Mallard Duck",
    scientificName: "Anas platyrhynchos",
    subtype: "bird",
    habitat: "wetland",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "medium",
    color: "green",
    region: "north-america",
    description:
      "A common water bird frequently found on ponds, wetlands, and park lakes.",
  },
  {
    commonName: "Wild Turkey",
    scientificName: "Meleagris gallopavo",
    subtype: "bird",
    habitat: "forest",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "brown",
    region: "north-america",
    description:
      "A large ground-feeding bird recognized by its fan-shaped tail display.",
  },
  {
    commonName: "Indian Peafowl",
    scientificName: "Pavo cristatus",
    subtype: "bird",
    habitat: "field",
    hasWings: "yes",
    tailType: "long",
    legCount: "2",
    size: "large",
    color: "blue",
    region: "asia",
    description:
      "A striking bird famous for the male’s colorful tail fan.",
  },
  {
    commonName: "Herring Gull",
    scientificName: "Larus argentatus",
    subtype: "bird",
    habitat: "coastal",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "medium",
    color: "white",
    region: "europe",
    description:
      "A common coastal gull often seen near shorelines, piers, and cities.",
  },
  {
    commonName: "Common Garter Snake",
    scientificName: "Thamnophis sirtalis",
    subtype: "reptile",
    habitat: "grassland",
    hasWings: "no",
    tailType: "long",
    legCount: "0",
    size: "small",
    color: "green",
    region: "north-america",
    description:
      "A slender snake often found in grasslands, gardens, and wet areas.",
  },
  {
    commonName: "King Cobra",
    scientificName: "Ophiophagus hannah",
    subtype: "reptile",
    habitat: "forest",
    hasWings: "no",
    tailType: "long",
    legCount: "0",
    size: "large",
    color: "brown",
    region: "asia",
    description:
      "A famous venomous snake known for its hood and imposing size.",
  },
  {
    commonName: "Ball Python",
    scientificName: "Python regius",
    subtype: "reptile",
    habitat: "grassland",
    hasWings: "no",
    tailType: "long",
    legCount: "0",
    size: "medium",
    color: "brown",
    region: "africa",
    description:
      "A thick-bodied snake known for curling into a tight defensive ball.",
  },
  {
    commonName: "Rattlesnake",
    scientificName: "Crotalus oreganus",
    subtype: "reptile",
    habitat: "desert",
    hasWings: "no",
    tailType: "striped",
    legCount: "0",
    size: "medium",
    color: "brown",
    region: "north-america",
    description:
      "A venomous snake famous for the rattling sound at the end of its tail.",
  },
  {
    commonName: "American Alligator",
    scientificName: "Alligator mississippiensis",
    subtype: "reptile",
    habitat: "wetland",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "green",
    region: "north-america",
    description:
      "A powerful reptile often found in marshes, swamps, and slow waters.",
  },
  {
    commonName: "Nile Crocodile",
    scientificName: "Crocodylus niloticus",
    subtype: "reptile",
    habitat: "river",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "green",
    region: "africa",
    description:
      "A large crocodile associated with rivers, wetlands, and lakes.",
  },
  {
    commonName: "Komodo Dragon",
    scientificName: "Varanus komodoensis",
    subtype: "reptile",
    habitat: "grassland",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "brown",
    region: "asia",
    description:
      "The world’s largest lizard, known for its size, claws, and powerful bite.",
  },
  {
    commonName: "Green Iguana",
    scientificName: "Iguana iguana",
    subtype: "reptile",
    habitat: "forest",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "medium",
    color: "green",
    region: "south-america",
    description:
      "A large herbivorous lizard commonly found in tropical forests.",
  },
  {
    commonName: "Veiled Chameleon",
    scientificName: "Chamaeleo calyptratus",
    subtype: "reptile",
    habitat: "forest",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "small",
    color: "green",
    region: "africa",
    description:
      "A tree-dwelling lizard famous for color shifts and a grasping tail.",
  },
  {
    commonName: "Leopard Gecko",
    scientificName: "Eublepharis macularius",
    subtype: "reptile",
    habitat: "desert",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "small",
    color: "yellow",
    region: "asia",
    description:
      "A small spotted gecko known for its wide eyes and distinctive pattern.",
  },
  {
    commonName: "Galapagos Giant Tortoise",
    scientificName: "Chelonoidis niger",
    subtype: "reptile",
    habitat: "grassland",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "brown",
    region: "south-america",
    description:
      "A slow-moving tortoise famous for extreme longevity and massive shell.",
  },
  {
    commonName: "Green Sea Turtle",
    scientificName: "Chelonia mydas",
    subtype: "reptile",
    habitat: "coastal",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "green",
    region: "australia",
    description:
      "A marine turtle often found near reefs, coastal waters, and seagrass beds.",
  },
  {
    commonName: "Eastern Box Turtle",
    scientificName: "Terrapene carolina",
    subtype: "reptile",
    habitat: "forest",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "small",
    color: "brown",
    region: "north-america",
    description:
      "A small land turtle known for its domed shell and hinged plastron.",
  },
  {
    commonName: "Water Monitor",
    scientificName: "Varanus salvator",
    subtype: "reptile",
    habitat: "river",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "black",
    region: "asia",
    description:
      "A large monitor lizard often found near rivers, wetlands, and mangroves.",
  },
  {
    commonName: "American Bullfrog",
    scientificName: "Lithobates catesbeianus",
    subtype: "amphibian",
    habitat: "wetland",
    hasWings: "no",
    tailType: "none",
    legCount: "4",
    size: "medium",
    color: "green",
    region: "north-america",
    description:
      "A large frog usually found near ponds, marshes, and slow-moving water.",
  },
  {
    commonName: "Green Tree Frog",
    scientificName: "Hyla cinerea",
    subtype: "amphibian",
    habitat: "wetland",
    hasWings: "no",
    tailType: "none",
    legCount: "4",
    size: "small",
    color: "green",
    region: "north-america",
    description:
      "A small tree-dwelling frog often found in humid wetland habitats.",
  },
  {
    commonName: "Common Toad",
    scientificName: "Bufo bufo",
    subtype: "amphibian",
    habitat: "forest",
    hasWings: "no",
    tailType: "none",
    legCount: "4",
    size: "small",
    color: "brown",
    region: "europe",
    description:
      "A sturdy amphibian with dry skin and a slow, hopping gait.",
  },
  {
    commonName: "Tiger Salamander",
    scientificName: "Ambystoma tigrinum",
    subtype: "amphibian",
    habitat: "wetland",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "medium",
    color: "yellow",
    region: "north-america",
    description:
      "A large salamander with bold patterning and a secretive lifestyle.",
  },
  {
    commonName: "Smooth Newt",
    scientificName: "Lissotriton vulgaris",
    subtype: "amphibian",
    habitat: "wetland",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "small",
    color: "brown",
    region: "europe",
    description:
      "A slender amphibian often seen in ponds and damp terrestrial habitats.",
  },
  {
    commonName: "Axolotl",
    scientificName: "Ambystoma mexicanum",
    subtype: "amphibian",
    habitat: "lake",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "small",
    color: "pink",
    region: "north-america",
    description:
      "An unusual aquatic salamander famous for external gills and regeneration.",
  },
  {
    commonName: "Poison Dart Frog",
    scientificName: "Dendrobates tinctorius",
    subtype: "amphibian",
    habitat: "forest",
    hasWings: "no",
    tailType: "none",
    legCount: "4",
    size: "small",
    color: "blue",
    region: "south-america",
    description:
      "A brightly colored tropical frog known for warning coloration.",
  },
  {
    commonName: "African Clawed Frog",
    scientificName: "Xenopus laevis",
    subtype: "amphibian",
    habitat: "river",
    hasWings: "no",
    tailType: "none",
    legCount: "4",
    size: "small",
    color: "gray",
    region: "africa",
    description:
      "A fully aquatic frog recognized by its smooth body and clawed feet.",
  },
  {
    commonName: "Brown Trout",
    scientificName: "Salmo trutta",
    subtype: "fish",
    habitat: "river",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "medium",
    color: "brown",
    region: "europe",
    description:
      "A freshwater fish often associated with clean rivers and cool streams.",
  },
  {
    commonName: "Atlantic Salmon",
    scientificName: "Salmo salar",
    subtype: "fish",
    habitat: "river",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "large",
    color: "gray",
    region: "europe",
    description:
      "A migratory fish famous for moving between ocean waters and rivers.",
  },
  {
    commonName: "Goldfish",
    scientificName: "Carassius auratus",
    subtype: "fish",
    habitat: "lake",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "small",
    color: "orange",
    region: "asia",
    description:
      "A familiar freshwater fish widely known from ponds and aquariums.",
  },
  {
    commonName: "Clownfish",
    scientificName: "Amphiprion ocellaris",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "small",
    color: "orange",
    region: "australia",
    description:
      "A reef fish recognized by orange color and white bands.",
  },
  {
    commonName: "Blue Tang",
    scientificName: "Paracanthurus hepatus",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "medium",
    color: "blue",
    region: "australia",
    description:
      "A reef fish with bright blue color and a black pattern.",
  },
  {
    commonName: "Great White Shark",
    scientificName: "Carcharodon carcharias",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "large",
    color: "gray",
    region: "australia",
    description:
      "A famous large shark associated with coastal waters and apex predation.",
  },
  {
    commonName: "Hammerhead Shark",
    scientificName: "Sphyrna mokarran",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "large",
    color: "gray",
    region: "south-america",
    description:
      "A shark instantly recognizable by its wide hammer-shaped head.",
  },
  {
    commonName: "Bluefin Tuna",
    scientificName: "Thunnus thynnus",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "large",
    color: "blue",
    region: "europe",
    description:
      "A fast, powerful ocean fish known for long-distance swimming.",
  },
  {
    commonName: "Swordfish",
    scientificName: "Xiphias gladius",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "large",
    color: "blue",
    region: "north-america",
    description:
      "A sleek ocean predator famous for its long sword-like bill.",
  },
  {
    commonName: "Betta Fish",
    scientificName: "Betta splendens",
    subtype: "fish",
    habitat: "lake",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "small",
    color: "red",
    region: "asia",
    description:
      "A brightly colored fish known for flowing fins and territorial behavior.",
  },
  {
    commonName: "Common Carp",
    scientificName: "Cyprinus carpio",
    subtype: "fish",
    habitat: "lake",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "large",
    color: "brown",
    region: "asia",
    description:
      "A hardy freshwater fish common in ponds, lakes, and slow rivers.",
  },
  {
    commonName: "Channel Catfish",
    scientificName: "Ictalurus punctatus",
    subtype: "fish",
    habitat: "river",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "medium",
    color: "gray",
    region: "north-america",
    description:
      "A whiskered freshwater fish common in rivers, reservoirs, and lakes.",
  },
  {
    commonName: "Piranha",
    scientificName: "Pygocentrus nattereri",
    subtype: "fish",
    habitat: "river",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "small",
    color: "red",
    region: "south-america",
    description:
      "A sharp-toothed freshwater fish famous for strong jaws and schooling behavior.",
  },
  {
    commonName: "Monarch Butterfly",
    scientificName: "Danaus plexippus",
    subtype: "insect",
    habitat: "field",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "orange",
    region: "north-america",
    description:
      "A recognizable butterfly with orange and black wings, often found near flowers.",
  },
  {
    commonName: "Honey Bee",
    scientificName: "Apis mellifera",
    subtype: "insect",
    habitat: "field",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "yellow",
    region: "europe",
    description:
      "A social pollinator famous for honey production and flower visitation.",
  },
  {
    commonName: "Bumblebee",
    scientificName: "Bombus terrestris",
    subtype: "insect",
    habitat: "field",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "yellow",
    region: "europe",
    description:
      "A fuzzy pollinating bee often seen around flowers and gardens.",
  },
  {
    commonName: "Ladybug",
    scientificName: "Coccinella septempunctata",
    subtype: "insect",
    habitat: "field",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "red",
    region: "europe",
    description:
      "A small spotted beetle often associated with gardens and aphid control.",
  },
  {
    commonName: "Dragonfly",
    scientificName: "Anax junius",
    subtype: "insect",
    habitat: "wetland",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "blue",
    region: "north-america",
    description:
      "A swift flying insect often seen around ponds, marshes, and waterways.",
  },
  {
    commonName: "Mosquito",
    scientificName: "Culicidae",
    subtype: "insect",
    habitat: "wetland",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "gray",
    region: "africa",
    description:
      "A common flying insect associated with standing water and humid habitats.",
  },
  {
    commonName: "Ant",
    scientificName: "Formicidae",
    subtype: "insect",
    habitat: "field",
    hasWings: "no",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "black",
    region: "north-america",
    description:
      "A social insect that lives in colonies and is found in nearly every habitat.",
  },
  {
    commonName: "Praying Mantis",
    scientificName: "Mantis religiosa",
    subtype: "insect",
    habitat: "grassland",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "green",
    region: "asia",
    description:
      "An insect with folded forelegs often found among leaves and grassy vegetation.",
  },
  {
    commonName: "Grasshopper",
    scientificName: "Caelifera",
    subtype: "insect",
    habitat: "grassland",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "green",
    region: "north-america",
    description:
      "A jumping insect common in fields, meadows, and dry grassy habitats.",
  },
  {
    commonName: "Stag Beetle",
    scientificName: "Lucanus cervus",
    subtype: "insect",
    habitat: "forest",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "brown",
    region: "europe",
    description:
      "A large beetle recognized by its strong jaws and armored appearance.",
  },
  {
    commonName: "Firefly",
    scientificName: "Lampyridae",
    subtype: "insect",
    habitat: "field",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "yellow",
    region: "north-america",
    description:
      "A glowing beetle best known for flashing light signals at dusk.",
  },
  {
    commonName: "Paper Wasp",
    scientificName: "Polistes dominula",
    subtype: "insect",
    habitat: "field",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "yellow",
    region: "europe",
    description:
      "A social wasp that builds open paper nests and hunts smaller insects.",
  },
  {
    commonName: "Luna Moth",
    scientificName: "Actias luna",
    subtype: "insect",
    habitat: "forest",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "green",
    region: "north-america",
    description:
      "A large pale-green moth known for its elegant wings and tail streamers.",
  },
  {
    commonName: "Cicada",
    scientificName: "Cicadidae",
    subtype: "insect",
    habitat: "forest",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "brown",
    region: "north-america",
    description:
      "A loud singing insect famous for periodic emergences in some species.",
  },
  {
    commonName: "Cricket",
    scientificName: "Gryllidae",
    subtype: "insect",
    habitat: "field",
    hasWings: "yes",
    tailType: "none",
    legCount: "6",
    size: "small",
    color: "black",
    region: "asia",
    description:
      "A chirping insect often found in fields, gardens, and grassy edges.",
  },
  {
    commonName: "Meerkat",
    scientificName: "Suricata suricatta",
    subtype: "mammal",
    habitat: "desert",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "small",
    color: "brown",
    region: "africa",
    description:
      "A social desert mammal famous for standing upright to watch for danger.",
  },
  {
    commonName: "Sloth",
    scientificName: "Bradypus variegatus",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "medium",
    color: "brown",
    region: "south-america",
    description:
      "A slow-moving tree mammal known for hanging beneath branches.",
  },
  {
    commonName: "Armadillo",
    scientificName: "Dasypus novemcinctus",
    subtype: "mammal",
    habitat: "grassland",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "small",
    color: "brown",
    region: "south-america",
    description:
      "An armored mammal with a hard shell and digging claws.",
  },
  {
    commonName: "Wombat",
    scientificName: "Vombatus ursinus",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "medium",
    color: "brown",
    region: "australia",
    description: "A sturdy burrowing marsupial found in Australia.",
  },
  {
    commonName: "Tasmanian Devil",
    scientificName: "Sarcophilus harrisii",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "small",
    color: "black",
    region: "australia",
    description:
      "A powerful scavenging marsupial with a loud, fierce reputation.",
  },
  {
    commonName: "Hyena",
    scientificName: "Crocuta crocuta",
    subtype: "mammal",
    habitat: "grassland",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "brown",
    region: "africa",
    description:
      "A social carnivore famous for strong jaws and haunting calls.",
  },
  {
    commonName: "Lemur",
    scientificName: "Lemur catta",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "striped",
    legCount: "4",
    size: "small",
    color: "gray",
    region: "africa",
    description:
      "A primate best known for its ringed tail and agile movement.",
  },
  {
    commonName: "Walrus",
    scientificName: "Odobenus rosmarus",
    subtype: "mammal",
    habitat: "coastal",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "large",
    color: "brown",
    region: "north-america",
    description: "A tusked marine mammal found in cold coastal waters.",
  },
  {
    commonName: "Camel Spider",
    scientificName: "Solifugae",
    subtype: "insect",
    habitat: "desert",
    hasWings: "no",
    tailType: "none",
    legCount: "8",
    size: "small",
    color: "brown",
    region: "asia",
    description:
      "A desert arachnid known for speed and intimidating mouthparts.",
  },
  {
    commonName: "Black Widow Spider",
    scientificName: "Latrodectus",
    subtype: "insect",
    habitat: "field",
    hasWings: "no",
    tailType: "none",
    legCount: "8",
    size: "small",
    color: "black",
    region: "north-america",
    description: "A dark spider famous for its web, red markings, and venom.",
  },
  {
    commonName: "Tarantula",
    scientificName: "Theraphosidae",
    subtype: "insect",
    habitat: "desert",
    hasWings: "no",
    tailType: "none",
    legCount: "8",
    size: "small",
    color: "brown",
    region: "south-america",
    description:
      "A large hairy spider often found in warm dry habitats.",
  },
  {
    commonName: "Snow Leopard",
    scientificName: "Panthera uncia",
    subtype: "mammal",
    habitat: "mountain",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "large",
    color: "white",
    region: "asia",
    description:
      "A rare mountain cat adapted to steep rocky slopes and cold climates.",
  },
  {
    commonName: "Mountain Goat",
    scientificName: "Oreamnos americanus",
    subtype: "mammal",
    habitat: "mountain",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "medium",
    color: "white",
    region: "north-america",
    description:
      "A sure-footed hoofed mammal adapted to steep cliffs and alpine terrain.",
  },
  {
    commonName: "Boar",
    scientificName: "Sus scrofa",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "medium",
    color: "brown",
    region: "europe",
    description: "A wild pig with tusks and a strong rooting snout.",
  },
  {
    commonName: "Raccoon",
    scientificName: "Procyon lotor",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "striped",
    legCount: "4",
    size: "small",
    color: "gray",
    region: "north-america",
    description:
      "A clever nocturnal mammal with a masked face and ringed tail.",
  },
  {
    commonName: "Skunk",
    scientificName: "Mephitis mephitis",
    subtype: "mammal",
    habitat: "field",
    hasWings: "no",
    tailType: "bushy",
    legCount: "4",
    size: "small",
    color: "black",
    region: "north-america",
    description: "A striped mammal known for defensive scent spraying.",
  },
  {
    commonName: "Porcupine",
    scientificName: "Erethizon dorsatum",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "medium",
    color: "brown",
    region: "north-america",
    description:
      "A quill-covered rodent that climbs trees and feeds on vegetation.",
  },
  {
    commonName: "Mole",
    scientificName: "Talpidae",
    subtype: "mammal",
    habitat: "field",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "small",
    color: "black",
    region: "europe",
    description: "A burrowing mammal adapted to life underground.",
  },
  {
    commonName: "Bat",
    scientificName: "Chiroptera",
    subtype: "mammal",
    habitat: "forest",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "small",
    color: "black",
    region: "north-america",
    description:
      "A flying mammal active at night and known for echolocation.",
  },
  {
    commonName: "Platypus",
    scientificName: "Ornithorhynchus anatinus",
    subtype: "mammal",
    habitat: "river",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "4",
    size: "small",
    color: "brown",
    region: "australia",
    description:
      "An unusual egg-laying mammal with a bill, webbed feet, and broad tail.",
  },
  {
    commonName: "Cassowary",
    scientificName: "Casuarius casuarius",
    subtype: "bird",
    habitat: "forest",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "black",
    region: "australia",
    description:
      "A large flightless bird with powerful legs and a helmet-like casque.",
  },
  {
    commonName: "Woodpecker",
    scientificName: "Picidae",
    subtype: "bird",
    habitat: "forest",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "small",
    color: "red",
    region: "north-america",
    description:
      "A tree-clinging bird known for pecking wood in search of insects.",
  },
  {
    commonName: "Toucan",
    scientificName: "Ramphastidae",
    subtype: "bird",
    habitat: "forest",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "medium",
    color: "yellow",
    region: "south-america",
    description:
      "A tropical bird famous for its oversized colorful bill.",
  },
  {
    commonName: "Kingfisher",
    scientificName: "Alcedinidae",
    subtype: "bird",
    habitat: "river",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "small",
    color: "blue",
    region: "asia",
    description:
      "A brightly colored fishing bird often seen perched near water.",
  },
  {
    commonName: "Heron",
    scientificName: "Ardea herodias",
    subtype: "bird",
    habitat: "wetland",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "gray",
    region: "north-america",
    description:
      "A long-legged wading bird common in marshes, rivers, and shorelines.",
  },
  {
    commonName: "King Penguin",
    scientificName: "Aptenodytes patagonicus",
    subtype: "bird",
    habitat: "coastal",
    hasWings: "yes",
    tailType: "short",
    legCount: "2",
    size: "large",
    color: "black",
    region: "south-america",
    description:
      "A tall penguin with bright markings, often seen in cold coastal colonies.",
  },
  {
    commonName: "Parrot",
    scientificName: "Psittaciformes",
    subtype: "bird",
    habitat: "forest",
    hasWings: "yes",
    tailType: "long",
    legCount: "2",
    size: "medium",
    color: "green",
    region: "south-america",
    description:
      "A colorful intelligent bird group known for curved beaks and vocal ability.",
  },
  {
    commonName: "Boa Constrictor",
    scientificName: "Boa constrictor",
    subtype: "reptile",
    habitat: "forest",
    hasWings: "no",
    tailType: "long",
    legCount: "0",
    size: "large",
    color: "brown",
    region: "south-america",
    description: "A heavy-bodied snake that kills prey by constriction.",
  },
  {
    commonName: "Anole",
    scientificName: "Anolis carolinensis",
    subtype: "reptile",
    habitat: "forest",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "small",
    color: "green",
    region: "north-america",
    description:
      "A small agile lizard often seen on walls, trees, and shrubs.",
  },
  {
    commonName: "Frilled Lizard",
    scientificName: "Chlamydosaurus kingii",
    subtype: "reptile",
    habitat: "grassland",
    hasWings: "no",
    tailType: "long",
    legCount: "4",
    size: "medium",
    color: "brown",
    region: "australia",
    description:
      "A lizard famous for the dramatic frill around its neck.",
  },
  {
    commonName: "Mudskipper",
    scientificName: "Periophthalmus",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "small",
    color: "brown",
    region: "asia",
    description:
      "A fish known for spending time out of water on muddy shores.",
  },
  {
    commonName: "Manta Ray",
    scientificName: "Mobula birostris",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "large",
    color: "black",
    region: "australia",
    description:
      "A huge ray recognized by wing-like fins and graceful swimming.",
  },
  {
    commonName: "Jellyfish",
    scientificName: "Scyphozoa",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "none",
    legCount: "many",
    size: "medium",
    color: "white",
    region: "north-america",
    description:
      "A drifting sea animal with tentacles and a gelatinous body.",
  },
  {
    commonName: "Lobster",
    scientificName: "Homarus americanus",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "many",
    size: "medium",
    color: "brown",
    region: "north-america",
    description:
      "A large clawed marine crustacean found on rocky sea bottoms.",
  },
  {
    commonName: "Mantis Shrimp",
    scientificName: "Stomatopoda",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "many",
    size: "small",
    color: "green",
    region: "australia",
    description:
      "A colorful marine hunter famous for powerful striking limbs.",
  },
];

const extraSpecies = [
  {
    commonName: "Black Mamba",
    scientificName: "Dendroaspis polylepis",
    subtype: "reptile",
    habitat: "grassland",
    hasWings: "no",
    tailType: "long",
    legCount: "0",
    size: "large",
    color: "gray",
    region: "africa",
    description:
      "A fast African snake known for potent venom and a nervous defensive response when cornered.",
  },
  {
    commonName: "Gaboon Viper",
    scientificName: "Bitis gabonica",
    subtype: "reptile",
    habitat: "forest",
    hasWings: "no",
    tailType: "short",
    legCount: "0",
    size: "large",
    color: "brown",
    region: "africa",
    description:
      "A heavy-bodied forest viper with camouflage patterning and very long fangs.",
  },
  {
    commonName: "Inland Taipan",
    scientificName: "Oxyuranus microlepidotus",
    subtype: "reptile",
    habitat: "desert",
    hasWings: "no",
    tailType: "long",
    legCount: "0",
    size: "medium",
    color: "brown",
    region: "australia",
    description:
      "A highly venomous desert snake from inland Australia that is rarely seen by most hikers.",
  },
  {
    commonName: "Gila Monster",
    scientificName: "Heloderma suspectum",
    subtype: "reptile",
    habitat: "desert",
    hasWings: "no",
    tailType: "short",
    legCount: "4",
    size: "medium",
    color: "black",
    region: "north-america",
    description:
      "A heavy lizard with bead-like scales, orange-black patterning, and a venomous bite.",
  },
  {
    commonName: "Box Jellyfish",
    scientificName: "Chironex fleckeri",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "none",
    legCount: "many",
    size: "medium",
    color: "white",
    region: "australia",
    description:
      "A nearly transparent marine animal known for tentacles with medically serious venom.",
  },
  {
    commonName: "Stonefish",
    scientificName: "Synanceia verrucosa",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "fin-like",
    legCount: "0",
    size: "medium",
    color: "brown",
    region: "asia",
    description:
      "A camouflaged reef fish with venomous dorsal spines and a rock-like appearance.",
  },
  {
    commonName: "Blue-Ringed Octopus",
    scientificName: "Hapalochlaena",
    subtype: "fish",
    habitat: "coastal",
    hasWings: "no",
    tailType: "none",
    legCount: "many",
    size: "small",
    color: "blue",
    region: "australia",
    description:
      "A small octopus famous for flashing blue rings when disturbed and carrying powerful toxin.",
  },
  {
    commonName: "Brazilian Wandering Spider",
    scientificName: "Phoneutria nigriventer",
    subtype: "insect",
    habitat: "forest",
    hasWings: "no",
    tailType: "none",
    legCount: "8",
    size: "small",
    color: "brown",
    region: "south-america",
    description:
      "A roaming spider from South America known for defensive posture and medically significant venom.",
  },
  {
    commonName: "Deathstalker Scorpion",
    scientificName: "Leiurus quinquestriatus",
    subtype: "insect",
    habitat: "desert",
    hasWings: "no",
    tailType: "long",
    legCount: "8",
    size: "small",
    color: "yellow",
    region: "africa",
    description:
      "A desert scorpion known for a raised tail, fast strike, and potent venom.",
  },
  {
    commonName: "Cane Toad",
    scientificName: "Rhinella marina",
    subtype: "amphibian",
    habitat: "wetland",
    hasWings: "no",
    tailType: "none",
    legCount: "4",
    size: "medium",
    color: "brown",
    region: "australia",
    description:
      "A large toad with toxic glands, often discussed because of its ecological impact in Australia.",
  },
  {
    commonName: "European Adder",
    scientificName: "Vipera berus",
    subtype: "reptile",
    habitat: "field",
    hasWings: "no",
    tailType: "short",
    legCount: "0",
    size: "small",
    color: "brown",
    region: "europe",
    description:
      "A small European viper with a zigzag pattern and medically important venom.",
  },
  {
    commonName: "Copperhead",
    scientificName: "Agkistrodon contortrix",
    subtype: "reptile",
    habitat: "forest",
    hasWings: "no",
    tailType: "short",
    legCount: "0",
    size: "medium",
    color: "brown",
    region: "north-america",
    description:
      "A North American pit viper with coppery tones and leaf-litter camouflage.",
  },
];

const allSpecies = [...rawSpecies, ...extraSpecies];

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

function buildSpeciesList() {
  return allSpecies.map((species) => {
    const toxicOrVenomous = toxicSpecies.has(species.commonName) ? "yes" : "no";

    return {
      category: "animal",
      imageUrl: buildImageUrl(species),
      toxicOrVenomous,
      overview: buildOverview(species),
      appearance: buildAppearance(species),
      habitatDetails: buildHabitatDetails(species),
      regionDetails: buildRegionDetails(species),
      behavior: buildBehavior(species),
      identificationTips: buildIdentificationTips(species),
      riskToHumans: buildRiskToHumans(species, toxicOrVenomous),
      benefitsToHumans: buildBenefitsToHumans(species),
      ...species,
    };
  });
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

  console.log("Seeding unique species...");
  const species = buildSpeciesList();
  await speciesCollection.insertMany(species);

  console.log("Creating indexes for faster search...");
  await speciesCollection.createIndex({ commonName: 1 });
  await speciesCollection.createIndex({ scientificName: 1 });
  await speciesCollection.createIndex({ category: 1 });
  await speciesCollection.createIndex({ subtype: 1 });
  await speciesCollection.createIndex({ habitat: 1 });
  await speciesCollection.createIndex({ hasWings: 1 });
  await speciesCollection.createIndex({ tailType: 1 });
  await speciesCollection.createIndex({ legCount: 1 });
  await speciesCollection.createIndex({ size: 1 });
  await speciesCollection.createIndex({ color: 1 });
  await speciesCollection.createIndex({ region: 1 });
  await speciesCollection.createIndex({ toxicOrVenomous: 1 });

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

  await usersCollection.insertMany(userDocs);

  console.log("Loading inserted species...");
  const insertedSpecies = await speciesCollection.find({}).toArray();

  console.log("Seeding synthetic archive sightings...");
  const syntheticUsers = Array.from({ length: 10 }, (_, index) => ({
    userId: `synthetic-user-${index + 1}`,
    username: `archive_observer_${index + 1}`,
  }));

  const sightings = Array.from({ length: 1000 }, (_, index) => {
    const syntheticUser = randomItem(syntheticUsers);
    const sp = randomItem(insertedSpecies);

    return {
      userId: syntheticUser.userId,
      username: syntheticUser.username,
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
      overview: sp.overview,
      appearance: sp.appearance,
      habitatDetails: sp.habitatDetails,
      regionDetails: sp.regionDetails,
      behavior: sp.behavior,
      identificationTips: sp.identificationTips,
      riskToHumans: sp.riskToHumans,
      benefitsToHumans: sp.benefitsToHumans,
      toxicOrVenomous: sp.toxicOrVenomous,
      note: randomItem(notePool),
      status: index % 5 === 0 ? "mystery" : "saved",
      savedAt: new Date(),
    };
  });

  await sightingsCollection.insertMany(sightings);

  console.log(
    `Seed complete: ${species.length} unique species and ${sightings.length} synthetic archive sightings.`
  );
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});