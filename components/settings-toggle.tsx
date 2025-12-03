"use client"

import { useState } from "react"

interface ToggleProps {
  label: string
  description?: string
  defaultValue?: boolean
  onChange?: (value: boolean) => void
}

export function SettingsToggle({ label, description, defaultValue = false, onChange }: ToggleProps) {
  const [isEnabled, setIsEnabled] = useState(defaultValue)

  const handleToggle = () => {
    const newValue = !isEnabled
    setIsEnabled(newValue)
    onChange?.(newValue)
  }

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isEnabled ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isEnabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
}
