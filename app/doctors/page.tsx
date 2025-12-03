"use client"

import { TopHeader } from "@/components/top-header"
import { Star, MapPin, Clock } from "lucide-react"

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  reviews: number
  distance: string
  availability: string
  image: string
}

export default function DoctorsPage() {
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "dr. Budi Santoso",
      specialty: "Dokter Umum",
      rating: 4.8,
      reviews: 342,
      distance: "500m",
      availability: "Tersedia hari ini",
      image: "/caring-doctor.png",
    },
    {
      id: "2",
      name: "dr. Siti Rahayu",
      specialty: "Dokter Gigi",
      rating: 4.9,
      reviews: 258,
      distance: "1.2 km",
      availability: "Tersedia besok",
      image: "/caring-doctor.png",
    },
    {
      id: "3",
      name: "dr. Ahmad Wijaya",
      specialty: "Spesialis Penyakit Dalam",
      rating: 4.7,
      reviews: 421,
      distance: "2.1 km",
      availability: "Tersedia dalam 3 hari",
      image: "/caring-doctor.png",
    },
  ]

  return (
    <div className="min-h-screen">
      <TopHeader title="Cari Dokter" />

      <div className="pt-28 pb-12 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Filter Section */}
          <div className="mb-8 flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm">Semua</button>
            <button className="px-4 py-2 bg-white border border-border rounded-lg font-medium text-sm hover:bg-muted transition-colors">
              Dokter Umum
            </button>
            <button className="px-4 py-2 bg-white border border-border rounded-lg font-medium text-sm hover:bg-muted transition-colors">
              Spesialis
            </button>
            <button className="px-4 py-2 bg-white border border-border rounded-lg font-medium text-sm hover:bg-muted transition-colors">
              Rating Tertinggi
            </button>
          </div>

          {/* Doctors Grid */}
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-xl p-6 shadow-soft hover:shadow-lg transition-all flex items-center gap-6"
              >
                {/* Doctor Image */}
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                {/* Doctor Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{doctor.specialty}</p>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-foreground">{doctor.rating}</span>
                      <span>({doctor.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {doctor.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {doctor.availability}
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-lg hover:shadow-lg transition-all whitespace-nowrap">
                  Pesan Janji
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
