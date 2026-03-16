export async function getSightings(userId) {
  const res = await fetch(`/api/sightings?userId=${encodeURIComponent(userId)}`);

  if (!res.ok) {
    throw new Error("Failed to fetch sightings");
  }

  return res.json();
}

export async function createSighting(data) {
  const res = await fetch("/api/sightings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to save sighting");
  }

  return result;
}

export async function updateSighting(id, data) {
  const res = await fetch(`/api/sightings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update sighting");
  }

  return result;
}

export async function deleteSighting(id) {
  const res = await fetch(`/api/sightings/${id}`, {
    method: "DELETE"
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to delete sighting");
  }

  return result;
}