import { useState } from 'react'
import NewsCard from './NewsCard'
import Preloader from './Preloader'

function NewsCardList({ articles, isLoading, fetchError, onSaveArticle, title, description, emptyCopy }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const visibleArticles = isExpanded ? articles : articles.slice(0, 3)
  const canShowMore = !isExpanded && articles.length > 3

  return (
    <section className="cards" aria-labelledby="cards-heading">
      <div className="cards__header">
        <h2 id="cards-heading" className="cards__title">{title}</h2>
        {description ? <p className="cards__subtitle">{description}</p> : null}
      </div>

      {isLoading ? <Preloader /> : null}

      {!isLoading && fetchError ? (
        <div className="state-placeholder">
          <p className="state-placeholder__icon">⚠️</p>
          <p className="state-placeholder__title">Something went wrong</p>
          <p className="state-placeholder__text">{fetchError}</p>
        </div>
      ) : null}

      {!isLoading && !fetchError && !articles.length ? (
        <div className="state-placeholder">
          <p className="state-placeholder__icon">🗞️</p>
          <p className="state-placeholder__title">Nothing found</p>
          <p className="state-placeholder__text">{emptyCopy}</p>
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
            <button type="button" className="cards__more" onClick={() => setIsExpanded(true)}>
              Show more
            </button>
          ) : null}
        </>
      ) : null}
    </section>
  )
}

export default NewsCardList