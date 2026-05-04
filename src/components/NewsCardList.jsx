import { useState } from 'react'
import NewsCard from './NewsCard'

function NewsCardList({ articles, isLoading, fetchError, onSaveArticle, title, description, emptyCopy }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const visibleArticles = isExpanded ? articles : articles.slice(0, 3)
  const canShowMore = !isExpanded && articles.length > 3

  return (
    <section className="cards page-shell" aria-labelledby="cards-heading">
      <div className="cards__header">
        <div>
          <h2 id="cards-heading" className="cards__title">
            {title}
          </h2>
          <p className="cards__description">{description}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="empty-state">
          <div className="empty-state__icon">…</div>
          <p className="empty-state__eyebrow">Loading</p>
          <h3>Searching the latest headlines</h3>
          <p>Fetching a fresh set of stories for the current keyword.</p>
        </div>
      ) : null}

      {!isLoading && fetchError ? (
        <div className="empty-state">
          <div className="empty-state__icon">!</div>
          <p className="empty-state__eyebrow">Something went wrong</p>
          <h3>Could not load results</h3>
          <p>{fetchError}</p>
        </div>
      ) : null}

      {!isLoading && !fetchError && !articles.length ? (
        <div className="empty-state">
          <div className="empty-state__icon">⌕</div>
          <p className="empty-state__eyebrow">No results</p>
          <h3>Nothing matched this search yet</h3>
          <p>{emptyCopy}</p>
        </div>
      ) : null}

      {!isLoading && !fetchError && articles.length ? (
        <>
          <div className="cards__grid">
            {visibleArticles.map((article) => (
              <NewsCard key={article.id} article={article} onSaveArticle={onSaveArticle} />
            ))}
          </div>
          {canShowMore ? (
            <button type="button" className="cards__button" onClick={() => setIsExpanded(true)}>
              Show more
            </button>
          ) : null}
        </>
      ) : null}
    </section>
  )
}

export default NewsCardList