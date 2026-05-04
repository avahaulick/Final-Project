import Header from '../components/Header'
import NewsCardList from '../components/NewsCardList'

function SavedNewsPage({ articles, isLoggedIn, onLoginClick, onLogout, onSaveArticle, userName }) {
  const keywords = [...new Set(articles.map((article) => article.keyword))]
  const keywordText = keywords.length
    ? `${keywords.slice(0, 2).join(', ')}${keywords.length > 2 ? `, and ${keywords.length - 2} other` : ''}`
    : 'your saved topics'

  return (
    <div className="page page-saved">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        theme="dark"
        userName={userName}
      />

      <section className="saved-hero page-shell">
        <p className="saved-hero__label">Saved articles</p>
        <h1 className="saved-hero__title">
          {userName}, you have {articles.length} saved article{articles.length === 1 ? '' : 's'}.
        </h1>
        <p className="saved-hero__keywords">
          By keywords: <span>{keywordText}</span>
        </p>
      </section>

      <NewsCardList
        articles={articles}
        isLoading={false}
        onSaveArticle={onSaveArticle}
        title="Saved stories"
        description="Use this page as the base for the logged-in saved news layout from the Figma file."
        emptyCopy="Save an article from the homepage and it will appear here."
      />
    </div>
  )
}

export default SavedNewsPage