"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Calendar, History, Microscope, X, Settings, User, LogOut, Heart } from "lucide-react"
import { toast } from "sonner"

export function LeftSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/analisis-kulit", label: "Analisis Penyakit Kulit", icon: Microscope },
    // { href: "/booking-faskes", label: "Booking Faskes", icon: Calendar },
    // { href: "/riwayat", label: "Riwayat Chat", icon: History },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/profile", label: "Profile", icon: User },
  ]

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      toast.success("Logout berhasil")
      router.push("/")
      router.refresh()
    } catch (error) {
      toast.error("Gagal logout")
    }
  }

  const handleLogoClick = () => {
    if (window.innerWidth < 1024) {
      // Mobile: toggle menu visibility
      setIsMobileMenuOpen(!isMobileMenuOpen)
    } else {
      // Desktop: toggle sidebar expansion
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-primary via-accent to-primary-light text-sidebar-foreground transition-all duration-300 z-40 flex flex-col shadow-lg
          ${isExpanded ? "w-64" : "w-20"} 
          flex
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* Logo Header - Clickable to toggle */}
        <div className="p-6 border-b border-white/20 flex items-center justify-between">
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-1 p-0 rounded-lg"
          title={isExpanded ? "Tutup sidebar" : "Buka sidebar"}
        >
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Teman Sehat Logo" 
              className="w-6 h-6 object-contain"
            />
          </div>
          {isExpanded && <h1 className="text-lg font-bold whitespace-nowrap">Teman Sehat</h1>}
        </button>

          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors ml-2"
              title="Tutup sidebar"
            >
              <X className="w-5 h-5 flex-shrink-0" />
            </button>
          )}
        </div>

        {/* Main Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  isActive ? "bg-white/30 shadow-soft" : "hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isExpanded && <span className="font-medium text-sm">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/20 space-y-2">
          {/* <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
          >
            <X className={`w-5 h-5 flex-shrink-0 transition-transform ${!isExpanded ? "rotate-180" : ""}`} />
            {isExpanded && <span className="font-medium text-sm">Sembunyikan</span>}
          </button> */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-all text-red-200 hover:text-red-100"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isExpanded && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
