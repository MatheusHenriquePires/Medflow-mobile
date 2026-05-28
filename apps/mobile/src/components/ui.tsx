import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'
import type { Appointment } from '../types'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger-text' | 'accent'
type ButtonSize = 'sm' | 'md' | 'lg'

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

export function AppButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: AppButtonProps) {
  return (
    <button
      type="button"
      className={`app-button app-button--${variant} app-button--${size} ${
        fullWidth ? 'app-button--full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: ReactNode
  error?: string
}

export function AppInput({ label, icon, error, id, className = '', ...props }: AppInputProps) {
  return (
    <label className={`app-input ${error ? 'app-input--error' : ''} ${className}`} htmlFor={id}>
      <span className="app-input__label">{label}</span>
      <span className="app-input__control">
        {icon && <span className="app-input__icon">{icon}</span>}
        <input id={id} {...props} />
      </span>
      {error && <span className="app-input__error">{error}</span>}
    </label>
  )
}

interface AppCardProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
}

export function AppCard({ children, className = '', as: Component = 'div' }: AppCardProps) {
  return <Component className={`app-card ${className}`}>{children}</Component>
}

type Status = Appointment['status'] | 'ativa' | 'expirada' | 'disponivel'

const statusLabels: Record<Status, string> = {
  confirmado: 'Confirmada',
  pendente: 'Pendente',
  cancelado: 'Cancelada',
  concluído: 'Concluída',
  ativa: 'Ativa',
  expirada: 'Expirada',
  disponivel: 'Disponível hoje',
}

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`status-badge status-badge--${status}`}>{statusLabels[status]}</span>
}

const avatarColors = ['blue', 'teal', 'mint', 'indigo', 'sky', 'cyan']

export function AvatarInitials({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  const hash = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const color = avatarColors[hash % avatarColors.length]

  return <span className={`avatar-initials avatar-initials--${size} avatar-initials--${color}`}>{initials}</span>
}

export function MedflowLogo() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="medflow-logo" aria-label="Medflow">
      {!imgError ? (
        <img
          src="/assets/medflow-logo.png"
          alt="Medflow"
          className="medflow-logo__img"
          onError={() => setImgError(true)}
          width={52}
          height={52}
        />
      ) : (
        <svg width="52" height="52" viewBox="0 0 52 52" role="img" aria-hidden="true">
          <rect width="52" height="52" rx="16" fill="url(#medflowGradient)" />
          <path d="M26 13v26M13 26h26" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
          <defs>
            <linearGradient id="medflowGradient" x1="8" y1="6" x2="44" y2="46">
              <stop stopColor="#0A6EBD" />
              <stop offset="1" stopColor="#00C9A7" />
            </linearGradient>
          </defs>
        </svg>
      )}
      <span>Medflow</span>
    </div>
  )
}
