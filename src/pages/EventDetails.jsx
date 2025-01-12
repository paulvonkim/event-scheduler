import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EventDetails({ token }) {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  const fetchEventDetails = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/events/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setEvent(data.event); // Assuming API returns { event: {...} }
      } else {
        console.error("Failed to fetch event details");
      }
    } catch (error) {
      console.error("Error during GET event details request:", error);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-600">{event.date}</p>
      <p className="text-gray-800 mt-4">{event.description}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Location:</h2>
        <p>{event.location}</p>
        <p>{event.latitude}</p>
        <p>{event.longitude}</p>
      </div>
    </div>
  );
}

export default EventDetails;
