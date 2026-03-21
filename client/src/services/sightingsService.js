export async function getSightings() {
  const res = await fetch("/api/sightings", {
    credentials: "include",
  });

  if (!res.ok) {
    const result = await res.json().catch(() => ({}));
    throw new Error(result.message || "Failed to fetch sightings");
  }

  return res.json();
}

export async function createSighting(data) {
  const res = await fetch("/api/sightings", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update sighting");
  }

  return result;
}

export async function deleteSighting(id) {
  const res = await fetch(`/api/sightings/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to delete sighting");
  }

  return result;
}