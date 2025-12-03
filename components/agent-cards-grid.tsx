"use client"

import type React from "react"

import { Brain, Pill, Stethoscope, Calendar, ArrowRight } from "lucide-react"

interface AgentCard {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
  onClick?: () => void
}

export function AgentCardsGrid() {
  const agents: AgentCard[] = [
    {
      id: "diagnosis",
      title: "Agen Diagnosis",
      description: "Analisis gejala dan cari kemungkinan diagnosis",
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-blue-500 to-blue-600",
      onClick: () => console.log("Diagnosis clicked"),
    },
    {
      id: "health-advisor",
      title: "Penasehat Kesehatan",
      description: "Dapatkan saran kesehatan dan pencegahan penyakit",
      icon: <Pill className="w-8 h-8" />,
      gradient: "from-emerald-500 to-emerald-600",
      onClick: () => console.log("Health advisor clicked"),
    },
    {
      id: "doctor-matcher",
      title: "Pencocok Dokter",
      description: "Temukan dokter yang tepat untuk kondisimu",
      icon: <Stethoscope className="w-8 h-8" />,
      gradient: "from-purple-500 to-purple-600",
      onClick: () => console.log("Doctor matcher clicked"),
    },
    {
      id: "booking",
      title: "Koordinator Jadwal",
      description: "Pesan janji dengan dokter atau faskes terdekat",
      icon: <Calendar className="w-8 h-8" />,
      gradient: "from-amber-500 to-amber-600",
      onClick: () => console.log("Booking clicked"),
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {agents.map((agent) => (
        <button
          key={agent.id}
          onClick={agent.onClick}
          className="group text-left bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          {/* Icon with Gradient Background */}
          <div
            className={`bg-gradient-to-br ${agent.gradient} p-4 w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}
          >
            {agent.icon}
          </div>

          {/* Title */}
          <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{agent.title}</h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{agent.description}</p>

          {/* Arrow Icon */}
          <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
            Mulai <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </button>
      ))}
    </div>
  )
}
