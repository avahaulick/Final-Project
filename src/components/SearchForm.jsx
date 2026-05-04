function SearchForm({ onSearchSubmit, onQueryChange, query }) {
  return (
    <form className="search-form" onSubmit={onSearchSubmit}>
      <input
        className="search-form__input"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Enter topic"
        aria-label="News topic"
      />
      <button type="submit" className="search-form__button" disabled={!query.trim()}>
        Search
      </button>
    </form>
  )
}

export default SearchForm