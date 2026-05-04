const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL =
  import.meta.env.MODE === 'production'
    ? 'https://nomoreparties.co/news/v2/everything'
    : 'https://newsapi.org/v2/everything'

function getFromDate() {
  const d = new Date()
  d.setDate(d.getDate() - 7)
  return d.toISOString().slice(0, 10)
}

function getToDate() {
  return new Date().toISOString().slice(0, 10)
}

/**
 * Fetch news articles for a given keyword.
 * Returns an array of normalized article objects.
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function fetchArticles(query) {
  if (!query || !query.trim()) {
    return []
  }

  const params = new URLSearchParams({
    q: query.trim(),
    from: getFromDate(),
    to: getToDate(),
    pageSize: '100',
    apiKey: API_KEY,
  })

  const response = await fetch(`${BASE_URL}?${params}`)

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message ?? `NewsAPI error: ${response.status}`)
  }

  const data = await response.json()

  return (data.articles ?? [])
    .filter((article) => article.url !== '[Removed]' && article.title !== '[Removed]')
    .map((article, index) => ({
      id: `${query}-${index}-${article.publishedAt}`,
      title: article.title ?? '',
      description: article.description ?? '',
      date: article.publishedAt
        ? new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }).format(new Date(article.publishedAt))
        : '',
      source: article.source?.name ?? '',
      url: article.url ?? '',
      image: article.urlToImage ?? null,
      keyword: query.trim(),
      saved: false,
    }))
}
