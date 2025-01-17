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
    const { searchParams } = new URL(req.url)
    const specialization = searchParams.get('specialization')
    const location = searchParams.get('location')

    let whereClause = {}
    if (specialization) {
      whereClause = { ...whereClause, specialization }
    }
    if (location) {
      whereClause = { ...whereClause, location: { contains: location, mode: 'insensitive' } }
    }

    const professionals = await prisma.legalProfessional.findMany({
      where: whereClause,
      orderBy: { rating: 'desc' },
    })

    return NextResponse.json({ professionals })
  } catch (error) {
    console.error("Error fetching legal professionals:", error)
    return NextResponse.json({ error: "Failed to fetch legal professionals" }, { status: 500 })
  }
}

