"use client"

import { User, Mail, FileText, Edit2, LogOut } from "lucide-react"
import { useState } from "react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Adi Prabowo",
    email: "adi.prabowo@email.com",
    phone: "082123456789",
    dateOfBirth: "1990-05-15",
    bpjsNumber: "0001234567890001",
  })

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-muted via-background to-background p-8 overflow-auto">
      <div className="max-w-2xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-foreground mb-2">Profil Saya</h1>
        <p className="text-muted-foreground mb-8">Kelola data pribadi dan informasi kesehatan Anda</p>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-6 border border-border">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>

          {/* Profile Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-foreground">{profile.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Nomor Telepon</label>
              <span className="text-foreground">{profile.phone}</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Tanggal Lahir</label>
              <span className="text-foreground">{profile.dateOfBirth}</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Nomor BPJS</label>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-foreground">{profile.bpjsNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-6 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Riwayat Medis</h2>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Alergi</h3>
              <p className="text-muted-foreground">Alergi kacang tanah, Alergi seafood</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Penyakit Kronis</h3>
              <p className="text-muted-foreground">Tidak ada</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Riwayat Operasi</h3>
              <p className="text-muted-foreground">Appendiktomi (2015)</p>
            </div>
          </div>
        </div>

        {/* Consultation Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-border">
            <p className="text-muted-foreground text-sm mb-2">Total Konsultasi</p>
            <p className="text-3xl font-bold text-primary">12</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-border">
            <p className="text-muted-foreground text-sm mb-2">Faskes Dikunjungi</p>
            <p className="text-3xl font-bold text-accent">5</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-border">
            <p className="text-muted-foreground text-sm mb-2">Dokter Konsultasi</p>
            <p className="text-3xl font-bold text-amber-500">8</p>
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors">
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </div>
  )
}
