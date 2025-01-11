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
// import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const [menuVisible, setmenuVisible] = useState(false);

  useEffect(() => {
    const storedAuthenticated = JSON.parse(
      localStorage.getItem("authenticated")
    );
    if (storedAuthenticated) {
      setAuthenticated(true);
      setmenuVisible(true);
    } else {
      setAuthenticated(false);
      setmenuVisible(false);
    }
  });

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header
          setAuthenticated={setAuthenticated}
          setmenuVisible={setmenuVisible}
          menuVisible={menuVisible}
        />
        <main className="flex-grow flex items-center justify-center bg-base-200">
          <Routes>
            <Route
              path="/"
              element={authenticated ? <Home /> : <Navigate to="/signin" />}
            />
            <Route
              path="/signin"
              element={<SignIn setAuthenticated={setAuthenticated} />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/create-event"
              element={
                authenticated ? <CreateEvent /> : <Navigate to="/signin" />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
