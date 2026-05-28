import { createContext, useContext, useMemo, useState } from 'react'
import type { Appointment, Doctor, MedicalRecord, Prescription, ReactNode } from '../types'
import { createAppointment, persistAppointmentStatus } from '../services/api'
import { useAuth } from './AuthContext'

const initialDoctors: Doctor[] = [
  {
    id: 'marina-cardio',
    nome: 'Dra. Marina Rocha',
    especialidade: 'Cardiologia',
    rating: 4.9,
    disponivel: true,
    consultas: 386,
    preco: 'R$ 160',
    proximoHorario: 'Hoje, 14:30',
    local: 'Sala 03',
  },
  {
    id: 'carlos-orto',
    nome: 'Dr. Carlos Silva',
    especialidade: 'Ortopedia',
    rating: 4.8,
    disponivel: true,
    consultas: 250,
    preco: 'R$ 150',
    proximoHorario: 'Amanhã, 10:00',
    local: 'Teleconsulta',
  },
  {
    id: 'ana-dermato',
    nome: 'Dra. Ana Costa',
    especialidade: 'Dermatologia',
    rating: 4.9,
    disponivel: true,
    consultas: 180,
    preco: 'R$ 120',
    proximoHorario: 'Sex, 09:20',
    local: 'Sala 08',
  },
  {
    id: 'pedro-oftalmo',
    nome: 'Dr. Pedro Oliveira',
    especialidade: 'Oftalmologia',
    rating: 4.7,
    disponivel: false,
    consultas: 320,
    preco: 'R$ 130',
    proximoHorario: 'Seg, 16:40',
    local: 'Sala 02',
  },
]

const initialAppointments: Appointment[] = [
  {
    id: 'apt-1',
    medico: 'Dra. Marina Rocha',
    especialidade: 'Cardiologia',
    data: 'Hoje',
    hora: '14:30',
    sala: 'Sala 03',
    status: 'confirmado',
    tipo: 'presencial',
    observacao: 'Chegar 15 minutos antes para aferição de pressão.',
  },
  {
    id: 'apt-2',
    medico: 'Dr. Carlos Silva',
    especialidade: 'Ortopedia',
    data: 'Amanhã',
    hora: '10:00',
    sala: 'Online',
    status: 'confirmado',
    tipo: 'online',
    observacao: 'Link da teleconsulta liberado 10 minutos antes.',
  },
  {
    id: 'apt-3',
    medico: 'Dra. Paula Costa',
    especialidade: 'Pediatria',
    data: '20 de Maio',
    hora: '15:00',
    sala: 'Sala 01',
    status: 'concluído',
    tipo: 'presencial',
  },
]

const prescriptions: Prescription[] = [
  {
    id: 'rx-1',
    medico: 'Dra. Marina Rocha',
    especialidade: 'Cardiologia',
    data: '15 de Maio',
    validade: '14 de Junho',
    medicamentos: ['Losartana 50mg', 'Hidroclorotiazida 25mg'],
    orientacao: 'Tomar pela manhã e acompanhar pressão arterial diariamente.',
    status: 'ativa',
  },
  {
    id: 'rx-2',
    medico: 'Dr. Carlos Silva',
    especialidade: 'Ortopedia',
    data: '10 de Maio',
    validade: '24 de Maio',
    medicamentos: ['Ibuprofeno 400mg', 'Omeprazol 20mg'],
    orientacao: 'Tomar após alimentação por até 5 dias.',
    status: 'ativa',
  },
  {
    id: 'rx-3',
    medico: 'Dra. Paula Costa',
    especialidade: 'Pediatria',
    data: '5 de Abril',
    validade: '5 de Maio',
    medicamentos: ['Paracetamol 500mg'],
    orientacao: 'Uso se febre, respeitando intervalo mínimo de 6 horas.',
    status: 'expirada',
  },
]

const records: MedicalRecord[] = [
  {
    id: 'hist-1',
    medico: 'Dra. Marina Rocha',
    especialidade: 'Cardiologia',
    data: '10 de Maio',
    diagnostico: 'Pressão arterial elevada',
    conduta: 'Ajuste de medicação e retorno em 30 dias.',
    receita: true,
  },
  {
    id: 'hist-2',
    medico: 'Dra. Paula Costa',
    especialidade: 'Pediatria',
    data: '5 de Maio',
    diagnostico: 'Alergia respiratória',
    conduta: 'Antialérgico e hidratação nasal.',
    receita: true,
  },
  {
    id: 'hist-3',
    medico: 'Dr. Pedro Oliveira',
    especialidade: 'Oftalmologia',
    data: '1 de Maio',
    diagnostico: 'Miopia leve',
    conduta: 'Prescrição de lentes corretivas.',
    receita: false,
  },
]

interface AppDataContextType {
  doctors: Doctor[]
  appointments: Appointment[]
  prescriptions: Prescription[]
  records: MedicalRecord[]
  bookAppointment: (doctor: Doctor) => Promise<Appointment>
  cancelAppointment: (id: string) => Promise<void>
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined)

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const { user } = useAuth()

  const bookAppointment = async (doctor: Doctor) => {
    const [data = 'Próximo dia', hora = '09:00'] = (doctor.proximoHorario ?? 'Próximo dia, 09:00').split(', ')
    const appointment: Appointment = {
      id: `apt-${Date.now()}`,
      medico: doctor.nome,
      especialidade: doctor.especialidade,
      data,
      hora,
      sala: doctor.local ?? 'Recepção',
      status: 'confirmado',
      tipo: doctor.local === 'Teleconsulta' ? 'online' : 'presencial',
      observacao: 'Consulta criada para demonstração. Confirmação enviada por SMS.',
    }

    setAppointments((current) => [appointment, ...current])

    try {
      const remoteAppointment = await createAppointment(user, doctor, appointment)
      const remoteId = typeof remoteAppointment?.id === 'string' ? remoteAppointment.id : undefined

      if (remoteId) {
        const syncedAppointment = { ...appointment, remoteId }
        setAppointments((current) =>
          current.map((item) => (item.id === appointment.id ? syncedAppointment : item)),
        )
        return syncedAppointment
      }
    } catch (error) {
    }

    return appointment
  }

  const cancelAppointment = async (id: string) => {
    const appointment = appointments.find((item) => item.id === id)

    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status: 'cancelado' } : appointment,
      ),
    )

    if (appointment) {
      try {
        await persistAppointmentStatus(user, appointment, 'cancelado')
      } catch (error) {
      }
    }
  }

  const value = useMemo(
    () => ({
      doctors: initialDoctors,
      appointments,
      prescriptions,
      records,
      bookAppointment,
      cancelAppointment,
    }),
    [appointments, user],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const context = useContext(AppDataContext)
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider')
  }
  return context
}
