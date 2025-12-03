"use client"

import { Home, MessageSquare, BarChart3, Settings, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: Home, label: "Beranda", href: "/" },
  { icon: MessageSquare, label: "Chat AI", href: "/chatbot" },
  { icon: BarChart3, label: "Data Explorer", href: "/data-explorer" },
  { icon: Settings, label: "Pengaturan", href: "/settings" },
]

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-primary via-primary-light to-primary-accent transition-all duration-200 shadow-soft z-50 pt-20 ${
          isOpen ? "w-60" : "w-[72px]"
        }`}
      >
        <div className="flex flex-col h-full px-3 py-6 gap-2">
          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-20 right-3 p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Navigation items */}
          <nav className="flex flex-col gap-1 mt-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-white/30 border-l-4 border-white text-white font-semibold shadow-soft"
                        : "text-white/80 hover:bg-white/15"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Footer section */}
          {isOpen && (
            <div className="mt-auto pt-6 border-t border-white/20">
              <p className="text-xs text-white/70 text-center px-2">Teman Sehat v1.0</p>
            </div>
          )}
        </div>
      </aside>

      {/* Content shift and overlay */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} aria-hidden="true" />
          <div className={`transition-all duration-200 ${isOpen ? "ml-60" : "ml-[72px]"}`} />
        </>
      )}
    </>
  )
}
