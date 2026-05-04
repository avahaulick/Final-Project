import fallbackImage from '../assets/hero.png'

const FALLBACK_IMAGE = fallbackImage

function BookmarkIcon({ filled }) {
  return (
    <svg
      className="card__bookmark-icon"
      viewBox="0 0 24 24"
      fill={filled ? '#1A1B22' : 'none'}
      stroke="#1A1B22"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NewsCard({ article, onSaveArticle, isLoggedIn }) {
  return (
    <article className="card">
      <a
        className="card__image-link"
        href={article.url}
        target="_blank"
        rel="noreferrer"
        tabIndex="-1"
        aria-label={`Read: ${article.title}`}
      >
        <img
          className="card__image"
          src={article.image ?? FALLBACK_IMAGE}
          alt={article.title || 'News article image'}
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE }}
        />
      </a>

      <span className="card__keyword">{article.keyword}</span>

      <button
        type="button"
        className="card__bookmark"
        onClick={() => onSaveArticle(article.id)}
        aria-label={article.saved ? 'Remove from saved articles' : 'Save article'}
      >
        <BookmarkIcon filled={article.saved} />
        {!isLoggedIn && (
          <span className="card__bookmark-tooltip">Sign in to save articles</span>
        )}
      </button>

      <div className="card__content">
        <p className="card__date">{article.date}</p>
        <h3 className="card__title">
          <a href={article.url} target="_blank" rel="noreferrer">
            {article.title}
          </a>
        </h3>
        <p className="card__description">{article.description}</p>
        <p className="card__source">{article.source}</p>
      </div>
    </article>
  )
}

export default NewsCard