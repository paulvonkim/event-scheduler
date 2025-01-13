import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { useLocation } from "react-router-dom";

function Home({ id, token }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUserEvents = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setEvents(data.results);
        setLoading(false);
      } else {
        console.error("Failed to fetch events.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user events:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserEvents();
  }, [token, location.key]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      {loading ? (
        <div className="text-center">Loading events...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.length > 0 ? (
            events
              .filter((event) => event.organizerId === id)
              .map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <p>No events found.</p>
          )}
        </div>
      )}
    </div>
  );
}
export default Home;
