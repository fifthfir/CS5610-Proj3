const toxicOrVenomousKeywords = [
    "king cobra",
    "rattlesnake",
    "black widow",
    "poison dart frog",
    "paper wasp",
    "jellyfish",
    "platypus",
    "komodo dragon",
];

export function inferToxicOrVenomous(species = {}) {
    if (
        species.toxicOrVenomous === "yes" ||
        species.toxicOrVenomous === "no"
    ) {
        return species.toxicOrVenomous;
    }

    const combinedName = `${species.commonName || ""} ${species.scientificName || ""}`
        .toLowerCase()
        .trim();

    return toxicOrVenomousKeywords.some((keyword) =>
        combinedName.includes(keyword)
    )
        ? "yes"
        : "no";
}

export function withDerivedSpeciesFields(species = {}) {
    return {
        ...species,
        toxicOrVenomous: inferToxicOrVenomous(species),
    };
}