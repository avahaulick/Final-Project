import aboutImage from '../assets/hero.png'

function AboutSection() {
  return (
    <section className="about page-shell" aria-labelledby="about-heading">
      <div className="about__media">
        <img className="about__image" src={aboutImage} alt="Editorial desk with a news dashboard" />
      </div>

      <div className="about__content">
        <p className="about__eyebrow">About the project</p>
        <h2 id="about-heading" className="about__title">
          A focused news reader for fast searches and saved reads.
        </h2>
        <p className="about__text">
          NewsExplorer helps readers search current headlines, skim the important details, and save
          articles to revisit later. It is built for a clean reading flow, with a responsive layout
          that keeps the experience simple on desktop and mobile.
        </p>
        <p className="about__text">
          The goal is to surface useful stories quickly, keep the interface readable, and make the
          bookmark workflow feel immediate.
        </p>
      </div>
    </section>
  )
}

export default AboutSection