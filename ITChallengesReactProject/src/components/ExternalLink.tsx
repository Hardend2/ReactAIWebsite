import type { ReactNode } from 'react'

type ExternalLinkProps = {
  href: string
  children: ReactNode
}

function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="visually-hidden"> (opent in een nieuw tabblad)</span>
    </a>
  )
}

export default ExternalLink
