# Project Overview

- React as the frontend framework.
- TailwindCSS for styling.
  Optionally, DaisyUI for additional styling components.
- React Router DOM for routing.
- State and Effects: Manage state and use effects appropriately.
- LocalStorage: Store and retrieve the API key.

# Features

- Home Page:
Display a list of events as cards.
Clicking on a card should take you to the event details page.
- Event Details Page:
Render the details of a particular event based on the ID in the URL.

- Sign Up Page:
Render a form for signing up.
On submission, send a POST request to the register endpoint.
If everything goes alright, redirect the user to the sign in page! 😀
- Sign In Page:
Similar to the Sign Up page but for existing users.

- Create Event Page:
Nested under a route with a protected layout.
Display a form to create an event.
Cannot be visited if the user is not logged in.
Cannot create an event without the API token.
