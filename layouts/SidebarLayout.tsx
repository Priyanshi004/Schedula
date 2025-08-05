import { ReactNode } from 'react'

type SidebarLayoutProps = {
  children: ReactNode
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <div className="flex">
      {/* Removed the extra aside that was creating space */}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
