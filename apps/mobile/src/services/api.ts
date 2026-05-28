import type { Appointment, Doctor, User } from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http:

interface ApiEnvelope<T> {
  data: T
  error: unknown
  status: number
}

async function request<T>(
  path: string,
  options: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, headers, ...fetchOptions } = options
  const response = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null

  if (!response.ok || !payload) {
    const message =
      typeof payload?.error === 'object' && payload.error && 'message' in payload.error
        ? String(payload.error.message)
        : 'Não foi possível concluir a operação.'

    throw new Error(message)
  }

  return payload.data
}

interface AuthResponse {
  user: {
    id: string
    email?: string
    user_metadata?: Record<string, unknown>
  }
  profile: {
    id: string
    nome: string
    email: string
    role: string
    telefone?: string | null
    cpf?: string | null
  }
  session?: {
    access_token: string
  }
}

function toUser(response: AuthResponse, fallbackPassword = ''): User {
  const metadata = response.user.user_metadata ?? {}

  return {
    id: response.profile.id,
    nome: response.profile.nome,
    email: response.profile.email,
    telefone: response.profile.telefone ?? String(metadata.telefone ?? ''),
    senha: fallbackPassword,
    cpf: response.profile.cpf ?? (typeof metadata.cpf === 'string' ? metadata.cpf : undefined),
    dataNascimento:
      typeof metadata.dataNascimento === 'string' ? metadata.dataNascimento : undefined,
    accessToken: response.session?.access_token,
  }
}

export async function signupUser(user: User) {
  const response = await request<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      nome: user.nome,
      email: user.email,
      password: user.senha,
      telefone: user.telefone,
      cpf: user.cpf,
      dataNascimento: user.dataNascimento,
      role: 'PATIENT',
    }),
  })

  return loginUser(user.email, user.senha, response)
}

export async function loginUser(
  email: string,
  password: string,
  fallbackResponse?: AuthResponse,
) {
  const response =
    fallbackResponse?.session
      ? fallbackResponse
      : await request<AuthResponse>('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        })

  return toUser(response, password)
}

export async function updateProfile(user: User, updates: Partial<User>) {
  if (!user.accessToken) {
    throw new Error('Sessão expirada. Faça login novamente.')
  }

  const response = await request<AuthResponse['profile']>('/users/me/profile', {
    method: 'PATCH',
    token: user.accessToken,
    body: JSON.stringify({
      nome: updates.nome,
      email: updates.email,
      telefone: updates.telefone,
      cpf: updates.cpf,
      dataNascimento: updates.dataNascimento,
    }),
  })

  return {
    ...user,
    ...updates,
    id: response.id,
    nome: response.nome,
    email: response.email,
  }
}

export async function createAppointment(user: User | null, doctor: Doctor, appointment: Appointment) {
  if (!user?.accessToken) {
    return null
  }

  return request<Record<string, unknown>>('/appointments', {
    method: 'POST',
    token: user.accessToken,
    body: JSON.stringify({
      scheduled_at: toScheduledAt(appointment),
      status: appointment.status.toUpperCase(),
      notes: [
        appointment.observacao,
        `Médico: ${doctor.nome}`,
        `Especialidade: ${doctor.especialidade}`,
        `Local: ${appointment.sala}`,
        `Tipo: ${appointment.tipo}`,
        doctor.preco ? `Preço: ${doctor.preco}` : null,
      ]
        .filter(Boolean)
        .join(' | '),
    }),
  })
}

export async function persistAppointmentStatus(
  user: User | null,
  appointment: Appointment,
  status: Appointment['status'],
) {
  if (!user?.accessToken || !appointment.remoteId) {
    return null
  }

  return request<Record<string, unknown>>(`/appointments/${appointment.remoteId}`, {
    method: 'PATCH',
    token: user.accessToken,
    body: JSON.stringify({ status: status.toUpperCase() }),
  })
}

function toScheduledAt(appointment: Appointment) {
  const scheduledDate = new Date()
  const [hours = '9', minutes = '0'] = appointment.hora.split(':')

  if (appointment.data.toLowerCase().includes('amanhã')) {
    scheduledDate.setDate(scheduledDate.getDate() + 1)
  }

  scheduledDate.setHours(Number(hours), Number(minutes), 0, 0)
  return scheduledDate.toISOString()
}
