import { Link, useLocation } from 'react-router-dom'
import { CalendarDays, Home, Pill, Search, UserRound } from 'lucide-react'

export function BottomNav() {
  const location = useLocation()

  const navItems = [
    { path: '/home', label: 'Início', icon: Home },
    { path: '/buscar', label: 'Buscar', icon: Search },
    { path: '/consultas', label: 'Consultas', icon: CalendarDays },
    { path: '/receitas', label: 'Receitas', icon: Pill },
    { path: '/perfil', label: 'Perfil', icon: UserRound },
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
          <span className="bottom-nav__icon">
            <item.icon size={20} strokeWidth={1.5} />
          </span>
          <span className="bottom-nav__label">{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
