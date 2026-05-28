import type { ReactNode as RN } from 'react'

export type ReactNode = RN

export interface User {
  id?: string
  nome: string
  email: string
  telefone: string
  senha: string
  cpf?: string
  dataNascimento?: string
  accessToken?: string
  isLoggedIn?: boolean
}

export interface Appointment {
  id: string
  especialidade: string
  medico: string
  data: string
  hora: string
  sala: string
  tipo: 'presencial' | 'online'
  status: 'confirmado' | 'pendente' | 'concluído' | 'cancelado'
  observacao?: string
  remoteId?: string
}

export interface Doctor {
  id: string
  nome: string
  especialidade: string
  rating: number
  imagem?: string
  disponivel: boolean
  consultas?: number
  preco?: string
  proximoHorario?: string
  local?: string
}

export interface Prescription {
  id: string
  medico: string
  especialidade: string
  data: string
  validade: string
  medicamentos: string[]
  orientacao: string
  status: 'ativa' | 'expirada'
}

export interface MedicalRecord {
  id: string
  medico: string
  especialidade: string
  data: string
  diagnostico: string
  conduta: string
  receita: boolean
}

export interface Notification {
  id: string
  tipo: 'appointment' | 'reminder' | 'message' | 'info'
  titulo: string
  mensagem: string
  data: string
  lida: boolean
}
