"use client";

import { Button } from "@/components/ui/button";
import { Shield, Stethoscope, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg">
            <Image
              src="/logo.png"
              alt="Teman Sehat Logo"
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Teman Sehat</h1>
        </div>
        <Link href="/login">
          <Button variant="outline" className="font-semibold">
            Masuk
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Icon */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary via-accent to-primary-light flex items-center justify-center shadow-2xl">
              <Image
                src="/logo.png"
                alt="Teman Sehat Logo"
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Teman Sehat Ada Buat Kamu
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Asisten kesehatan cerdas yang siap membantu kapan pun kamu butuh. 
              Ceritakan gejala yang kamu rasakan, dan kami akan membantu mencari tahu 
              apa yang sebenarnya terjadi.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-white rounded-2xl border border-border shadow-soft">
              <Stethoscope className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Diagnosis Cerdas</h3>
              <p className="text-sm text-muted-foreground">
                AI akan menganalisis gejala yang kamu rasakan dan memberikan diagnosis awal
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-border shadow-soft">
              <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Rekomendasi Faskes</h3>
              <p className="text-sm text-muted-foreground">
                Dapatkan rekomendasi fasilitas kesehatan terdekat sesuai kebutuhanmu
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Teman Sehat Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">24/7 Tersedia</h3>
              <p className="text-sm text-muted-foreground">
                Akses layanan kesehatan kapan saja, di mana saja, tanpa batas waktu
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-6 h-auto font-semibold group">
                Mulai Sekarang
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-muted-foreground pt-4">
            Belum punya akun?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Daftar di sini
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 Teman Sehat. Dibuat dengan ❤️ untuk kesehatanmu.</p>
        </div>
      </footer>
    </div>
  );
}