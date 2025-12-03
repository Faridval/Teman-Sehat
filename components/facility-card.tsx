"use client"

import { MapPin, Phone, Clock, Navigation } from "lucide-react"

interface FacilityCardProps {
  name: string
  type: string
  distance: string
  rating: number
  address: string
  phone: string
  hours: string
  bpjsCovered: boolean
}

export function FacilityCard({ name, type, distance, rating, address, phone, hours, bpjsCovered }: FacilityCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all overflow-hidden">
      {/* Header with distance badge */}
      <div className="relative h-40 bg-gradient-to-br from-primary/20 to-accent-teal/20 flex items-center justify-center">
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
          {distance}
        </div>
        <MapPin className="w-16 h-16 text-primary/30" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{type}</p>
          </div>
          {bpjsCovered && (
            <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold">BPJS</span>
          )}
        </div>

        <div className="space-y-3 mb-5 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 flex-shrink-0" />
            {phone}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 flex-shrink-0" />
            {hours}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">{rating}</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full ${i < Math.floor(rating) ? "bg-amber-400" : "bg-muted"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white font-medium text-sm rounded-lg hover:shadow-lg transition-all">
            <Navigation className="w-4 h-4" />
            Rute
          </button>
          <button className="flex-1 px-4 py-2.5 bg-white border border-border text-foreground font-medium text-sm rounded-lg hover:bg-muted transition-all">
            Hubungi
          </button>
        </div>
      </div>
    </div>
  )
}
