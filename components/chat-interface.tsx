"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Loader2, Heart } from "lucide-react"
import { PromptSuggestions } from "./prompt-suggestions"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Halo! Aku Teman Sehat. 💙 Ceritakan apa yang kamu rasakan, ya. Aku siap mendengarkan dan membantu menemukan solusi terbaik untuk kamu.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (userMessage?: string) => {
    const messageToSend = userMessage || input
    if (!messageToSend.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      let assistantResponse = ""

      // Simple diagnosis flow based on keywords
      if (messageToSend.toLowerCase().includes("pusing")) {
        assistantResponse =
          "Sabar ya, aku mengerti. Pusing bisa jadi karena banyak hal. 😟\n\nAyo ceritakan lebih detail:\n• Berapa lama pusing kamu?\n• Pusing berputar atau terasa berat?\n• Ada gejala lain seperti mual atau demam?\n\nSementara itu, istirahat yang cukup dan minum air banyak membantu kok."
      } else if (
        messageToSend.toLowerCase().includes("tidak ada uang") ||
        messageToSend.toLowerCase().includes("gratis")
      ) {
        assistantResponse =
          "Tenang, aku bantu kamu. Kamu punya BPJS kan? 💪\n\nAda beberapa pilihan untuk kamu:\n✓ Klinik kesehatan pemerintah (gratis dengan BPJS)\n✓ Posyandu terdekat (pelayanan komunitas)\n✓ Rumah sakit kelas 3 dengan BPJS\n\nMau aku cari faskes BPJS terdekat? Atau ceritakan gejala kamu dulu?"
      } else if (
        messageToSend.toLowerCase().includes("cari faskes") ||
        messageToSend.toLowerCase().includes("rumah sakit")
      ) {
        assistantResponse =
          "Baik! Aku akan bantu cari faskes terdekat untuk kamu. 📍\n\nUntuk hasil yang lebih akurat, aku perlu tahu:\n• Di mana lokasi kamu sekarang?\n• Jenis faskes apa yang kamu butuh? (klinik, rumah sakit, dll)\n• Ada preferensi khusus?\n\nNanti aku tunjukkan lokasi dan jam buka faskes terdekat."
      } else {
        assistantResponse =
          "Aku mendengarkan... 👂\n\nBisa kamu jelaskan lebih detail tentang apa yang kamu rasakan? Misalnya:\n• Sejak kapan gejala ini muncul?\n• Di bagian mana tubuh?\n• Ada hal lain yang berkaitan?\n\nMakin detail kamu cerita, makin akurat bantuan aku."
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMsg])
      setIsLoading(false)
    }, 1200)
  }

  const handlePromptSelect = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-8 space-y-6">
        {messages.length === 1 && messages[0].role === "assistant" ? (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-accent rounded-full mb-4">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Teman Sehat</h2>
              <p className="text-base text-muted-foreground">Siap mendengarkan dan membantu kamu</p>
            </div>
            <PromptSuggestions onSelect={handlePromptSelect} />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-lg px-5 py-4 rounded-2xl ${
                    message.role === "user"
                      ? "bg-white border-2 border-border text-foreground rounded-br-lg"
                      : "bg-blue-50 text-foreground rounded-bl-lg border border-blue-200"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-primary fill-primary" />
                      <span className="text-xs font-semibold text-primary">Teman Sehat</span>
                    </div>
                  )}
                  <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-60 mt-2 block">
                    {message.timestamp.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-blue-50 text-foreground px-5 py-4 rounded-2xl rounded-bl-lg border border-blue-200 flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm">Teman Sehat sedang berpikir...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-white sticky bottom-0 px-4 md:px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder="Tulis keluhan kamu di sini…"
              className="flex-1 px-5 py-3 bg-input border-2 border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-all text-base"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="rounded-full px-5 py-3 bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Tekan Enter untuk mengirim. Jangan ragu untuk berbagi detail!
          </p>
        </div>
      </div>
    </div>
  )
}
