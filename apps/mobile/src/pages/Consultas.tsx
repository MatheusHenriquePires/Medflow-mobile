import { Layout, TopBar } from '../components'

export function Consultas() {
  const appointments = [
    {
      id: '1',
      medico: 'Dra. Marina',
      especialidade: 'Cardiologia',
      data: 'Hoje',
      hora: '14:30',
      sala: '03',
      status: 'confirmado',
      tipo: 'presencial',
    },
    {
      id: '2',
      medico: 'Dr. Carlos',
      especialidade: 'Ortopedia',
      data: 'Amanhã',
      hora: '10:00',
      sala: 'Online',
      status: 'confirmado',
      tipo: 'online',
    },
    {
      id: '3',
      medico: 'Dra. Paula',
      especialidade: 'Pediatria',
      data: '20 de Maio',
      hora: '15:00',
      sala: '01',
      status: 'pendente',
      tipo: 'presencial',
    },
  ]

  return (
    <Layout>
      <TopBar title="Minhas Consultas" showBack={false} />

      <div className="screen__body">
        <div className="tabs">
          <button type="button" className="tab tab--active">
            Próximas
          </button>
          <button type="button" className="tab">
            Histórico
          </button>
        </div>

        <div className="appointments-list">
          {appointments.map((apt) => (
            <div key={apt.id} className={`appointment-card appointment-card--${apt.status}`}>
              <div className="appointment-card__icon">
                {apt.tipo === 'online' ? '💻' : '🏥'}
              </div>
              <div className="appointment-card__content">
                <h4>{apt.medico}</h4>
                <p className="appointment-card__specialty">{apt.especialidade}</p>
                <div className="appointment-card__details">
                  <span>📅 {apt.data}</span>
                  <span>🕐 {apt.hora}</span>
                  <span>📍 {apt.sala}</span>
                </div>
              </div>
              <div className="appointment-card__actions">
                <button type="button" className="btn btn--small">
                  Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="btn btn--primary" style={{ width: '100%', marginTop: '1rem' }}>
          Agendar Nova Consulta
        </button>
      </div>
    </Layout>
  )
}
