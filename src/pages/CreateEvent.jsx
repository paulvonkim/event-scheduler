import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [organizerId, setOrganizerId] = useState(""); // New state for organizerId
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiToken = localStorage.getItem("apiToken");

    // Prepare event details according to the API schema
    const eventDetails = {
      title,
      description,
      date,
      location,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      organizerId: parseInt(organizerId), // Ensure organizerId is an integer
    };

    try {
      const response = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify(eventDetails),
      });

      if (response.ok) {
        navigate("/"); // Redirect to home if successful
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create event");
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
          />
        </div>

        <div>
          <label htmlFor="date" className="block font-medium mb-1">
            Date
          </label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label htmlFor="latitude" className="block font-medium mb-1">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label htmlFor="longitude" className="block font-medium mb-1">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        {/* New field for organizerId */}
        <div>
          <label htmlFor="organizerId" className="block font-medium mb-1">
            Organizer ID
          </label>
          <input
            type="number"
            id="organizerId"
            value={organizerId}
            onChange={(e) => setOrganizerId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
            required // Assuming this is required based on your schema
          />
        </div>

        {/* Button Container */}
        <div className="flex space-x-4">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 focus:ring focus:ring-gray-300"
          >
            Cancel
          </button>

          {/* Create Event Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-200"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
