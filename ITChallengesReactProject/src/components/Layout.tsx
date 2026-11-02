import { useEffect, useRef } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/voordelen', label: 'Voordelen' },
  { to: '/uitdagingen', label: 'Uitdagingen' },
  { to: '/tips-werkzoekenden', label: 'Tips voor werkzoekenden' },
  { to: '/tips-werkgevers', label: 'Tips voor werkgevers' },
  { to: '/bronnen', label: 'Bronnen' },
]

function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const lastPathname = useRef(pathname)

  // Move focus to the new page so keyboard and screen reader users start at its content.
  useEffect(() => {
    if (lastPathname.current === pathname) return
    lastPathname.current = pathname
    window.scrollTo(0, 0)
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#inhoud">
        Ga naar de inhoud
      </a>
      <header className="site-header">
        <div className="container site-header-inner">
          <Link to="/" className="logo">
            NeuroWerk
          </Link>
          <nav aria-label="Hoofdmenu">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/'} className="nav-link">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="inhoud" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>NeuroWerk geeft algemene info en geen medisch, psychologisch of juridisch advies.</p>
          <p>
            <Link to="/bronnen">Bekijk de bronnen en meer over deze site</Link>
          </p>
        </div>
      </footer>
    </>
  )
}

export default Layout
