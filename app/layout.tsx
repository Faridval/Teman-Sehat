import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Toaster } from "@/components/ui/sonner"

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "Teman Sehat – Asisten Kesehatan Cerdas",
  description: "Teman Sehat siap membantu kapan pun kamu butuh",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body
        className={`${nunito.className} antialiased bg-background`}
        style={{ "--font-family": "'Nunito', 'Poppins'" } as React.CSSProperties}
      >
        <div className="fixed inset-0 animated-gradient-bg -z-10" />
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
