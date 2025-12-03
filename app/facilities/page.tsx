"use client"

import { TopHeader } from "@/components/top-header"
import { FacilityCard } from "@/components/facility-card"
import { MapPin, Filter, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface Facility {
  id: string
  name: string
  type: "Klinik" | "Rumah Sakit" | "Puskesmas"
  distance: string
  rating: number
  address: string
  phone: string
  hours: string
  bpjsCovered: boolean
}

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string>("semua")

  useEffect(() => {
    // Request geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
          simulateFacilitiesFetch()
        },
        () => {
          // If geolocation fails, use default location
          setUserLocation("Jakarta Pusat")
          simulateFacilitiesFetch()
        },
      )
    }
  }, [])

  const simulateFacilitiesFetch = () => {
    setTimeout(() => {
      setFacilities([
        {
          id: "1",
          name: "Klinik Sehat Bersama",
          type: "Klinik",
          distance: "500m",
          rating: 4.8,
          address: "Jl. Merdeka No. 123, Jakarta Pusat",
          phone: "(021) 1234-5678",
          hours: "06:00 - 21:00",
          bpjsCovered: true,
        },
        {
          id: "2",
          name: "Rumah Sakit Pusat Jaya",
          type: "Rumah Sakit",
          distance: "1.2 km",
          rating: 4.9,
          address: "Jl. Ahmad Yani No. 456, Jakarta Pusat",
          phone: "(021) 9876-5432",
          hours: "24 Jam",
          bpjsCovered: true,
        },
        {
          id: "3",
          name: "Puskesmas Wilayah 3",
          type: "Puskesmas",
          distance: "800m",
          rating: 4.6,
          address: "Jl. Sudirman No. 789, Jakarta Pusat",
          phone: "(021) 5555-6666",
          hours: "07:00 - 15:00",
          bpjsCovered: true,
        },
        {
          id: "4",
          name: "Klinik Gigi Sejahtera",
          type: "Klinik",
          distance: "1.5 km",
          rating: 4.7,
          address: "Jl. Gatot Subroto No. 321, Jakarta Selatan",
          phone: "(021) 3333-4444",
          hours: "08:00 - 20:00",
          bpjsCovered: false,
        },
        {
          id: "5",
          name: "Klinik Ibu dan Anak",
          type: "Klinik",
          distance: "2.1 km",
          rating: 4.9,
          address: "Jl. Rasuna Said No. 654, Jakarta Selatan",
          phone: "(021) 7777-8888",
          hours: "07:00 - 18:00",
          bpjsCovered: true,
        },
      ])
      setLoading(false)
    }, 1500)
  }

  const filteredFacilities = selectedType === "semua" ? facilities : facilities.filter((f) => f.type === selectedType)

  return (
    <div className="min-h-screen">
      <TopHeader title="Cari Faskes Terdekat" />

      <div className="pt-28 pb-12 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Location Header */}
          {userLocation && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-900">Lokasi Anda</p>
                <p className="text-sm text-blue-700">{userLocation}</p>
              </div>
            </div>
          )}

          {/* Filter Section */}
          <div className="mb-8 flex items-center gap-4 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button
              onClick={() => setSelectedType("semua")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                selectedType === "semua" ? "bg-primary text-white" : "bg-white border border-border hover:bg-muted"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setSelectedType("Klinik")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                selectedType === "Klinik" ? "bg-primary text-white" : "bg-white border border-border hover:bg-muted"
              }`}
            >
              Klinik
            </button>
            <button
              onClick={() => setSelectedType("Rumah Sakit")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                selectedType === "Rumah Sakit"
                  ? "bg-primary text-white"
                  : "bg-white border border-border hover:bg-muted"
              }`}
            >
              Rumah Sakit
            </button>
            <button
              onClick={() => setSelectedType("Puskesmas")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                selectedType === "Puskesmas" ? "bg-primary text-white" : "bg-white border border-border hover:bg-muted"
              }`}
            >
              Puskesmas
            </button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
              <p className="text-muted-foreground">Mencari faskes terdekat...</p>
            </div>
          ) : (
            <>
              {/* Facilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFacilities.map((facility) => (
                  <FacilityCard
                    key={facility.id}
                    name={facility.name}
                    type={facility.type}
                    distance={facility.distance}
                    rating={facility.rating}
                    address={facility.address}
                    phone={facility.phone}
                    hours={facility.hours}
                    bpjsCovered={facility.bpjsCovered}
                  />
                ))}
              </div>

              {filteredFacilities.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Tidak ada faskes ditemukan</p>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:shadow-lg transition-all">
                    Ubah Filter
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
