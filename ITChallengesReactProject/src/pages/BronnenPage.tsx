import ExternalLink from '../components/ExternalLink.tsx'
import PageHeader from '../components/PageHeader.tsx'
import sources from '../content/bronnen.json'
import over from '../content/over.json'

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function BronnenPage() {
  return (
    <>
      <PageHeader
        metaTitle={over.metaTitle}
        metaDescription={over.metaDescription}
        heading={over.heading}
        intro={over.intro}
      />
      <div className="container page-body">
        <section className="section">
          <h2>{over.aboutHeading}</h2>
          {over.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
        <section className="section">
          <h2>{over.sourcesHeading}</h2>
          <ul className="source-list">
            {sources.map((source) => (
              <li key={source.id}>
                <ExternalLink href={source.url}>{source.title}</ExternalLink>
                <p className="source-meta">
                  {source.organisation}. {source.type}.
                  <br />
                  {over.accessedLabel} {formatDate(source.accessed)}.
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}

export default BronnenPage
