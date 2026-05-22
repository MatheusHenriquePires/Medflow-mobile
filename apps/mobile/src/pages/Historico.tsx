import { Layout, TopBar } from '../components'

export function Historico() {
  const historico = [
    {
      id: '1',
      medico: 'Dr. Carlos Silva',
      especialidade: 'Cardiologia',
      data: '10 de Maio',
      diagnostico: 'Pressão arterial elevada',
      receita: 'Sim',
    },
    {
      id: '2',
      medico: 'Dra. Paula Costa',
      especialidade: 'Pediatria',
      data: '5 de Maio',
      diagnostico: 'Alergia respiratória',
      receita: 'Sim',
    },
    {
      id: '3',
      medico: 'Dr. João Oliveira',
      especialidade: 'Oftalmologia',
      data: '1 de Maio',
      diagnostico: 'Miopia leve',
      receita: 'Não',
    },
    {
      id: '4',
      medico: 'Dra. Marina',
      especialidade: 'Clínica Geral',
      data: '25 de Abril',
      diagnostico: 'Gripe comum',
      receita: 'Sim',
    },
  ]

  return (
    <Layout>
      <TopBar title="Histórico Médico" showBack={false} />

      <div className="screen__body">
        <div className="historico-list">
          {historico.map((item) => (
            <div key={item.id} className="historico-card">
              <div className="historico-card__header">
                <div>
                  <h4>{item.medico}</h4>
                  <p className="historico-card__specialty">{item.especialidade}</p>
                </div>
                <span className="historico-card__date">📅 {item.data}</span>
              </div>

              <div className="historico-card__content">
                <p>
                  <strong>Diagnóstico:</strong> {item.diagnostico}
                </p>
              </div>

              <div className="historico-card__footer">
                <span>Receita: {item.receita === 'Sim' ? '✓ Sim' : '✗ Não'}</span>
                <button type="button" className="btn btn--small">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
