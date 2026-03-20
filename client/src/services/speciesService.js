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
      errorMessage = errorData.error || errorMessage;
    } catch {
      // ignore JSON parse failure
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

function buildAdminHeaders(currentUser) {
  return {
    "Content-Type": "application/json",
    "x-username": currentUser?.username || ""
  };
}

export async function fetchSpecies(filters = {}) {
  const queryString = buildQueryString(filters);
  const response = await fetch(`/api/species${queryString}`);
  return handleResponse(response);
}

export async function fetchSpeciesById(id) {
  const response = await fetch(`/api/species/${id}`);
  return handleResponse(response);
}

export async function createSpecies(currentUser, speciesData) {
  const response = await fetch("/api/species", {
    method: "POST",
    headers: buildAdminHeaders(currentUser),
    body: JSON.stringify(speciesData)
  });

  return handleResponse(response);
}

export async function updateSpecies(currentUser, id, speciesData) {
  const response = await fetch(`/api/species/${id}`, {
    method: "PUT",
    headers: buildAdminHeaders(currentUser),
    body: JSON.stringify(speciesData)
  });

  return handleResponse(response);
}

export async function deleteSpecies(currentUser, id) {
  const response = await fetch(`/api/species/${id}`, {
    method: "DELETE",
    headers: {
      "x-username": currentUser?.username || ""
    }
  });

  return handleResponse(response);
}
