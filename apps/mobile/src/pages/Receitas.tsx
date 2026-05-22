import { Layout, TopBar } from '../components'

export function Receitas() {
  const receitas = [
    {
      id: '1',
      medico: 'Dra. Marina',
      data: '15 de Maio',
      medicamentos: ['Dipirona 500mg', 'Amoxicilina 500mg', 'Vitamina C 500mg'],
      status: 'ativa',
    },
    {
      id: '2',
      medico: 'Dr. Carlos',
      data: '10 de Maio',
      medicamentos: ['Ibuprofeno 200mg', 'Omeprazol 20mg'],
      status: 'ativa',
    },
    {
      id: '3',
      medico: 'Dra. Paula',
      data: '5 de Maio',
      medicamentos: ['Paracetamol 500mg'],
      status: 'expirada',
    },
  ]

  return (
    <Layout>
      <TopBar title="Minhas Receitas" showBack={false} />

      <div className="screen__body">
        <div className="receitas-list">
          {receitas.map((receita) => (
            <div key={receita.id} className={`receita-card receita-card--${receita.status}`}>
              <div className="receita-card__header">
                <div>
                  <h4>Prescrita por {receita.medico}</h4>
                  <p className="receita-card__date">📅 {receita.data}</p>
                </div>
                <span className={`badge badge--${receita.status}`}>
                  {receita.status === 'ativa' ? 'Ativa' : 'Expirada'}
                </span>
              </div>

              <div className="receita-card__medications">
                <p className="receita-card__label">Medicamentos:</p>
                <ul>
                  {receita.medicamentos.map((med) => (
                    <li key={med}>💊 {med}</li>
                  ))}
                </ul>
              </div>

              <div className="receita-card__actions">
                <button type="button" className="btn btn--small">
                  Ver Completo
                </button>
                <button type="button" className="btn btn--small btn--ghost">
                  Compartilhar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
