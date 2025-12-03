"use client"

import type React from "react"

import { Mic, Paperclip, Send } from "lucide-react"
import { useState } from "react"

interface LargeInputBarProps {
  placeholder?: string
  onSubmit?: (value: string) => void
}

export function LargeInputBar({
  placeholder = "Ceritakan gejala kamu atau tanyakan tentang kesehatan...",
  onSubmit,
}: LargeInputBarProps) {
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim() && onSubmit) {
      onSubmit(value)
      setValue("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-border p-4 flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        {/* File Attachment */}
        <button
          type="button"
          className="p-3 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-base"
        />

        {/* Voice Input */}
        <button
          type="button"
          className="p-3 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!value.trim()}
          className="p-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  )
}
