const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const MODE = import.meta.env.MODE
const DIRECT_NEWS_API_URL = 'https://newsapi.org/v2/everything'
const TRIPLETEN_PROXY_URL = 'https://nomoreparties.co/news/v2/everything'
const ALL_ORIGINS_PROXY_URL = 'https://api.allorigins.win/raw?url='

function getFromDate() {
  const d = new Date()
  d.setDate(d.getDate() - 7)
  return d.toISOString().slice(0, 10)
}

function getToDate() {
  return new Date().toISOString().slice(0, 10)
}

function normalizeImageUrl(url) {
  if (typeof url !== 'string') {
    return null
  }

  const trimmedUrl = url.trim()
  if (!trimmedUrl || trimmedUrl === '[Removed]') {
    return null
  }

  try {
    const parsedUrl = new URL(trimmedUrl)
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:' ? trimmedUrl : null
  } catch {
    return null
  }
}

/**
 * Fetch news articles for a given keyword.
 * Returns an array of normalized article objects.
 * @param {string} query
 * @param {AbortSignal} [signal]
 * @returns {Promise<Array>}
 */
export async function fetchArticles(query, signal) {
  if (!query || !query.trim()) {
    return []
  }

  if (!API_KEY) {
    throw new Error('Missing API key. Set VITE_NEWS_API_KEY in your environment.')
  }

  const normalizedQuery = query.trim()
  const params = new URLSearchParams({
    q: normalizedQuery,
    from: getFromDate(),
    to: getToDate(),
    pageSize: '100',
    apiKey: API_KEY,
  })

  const directUrl = `${DIRECT_NEWS_API_URL}?${params}`
  const candidates =
    MODE === 'production'
      ? [
          `${TRIPLETEN_PROXY_URL}?${params}`,
          `${ALL_ORIGINS_PROXY_URL}${encodeURIComponent(directUrl)}`,
        ]
      : [directUrl]

  let lastError = null

  for (const requestUrl of candidates) {
    try {
      const response = await fetch(requestUrl, { signal })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        lastError = new Error(error.message ?? `NewsAPI error: ${response.status}`)
        continue
      }

      const data = await response.json()

      return (data.articles ?? [])
        .filter((article) => article.url !== '[Removed]' && article.title !== '[Removed]')
        .map((article, index) => ({
          id: `${normalizedQuery}-${index}-${article.publishedAt}`,
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
          image: normalizeImageUrl(article.urlToImage),
          keyword: normalizedQuery,
          saved: false,
        }))
    } catch (error) {
      if (error.name === 'AbortError') {
        throw error
      }
      lastError = error
    }
  }

  throw new Error(lastError?.message ?? 'Sorry, something went wrong during the request. Please try again later.')
}
