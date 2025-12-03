"use client"

import { Bell, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header({ title = "Dashboard" }: { title?: string }) {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-background border-b border-border flex items-center justify-between px-6 shadow-soft z-40">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
          <span className="text-white font-bold text-lg">H</span>
        </div>
        <h1 className="text-lg font-semibold text-foreground hidden sm:block">HealthAI Faskes</h1>
      </div>

      <div className="text-lg font-semibold text-foreground text-center flex-1">{title}</div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer hover:shadow-soft transition-shadow">
          <span className="text-white font-semibold text-sm">JD</span>
        </div>
      </div>
    </header>
  )
}
