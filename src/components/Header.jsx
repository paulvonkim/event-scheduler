const Header = ({ setAuthenticated, setmenuVisible, menuVisible }) => {
  const handleSignOut = () => {
    setAuthenticated(false);
    setmenuVisible(false);
    localStorage.setItem("authenticated", JSON.stringify(false));
    localStorage.removeItem("name");
    localStorage.removeItem("token");
  };

  return (
    <header>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="link link-hover text-3xl font-semibold pl-3" href="/">
            Event Scheduler
          </a>
        </div>

        <nav className="flex-none">
          {menuVisible && (
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>+ New Event</a>
              </li>
              <li>
                <a href="#">Hi, {JSON.parse(localStorage.getItem("name"))}</a>
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
