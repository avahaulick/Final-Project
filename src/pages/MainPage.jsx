import Header from '../components/Header'
import NewsCardList from '../components/NewsCardList'
import SearchForm from '../components/SearchForm'

function MainPage({
  articles,
  isLoading,
  isLoggedIn,
  onLoginClick,
  onLogout,
  onSaveArticle,
  query,
  submittedQuery,
  onQueryChange,
  onSearchSubmit,
}) {
  return (
    <div className="page page-main">
      <Header isLoggedIn={isLoggedIn} onLoginClick={onLoginClick} onLogout={onLogout} userName="Marquis" />

      <section className="hero">
        <div className="page-shell hero__inner">
          <h1 className="hero__title">What&apos;s going on in the world?</h1>
          <p className="hero__text">
            Find the latest news on any topic and save the articles you want to revisit.
          </p>
          <SearchForm onSearchSubmit={onSearchSubmit} onQueryChange={onQueryChange} query={query} />
        </div>
      </section>

      <NewsCardList
        articles={articles}
        isLoading={isLoading}
        onSaveArticle={onSaveArticle}
        title="Search results"
        description={
          submittedQuery.trim()
            ? `Showing articles for “${submittedQuery.trim()}”.`
            : 'Use the search bar to filter the current article feed.'
        }
        emptyCopy="Try a broader keyword like climate, design, or news."
      />
    </div>
  )
}

export default MainPage