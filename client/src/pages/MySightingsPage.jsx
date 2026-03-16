import { useEffect, useState } from "react";
import SightingList from "../components/SightingList/SightingList";
import { getSightings, deleteSighting } from "../services/sightingsService";

function MySightingsPage({ currentUser }) {
  const [sightings, setSightings] = useState([]);

  async function load() {
    if (!currentUser) {
      setSightings([]);
      return;
    }

    const data = await getSightings(currentUser.userId);
    setSightings(data);
  }

  useEffect(() => {
    load();
  }, [currentUser]);

  async function handleDelete(id) {
    await deleteSighting(id);
    load();
  }

  if (!currentUser) {
    return (
      <section className="empty-state">
        <h2>My Sightings</h2>
        <p>Please log in to view and manage your saved sightings.</p>
      </section>
    );
  }

  return (
    <SightingList
      sightings={sightings}
      onDelete={handleDelete}
      onRefresh={load}
    />
  );
}

export default MySightingsPage;