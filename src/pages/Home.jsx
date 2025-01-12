import { useState, useEffect } from "react";

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
  }, []);

  return (
    <div className="home">
      {loading ? (
        <div>Loading events...</div>
      ) : (
        <div className="events-list">
          {events.length > 0 ? (
            events
              .filter((event) => event.organizerId === id)
              .map((event) => (
                <div key={event.id} className="event-card">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p>{event.date}</p>
                  <p>{event.location}</p>
                  <p>{event.latitude}</p>
                  <p>{event.longitude}</p>
                  <a href={`/event/${event.id}`}>View Details</a>
                </div>
              ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      )}
    </div>
  );
}
export default Home;
