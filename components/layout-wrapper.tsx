"use client"

import { usePathname } from "next/navigation"
import { LeftSidebar } from "@/components/left-sidebar"
import { TopHeader } from "@/components/top-header"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPublicPage = pathname === "/" || pathname === "/login"

  if (isPublicPage) {
    return <>{children}</>
  }

  return (
    <>
      <LeftSidebar />
      <TopHeader />
      <main className="fixed inset-0 lg:ml-64 lg:mt-20 mt-14 ml-0 overflow-auto">{children}</main>
    </>
  )
}
