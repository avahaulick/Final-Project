import { useDeferredValue, useEffect, useRef, useState, startTransition } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthModal from './components/AuthModal'
import Footer from './components/Footer'
import { initialArticles } from './data/mockArticles'
import MainPage from './pages/MainPage'
import SavedNewsPage from './pages/SavedNewsPage'
import './App.css'

function App() {
  const [articles, setArticles] = useState(initialArticles)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const [searchInput, setSearchInput] = useState('climate')
  const [submittedQuery, setSubmittedQuery] = useState('climate')
  const [isLoading, setIsLoading] = useState(false)
  const searchTimerRef = useRef(null)

  const deferredQuery = useDeferredValue(submittedQuery)
  const normalizedQuery = deferredQuery.trim().toLowerCase()
  const visibleArticles = articles.filter((article) => {
    if (!normalizedQuery) {
      return true
    }

    const searchBlob = [
      article.title,
      article.description,
      article.keyword,
      article.source,
    ]
      .join(' ')
      .toLowerCase()

    return searchBlob.includes(normalizedQuery)
  })

  const savedArticles = articles.filter((article) => article.saved)

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        window.clearTimeout(searchTimerRef.current)
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

    if (searchTimerRef.current) {
      window.clearTimeout(searchTimerRef.current)
    }

    setIsLoading(true)
    searchTimerRef.current = window.setTimeout(() => {
      startTransition(() => {
        setSubmittedQuery(searchInput)
      })
      setIsLoading(false)
    }, 500)
  }

  function handleToggleSave(articleId) {
    if (!isLoggedIn) {
      openModal('signin')
      return
    }

    setArticles((currentArticles) =>
      currentArticles.map((article) =>
        article.id === articleId ? { ...article, saved: !article.saved } : article,
      ),
    )
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
              articles={visibleArticles}
              isLoading={isLoading}
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
