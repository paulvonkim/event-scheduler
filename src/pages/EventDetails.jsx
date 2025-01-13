import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EventDetails({ token }) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  const fetchEventDetails = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/events/${id}`, {
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
  }, [id]);

  if (!event) {
    return <p>Loading...</p>;
  }

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="p-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleGoBack}
      >
        Back
      </button>
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
