"use client"

import { useRouter } from "next/navigation"
import { Heart, TrendingUp, AlertCircle, ChevronRight } from "lucide-react"

export default function SaranKesehatan() {
  const router = useRouter()

  const recommendations = [
    {
      id: 1,
      title: "Tingkatkan Aktivitas Fisik",
      description: "Berdasarkan riwayat diagnosis Anda, disarankan aktivitas fisik ringan 30 menit per hari.",
      icon: TrendingUp,
      severity: "Umum",
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
    },
    {
      id: 2,
      title: "Perhatikan Asupan Gizi",
      description: "Perbanyak konsumsi vitamin C dan mineral untuk meningkatkan imunitas tubuh.",
      icon: Heart,
      severity: "Umum",
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
    },
    {
      id: 3,
      title: "Atur Jam Tidur",
      description: "Tidur 7-8 jam per hari membantu pemulihan dan pencegahan penyakit.",
      icon: AlertCircle,
      severity: "Penting",
      color: "bg-orange-50 border-orange-200",
      textColor: "text-orange-700",
    },
  ]

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-muted via-background to-background p-8 overflow-auto">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-foreground mb-2">Saran Kesehatan Dari Riwayat Gejala</h1>
        <p className="text-muted-foreground mb-8">
          Rekomendasi kesehatan yang dipersonalisasi berdasarkan diagnosis dan riwayat konsultasi Anda
        </p>

        <div className="space-y-4">
          {recommendations.map((rec) => {
            const Icon = rec.icon
            return (
              <div
                key={rec.id}
                className={`${rec.color} border-2 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-white`}>
                    <Icon className={`w-6 h-6 ${rec.textColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-bold text-lg ${rec.textColor}`}>{rec.title}</h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-white ${rec.textColor}`}>
                        {rec.severity}
                      </span>
                    </div>
                    <p className={`${rec.textColor} text-sm opacity-80`}>{rec.description}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${rec.textColor} flex-shrink-0 mt-1`} />
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={() => router.push("/booking-faskes")}
          className="w-full mt-8 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-accent transition-all"
        >
          Lanjut ke Booking Faskes
        </button>
      </div>
    </div>
  )
}
