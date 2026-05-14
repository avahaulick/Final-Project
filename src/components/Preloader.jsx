function Preloader() {
  return (
    <div className="preloader">
      <div className="circle-preloader" role="status" aria-label="Loading" />
      <p className="preloader__text">Searching for news…</p>
    </div>
  )
}

export default Preloader
