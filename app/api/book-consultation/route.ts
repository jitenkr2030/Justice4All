import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { consultationType, date, time } = await req.json()

    const consultation = await prisma.consultation.create({
      data: {
        userId: session.user.id,
        consultationType,
        dateTime: new Date(`${date}T${time}`),
      },
    })

    return NextResponse.json({ consultation })
  } catch (error) {
    console.error("Error booking consultation:", error)
    return NextResponse.json({ error: "Failed to book consultation" }, { status: 500 })
  }
}

