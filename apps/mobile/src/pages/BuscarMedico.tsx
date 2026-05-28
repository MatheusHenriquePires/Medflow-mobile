import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Stethoscope } from 'lucide-react'
import { AppButton, AppCard, AppInput, AvatarInitials, Layout, StatusBadge, TopBar } from '../components'
import { useAppData } from '../contexts/AppDataContext'

export function BuscarMedico() {
  const [search, setSearch] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todos')
  const [scheduledDoctor, setScheduledDoctor] = useState('')
  const { doctors, bookAppointment } = useAppData()
  const navigate = useNavigate()

  const especialidades = ['Todos', 'Cardiologia', 'Ortopedia', 'Dermatologia', 'Oftalmologia']

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = `${doctor.nome} ${doctor.especialidade}`
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesSpecialty =
      selectedSpecialty === 'Todos' || doctor.especialidade === selectedSpecialty

    return matchesSearch && matchesSpecialty
  })

  const handleSchedule = async (doctorId: string) => {
    const doctor = doctors.find((item) => item.id === doctorId)
    if (!doctor || !doctor.disponivel) {
      return
    }

    await bookAppointment(doctor)
    setScheduledDoctor(doctor.nome)
    window.setTimeout(() => navigate('/consultas'), 700)
  }

  return (
    <Layout>
      <TopBar title="Buscar Médico" showBack={false} />

      <div className="screen__body">
        <div className="search-section">
          <AppInput
            id="doctor-search"
            label="Buscar"
            type="text"
            placeholder="Buscar médico ou especialidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={18} strokeWidth={1.5} />}
          />
        </div>

        <div className="section-heading">
          <span>Especialidades</span>
        </div>

        <div className="especialidades-grid">
          {especialidades.map((esp) => (
            <button
              key={esp}
              type="button"
              className={`especialidade-btn ${selectedSpecialty === esp ? 'is-active' : ''}`}
              onClick={() => setSelectedSpecialty(esp)}
            >
              {esp}
            </button>
          ))}
        </div>

        {scheduledDoctor && (
          <div className="inline-alert">
            Consulta com {scheduledDoctor} confirmada. Abrindo sua agenda...
          </div>
        )}

        <div className="section-heading">
          <span>{filteredDoctors.length} médicos encontrados</span>
        </div>

        <div className="doctors-detailed-list">
          {filteredDoctors.map((doctor) => (
            <AppCard key={doctor.nome} className="doctor-detailed-card">
              <div className="doctor-detailed-card__header">
                <AvatarInitials name={doctor.nome} />
                <div className="doctor-detailed-card__info">
                  <h4>{doctor.nome}</h4>
                  <p className="doctor-detailed-card__specialty">
                    {doctor.especialidade}
                  </p>
                  <div className="doctor-detailed-card__rating">
                    <span className="rating-pill">★ {doctor.rating}</span>
                    <span>({doctor.consultas} consultas)</span>
                  </div>
                  <p className="doctor-detailed-card__slot">
                    <Stethoscope size={14} strokeWidth={1.5} />
                    {doctor.proximoHorario} • {doctor.local}
                  </p>
                  {doctor.disponivel && <StatusBadge status="disponivel" />}
                </div>
              </div>
              <div className="doctor-detailed-card__footer">
                <p className="doctor-detailed-card__price">{doctor.preco}</p>
                <AppButton
                  variant="secondary"
                  size="sm"
                  disabled={!doctor.disponivel}
                  onClick={() => void handleSchedule(doctor.id)}
                >
                  {doctor.disponivel ? 'Agendar' : 'Indisponível'}
                </AppButton>
              </div>
            </AppCard>
          ))}
        </div>
      </div>
    </Layout>
  )
}
