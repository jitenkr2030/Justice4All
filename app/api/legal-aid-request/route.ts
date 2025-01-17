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
    const { legalIssue, location, description } = await req.json()

    const legalAidRequest = await prisma.legalAidRequest.create({
      data: {
        userId: session.user.id,
        legalIssue,
        location,
        description,
        status: 'PENDING',
      },
    })

    // In a real-world scenario, you might want to notify pro bono lawyers about this new request

    return NextResponse.json({ message: "Legal aid request submitted successfully", requestId: legalAidRequest.id })
  } catch (error) {
    console.error("Error submitting legal aid request:", error)
    return NextResponse.json({ error: "Failed to submit legal aid request" }, { status: 500 })
  }
}

