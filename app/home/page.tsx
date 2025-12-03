"use client"

import { LargeInputBar } from "@/components/large-input-bar"
import { useEffect, useRef, useState } from "react"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AgentStep {
  id: string
  name: string
  status: "pending" | "running" | "completed" | "error"
  output?: string
}

const languages = [
  { code: "id", text: "Tanyakan gejala apa yang kamu rasakan…" },
  { code: "jv", text: "Keluhanmu opo? Ceritokno neng kene…" },
  { code: "su", text: "Aya nu karasa? Caritakeun ka dieu…" },
]

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Teman Sehat ada buat kamu. Ceritain apa yang kamu rasain, biar kita bantu cari tahu apa yang sebenarnya terjadi di tubuh kamu. Kamu nggak harus ngalamin semuanya sendirian — kami temenin sampai kamu pulih.",
      timestamp: new Date(),
    },
  ])
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([])
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguageIndex((prev) => (prev + 1) % languages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleInputSubmit = (value: string) => {
    const userMessage: Message = {
      id: Math.random().toString(),
      role: "user",
      content: value,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    simulateAgentWorkflow(value)
  }

  const simulateAgentWorkflow = (userInput: string) => {
    const steps: AgentStep[] = [
      { id: "1", name: "Diagnosis Agent", status: "running", output: "Mengidentifikasi gejala..." },
      { id: "2", name: "Analisis Gejala", status: "pending", output: "Menganalisis pola..." },
      { id: "3", name: "Saran Kesehatan", status: "pending", output: "Menyiapkan saran..." },
    ]

    setAgentSteps(steps)
    let stepIndex = 0
    const stepInterval = setInterval(() => {
      setAgentSteps((prev) => {
        const newSteps = [...prev]
        if (stepIndex > 0 && stepIndex <= newSteps.length) {
          newSteps[stepIndex - 1].status = "completed"
        }
        if (stepIndex < newSteps.length) {
          newSteps[stepIndex].status = "running"
        }
        return newSteps
      })
      stepIndex++

      if (stepIndex > steps.length) {
        clearInterval(stepInterval)
        const assistantMessage: Message = {
          id: Math.random().toString(),
          role: "assistant",
          content: generateDiagnosisResponse(userInput),
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setAgentSteps((prev) => prev.map((step) => ({ ...step, status: "completed" })))
      }
    }, 1500)
  }

  const generateDiagnosisResponse = (input: string) => {
    return `Berdasarkan gejala Anda: "${input}"

**Diagnosis Awal:**
• Flu biasa (75%)
• Infeksi virus ringan (65%)
• Kemungkinan alergi musiman (40%)

**Tingkat Keparahan:** Sedang

**Saran Kesehatan:**
1. Istirahat cukup (7–8 jam/hari)
2. Minum air putih minimal 2 liter per hari
3. Konsumsi makanan bergizi dan hindari makanan pedas
4. Jika demam >38.5°C, pertimbangkan paracetamol

**Peringatan:**
Segera hubungi tenaga medis jika mengalami:
- Sesak napas
- Demam tinggi (>39°C) lebih dari 2 hari
- Penurunan kesadaran

Kami selalu siap menemani kamu.`
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-muted via-background to-background">
      <div className="flex-1 flex gap-6 overflow-hidden p-8 flex-col lg:flex-row">
        {/* Main Chat Area */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Teman Sehat Ada Buat Kamu</h1>
            <p className="text-muted-foreground">
              Ceritain apa yang kamu rasain, biar kita bantu cari tahu apa yang sebenarnya terjadi
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-border flex-1 flex flex-col overflow-hidden">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-lg px-5 py-4 rounded-2xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-primary to-primary-light text-white rounded-br-none"
                        : "bg-muted text-foreground border border-border rounded-bl-none"
                    }`}
                  >
                    {/* Perbaikan: gunakan text-base agar tidak terlalu kecil */}
                    <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 opacity-70`}>
                      {message.timestamp.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border p-6 bg-white">
              <LargeInputBar placeholder={languages[currentLanguageIndex].text} onSubmit={handleInputSubmit} />
            </div>
          </div>
        </div>

        {/* Agent Steps Panel */}
        {agentSteps.length > 0 && (
          <div className="w-80 hidden lg:flex flex-col">
            <div className="bg-white rounded-2xl shadow-soft border border-border p-6 h-fit sticky top-8">
              <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">Alur Pemrosesan</h3>
              <div className="space-y-3">
                {agentSteps.map((step, index) => (
                  <div key={step.id}>
                    <div className="flex items-center gap-3 mb-2">
                      {step.status === "pending" && (
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                      )}
                      {step.status === "running" && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
                      {step.status === "completed" && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {step.status === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-foreground">{step.name}</p>
                        {step.output && <p className="text-xs text-muted-foreground">{step.output}</p>}
                      </div>
                    </div>
                    {index < agentSteps.length - 1 && <div className="ml-2.5 h-4 border-l-2 border-muted"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bagian layanan & rekomendasi faskes SUDAH DIHAPUS sepenuhnya */}
    </div>
  )
}