import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.tsx'
import SourceLinks from '../components/SourceLinks.tsx'
import home from '../content/home.json'

function HomePage() {
  return (
    <>
      <PageHeader
        metaTitle={home.metaTitle}
        metaDescription={home.metaDescription}
        heading={home.heading}
        intro={home.intro}
      />
      <div className="container page-body">
        <section className="section">
          <h2>{home.explainer.heading}</h2>
          {home.explainer.paragraphs.map((paragraph) => (
            <div key={paragraph.text} className="prose-block">
              <p>{paragraph.text}</p>
              <SourceLinks ids={paragraph.sources} />
            </div>
          ))}
        </section>
        <section className="section">
          <h2>{home.cardsHeading}</h2>
          <ul className="card-grid">
            {home.cards.map((card) => (
              <li key={card.to} className="card card-link">
                <h3>
                  <Link to={card.to}>{card.title}</Link>
                </h3>
                <p>{card.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}

export default HomePage
