"use client"

import { useState } from "react"
import { MapPin, Phone, Star, Clock } from "lucide-react"

export default function RumukanFaskes() {
  const [selectedFaskes, setSelectedFaskes] = useState(null)

  const recommendedFaskes = [
    {
      id: 1,
      name: "Klinik Kesehatan Bersama",
      type: "Klinik",
      address: "Jl. Merdeka No. 123, Jakarta Pusat",
      distance: "1.2 km",
      phone: "021-1234567",
      rating: 4.8,
      reviews: 245,
      bpjs: true,
      hours: "08:00 - 20:00",
      matchScore: 95,
    },
    {
      id: 2,
      name: "Puskesmas Pelayanan Kesehatan",
      type: "Puskesmas",
      address: "Jl. Gatot Subroto No. 456, Jakarta",
      distance: "2.1 km",
      phone: "021-7654321",
      rating: 4.5,
      reviews: 156,
      bpjs: true,
      hours: "08:00 - 16:00",
      matchScore: 88,
    },
    {
      id: 3,
      name: "Rumah Sakit Harapan Sehat",
      type: "Rumah Sakit",
      address: "Jl. Ahmad Yani No. 789, Jakarta",
      distance: "3.5 km",
      phone: "021-9876543",
      rating: 4.9,
      reviews: 412,
      bpjs: true,
      hours: "24 Jam",
      matchScore: 92,
    },
  ]

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-muted via-background to-background p-8 overflow-auto">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-foreground mb-2">Fasilitas Kesehatan Rujukan</h1>
        <p className="text-muted-foreground mb-8">
          Pilihan fasilitas kesehatan yang sesuai dengan gejala dan lokasi Anda
        </p>

        <div className="space-y-4">
          {recommendedFaskes.map((faskes) => (
            <div
              key={faskes.id}
              onClick={() => setSelectedFaskes(selectedFaskes === faskes.id ? null : faskes.id)}
              className={`bg-white rounded-2xl p-6 shadow-soft border-2 transition-all cursor-pointer ${
                selectedFaskes === faskes.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-foreground">{faskes.name}</h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {faskes.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{faskes.rating}</span>
                      <span>({faskes.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {faskes.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {faskes.hours}
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end">
                  <div className="text-2xl font-bold text-primary mb-2">{faskes.matchScore}%</div>
                  <span className="text-xs text-muted-foreground">Kesesuaian</span>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {faskes.address}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {faskes.phone}
                </div>
                {faskes.bpjs && (
                  <div className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    BPJS Diterima
                  </div>
                )}
              </div>

              {selectedFaskes === faskes.id && (
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-all">
                    Pesan Jadwal Sekarang
                  </button>
                  <a href={`tel:${faskes.phone}`}>
                    <button className="w-full px-4 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all">
                      Hubungi Faskes
                    </button>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
