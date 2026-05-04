import { NavLink } from 'react-router-dom'

function Header({ isLoggedIn, onLoginClick, onLogout, theme = 'light', userName }) {
  const isLight = theme === 'dark'

  return (
    <header className={`topbar${isLight ? ' topbar--light' : ''}`}>
      <div className="page-shell topbar__content">
        <NavLink to="/" className={`brand${isLight ? ' brand--dark' : ''}`}>
          NewsExplorer
        </NavLink>

        <nav className="topbar__nav" aria-label="Primary navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `topbar__link${isLight ? ' topbar__link--dark' : ''}${isActive ? ' active' : ''}`
            }
          >
            Home
          </NavLink>

          {isLoggedIn ? (
            <NavLink
              to="/saved-news"
              className={({ isActive }) =>
                `topbar__link${isLight ? ' topbar__link--dark' : ''}${isActive ? ' active' : ''}`
              }
            >
              Saved articles
            </NavLink>
          ) : null}

          {isLoggedIn ? (
            <button
              type="button"
              className={`topbar__button${isLight ? ' topbar__button--dark' : ''}`}
              onClick={onLogout}
            >
              {userName || 'Profile'}
              <span className="topbar__logout-icon" aria-hidden="true">↗</span>
            </button>
          ) : (
            <button
              type="button"
              className={`topbar__button${isLight ? ' topbar__button--dark' : ''}`}
              onClick={onLoginClick}
            >
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header