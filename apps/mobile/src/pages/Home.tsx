import { useNavigate } from 'react-router-dom'
import { CalendarPlus, ClipboardList, HeartPulse, Pill, Search, Video } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useAppData } from '../contexts/AppDataContext'
import { AppButton, AppCard, AvatarInitials, Layout, StatusBadge } from '../components'

export function Home() {
  const { user } = useAuth()
  const { appointments, doctors, bookAppointment } = useAppData()
  const navigate = useNavigate()

  const nextAppointment = appointments.find((appointment) =>
    ['confirmado', 'pendente'].includes(appointment.status),
  )

  const quickActions = [
    { icon: CalendarPlus, title: 'Agendar', subtitle: 'Consulta presencial', tone: 'accent', path: '/buscar' },
    { icon: Video, title: 'Teleconsulta', subtitle: 'Online agora', tone: 'primary', path: '/consultas' },
    { icon: ClipboardList, title: 'Histórico', subtitle: 'Suas consultas', tone: 'warning', path: '/historico' },
    { icon: Pill, title: 'Receitas', subtitle: 'Ver prescrições', tone: 'accent', path: '/receitas' },
  ]

  return (
    <Layout showBottomNav={true} statusBarTheme="dark">
      <div className="screen screen--home">
        <div className="home__header">
          <div className="home__header-copy">
            <div className="home-welcome">
              <AvatarInitials name={user?.nome || 'Paciente Medflow'} size="lg" />
              <div>
                <p className="home__greeting">Bem-vindo de volta</p>
                <h2>{user?.nome?.split(' ')[0] || 'Paciente'}</h2>
              </div>
            </div>
            <div className="home-metrics">
              <span>{appointments.length} consultas</span>
              <span>{doctors.filter((doctor) => doctor.disponivel).length} médicos disponíveis</span>
            </div>
            <button type="button" className="search-box" onClick={() => navigate('/buscar')}>
              <Search size={18} strokeWidth={1.5} />
              <span>Buscar médico ou especialidade</span>
            </button>
          </div>
        </div>

        <div className="screen__body">
          <div className="section-heading">
            <span>Acesso rápido</span>
            <button type="button" onClick={() => navigate('/consultas')}>Ver agenda</button>
          </div>

          <AppCard className="agenda-card" as="section">
            <div className="agenda-card__icon">
              <HeartPulse size={34} strokeWidth={1.5} />
            </div>
            <span className="agenda-card__eyebrow">Próxima consulta</span>
            <h3>{nextAppointment ? `${nextAppointment.especialidade} com ${nextAppointment.medico}` : 'Nenhuma consulta marcada'}</h3>
            <p>
              {nextAppointment
                ? `${nextAppointment.data}, ${nextAppointment.hora} • ${nextAppointment.sala}`
                : 'Agende uma consulta em poucos toques.'}
            </p>
            <AppButton variant="ghost" size="sm" className="agenda-card__action" onClick={() => navigate('/consultas')}>
              {nextAppointment ? 'Ver detalhes' : 'Agendar agora'}
            </AppButton>
          </AppCard>

          <div className="quick-grid">
            {quickActions.map((action) => (
              <button
                key={action.title}
                type="button"
                className="quick-card"
                onClick={() => navigate(action.path)}
              >
                <div className={`quick-card__icon quick-card__icon--${action.tone}`}>
                  <action.icon size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h3>{action.title}</h3>
                  <p>{action.subtitle}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="section-heading">
            <span>Médicos recomendados</span>
            <button type="button" onClick={() => navigate('/buscar')}>Ver mais</button>
          </div>

          <div className="doctors-list doctors-list--horizontal">
            {doctors.slice(0, 3).map((doctor) => (
              <AppCard key={doctor.nome} className="doctor-card doctor-card--compact">
                <AvatarInitials name={doctor.nome} />
                <div className="doctor-card__info">
                  <h4>{doctor.nome}</h4>
                  <p>{doctor.especialidade}</p>
                  <span className="rating-pill">★ {doctor.rating}</span>
                </div>
                <StatusBadge status="disponivel" />
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={async () => {
                    await bookAppointment(doctor)
                    navigate('/consultas')
                  }}
                >
                  Agendar
                </AppButton>
              </AppCard>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
