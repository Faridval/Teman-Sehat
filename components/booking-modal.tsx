"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  fascesName: string
  doctorName: string
}

export function BookingModal({ isOpen, onClose, fascesName, doctorName }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Konfirmasi Booking</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Fasilitas</p>
                <p className="font-semibold text-foreground">{fascesName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Dokter</p>
                <p className="font-semibold text-foreground">{doctorName}</p>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-all"
              >
                Lanjut ke Login
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-all"
              >
                Konfirmasi Booking
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full px-4 py-2 border border-border rounded-lg font-semibold hover:bg-muted transition-all"
              >
                Kembali
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
