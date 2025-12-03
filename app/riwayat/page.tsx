"use client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface ChatSession {
  id: string
  date: string
  firstMessage: string
  diagnosis: string
  status: "ongoing" | "completed"
  messageCount: number
}

export default function RiwayatChat() {
  const chatSessions: ChatSession[] = [
    {
      id: "1",
      date: "10 Nov 2024, 14:30",
      firstMessage: "Sakit kepala sudah 2 hari",
      diagnosis: "Flu biasa + Tension headache",
      status: "completed",
      messageCount: 8,
    },
    {
      id: "2",
      date: "8 Nov 2024, 10:15",
      firstMessage: "Batuk dan pilek sejak kemarin",
      diagnosis: "Common cold",
      status: "completed",
      messageCount: 6,
    },
    {
      id: "3",
      date: "5 Nov 2024, 16:45",
      firstMessage: "Gatal-gatal di kulit tangan",
      diagnosis: "Dermatitis kontak",
      status: "completed",
      messageCount: 10,
    },
    {
      id: "4",
      date: "2 Nov 2024, 09:00",
      firstMessage: "Demam tinggi dan tubuh pegal",
      diagnosis: "Influenza",
      status: "completed",
      messageCount: 7,
    },
  ]

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-muted via-background to-background p-8 overflow-auto">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-foreground mb-2">Riwayat Chat</h1>
        <p className="text-muted-foreground mb-8">Lihat kembali semua sesi chat dengan Teman Sehat</p>

        <div className="space-y-4">
          {chatSessions.map((session) => (
            <Link key={session.id} href={`/?session=${session.id}`}>
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-border hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-2">{session.date}</p>
                    <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-1">"{session.firstMessage}"</h3>
                    <p className="text-sm text-primary font-semibold mb-2">{session.diagnosis}</p>
                    <p className="text-xs text-muted-foreground">{session.messageCount} pesan dalam sesi</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        session.status === "completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {session.status === "completed" ? "Selesai" : "Berlangsung"}
                    </span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {chatSessions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Belum ada riwayat chat</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-accent transition-all"
            >
              Mulai Chat Baru
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
