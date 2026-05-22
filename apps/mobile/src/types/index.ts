import type { ReactNode as RN } from 'react'

export type ReactNode = RN

export interface User {
  nome: string
  email: string
  telefone: string
  senha: string
  cpf?: string
  dataNascimento?: string
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
}

export interface Doctor {
  id: string
  nome: string
  especialidade: string
  rating: number
  imagem?: string
  disponivel: boolean
}

export interface Notification {
  id: string
  tipo: 'appointment' | 'reminder' | 'message' | 'info'
  titulo: string
  mensagem: string
  data: string
  lida: boolean
}
