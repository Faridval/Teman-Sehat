"use client"

import { TopHeader } from "@/components/top-header"
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle } from "lucide-react"

interface Appointment {
  id: string
  doctorName: string
  specialty: string
  date: string
  time: string
  location: string
  status: "upcoming" | "completed" | "cancelled"
}

export default function AppointmentsPage() {
  const appointments: Appointment[] = [
    {
      id: "1",
      doctorName: "dr. Budi Santoso",
      specialty: "Dokter Umum",
      date: "Besok, 21 Nov 2024",
      time: "14:30 - 15:00",
      location: "Klinik Sehat Bersama",
      status: "upcoming",
    },
    {
      id: "2",
      doctorName: "dr. Siti Rahayu",
      specialty: "Dokter Gigi",
      date: "25 Nov 2024",
      time: "10:00 - 10:30",
      location: "Klinik Gigi Sejahtera",
      status: "upcoming",
    },
    {
      id: "3",
      doctorName: "dr. Ahmad Wijaya",
      specialty: "Spesialis Penyakit Dalam",
      date: "18 Nov 2024",
      time: "09:00 - 09:30",
      location: "Rumah Sakit Pusat",
      status: "completed",
    },
  ]

  return (
    <div className="min-h-screen">
      <TopHeader title="Janji Temu" />

      <div className="pt-28 pb-12 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="mb-8 flex gap-4 border-b border-border">
            <button className="px-4 py-3 border-b-2 border-primary text-primary font-medium text-sm">Mendatang</button>
            <button className="px-4 py-3 border-b-2 border-transparent text-muted-foreground font-medium text-sm hover:text-foreground transition-colors">
              Riwayat
            </button>
            <button className="px-4 py-3 border-b-2 border-transparent text-muted-foreground font-medium text-sm hover:text-foreground transition-colors">
              Dibatalkan
            </button>
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-xl p-6 shadow-soft hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{appointment.doctorName}</h3>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === "upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {appointment.status === "upcoming" ? (
                      <AlertCircle className="w-3 h-3" />
                    ) : (
                      <CheckCircle className="w-3 h-3" />
                    )}
                    {appointment.status === "upcoming" ? "Mendatang" : "Selesai"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {appointment.date}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {appointment.time}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                    <MapPin className="w-4 h-4" />
                    {appointment.location}
                  </div>
                </div>

                {appointment.status === "upcoming" && (
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-primary text-white font-medium text-sm rounded-lg hover:shadow-lg transition-all">
                      Hubungi Dokter
                    </button>
                    <button className="flex-1 px-4 py-2 bg-white border border-border text-foreground font-medium text-sm rounded-lg hover:bg-muted transition-all">
                      Batal
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
