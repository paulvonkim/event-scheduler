function Home({ id, events, loading }) {
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
