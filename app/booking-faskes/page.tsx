"use client"

import { useState } from "react"
import { Calendar, MapPin, Phone, MapIcon, Navigation2, X } from "lucide-react"

interface DialogState {
  isOpen: boolean
  type: "date" | "contact" | "confirmation" | null
  facilityId: number | null
}

export default function BookingFaskes() {
  const [selectedFaskes, setSelectedFaskes] = useState<number | null>(null)
  const [searchMethod, setSearchMethod] = useState<"list" | "region" | "gps">("list")
  const [dialog, setDialog] = useState<DialogState>({ isOpen: false, type: null, facilityId: null })
  const [selectedDate, setSelectedDate] = useState("")
  const [email, setEmail] = useState("")
  const [pin, setPin] = useState("")
  const [currentStep, setCurrentStep] = useState<"date" | "contact">("date")

  const faskes = [
    {
      id: 1,
      name: "Klinik Kesehatan Bersama",
      type: "Klinik",
      address: "Jl. Merdeka No. 123, Jakarta",
      distance: "1.2 km",
      phone: "021-1234567",
      whatsapp: "6281234567890",
      bpjs: true,
      rating: 4.7,
    },
    {
      id: 2,
      name: "Puskesmas Pelayanan Kesehatan",
      type: "Puskesmas",
      address: "Jl. Gatot Subroto No. 456, Jakarta",
      distance: "2.1 km",
      phone: "021-7654321",
      whatsapp: "6289876543210",
      bpjs: true,
      rating: 4.5,
    },
    {
      id: 3,
      name: "Rumah Sakit Harapan Sehat",
      type: "Rumah Sakit",
      address: "Jl. Ahmad Yani No. 789, Jakarta",
      distance: "3.5 km",
      phone: "021-9876543",
      whatsapp: "6285555555555",
      bpjs: true,
      rating: 4.9,
    },
  ]

  const handleUseLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location:", position.coords)
        },
        (error) => {
          console.error("Location error:", error)
        },
      )
    }
  }

  const handlePilihJadwal = (facilityId: number) => {
    setSelectedFaskes(facilityId)
    setDialog({ isOpen: true, type: "date", facilityId })
    setCurrentStep("date")
    setSelectedDate("")
    setEmail("")
    setPin("")
  }

  const handleDateSubmit = () => {
    if (selectedDate) {
      setCurrentStep("contact")
    }
  }

  const handleContactSubmit = () => {
    if (email && pin) {
      setDialog({ isOpen: true, type: "confirmation", facilityId: dialog.facilityId })
    }
  }

  const handleConfirm = () => {
    const facility = faskes.find((f) => f.id === dialog.facilityId)
    if (facility) {
      const whatsappUrl = `https://wa.me/${facility.whatsapp}?text=Saya%20ingin%20booking%20jadwal%20pada%20${selectedDate}`
      window.open(whatsappUrl, "_blank")
    }
    handleCloseDialog()
  }

  const handleCloseDialog = () => {
    setDialog({ isOpen: false, type: null, facilityId: null })
    setSelectedDate("")
    setEmail("")
    setPin("")
    setCurrentStep("date")
    setSelectedFaskes(null)
  }

  const currentFacility = faskes.find((f) => f.id === dialog.facilityId)

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-muted via-background to-background p-8 overflow-auto">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-foreground mb-2">Booking Fasilitas Kesehatan</h1>
        <p className="text-muted-foreground mb-8">Kami bantu sampai selesai. Pilih faskes terdekat dengan mudah.</p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <button
            onClick={() => setSearchMethod("list")}
            className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
              searchMethod === "list"
                ? "bg-primary text-white border-primary"
                : "border-border text-foreground hover:border-primary"
            }`}
          >
            <MapIcon className="w-4 h-4 inline-block mr-2" />
            Daftar
          </button>
          <button
            onClick={() => setSearchMethod("region")}
            className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
              searchMethod === "region"
                ? "bg-primary text-white border-primary"
                : "border-border text-foreground hover:border-primary"
            }`}
          >
            <MapPin className="w-4 h-4 inline-block mr-2" />
            Wilayah
          </button>
          <button
            onClick={() => {
              setSearchMethod("gps")
              handleUseLocation()
            }}
            className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
              searchMethod === "gps"
                ? "bg-primary text-white border-primary"
                : "border-border text-foreground hover:border-primary"
            }`}
          >
            <Navigation2 className="w-4 h-4 inline-block mr-2" />
            GPS
          </button>
        </div>

        {/* Region Search */}
        {searchMethod === "region" && (
          <div className="mb-8 p-6 bg-white rounded-2xl border border-border shadow-soft">
            <h3 className="font-bold text-foreground mb-4">Cari Berdasarkan Wilayah</h3>
            <div className="space-y-4">
              <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Pilih Provinsi...</option>
                <option>Jakarta</option>
                <option>Jawa Barat</option>
              </select>
              <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Pilih Kabupaten...</option>
                <option>Jakarta Pusat</option>
                <option>Jakarta Selatan</option>
              </select>
              <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Pilih Kecamatan...</option>
                <option>Menteng</option>
                <option>Setiabudi</option>
              </select>
            </div>
          </div>
        )}

        {/* GPS Status */}
        {searchMethod === "gps" && (
          <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-xl">
            <p className="text-sm text-primary font-semibold">
              Menggunakan lokasi kamu untuk menemukan faskes terdekat
            </p>
          </div>
        )}

        {/* Facility Cards */}
        <div className="space-y-4">
          {faskes.map((facility) => (
            <div
              key={facility.id}
              onClick={() => setSelectedFaskes(selectedFaskes === facility.id ? null : facility.id)}
              className={`bg-white rounded-2xl p-6 shadow-soft border-2 transition-all cursor-pointer ${
                selectedFaskes === facility.id ? "border-primary" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{facility.name}</h3>
                  <p className="text-sm text-primary font-semibold">{facility.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{facility.rating}★</p>
                  <p className="text-sm text-muted-foreground">{facility.distance}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {facility.address}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {facility.phone}
                </div>
                {facility.bpjs && (
                  <div className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    BPJS Diterima
                  </div>
                )}
              </div>

              {selectedFaskes === facility.id && (
                <div className="space-y-3">
                  <button
                    onClick={() => handlePilihJadwal(facility.id)}
                    className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Pilih Jadwal
                  </button>
                  <a href={`https://wa.me/${facility.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <button className="w-full px-4 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all">
                      Hubungi via WhatsApp
                    </button>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {dialog.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-lg max-w-md w-full max-h-96 overflow-y-auto">
            {/* Date Selection Step */}
            {currentStep === "date" && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Pilih Jadwal</h2>
                  <button onClick={handleCloseDialog} className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {currentFacility && (
                  <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm font-semibold text-foreground">{currentFacility.name}</p>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-2">Tanggal Jadwal</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <button
                  onClick={handleDateSubmit}
                  disabled={!selectedDate}
                  className="w-full px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent disabled:opacity-50 transition-all"
                >
                  Lanjutkan
                </button>
              </div>
            )}

            {/* Contact Information Step */}
            {currentStep === "contact" && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Masukkan Data</h2>
                  <button
                    onClick={() => setCurrentStep("date")}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="nama@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">PIN (6 digit)</label>
                    <input
                      type="password"
                      value={pin}
                      onChange={(e) => setPin(e.target.value.slice(0, 6))}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="••••••"
                      maxLength={6}
                    />
                  </div>
                </div>

                <button
                  onClick={handleContactSubmit}
                  disabled={!email || pin.length !== 6}
                  className="w-full px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent disabled:opacity-50 transition-all"
                >
                  Konfirmasi
                </button>
              </div>
            )}

            {/* Confirmation Step */}
            {dialog.type === "confirmation" && (
              <div className="p-8 text-center">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Konfirmasi</h2>
                  <button onClick={handleCloseDialog} className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-semibold">Jadwal berhasil dikirim!</p>
                  <p className="text-xs text-green-600 mt-1">Siap terhubung via WhatsApp?</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleConfirm}
                    className="w-full px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition-all"
                  >
                    Buka WhatsApp
                  </button>
                  <button
                    onClick={handleCloseDialog}
                    className="w-full px-4 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
