import type { ContentPageData } from '../content/types.ts'
import PageHeader from './PageHeader.tsx'
import SourceLinks from './SourceLinks.tsx'

type ContentPageProps = {
  page: ContentPageData
}

function ContentPage({ page }: ContentPageProps) {
  return (
    <>
      <PageHeader
        metaTitle={page.metaTitle}
        metaDescription={page.metaDescription}
        heading={page.heading}
        intro={page.intro}
      />
      <div className="container page-body">
        {page.note && (
          <section className="note">
            <h2 className="note-title">{page.note.title}</h2>
            <p>{page.note.text}</p>
            <SourceLinks ids={page.note.sources} />
          </section>
        )}
        {page.sections.map((section) => (
          <section key={section.heading} className="section">
            <h2>{section.heading}</h2>
            {section.intro && <p className="section-intro">{section.intro}</p>}
            <SourceLinks ids={section.sources} />
            {section.items.length > 0 && (
              <ul className="card-grid">
                {section.items.map((item) => (
                  <li key={item.title} className="card">
                    <h3>{item.title}</h3>
                    {item.text && <p>{item.text}</p>}
                    {item.list && (
                      <ul className="card-list">
                        {item.list.map((entry) => (
                          <li key={entry}>{entry}</li>
                        ))}
                      </ul>
                    )}
                    <SourceLinks ids={item.sources} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </>
  )
}

export default ContentPage
