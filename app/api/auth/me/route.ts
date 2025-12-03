import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get("session")?.value

    if (!sessionId) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    if (!user) {
      const response = NextResponse.json({ user: null }, { status: 200 })
      response.cookies.set("session", "", { maxAge: 0 })
      return response
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error: any) {
    console.error("Get user error:", error)
    return NextResponse.json({ user: null }, { status: 200 })
  }
}
