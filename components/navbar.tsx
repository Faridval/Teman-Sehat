"use client"
import { MessageCircle, MapPin, Stethoscope, HelpCircle, User, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { icon: MessageCircle, label: "Chat", href: "/chatbot" },
    { icon: MapPin, label: "Faskes", href: "/data-explorer" },
    { icon: Stethoscope, label: "Diagnosis", href: "/" },
    { icon: HelpCircle, label: "Bantuan", href: "/" },
    { icon: User, label: "Akun", href: "/settings" },
  ]

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg z-40">
        <div className="flex items-center justify-center px-4 py-3 gap-2 max-w-2xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <button
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-soft"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                  title={item.label}
                  aria-label={item.label}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Logo/Title - Optional top bar for branding */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-border z-30">
        <div className="px-6 py-4 flex items-center gap-3 max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-primary-accent p-1.5 rounded-lg">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <h1 className="font-bold text-base text-primary">Teman Sehat</h1>
            <p className="text-xs text-muted-foreground">Asisten Kesehatan Cerdas</p>
          </div>
        </div>
      </header>
    </>
  )
}
