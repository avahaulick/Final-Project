import { useEffect, useState } from 'react'

function AuthModal({ mode, onClose, onSwitchMode, onAuthenticate }) {
  const [signupDone, setSignupDone] = useState(false)

  useEffect(() => {
    if (!mode) return
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setSignupDone(false)
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mode, onClose])

  if (!mode) return null

  const isSignup = mode === 'signup'

  function handleSubmit(event) {
    event.preventDefault()
    if (isSignup) {
      setSignupDone(true)
    } else {
      onAuthenticate()
    }
  }

  function handleSignInFromSuccess() {
    setSignupDone(false)
    onSwitchMode('signin')
  }

  function handleClose() {
    setSignupDone(false)
    onClose()
  }

  if (signupDone) {
    return (
      <div className="modal-backdrop" onClick={handleClose} role="presentation">
        <div
          className="modal modal--success"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          <p className="modal__success-icon">✔️</p>
          <h2 className="modal__success-title" id="auth-modal-title">
            Registration successfully completed!
          </h2>
          <button type="button" className="modal__success-signin" onClick={handleSignInFromSuccess}>
            Sign in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-backdrop" onClick={handleClose} role="presentation">
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <div className="modal__header">
          <h2 className="modal__title" id="auth-modal-title">
            {isSignup ? 'Sign up' : 'Sign in'}
          </h2>
          <button type="button" className="modal__close" onClick={handleClose} aria-label="Close">
            ×
          </button>
        </div>

        <form className="modal__form" onSubmit={handleSubmit}>
          {isSignup ? (
            <div className="modal__field">
              <label className="modal__label" htmlFor="signup-name">Username</label>
              <input
                className="modal__input"
                id="signup-name"
                name="name"
                placeholder="Enter username"
                autoComplete="username"
                required
              />
            </div>
          ) : null}

          <div className="modal__field">
            <label className="modal__label" htmlFor="auth-email">Email</label>
            <input
              className="modal__input"
              id="auth-email"
              name="email"
              type="email"
              placeholder="Enter email"
              autoComplete="email"
              required
            />
          </div>

          <div className="modal__field">
            <label className="modal__label" htmlFor="auth-password">Password</label>
            <input
              className="modal__input"
              id="auth-password"
              name="password"
              type="password"
              placeholder="Enter password"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              required
            />
          </div>

          <button type="submit" className="modal__submit">
            {isSignup ? 'Sign up' : 'Sign in'}
          </button>
        </form>

        <p className="modal__footer">
          or{' '}
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