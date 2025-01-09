const Header = () => {
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
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>+ New Event</a>
            </li>
            <li>
              <details>
                <summary>User's Profile</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a>Edit</a>
                  </li>
                  <li>
                    <a>Sign Out</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
