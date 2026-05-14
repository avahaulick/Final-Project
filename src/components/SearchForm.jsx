import { useState } from 'react'

function SearchForm({ onSearchSubmit, onQueryChange, query }) {
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!query.trim()) {
      setError('Please enter a keyword')
      return
    }
    setError('')
    onSearchSubmit(query.trim())
  }

  function handleChange(event) {
    onQueryChange(event.target.value)
    if (error) setError('')
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <input
        className="search-form__input"
        value={query}
        onChange={handleChange}
        placeholder="Enter topic"
        aria-label="Search topic"
      />
      {error ? <span className="search-form__error">{error}</span> : null}
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  )
}

export default SearchForm