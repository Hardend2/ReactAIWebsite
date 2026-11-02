type PageHeaderProps = {
  metaTitle: string
  metaDescription: string
  heading: string
  intro: string
}

function PageHeader({ metaTitle, metaDescription, heading, intro }: PageHeaderProps) {
  return (
    <div className="page-header">
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <div className="container">
        <h1>{heading}</h1>
        <p className="lead">{intro}</p>
      </div>
    </div>
  )
}

export default PageHeader
