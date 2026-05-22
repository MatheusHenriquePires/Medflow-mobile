import type { ReactNode } from 'react'
import { StatusBar } from './StatusBar'
import { BottomNav } from './BottomNav'

interface LayoutProps {
  children: ReactNode
  showBottomNav?: boolean
  statusBarTheme?: 'light' | 'dark'
}

export function Layout({
  children,
  showBottomNav = true,
  statusBarTheme = 'light',
}: LayoutProps) {
  return (
    <div className="app-container">
      <StatusBar theme={statusBarTheme} />
      <main className="app-main">{children}</main>
      {showBottomNav && <BottomNav />}
    </div>
  )
}
