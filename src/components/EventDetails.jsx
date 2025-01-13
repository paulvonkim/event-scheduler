import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EventDetails({ token }) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEventDetails();
  }, [id, token]);

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
        setEvent(data);
        setEditedEvent(data);
      } else {
        console.error("Failed to fetch event details.");
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditedEvent(event);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedEvent),
      });
      if (res.ok) {
        setEvent(editedEvent);
        setIsEditModalOpen(false);
        fetchEventDetails(); // Refresh the event details
      } else {
        console.error("Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const res = await fetch(`http://localhost:3001/api/events/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          navigate("/");
        } else {
          console.error("Failed to delete event.");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  if (loading) return <div>Loading event details...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="container mx-auto p-4 relative">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost absolute top-4 left-4"
      >
        Back to Events
      </button>
      <div className="mt-16">
        <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
        <p>
          <strong>Description:</strong> {event.description}
        </p>
        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleString()}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Latitude:</strong> {event.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {event.longitude}
        </p>
        <div className="mt-4 space-x-4">
          <button onClick={handleEdit} className="btn btn-primary">
            Edit Event
          </button>
          <button onClick={handleDelete} className="btn btn-error">
            Delete Event
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Event</h2>
            <input
              type="text"
              name="title"
              value={editedEvent.title}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <textarea
              name="description"
              value={editedEvent.description}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full mb-2"
            />
            <input
              type="datetime-local"
              name="date"
              value={editedEvent.date.slice(0, 16)}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              name="location"
              value={editedEvent.location}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="number"
              name="latitude"
              value={editedEvent.latitude}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="number"
              name="longitude"
              value={editedEvent.longitude}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={handleCloseModal} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetails;
