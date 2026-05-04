function NewsCard({ article, onSaveArticle }) {
  return (
    <article className="card">
      <img className="card__image" src={article.image} alt={article.title} />
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
        <h3 className="card__title">{article.title}</h3>
        <p className="card__text">{article.description}</p>
        <p className="card__source">{article.source}</p>
      </div>
    </article>
  )
}

export default NewsCard