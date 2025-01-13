import { NavLink } from "react-router-dom";

const Header = ({ setAuthenticated, setmenuVisible, menuVisible, name }) => {
  const handleSignOut = () => {
    setAuthenticated(false);
    setmenuVisible(false);
    localStorage.removeItem("token");
  };
  const handleCreateEvent = () => {
    window.location.href = "/create-event";
  };
  const handleUserProfile = () => {
    console.log("handleUserProfile clicked");
    window.location.href = "/profile";
  };

  return (
    <header>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <img className="w-8" src="../../favicon.png" alt="logo" />
          <a className="link link-hover text-3xl font-semibold pl-3" href="/">
            Event Scheduler
          </a>
        </div>

        <nav className="flex-none">
          {menuVisible && (
            <ul className="menu menu-horizontal px-1">
              <li className="mr-1">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Home
                </NavLink>
              </li>
              <li className="mr-1">
                <NavLink
                  onClick={handleCreateEvent}
                  to="/create-event"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  + Create Event
                </NavLink>
              </li>
              <li className="mr-1">
                <NavLink
                  onClick={handleUserProfile}
                  to="/profile"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Hi, {name}
                </NavLink>
              </li>
              <li>
                <a onClick={handleSignOut}>Sign Out</a>
              </li>
            </ul>
          )}

          {!menuVisible && (
            <ul className="menu menu-horizontal px-1">
              <li className="mr-1">
                <NavLink
                  to="/signin"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
