import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.tsx'

function NotFoundPage() {
  return (
    <>
      <PageHeader
        metaTitle="Pagina niet gevonden | NeuroWerk"
        metaDescription="Deze pagina bestaat niet."
        heading="Pagina niet gevonden"
        intro="Deze pagina bestaat niet of is verhuisd."
      />
      <div className="container page-body">
        <p>
          <Link to="/">Ga terug naar de startpagina</Link>
        </p>
      </div>
    </>
  )
}

export default NotFoundPage
