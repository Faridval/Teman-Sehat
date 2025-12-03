"use client"

import { Save } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-muted via-background to-background p-8 overflow-auto">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-foreground mb-2">Pengaturan</h1>
        <p className="text-muted-foreground mb-8">Kelola preferensi dan konfigurasi aplikasi Teman Sehat</p>

        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">Pengaturan Umum</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  defaultValue="Adi Prabowo"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Lokasi Utama</label>
                <select className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Jakarta</option>
                  <option>Bandung</option>
                  <option>Surabaya</option>
                  <option>Medan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">Notifikasi</h2>
            <div className="space-y-4">
              {[
                { label: "Email Notifications", desc: "Terima pemberitahuan melalui email" },
                { label: "Push Notifications", desc: "Pemberitahuan instan di aplikasi" },
                { label: "Laporan Harian", desc: "Terima ringkasan laporan harian" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>

          {/* AI Settings */}
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">Pengaturan AI Asisten</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Frekuensi Analisis</label>
                <select className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Real-time</option>
                  <option>Setiap jam</option>
                  <option>Harian</option>
                  <option>Mingguan</option>
                </select>
              </div>
              {[
                { label: "Analitik Lanjutan", desc: "Aktifkan analitik prediktif" },
                { label: "Optimasi Otomatis", desc: "Izinkan AI menyarankan peningkatan" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">Privasi & Data</h2>
            <div className="space-y-4">
              {[
                { label: "Pengumpulan Data", desc: "Izinkan pengumpulan data penggunaan" },
                { label: "Pelacakan Analitik", desc: "Izinkan pelacakan analitik anonim" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked={idx === 0} className="w-5 h-5" />
                </div>
              ))}
              <button className="w-full mt-4 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium">
                Download Data Saya
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3 pt-6">
            <button className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium">
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-all font-medium flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaved ? "Tersimpan!" : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
