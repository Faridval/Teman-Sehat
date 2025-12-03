import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 })
    }

    // Create session
    const response = NextResponse.json(
      { message: "Login berhasil", user: { id: user.id, email: user.email, name: user.name } },
      { status: 200 }
    )

    // Set session cookie
    response.cookies.set("session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error: any) {
    console.error("Login error:", error)
    
    // Return more specific error message
    const errorMessage = error.message || "Terjadi kesalahan saat login"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
