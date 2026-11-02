export type ContentItem = {
  title: string
  text?: string
  list?: string[]
  sources: string[]
}

export type ContentSection = {
  heading: string
  intro?: string
  sources?: string[]
  items: ContentItem[]
}

export type ContentPageData = {
  metaTitle: string
  metaDescription: string
  heading: string
  intro: string
  note?: { title: string; text: string; sources: string[] }
  sections: ContentSection[]
}
