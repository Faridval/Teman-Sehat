"use client"

import { Button } from "@/components/ui/button"
import { Heart, Shield, Stethoscope, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Teman Sehat</h1>
        </div>
        <Link href="/login">
          <Button variant="outline" className="font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
            Masuk
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Logo/Icon with Animation */}
          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="relative">
              <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-primary via-accent to-primary-light flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Heart className="w-20 h-20 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-primary animate-bounce" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <h2 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Teman Sehat Ada Buat Kamu
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Asisten kesehatan cerdas yang siap membantu kapan pun kamu butuh. 
              Ceritakan gejala yang kamu rasakan, dan kami akan membantu mencari tahu 
              apa yang sebenarnya terjadi di tubuh kamu.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl text-foreground mb-3">Diagnosis Cerdas</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI akan menganalisis gejala yang kamu rasakan dan memberikan diagnosis awal yang akurat
              </p>
            </div>
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl text-foreground mb-3">Rekomendasi Faskes</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dapatkan rekomendasi fasilitas kesehatan terdekat sesuai kebutuhanmu dengan mudah
              </p>
            </div>
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl text-foreground mb-3">24/7 Tersedia</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Akses layanan kesehatan kapan saja, di mana saja, tanpa batas waktu
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600">
            <Link href="/login">
              <Button size="lg" className="text-lg px-10 py-7 h-auto font-semibold group bg-gradient-to-r from-primary to-primary-light hover:shadow-lg hover:scale-105 transition-all">
                Mulai Sekarang
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-muted-foreground pt-6 animate-in fade-in duration-1000 delay-800">
            Belum punya akun?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline transition-colors">
              Daftar di sini
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-8 border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Teman Sehat. Dibuat dengan ❤️ untuk kesehatanmu.</p>
        </div>
      </footer>
    </div>
  )
}