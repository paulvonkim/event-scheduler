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
              <li>
                <a onClick={handleCreateEvent}>+ Create Event</a>
              </li>
              <li>
                <a onClick={handleUserProfile}>Hi, {name}</a>
              </li>
              <li>
                <a onClick={handleSignOut}>Sign Out</a>
              </li>
            </ul>
          )}

          {!menuVisible && (
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/signin">Sign In</a>
              </li>
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
