import { useNavigate } from 'react-router-dom'

interface TopBarProps {
  title: string
  showBack?: boolean
  onBackClick?: () => void
}

export function TopBar({ title, showBack = true, onBackClick }: TopBarProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBackClick) {
      onBackClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="topbar">
      {showBack && (
        <button
          type="button"
          className="topbar__back"
          onClick={handleBack}
          aria-label="Voltar"
        >
          ←
        </button>
      )}
      <span className="topbar__title">{title}</span>
    </div>
  )
}
