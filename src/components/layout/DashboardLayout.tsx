import type { ReactNode } from 'react'
import ThemeToggle from '../ui/ThemeToggle'

interface DashboardLayoutProps {
  children: ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Космічні запуски
          </h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-4 space-y-4">{children}</main>
      <footer className="border-t border-slate-200 dark:border-slate-800 p-4 text-sm text-slate-500 dark:text-slate-400 text-center">
        Лабораторна робота №3. Черепанов Ілля. Група ЗІПЗ-24-1.
      </footer>
    </div>
  )
}

export default DashboardLayout
