async function handleResponse(res, defaultMessage) {
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || defaultMessage);
  }

  return result;
}

export async function registerUser(data) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res, "Register failed");
}

export async function loginUser(data) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res, "Login failed");
}

export async function getCurrentUser() {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (res.status === 401) {
    return null;
  }

  return handleResponse(res, "Failed to load current user");
}

export async function logoutUser() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  return handleResponse(res, "Logout failed");
}