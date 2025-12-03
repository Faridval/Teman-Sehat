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

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Halo! Aku Teman Sehat. Ceritakan apa yang kamu rasakan, dan aku akan membantu menganalisis gejala kamu serta merekomendasikan tindakan yang tepat.",
      timestamp: new Date(),
    },
  ])
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleInputSubmit = (value: string) => {
    // Add user message
    const userMessage: Message = {
      id: Math.random().toString(),
      role: "user",
      content: value,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Simulate agent workflow
    simulateAgentWorkflow(value)
  }

  const simulateAgentWorkflow = (userInput: string) => {
    const steps: AgentStep[] = [
      { id: "1", name: "Diagnosis Agent", status: "running", output: "Mengidentifikasi gejala..." },
      { id: "2", name: "Health Facility Agent", status: "pending", output: "Mencari faskes..." },
      { id: "3", name: "Doctor Matcher Agent", status: "pending", output: "Mencari dokter..." },
      { id: "4", name: "Booking Coordinator Agent", status: "pending", output: "Menyiapkan jadwal..." },
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
        // Add assistant response after all steps
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
• Infeksi virus (65%)
• Sinusitis (40%)

**Tingkat Keparahan:** Sedang

**Rekomendasi Kesehatan:**
1. Istirahat yang cukup (7-8 jam per hari)
2. Konsumsi air putih minimal 2 liter per hari
3. Gunakan obat penurun panas jika diperlukan
4. Hindari aktivitas berat selama 2-3 hari

**Peringatan:** Segera ke rumah sakit jika mengalami kesulitan bernapas atau demam di atas 39°C.

**Rekomendasi Faskes Terdekat:** Ditemukan 3 klinik dan 2 puskesmas dalam jarak 2 km.

**Dokter yang Direkomendasikan:** 5 dokter spesialis sesuai gejala Anda.

Ingin melihat detail faskes dan dokter?`
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-muted via-background to-background">
      {/* Chat Container */}
      <div className="flex-1 flex gap-6 overflow-hidden p-8">
        {/* Chat Messages - Main Area */}
        <div className="flex-1 min-w-0 flex flex-col">
          <h1 className="text-2xl font-bold text-foreground mb-4">Chat dengan Teman Sehat</h1>

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
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 opacity-70`}>
                      {message.timestamp.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="border-t border-border p-6 bg-white">
              <LargeInputBar placeholder="Tulis keluhan kamu di sini…" onSubmit={handleInputSubmit} />
            </div>
          </div>
        </div>

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
    </div>
  )
}
