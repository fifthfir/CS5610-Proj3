export async function searchMatches(data) {
  const res = await fetch("/api/matching", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  console.log("Matching status:", res.status);

  if (!res.ok) {
    throw new Error("Failed to fetch matches");
  }

  return res.json();
}
