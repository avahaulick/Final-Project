import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthModal from './components/AuthModal'
import Footer from './components/Footer'
import MainPage from './pages/MainPage'
import SavedNewsPage from './pages/SavedNewsPage'
import { fetchArticles } from './utils/newsApi'
import './components/components.css'
import './App.css'

function App() {
  const [fetchedArticles, setFetchedArticles] = useState([])
  const [savedIds, setSavedIds] = useState(new Set())
  const [savedArticlesMap, setSavedArticlesMap] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(null)
  const abortRef = useRef(null)

  const articles = fetchedArticles.map((article) => ({
    ...article,
    saved: savedIds.has(article.id),
  }))

  const savedArticles = Object.values(savedArticlesMap)

  const runSearch = useCallback(async (query) => {
    if (abortRef.current) {
      abortRef.current.abort()
    }

    abortRef.current = new AbortController()
    setIsLoading(true)
    setFetchError(null)

    try {
      const results = await fetchArticles(query)
      setFetchedArticles(results)
    } catch (error) {
      if (error.name !== 'AbortError') {
        setFetchError(error.message ?? 'Something went wrong. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort()
      }
    }
  }, [])

  function openModal(mode) {
    setActiveModal(mode)
  }

  function closeModal() {
    setActiveModal(null)
  }

  function handleSearchSubmit(event) {
    event.preventDefault()
    const query = searchInput.trim()
    if (!query) return
    setSubmittedQuery(query)
    runSearch(query)
  }

  function handleToggleSave(articleId) {
    if (!isLoggedIn) {
      openModal('signin')
      return
    }

    setSavedIds((current) => {
      const next = new Set(current)
      if (next.has(articleId)) {
        next.delete(articleId)
      } else {
        next.add(articleId)
      }
      return next
    })

    setSavedArticlesMap((current) => {
      const next = { ...current }
      if (next[articleId]) {
        delete next[articleId]
      } else {
        const article = fetchedArticles.find((a) => a.id === articleId)
        if (article) next[articleId] = article
      }
      return next
    })
  }

  function handleAuthenticate() {
    setIsLoggedIn(true)
    closeModal()
  }

  function handleLogout() {
    setIsLoggedIn(false)
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              articles={articles}
              isLoading={isLoading}
              fetchError={fetchError}
              isLoggedIn={isLoggedIn}
              onLoginClick={() => openModal('signin')}
              onLogout={handleLogout}
              onOpenSignup={() => openModal('signup')}
              onSaveArticle={handleToggleSave}
              query={searchInput}
              submittedQuery={submittedQuery}
              onQueryChange={setSearchInput}
              onSearchSubmit={handleSearchSubmit}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <SavedNewsPage
              articles={savedArticles}
              isLoggedIn={isLoggedIn}
              onLoginClick={() => openModal('signin')}
              onLogout={handleLogout}
              onSaveArticle={handleToggleSave}
              userName="Marquis"
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />

      <AuthModal
        mode={activeModal}
        onClose={closeModal}
        onSwitchMode={openModal}
        onAuthenticate={handleAuthenticate}
      />
    </>
  )
}

export default App
