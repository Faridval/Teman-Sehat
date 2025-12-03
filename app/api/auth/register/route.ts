import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      },
    })

    // Create session (simple cookie-based)
    const response = NextResponse.json(
      { message: "Registrasi berhasil", user: { id: user.id, email: user.email, name: user.name } },
      { status: 201 }
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
    console.error("Register error:", error)
    
    // Handle Prisma errors
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 })
    }
    
    // Return more specific error message
    const errorMessage = error.message || "Terjadi kesalahan saat registrasi"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
