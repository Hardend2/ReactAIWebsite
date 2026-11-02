import { useState } from 'react'
import type { FormEvent } from 'react'
import PageHeader from '../components/PageHeader.tsx'
import contact from '../content/contact.json'

const emptyValues = { name: '', email: '', message: '' }
const fieldOrder = ['name', 'email', 'message'] as const

type FieldName = (typeof fieldOrder)[number]
type FieldErrors = Partial<Record<FieldName, string>>
type Status = 'accepted' | 'filtered' | null

function validate(values: typeof emptyValues) {
  const errors: FieldErrors = {}
  if (values.name.trim() === '') errors.name = contact.errors.name
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = contact.errors.email
  if (values.message.trim().length < 10) errors.message = contact.errors.message
  return errors
}

function ContactPage() {
  const [values, setValues] = useState(emptyValues)
  const [trap, setTrap] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>(null)

  function updateField(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Only a bot fills in the hidden field, so drop the message without further checks.
    if (trap !== '') {
      setValues(emptyValues)
      setTrap('')
      setErrors({})
      setStatus('filtered')
      return
    }

    const newErrors = validate(values)
    setErrors(newErrors)

    const firstInvalid = fieldOrder.find((field) => newErrors[field])
    if (firstInvalid) {
      setStatus(null)
      const field = event.currentTarget.elements.namedItem(firstInvalid)
      if (field instanceof HTMLElement) field.focus()
      return
    }

    setValues(emptyValues)
    setStatus('accepted')
  }

  return (
    <>
      <PageHeader
        metaTitle={contact.metaTitle}
        metaDescription={contact.metaDescription}
        heading={contact.heading}
        intro={contact.intro}
      />
      <div className="container page-body">
        <section className="note">
          <h2 className="note-title">{contact.note.title}</h2>
          <p>{contact.note.text}</p>
        </section>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="name">{contact.labels.name}</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              onChange={(event) => updateField('name', event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="form-error">
                {errors.name}
              </p>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="email">{contact.labels.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(event) => updateField('email', event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="form-error">
                {errors.email}
              </p>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="message">{contact.labels.message}</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              value={values.message}
              onChange={(event) => updateField('message', event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="form-error">
                {errors.message}
              </p>
            )}
          </div>
          <div className="form-trap" aria-hidden="true">
            <label htmlFor="website">{contact.labels.trap}</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={trap}
              onChange={(event) => setTrap(event.target.value)}
            />
          </div>
          <button type="submit" className="form-submit">
            {contact.labels.submit}
          </button>
          <div className="form-status" role="status">
            {status && <p>{contact.status[status]}</p>}
          </div>
        </form>
      </div>
    </>
  )
}

export default ContactPage
