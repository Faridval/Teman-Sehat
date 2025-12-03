"use client"

import { useState } from "react"
import { Search, Star, MapPin, Clock, TrendingUp } from "lucide-react"

export default function CariDokter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredDoctors, setFilteredDoctors] = useState([])

  const doctors = [
    {
      id: 1,
      name: "Dr. Budi Santoso",
      specialty: "Dokter Umum",
      rating: 4.8,
      reviews: 245,
      distance: "1.2 km",
      available: "Tersedia hari ini",
      price: "Rp 150.000",
      recommended: true,
    },
    {
      id: 2,
      name: "Dr. Siti Nurhaliza",
      specialty: "Spesialis Penyakit Dalam",
      rating: 4.9,
      reviews: 312,
      distance: "2.5 km",
      available: "Tersedia besok",
      price: "Rp 250.000",
      recommended: true,
    },
    {
      id: 3,
      name: "Dr. Ahmad Rizki",
      specialty: "Dokter Gigi",
      rating: 4.7,
      reviews: 189,
      distance: "800 m",
      available: "Tersedia hari ini",
      price: "Rp 200.000",
    },
  ]

  const handleSearch = (query) => {
    const filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredDoctors(filtered)
  }

  const displayDoctors =
    filteredDoctors.length > 0
      ? filteredDoctors.sort((a, b) => {
          if (a.recommended !== b.recommended) return b.recommended ? 1 : -1
          if (a.rating !== b.rating) return b.rating - a.rating
          return 0
        })
      : doctors.sort((a, b) => {
          if (a.recommended !== b.recommended) return b.recommended ? 1 : -1
          if (a.rating !== b.rating) return b.rating - a.rating
          return 0
        })

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-muted via-background to-background p-8">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-foreground mb-2">Cari Dokter</h1>
        <p className="text-muted-foreground mb-8">
          Temukan dokter terbaik sesuai kebutuhan kamu. Kami merekomendasikan dokter berdasarkan diagnosis terakhirmu.
        </p>

        {doctors.filter((d) => d.recommended).length > 0 && (
          <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-xl">
            <p className="text-sm font-semibold text-primary flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" />
              Rekomendasi Berdasarkan Diagnosis Terakhir
            </p>
            <p className="text-xs text-muted-foreground">Dokter-dokter ini sesuai dengan gejala yang kamu laporkan</p>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              handleSearch(e.target.value)
            }}
            placeholder="Cari dokter, spesialisasi, atau fasilitas..."
            className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Doctor Cards */}
        <div className="space-y-4">
          {displayDoctors.length > 0 ? (
            displayDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`bg-white rounded-2xl p-6 shadow-soft border-2 hover:shadow-lg transition-all ${
                  doctor.recommended ? "border-primary/30 bg-gradient-to-br from-white to-primary/5" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-foreground">{doctor.name}</h3>
                      {doctor.recommended && (
                        <span className="px-2 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                          Direkomendasikan
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{doctor.specialty}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-foreground">{doctor.rating}</span>
                        <span className="text-muted-foreground">({doctor.reviews} ulasan)</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {doctor.distance}
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {doctor.available}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg text-primary mb-4">{doctor.price}</p>
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-all text-sm">
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">Tidak ada dokter yang ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  )
}
