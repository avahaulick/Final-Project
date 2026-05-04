const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=60'

function NewsCard({ article, onSaveArticle }) {
  return (
    <article className="card">
      <a href={article.url} target="_blank" rel="noreferrer" tabIndex="-1">
        <img
          className="card__image"
          src={article.image ?? FALLBACK_IMAGE}
          alt={article.title}
          onError={(event) => { event.currentTarget.src = FALLBACK_IMAGE }}
        />
      </a>
      <span className="card__keyword">{article.keyword}</span>
      <button
        type="button"
        className={`card__save${article.saved ? ' saved' : ''}`}
        onClick={() => onSaveArticle(article.id)}
        aria-label={article.saved ? 'Remove saved article' : 'Save article'}
      >
        {article.saved ? '★' : '☆'}
      </button>

      <div className="card__content">
        <p className="card__date">{article.date}</p>
        <h3 className="card__title">
          <a href={article.url} target="_blank" rel="noreferrer">{article.title}</a>
        </h3>
        <p className="card__text">{article.description}</p>
        <p className="card__source">{article.source}</p>
      </div>
    </article>
  )
}

export default NewsCard