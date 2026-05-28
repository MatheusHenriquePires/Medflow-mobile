import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, CalendarDays, Clock3, MapPin, Video } from 'lucide-react'
import { AppButton, AppCard, Layout, StatusBadge, TopBar } from '../components'
import { useAppData } from '../contexts/AppDataContext'

export function Consultas() {
  const [tab, setTab] = useState<'proximas' | 'historico'>('proximas')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { appointments, cancelAppointment } = useAppData()
  const navigate = useNavigate()

  const visibleAppointments = appointments.filter((appointment) => {
    if (tab === 'historico') {
      return ['concluído', 'cancelado'].includes(appointment.status)
    }

    return ['confirmado', 'pendente'].includes(appointment.status)
  })

  return (
    <Layout>
      <TopBar title="Minhas Consultas" showBack={false} />

      <div className="screen__body">
        <div className="tabs">
          <button
            type="button"
            className={`tab ${tab === 'proximas' ? 'tab--active' : ''}`}
            onClick={() => setTab('proximas')}
          >
            Próximas
          </button>
          <button
            type="button"
            className={`tab ${tab === 'historico' ? 'tab--active' : ''}`}
            onClick={() => setTab('historico')}
          >
            Histórico
          </button>
        </div>

        <div className="appointments-list">
          {visibleAppointments.map((apt) => (
            <AppCard key={apt.id} className={`appointment-card appointment-card--${apt.status}`}>
              <div className="appointment-card__topline">
                <strong>{apt.data}, {apt.hora}</strong>
                <StatusBadge status={apt.status} />
              </div>
              <div className="appointment-card__icon">
                {apt.tipo === 'online' ? <Video size={22} strokeWidth={1.5} /> : <Building2 size={22} strokeWidth={1.5} />}
              </div>
              <div className="appointment-card__content">
                <h4>{apt.medico}</h4>
                <p className="appointment-card__specialty">{apt.especialidade}</p>
                <div className="appointment-card__details">
                  <span><CalendarDays size={14} strokeWidth={1.5} /> {apt.data}</span>
                  <span><Clock3 size={14} strokeWidth={1.5} /> {apt.hora}</span>
                  <span><MapPin size={14} strokeWidth={1.5} /> {apt.sala}</span>
                </div>
              </div>
              <div className="appointment-card__actions">
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setExpandedId(expandedId === apt.id ? null : apt.id)}
                >
                  {expandedId === apt.id ? 'Fechar' : 'Detalhes'}
                </AppButton>
              </div>
              <div className={`appointment-card__expanded ${expandedId === apt.id ? 'is-open' : ''}`}>
                <div>
                  <p>{apt.observacao ?? 'Atendimento registrado no prontuário digital.'}</p>
                  {apt.status === 'confirmado' && (
                    <AppButton variant="danger-text" size="sm" onClick={() => void cancelAppointment(apt.id)}>
                      Cancelar consulta
                    </AppButton>
                  )}
                </div>
              </div>
            </AppCard>
          ))}
        </div>

        {visibleAppointments.length === 0 && (
          <div className="empty-state">
            <strong>Nada por aqui</strong>
            <span>Use a busca para marcar sua próxima consulta.</span>
          </div>
        )}

        <AppButton
          variant="primary"
          fullWidth
          className="consultas__new"
          onClick={() => navigate('/buscar')}
        >
          Agendar Nova Consulta
        </AppButton>
      </div>
    </Layout>
  )
}
