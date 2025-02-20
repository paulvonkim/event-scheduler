import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateEvent from "./pages/CreateEvent";
import Home from "./pages/Home";
import UpdateUserProfile from "./pages/UpdateUserProfile";
import EventDetails from "./components/EventDetails";

function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const [menuVisible, setmenuVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || ""
  );

  const fetchUserData = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setId(data.id);
        setName(data.name === null ? data.email : data.name);
      }
    } catch (error) {
      console.error("Error during GET user profile request:", error);
    }
  };

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("token"));
    if (storedToken) {
      setAuthenticated(true);
      setmenuVisible(true);
      fetchUserData();
    } else {
      setAuthenticated(false);
      setmenuVisible(false);
    }
  }, [token]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header
          setAuthenticated={setAuthenticated}
          setmenuVisible={setmenuVisible}
          menuVisible={menuVisible}
          name={name}
        />
        <main className="flex-grow flex items-center justify-center bg-base-200">
          <Routes>
            <Route
              path="/"
              element={
                authenticated ? (
                  <Home id={id} token={token} />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route
              path="/signin"
              element={
                authenticated ? (
                  <Navigate to="/" />
                ) : (
                  <SignIn
                    setAuthenticated={setAuthenticated}
                    setToken={setToken}
                  />
                )
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/create-event"
              element={
                authenticated ? (
                  <CreateEvent token={token} />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route
              path="/profile"
              element={
                authenticated ? (
                  <UpdateUserProfile
                    id={id}
                    setName={setName}
                    name={name}
                    token={token}
                  />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route path="/event/:id" element={<EventDetails token={token} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
