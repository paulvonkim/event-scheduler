import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEvents(data.events || []);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch events");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="border border-gray-300 rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-2">{event.description}</p>
            <p className="text-gray-500 text-sm">
              {new Date(event.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      {events.length === 0 && !error && (
        <p className="text-gray-600">No events available at the moment.</p>
      )}
    </div>
  );
};

export default Home;
