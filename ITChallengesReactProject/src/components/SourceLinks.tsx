import sources from '../content/bronnen.json'
import ExternalLink from './ExternalLink.tsx'

type SourceLinksProps = {
  ids?: string[]
}

function SourceLinks({ ids = [] }: SourceLinksProps) {
  const matches = sources.filter((source) => ids.includes(source.id))
  if (matches.length === 0) return null

  return (
    <p className="sources">
      {matches.length === 1 ? 'Bron: ' : 'Bronnen: '}
      {matches.map((source, index) => (
        <span key={source.id}>
          {index > 0 && ', '}
          <ExternalLink href={source.url}>{source.short}</ExternalLink>
        </span>
      ))}
    </p>
  )
}

export default SourceLinks
