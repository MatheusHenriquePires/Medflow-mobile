import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function Sidebar() {
  const location = useLocation()
  const { logout, user } = useAuth()

  const menuItems = [
    { path: '/home', label: 'Início', icon: '🏠' },
    { path: '/buscar', label: 'Buscar Médico', icon: '🔎' },
    { path: '/consultas', label: 'Minhas Consultas', icon: '📋' },
    { path: '/receitas', label: 'Receitas', icon: '💊' },
    { path: '/historico', label: 'Histórico Médico', icon: '📑' },
    { path: '/perfil', label: 'Meu Perfil', icon: '👤' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__avatar">🏥</div>
        <div>
          <h3>Medflow</h3>
          <p className="sidebar__subtitle">{user?.nome || 'Usuário'}</p>
        </div>
      </div>

      <nav className="sidebar__nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar__item ${isActive(item.path) ? 'is-active' : ''}`}
          >
            <span className="sidebar__icon">{item.icon}</span>
            <span className="sidebar__label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar__footer">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={logout}
        >
          Sair
        </button>
      </div>
    </aside>
  )
}
