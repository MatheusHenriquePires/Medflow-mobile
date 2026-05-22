import { useState } from 'react'
import { Layout, TopBar } from '../components'

export function BuscarMedico() {
  const [search, setSearch] = useState('')

  const especialidades = [
    '🏥 Todos',
    '❤️ Cardiologia',
    '🧠 Neurologia',
    '👀 Oftalmologia',
    '🦷 Odontologia',
    '💊 Farmácia',
  ]

  const doctores = [
    {
      nome: 'Dr. Carlos Silva',
      especialidade: 'Cardiologia',
      rating: 4.8,
      consultas: 250,
      preco: 'R$ 150',
    },
    {
      nome: 'Dra. Ana Costa',
      especialidade: 'Dermatologia',
      rating: 4.9,
      consultas: 180,
      preco: 'R$ 120',
    },
    {
      nome: 'Dr. Pedro Oliveira',
      especialidade: 'Oftalmologia',
      rating: 4.7,
      consultas: 320,
      preco: 'R$ 130',
    },
  ]

  return (
    <Layout>
      <TopBar title="Buscar Médico" showBack={false} />

      <div className="screen__body">
        <div className="search-section">
          <input
            type="text"
            placeholder="Buscar médico ou especialidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="section-heading">
          <span>Especialidades</span>
        </div>

        <div className="especialidades-grid">
          {especialidades.map((esp) => (
            <button key={esp} type="button" className="especialidade-btn">
              {esp}
            </button>
          ))}
        </div>

        <div className="section-heading">
          <span>Médicos Disponíveis</span>
        </div>

        <div className="doctors-detailed-list">
          {doctores.map((doctor) => (
            <div key={doctor.nome} className="doctor-detailed-card">
              <div className="doctor-detailed-card__header">
                <div className="doctor-detailed-card__avatar">👨‍⚕️</div>
                <div className="doctor-detailed-card__info">
                  <h4>{doctor.nome}</h4>
                  <p className="doctor-detailed-card__specialty">
                    {doctor.especialidade}
                  </p>
                  <div className="doctor-detailed-card__rating">
                    <span>⭐ {doctor.rating}</span>
                    <span>({doctor.consultas} consultas)</span>
                  </div>
                </div>
              </div>
              <div className="doctor-detailed-card__footer">
                <p className="doctor-detailed-card__price">{doctor.preco}</p>
                <button type="button" className="btn btn--small">
                  Agendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
