function AuthModal({ mode, onClose, onSwitchMode, onAuthenticate }) {
  if (!mode) {
    return null
  }

  const isSignup = mode === 'signup'

  function handleSubmit(event) {
    event.preventDefault()
    onAuthenticate()
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <div className="modal__header">
          <h2 id="auth-modal-title">{isSignup ? 'Sign up' : 'Sign in'}</h2>
          <button type="button" className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="modal__form" onSubmit={handleSubmit}>
          {isSignup ? (
            <div className="modal__field">
              <label htmlFor="signup-name">Username</label>
              <input id="signup-name" name="name" placeholder="Enter username" />
            </div>
          ) : null}

          <div className="modal__field">
            <label htmlFor="auth-email">Email</label>
            <input id="auth-email" name="email" type="email" placeholder="Enter email" />
          </div>

          <div className="modal__field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              name="password"
              type="password"
              placeholder="Enter password"
            />
          </div>

          {isSignup ? (
            <div className="modal__field">
              <label htmlFor="signup-avatar">Portfolio or LinkedIn</label>
              <input
                id="signup-avatar"
                name="portfolio"
                placeholder="Paste a profile link"
              />
            </div>
          ) : null}

          <button type="submit" className="modal__submit">
            {isSignup ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="modal__footer">
          {isSignup ? 'or ' : 'or '}
          <button
            type="button"
            className="modal__switch"
            onClick={() => onSwitchMode(isSignup ? 'signin' : 'signup')}
          >
            {isSignup ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthModal