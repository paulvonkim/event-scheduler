const Header = ({ setAuthenticated, setmenuVisible, menuVisible }) => {
  const handleSignOut = () => {
    setAuthenticated(false);
    setmenuVisible(false);
    localStorage.setItem("authenticated", JSON.stringify(false));
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
          {/* Should be visible only for signed in user */}
          {menuVisible && (
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>+ New Event</a>
              </li>
              <li>
                <a href="#">Hi, username</a>
              </li>
              <li>
                {/* should set auth to false and logout and redirect to signin  */}
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
