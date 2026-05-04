const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL = 'https://newsapi.org/v2/everything'

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
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: '12',
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
