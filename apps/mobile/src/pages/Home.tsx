import { useAuth } from '../contexts/AuthContext'
import { Layout } from '../components'

export function Home() {
  const { user } = useAuth()

  const quickActions = [
    { icon: '📅', title: 'Agendar', subtitle: 'Consulta presencial', tone: 'teal' },
    { icon: '💻', title: 'Teleconsulta', subtitle: 'Online agora', tone: 'blue' },
    { icon: '📋', title: 'Histórico', subtitle: 'Suas consultas', tone: 'amber' },
    { icon: '💊', title: 'Receitas', subtitle: 'Ver prescrições', tone: 'lavender' },
  ]

  return (
    <Layout showBottomNav={true} statusBarTheme="dark">
      <div className="screen screen--home">
        <div className="home__header">
          <div className="home__header-copy">
            <p className="home__greeting">Bom dia 👋</p>
            <h2>{user?.nome || 'Usuário'}</h2>
            <button type="button" className="search-box">
              <span>🔍</span>
              <span>Buscar médico ou especialidade</span>
            </button>
          </div>
        </div>

        <div className="screen__body">
          <div className="section-heading">
            <span>Acesso rápido</span>
            <button type="button">Ver tudo</button>
          </div>

          <div className="quick-grid">
            {quickActions.map((action) => (
              <button key={action.title} type="button" className="quick-card">
                <div className={`quick-card__icon quick-card__icon--${action.tone}`}>
                  {action.icon}
                </div>
                <div>
                  <h3>{action.title}</h3>
                  <p>{action.subtitle}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="agenda-card">
            <div>
              <span className="agenda-card__eyebrow">Próxima consulta</span>
              <h3>Cardiologia com Dra. Marina</h3>
              <p>Hoje, 14:30 • Sala 03</p>
            </div>
            <button type="button" className="agenda-card__action">
              Ver detalhes
            </button>
          </div>

          <div className="section-heading">
            <span>Médicos recomendados</span>
            <button type="button">Ver mais</button>
          </div>

          <div className="doctors-list">
            {[
              { nome: 'Dr. Carlos Silva', especialidade: 'Cardiologia', rating: 4.8 },
              { nome: 'Dra. Ana Costa', especialidade: 'Dermatologia', rating: 4.9 },
              { nome: 'Dr. Pedro Oliveira', especialidade: 'Oftalmologia', rating: 4.7 },
            ].map((doctor) => (
              <div key={doctor.nome} className="doctor-card">
                <div className="doctor-card__avatar">👨‍⚕️</div>
                <div className="doctor-card__info">
                  <h4>{doctor.nome}</h4>
                  <p>{doctor.especialidade}</p>
                  <p className="doctor-card__rating">⭐ {doctor.rating}</p>
                </div>
                <button type="button" className="doctor-card__action">
                  Agendar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
