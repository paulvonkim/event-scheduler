function Home({ id, events, loading }) {
  return (
    <div className="home p-6">
      {loading ? (
        <div className="text-center text-gray-500">Loading events...</div>
      ) : (
        <div className="events-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events
              .filter((event) => event.organizerId === id)
              .map((event) => (
                <div
                  key={event.id}
                  className="event-card bg-white shadow-md rounded-lg p-4 border border-gray-200"
                >
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {event.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Date:</span> {event.date}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Location:</span>{" "}
                    {event.location}
                  </p>
                  <div className="mt-4">
                    <a
                      href={`/event/${event.id}`}
                      className="inline-block bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-600"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No events found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
