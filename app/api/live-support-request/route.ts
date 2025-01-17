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
    const { name, email, issue } = await req.json()

    // Create a support ticket in the database
    const supportTicket = await prisma.supportTicket.create({
      data: {
        userId: session.user.id,
        name,
        email,
        issue,
        status: 'OPEN',
      },
    })

    // In a real-world scenario, you might want to send an email notification to your support team here

    return NextResponse.json({ message: "Support request submitted successfully", ticketId: supportTicket.id })
  } catch (error) {
    console.error("Error submitting support request:", error)
    return NextResponse.json({ error: "Failed to submit support request" }, { status: 500 })
  }
}

