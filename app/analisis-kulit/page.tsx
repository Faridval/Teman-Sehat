"use client"

import type React from "react"
import { useState } from "react"
import { Upload, Eye, AlertTriangle, CheckCircle, Loader2, Heart, Shield, Stethoscope } from "lucide-react"
import Link from "next/link"

interface AnalysisResult {
  condition: string
  severity: "mild" | "moderate" | "severe"
  patterns: string[]
  confidence: number
  urgency: string
  recommendation: string
  doctorSpecialty: string
  otherConditions: string[]
}

interface SymptomQuestion {
  id: string
  question: string
  answer?: boolean
}

const symptomQuestions: SymptomQuestion[] = [
  { id: "gatal", question: "Apakah terasa gatal?" },
  { id: "panas", question: "Apakah terasa panas?" },
  { id: "perih", question: "Apakah perih?" },
  { id: "ruam", question: "Apakah muncul ruam?" },
  { id: "mengelupas", question: "Apakah mengelupas?" },
  { id: "nyeri", question: "Apakah terasa nyeri atau iritasi ringan?" },
]

export default function AnalisisKulit() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [symptoms, setSymptoms] = useState<SymptomQuestion[]>(symptomQuestions)
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const mockResult: AnalysisResult = {
      condition: "Dermatitis Kontak",
      severity: "moderate",
      confidence: 78,
      patterns: ["Kemerahan terlokalisir", "Edema ringan", "Kemungkinan alergen lokal", "Distribusi asimetris"],
      urgency: "Konsultasi dalam 2-3 hari",
      recommendation:
        "Hindari area yang iritasi, gunakan emolien ringan, dan pertahankan area tetap bersih dan kering. Jika tidak membaik dalam 1 minggu, konsultasikan dengan dokter kulit.",
      doctorSpecialty: "Spesialis Dermatologi",
      otherConditions: ["Eksema Atopik (65%)", "Psoriasis Tipe Plak (45%)", "Dermatitis Seboroik (35%)"],
    }

    setResult(mockResult)
    setSymptoms(symptomQuestions)
    setAllQuestionsAnswered(false)
    setIsAnalyzing(false)
  }

  const handleSymptomAnswer = (id: string, answer: boolean) => {
    const updated = symptoms.map((s) => (s.id === id ? { ...s, answer } : s))
    setSymptoms(updated)

    const allAnswered = updated.every((s) => s.answer !== undefined)
    setAllQuestionsAnswered(allAnswered)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-emerald-50 border-emerald-200 text-emerald-700"
      case "moderate":
        return "bg-amber-50 border-amber-200 text-amber-700"
      case "severe":
        return "bg-red-50 border-red-200 text-red-700"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-muted via-background to-background p-8 overflow-auto">
      <div className="max-w-4xl mx-auto w-full">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Analisis Penyakit Kulit dengan AI
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Foto. Analisis. Solusi. Teman Sehat bantu jelasin kemungkinan penyakit kulit kamu — dan dampingin sampai
            dapat penanganan yang tepat.
          </p>
        </div>

        {/* Upload Area */}
        {!previewUrl && (
          <div className="mb-8 p-12 border-2 border-dashed border-primary rounded-3xl bg-primary/5 text-center hover:bg-primary/10 transition-all cursor-pointer">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-input" />
            <label htmlFor="image-input" className="cursor-pointer block">
              <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="font-bold text-lg text-foreground mb-2">Unggah Foto Area Kulit</p>
              <p className="text-sm text-muted-foreground mb-4">Klik untuk memilih file dari galeri atau kamera</p>
              <p className="text-xs text-muted-foreground/70">
                Format: JPG, PNG | Ukuran maks: 10MB | Pastikan pencahayaan cukup
              </p>
            </label>
          </div>
        )}

        {/* Privacy Notice */}
        {!previewUrl && (
          <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-2xl">
            <p className="text-sm text-foreground">
              <Shield className="w-4 h-4 inline-block mr-2 text-primary" />
              Foto kamu hanya digunakan untuk analisis kesehatan dan tidak disimpan.
            </p>
          </div>
        )}

        {/* Preview */}
        {previewUrl && !result && (
          <div className="mb-8">
            <div className="mb-6 rounded-3xl overflow-hidden bg-white shadow-soft border border-border">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setPreviewUrl("")
                  setImageFile(null)
                }}
                className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-2xl font-semibold hover:bg-primary/5 transition-all"
              >
                Ganti Foto
              </button>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-accent transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  "Analisis"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-8">
            {/* Main Diagnosis */}
            <div className={`p-8 rounded-3xl border-2 ${getSeverityColor(result.severity)} shadow-soft`}>
              <div className="flex items-start gap-4 mb-6">
                <Eye className="w-8 h-8 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="font-bold text-2xl mb-2">{result.condition}</h2>
                  <p className="text-sm font-semibold uppercase opacity-80">
                    {result.severity === "severe" ? "⚠️" : "✓"} Tingkat Keparahan: {result.severity}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold mb-3">Tingkat Keyakinan:</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-black/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${result.confidence}%` }} />
                    </div>
                    <span className="text-lg font-bold text-foreground">{result.confidence}%</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2">Urgensi Konsultasi:</p>
                  <p className="text-sm">{result.urgency}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold mb-3">Pola yang Terdeteksi:</p>
                <ul className="text-sm space-y-2 ml-4">
                  {result.patterns.map((pattern, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{pattern}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Symptom Questions */}
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-border">
              <h3 className="font-bold text-xl text-foreground mb-6">Gejala Tambahan</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Jawab pertanyaan berikut untuk meningkatkan akurasi diagnosis:
              </p>

              <div className="space-y-3">
                {symptoms.map((symptom) => (
                  <div
                    key={symptom.id}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:bg-muted/50 transition-all"
                  >
                    <div className="flex gap-2 flex-1">
                      <p className="text-sm font-medium text-foreground">{symptom.question}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSymptomAnswer(symptom.id, true)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          symptom.answer === true
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        Ya
                      </button>
                      <button
                        onClick={() => handleSymptomAnswer(symptom.id, false)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          symptom.answer === false
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        Tidak
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {allQuestionsAnswered && (
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <p className="text-sm text-emerald-700 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Terima kasih! Data gejala kamu sudah tercatat untuk diagnosis yang lebih akurat.
                  </p>
                </div>
              )}
            </div>

            {/* Other Conditions */}
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-border">
              <h3 className="font-bold text-xl text-foreground mb-4">Kemungkinan Kondisi Lain</h3>
              <div className="space-y-2">
                {result.otherConditions.map((condition, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <p className="text-sm text-foreground">{condition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-border">
              <h3 className="font-bold text-xl text-foreground mb-4">Rekomendasi Perawatan</h3>
              <p className="text-sm text-foreground leading-relaxed mb-6">{result.recommendation}</p>

              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-8">
                <p className="text-sm text-primary font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Kami merekomendasikan konsultasi dengan <span className="font-bold">{result.doctorSpecialty}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link href="/cari-dokter" className="block">
                  <button className="w-full px-6 py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-accent transition-all flex items-center justify-center gap-2 group">
                    <Stethoscope className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Rekomendasi Dokter Kulit Terdekat
                  </button>
                </Link>

                <Link href="/booking-faskes" className="block">
                  <button className="w-full px-6 py-3 border-2 border-primary text-primary rounded-2xl font-semibold hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group">
                    <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Booking Faskes Sekarang
                  </button>
                </Link>

                <button className="w-full px-6 py-3 border-2 border-muted text-primary rounded-2xl font-semibold hover:bg-muted/50 transition-all flex items-center justify-center gap-2 group">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Konsultasi via Chat dengan Dokter Ahli
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setResult(null)
                setPreviewUrl("")
                setImageFile(null)
                setSymptoms(symptomQuestions)
                setAllQuestionsAnswered(false)
              }}
              className="w-full px-6 py-3 border-2 border-primary text-primary rounded-2xl font-semibold hover:bg-primary/5 transition-all"
            >
              Analisis Foto Lain
            </button>
          </div>
        )}

        {/* Important Info */}
        {!result && (
          <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-3xl">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Penting untuk Diketahui
            </h3>
            <ul className="text-sm text-foreground space-y-3 ml-7 list-disc">
              <li>Analisis ini bukan pengganti diagnosis profesional dokter dermatologi</li>
              <li>Pastikan pencahayaan cukup dan area kulit terlihat jelas dalam foto</li>
              <li>Untuk kasus serius atau gejala memburuk, segera konsultasi dengan dokter</li>
              <li>Kamu nggak perlu bingung sendirian — kami siap membantu setiap langkah</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
