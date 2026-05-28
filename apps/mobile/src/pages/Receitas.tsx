import { useState } from 'react'
import { ChevronDown, Share2 } from 'lucide-react'
import { AppButton, AppCard, Layout, StatusBadge, TopBar } from '../components'
import { useAppData } from '../contexts/AppDataContext'

export function Receitas() {
  const { prescriptions } = useAppData()
  const [expandedId, setExpandedId] = useState<string | null>(prescriptions[0]?.id ?? null)
  const [message, setMessage] = useState('')

  const handleShare = (doctor: string) => {
    setMessage(`Receita de ${doctor} pronta para compartilhar.`)
    window.setTimeout(() => setMessage(''), 2200)
  }

  return (
    <Layout>
      <TopBar title="Minhas Receitas" showBack={false} />

      <div className="screen__body">
        {message && <div className="inline-alert">{message}</div>}
        <div className="receitas-list">
          {prescriptions.map((receita) => (
            <AppCard key={receita.id} className={`receita-card receita-card--${receita.status}`}>
              <div className="receita-card__header">
                <div>
                  <h4>Prescrita por {receita.medico}</h4>
                  <p className="receita-card__date">{receita.data} • válida até {receita.validade}</p>
                </div>
                <div className="receita-card__top-actions">
                  <StatusBadge status={receita.status} />
                  <button
                    type="button"
                    className="icon-button"
                    aria-label="Compartilhar receita"
                    onClick={() => handleShare(receita.medico)}
                  >
                    <Share2 size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="receita-card__medications">
                <p className="receita-card__label">Medicamentos:</p>
                <ul>
                  {receita.medicamentos.map((med) => (
                    <li key={med}>💊 {med}</li>
                  ))}
                </ul>
                {expandedId === receita.id && (
                  <p className="receita-card__orientation">{receita.orientacao}</p>
                )}
              </div>

              <div className="receita-card__actions">
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setExpandedId(expandedId === receita.id ? null : receita.id)}
                >
                  <ChevronDown size={16} strokeWidth={1.5} />
                  {expandedId === receita.id ? 'Ocultar' : 'Ver completo'}
                </AppButton>
              </div>
            </AppCard>
          ))}
        </div>
      </div>
    </Layout>
  )
}
