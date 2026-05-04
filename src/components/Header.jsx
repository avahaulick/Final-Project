import { NavLink } from 'react-router-dom'

function Header({ isLoggedIn, onLoginClick, onLogout, theme = 'light', userName }) {
  const toneClass = theme === 'dark' ? 'dark' : 'light'

  return (
    <header className={`topbar ${theme === 'dark' ? 'saved' : ''}`}>
      <div className="page-shell topbar__content">
        <NavLink to="/" className={`brand ${toneClass}`}>
          NewsExplorer
        </NavLink>

        <nav className="topbar__nav" aria-label="Primary navigation">
          <NavLink to="/" end className={({ isActive }) => `topbar__link ${toneClass}${isActive ? ' active' : ''}`}>
            Home
          </NavLink>
          <NavLink
            to="/saved-news"
            className={({ isActive }) => `topbar__link ${toneClass}${isActive ? ' active' : ''}`}
          >
            Saved articles
          </NavLink>
          {isLoggedIn ? (
            <button type="button" className={`topbar__button ${toneClass}`} onClick={onLogout}>
              {userName || 'Profile'}
            </button>
          ) : (
            <button type="button" className={`topbar__button ${toneClass}`} onClick={onLoginClick}>
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header