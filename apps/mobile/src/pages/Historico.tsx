import { useState } from 'react'
import { CalendarDays, FileText } from 'lucide-react'
import { AppButton, AppCard, Layout, TopBar } from '../components'
import { useAppData } from '../contexts/AppDataContext'

export function Historico() {
  const { records } = useAppData()
  const [expandedId, setExpandedId] = useState<string | null>(records[0]?.id ?? null)

  return (
    <Layout>
      <TopBar title="Histórico Médico" showBack={false} />

      <div className="screen__body">
        <div className="summary-strip">
          <span>{records.length} atendimentos</span>
          <span>{records.filter((item) => item.receita).length} receitas emitidas</span>
        </div>
        <div className="historico-list">
          {records.map((item) => (
            <AppCard key={item.id} className="historico-card">
              <div className="historico-card__header">
                <div>
                  <h4>{item.medico}</h4>
                  <p className="historico-card__specialty">{item.especialidade}</p>
                </div>
                <span className="historico-card__date"><CalendarDays size={14} strokeWidth={1.5} /> {item.data}</span>
              </div>

              <div className="historico-card__content">
                <p>
                  <strong>Diagnóstico:</strong> {item.diagnostico}
                </p>
                {expandedId === item.id && (
                  <p>
                    <strong>Conduta:</strong> {item.conduta}
                  </p>
                )}
              </div>

              <div className="historico-card__footer">
                <span><FileText size={14} strokeWidth={1.5} /> Receita: {item.receita ? 'Sim' : 'Não'}</span>
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  {expandedId === item.id ? 'Ocultar' : 'Ver detalhes'}
                </AppButton>
              </div>
            </AppCard>
          ))}
        </div>
      </div>
    </Layout>
  )
}
