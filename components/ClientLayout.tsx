
'use client'

import { usePathname } from 'next/navigation'
import BottomNav from './BottomNav'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideBottomNavOnRoutes = ['/login']

  const shouldShowBottomNav = !hideBottomNavOnRoutes.includes(pathname)

  return (
    <>
      {children}
      {shouldShowBottomNav && <BottomNav />}
    </>
  )
}
