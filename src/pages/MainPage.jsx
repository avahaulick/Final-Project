import AboutSection from '../components/AboutSection'
import Header from '../components/Header'
import NewsCardList from '../components/NewsCardList'
import SearchForm from '../components/SearchForm'

function MainPage({
  articles,
  isLoading,
  fetchError,
  isLoggedIn,
  userName,
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
      <Header isLoggedIn={isLoggedIn} onLoginClick={onLoginClick} onLogout={onLogout} userName={userName} />

      <section className="hero">
        <div className="hero__inner">
          <h1 className="hero__title">What&apos;s going on in the world?</h1>
          <p className="hero__subtitle">
            Find the latest news on any topic and save the articles you want to revisit.
          </p>
          <SearchForm onSearchSubmit={onSearchSubmit} onQueryChange={onQueryChange} query={query} />
        </div>
      </section>

      <AboutSection />

      <NewsCardList
        key={submittedQuery}
        articles={articles}
        isLoading={isLoading}
        fetchError={fetchError}
        onSaveArticle={onSaveArticle}
        isLoggedIn={isLoggedIn}
        title="Search results"
        description={
          submittedQuery.trim()
            ? `Found ${articles.length} result${articles.length !== 1 ? 's' : ''} for "${submittedQuery.trim()}"`
            : null
        }
        emptyCopy="Sorry, but nothing matched your search terms, please try again with some different keywords."
      />
    </div>
  )
}

export default MainPage