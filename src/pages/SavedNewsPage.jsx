import Header from '../components/Header'
import NewsCardList from '../components/NewsCardList'

function SavedNewsPage({ articles, isLoggedIn, onLoginClick, onLogout, onSaveArticle, userName }) {
  const keywords = [...new Set(articles.map((article) => article.keyword))]
  const keywordText = keywords.length
    ? `${keywords.slice(0, 2).join(', ')}${keywords.length > 2 ? `, and ${keywords.length - 2} other` : ''}`
    : 'your saved topics'

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        theme="dark"
        userName={userName}
      />

      <section className="saved-hero">
        <div className="page-shell">
          <p className="saved-hero__label">Saved articles</p>
          <h1 className="saved-hero__title">
            {userName}, you have {articles.length} saved article{articles.length === 1 ? '' : 's'}.
          </h1>
          <p className="saved-hero__keywords">
            By keywords: <strong>{keywordText}</strong>
          </p>
        </div>
      </section>

      <NewsCardList
        articles={articles}
        isLoading={false}
        fetchError={null}
        onSaveArticle={onSaveArticle}
        title="Saved articles"
        description={null}
        emptyCopy="You haven’t saved any articles yet. Search on the home page and click the bookmark icon to save."
      />
    </div>
  )
}

export default SavedNewsPage