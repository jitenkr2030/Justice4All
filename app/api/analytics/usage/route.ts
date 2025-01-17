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
    // This is a simplified example. In a real-world scenario, you'd want to aggregate this data
    // over time and store it in a separate analytics table for quick retrieval.
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - i)
      return d.toISOString().split('T')[0]
    })

    const usageData = await Promise.all(last30Days.map(async (date) => {
      const startOfDay = new Date(date)
      const endOfDay = new Date(date)
      endOfDay.setDate(endOfDay.getDate() + 1)

      const [activeUsers, casesCreated, documentsUploaded] = await Promise.all([
        prisma.user.count({
          where: {
            lastActive: {
              gte: startOfDay,
              lt: endOfDay,
            },
          },
        }),
        prisma.case.count({
          where: {
            createdAt: {
              gte: startOfDay,
              lt: endOfDay,
            },
          },
        }),
        prisma.document.count({
          where: {
            uploadedAt: {
              gte: startOfDay,
              lt: endOfDay,
            },
          },
        }),
      ])

      return {
        date,
        activeUsers,
        casesCreated,
        documentsUploaded,
      }
    }))

    return NextResponse.json({ usageData })
  } catch (error) {
    console.error("Error fetching usage analytics:", error)
    return NextResponse.json({ error: "Failed to fetch usage analytics" }, { status: 500 })
  }
}

