interface StatusBarProps {
  theme?: 'light' | 'dark'
}

export function StatusBar({ theme = 'light' }: StatusBarProps) {
  return (
    <div className={`status-bar ${theme === 'dark' ? 'is-dark' : 'is-light'}`}>
      <span>9:41</span>
      <div className="status-bar__icons" aria-hidden="true">
        <span>●●●</span>
      </div>
    </div>
  )
}
