import type { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 p-4">
        <h1 className="text-xl font-semibold">Космічні запуски</h1>
      </header>
      <main className="max-w-5xl mx-auto p-4 space-y-4">{children}</main>
      <footer className="border-t border-slate-200 p-4 text-sm text-slate-500 text-center">
        Лабораторна робота №1. Черепанов Ілля. Група ЗІПЗ-24-1.
      </footer>
    </div>
  )
}

export default DashboardLayout
