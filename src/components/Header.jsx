import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [menuVisible, setmenuVisible] = useState(false);

  const navigate = useNavigate();

  // Initialize the state from localStorage if available
  useEffect(() => {
    const storedAuthenticated = JSON.parse(
      localStorage.getItem("authenticated")
    );
    if (storedAuthenticated) {
      setAuthenticated(true);
      setmenuVisible(true);
    }
  });

  return (
    <header>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="link link-hover text-3xl font-semibold pl-3" href="/">
            Event Scheduler
          </a>
        </div>

        <nav className="flex-none">
          {/* Should be visible only for signed in user */}
          {menuVisible && (
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>+ New Event</a>
              </li>
              <li>
                {/* should set auth to false and logout and redirect to signin  */}
                <a href="#">Sign Out</a>
              </li>
            </ul>
          )}

          {!menuVisible && (
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/signup">Sign Up</a>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
