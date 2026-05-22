import { Link, useLocation } from 'react-router-dom'

export function BottomNav() {
  const location = useLocation()

  const navItems = [
    { path: '/home', label: 'Início', icon: '🏠' },
    { path: '/buscar', label: 'Buscar', icon: '🔎' },
    { path: '/consultas', label: 'Consultas', icon: '📋' },
    { path: '/perfil', label: 'Perfil', icon: '👤' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`bottom-nav__item ${isActive(item.path) ? 'bottom-nav__item--active' : ''}`}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
