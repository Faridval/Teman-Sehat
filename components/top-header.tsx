"use client"

import { Moon, Sun, MapPin, User, Settings } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface TopHeaderProps {
  sidebarExpanded?: boolean
}

export function TopHeader({ sidebarExpanded = true }: TopHeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLocationOn, setIsLocationOn] = useState(false)

  const handleLocationToggle = () => {
    if (!isLocationOn) {
      // Request location permission only when user presses toggle
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Location enabled:", position.coords)
            setIsLocationOn(true)
          },
          (error) => {
            console.error("Location error:", error)
          },
        )
      }
    } else {
      setIsLocationOn(false)
    }
  }

  return (
    <header
      className={`fixed top-0 right-0 h-14 lg:h-20 bg-white border-b border-border shadow-soft z-30 transition-all duration-300
        lg:left-64 left-0
      `}
    >
      <div className="h-full px-4 lg:px-8 flex items-center justify-end gap-3 lg:gap-6">
        {/* Location Toggle */}
        {/* <button
          onClick={handleLocationToggle}
          className={`p-2 rounded-lg transition-all ${
            isLocationOn ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
          }`}
          title="Toggle Location"
        >
          <MapPin className="w-4 h-4 lg:w-5 lg:h-5" />
        </button> */}

        {/* Night Mode Toggle */}
        {/* <button
          onClick={() => {
            setIsDarkMode(!isDarkMode)
            if (!isDarkMode) {
              document.documentElement.classList.add("dark")
            } else {
              document.documentElement.classList.remove("dark")
            }
          }}
          className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
          title="Toggle Night Mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4 lg:w-5 lg:h-5" /> : <Moon className="w-4 h-4 lg:w-5 lg:h-5" />}
        </button> */}

        {/* Profile Link */}
        {/* <Link
          href="/profile"
          className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
          title="Profile"
        >
          <User className="w-4 h-4 lg:w-5 lg:h-5" />
        </Link>

        {/* Settings Link */}
        {/* <Link
          href="/settings"
          className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
          title="Settings"
        >
          <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
        </Link> */} 
      </div>
    </header>
  )
}
