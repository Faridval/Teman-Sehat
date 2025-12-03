"use client"

import { useState } from "react"
import { Send, AlertCircle } from "lucide-react"

export default function DiagnosisGejala() {
  const [symptoms, setSymptoms] = useState("")
  const [duration, setDuration] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!symptoms.trim()) return

    setLoading(true)
    // Placeholder API call
    setTimeout(() => {
      setResult({
        symptoms: symptoms,
        possibleConditions: [
          { name: "Flu", probability: "45%" },
          { name: "Infeksi Saluran Pernapasan", probability: "30%" },
          { name: "Alergi", probability: "25%" },
        ],
        severity: "Sedang",
        recommendation: "Konsultasi dengan dokter dalam 24 jam",
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-muted via-background to-background p-8">
      <div className="max-w-2xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-foreground mb-2">Diagnosis Gejala</h1>
        <p className="text-muted-foreground mb-8">
          Jelaskan gejala yang kamu rasakan agar Teman Sehat dapat menganalisisnya
        </p>

        {/* Input Form */}
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-border mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Gejala yang Dirasakan</label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Contoh: Saya sakit kepala dan demam sudah 2 hari..."
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Berapa lama gejala berlangsung?
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Contoh: 2 hari, 1 minggu, dll"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !symptoms.trim()}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? "Menganalisis..." : "Analisis Gejala"}
              {!loading && <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-border">
              <div className="flex gap-3 mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-orange-900">Tingkat Keparahan: {result.severity}</p>
                  <p className="text-sm text-orange-800 mt-1">{result.recommendation}</p>
                </div>
              </div>

              <h3 className="font-bold text-lg text-foreground mb-4">Kemungkinan Kondisi:</h3>
              <div className="space-y-3">
                {result.possibleConditions.map((condition, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-medium text-foreground">{condition.name}</span>
                    <span className="text-sm font-semibold text-primary">{condition.probability}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-all">
              Cari Dokter Terkait
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
