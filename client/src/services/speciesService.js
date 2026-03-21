function buildQueryString(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "Any") {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = "Request failed.";

    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch {
      // ignore JSON parse failure
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

export async function fetchSpecies(filters = {}) {
  const queryString = buildQueryString(filters);
  const response = await fetch(`/api/species${queryString}`, {
    credentials: "include",
  });
  return handleResponse(response);
}

export async function fetchSpeciesById(id) {
  const response = await fetch(`/api/species/${id}`, {
    credentials: "include",
  });
  return handleResponse(response);
}

export async function createSpecies(speciesData) {
  const response = await fetch("/api/species", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(speciesData),
  });

  return handleResponse(response);
}

export async function updateSpecies(id, speciesData) {
  const response = await fetch(`/api/species/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(speciesData),
  });

  return handleResponse(response);
}

export async function deleteSpecies(id) {
  const response = await fetch(`/api/species/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return handleResponse(response);
}