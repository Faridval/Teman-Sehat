"use client"
import { Navbar } from "@/components/navbar"
import { ChatInterface } from "@/components/chat-interface"

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="pt-24 pb-24 flex-1 flex flex-col overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  )
}
