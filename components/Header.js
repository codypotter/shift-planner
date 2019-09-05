const Header = () => (
  <div>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">
          <img src="/static/shift-icon.svg" alt="shift icon" height="50"/>
          <div className="navbar-item">
            <h2 className="has-text-white is-size-3">shyfty</h2>
          </div>
        </a>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a href="http://codypotter.com" className="button is-danger">
              <strong>made by Cody Potter</strong>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
);

export default Header;