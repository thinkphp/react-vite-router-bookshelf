import { NavLink, Outlet } from "react-router-dom";

export default function Layout({ favoriteCount }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink className="brand" to="/" end aria-label="Raftul, pagina principală">
            <span className="brand__icon" aria-hidden="true">
              r.
            </span>
            <span>raftul</span>
          </NavLink>
          <nav className="main-nav" aria-label="Navigare principală">
            <NavLink to="/carti" className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}>
              Cărți
            </NavLink>
            <NavLink to="/favorite" className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}>
              Favorite
              {favoriteCount > 0 && <span className="nav-count">{favoriteCount}</span>}
            </NavLink>
            <NavLink to="/despre" className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}>
              Despre
            </NavLink>
          </nav>
          <NavLink className="header-cta" to="/carti">
            Explorează <span aria-hidden="true">↗</span>
          </NavLink>
        </div>
      </header>
      <Outlet />
      <footer className="site-footer">
        <NavLink className="brand brand--footer" to="/">
          <span className="brand__icon" aria-hidden="true">
            r.
          </span>
          <span>raftul</span>
        </NavLink>
        <p>Un loc bun pentru următoarea ta poveste.</p>
        <span className="site-footer__note">Făcut pentru iubitorii de cărți · 2026</span>
      </footer>
    </div>
  );
}
