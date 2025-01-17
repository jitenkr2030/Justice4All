import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const partnerships = await prisma.partnership.findMany()
    return NextResponse.json({ partnerships })
  } catch (error) {
    console.error("Error fetching partnerships:", error)
    return NextResponse.json({ error: "Failed to fetch partnerships" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { name, type, discountPercentage } = await req.json()

    const partnership = await prisma.partnership.create({
      data: {
        name,
        type,
        discountPercentage,
      },
    })

    return NextResponse.json(partnership)
  } catch (error) {
    console.error("Error creating partnership:", error)
    return NextResponse.json({ error: "Failed to create partnership" }, { status: 500 })
  }
}

