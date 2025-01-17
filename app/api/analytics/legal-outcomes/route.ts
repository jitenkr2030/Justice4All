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
    const outcomeData = await prisma.case.groupBy({
      by: ['type'],
      _count: {
        _all: true,
        outcome: true,
      },
      where: {
        status: 'CLOSED',
      },
    })

    const formattedOutcomeData = outcomeData.map((data) => ({
      caseType: data.type,
      favorableOutcomes: data._count.outcome,
      unfavorableOutcomes: data._count._all - data._count.outcome,
    }))

    return NextResponse.json({ outcomeData: formattedOutcomeData })
  } catch (error) {
    console.error("Error fetching legal outcome analytics:", error)
    return NextResponse.json({ error: "Failed to fetch legal outcome analytics" }, { status: 500 })
  }
}

