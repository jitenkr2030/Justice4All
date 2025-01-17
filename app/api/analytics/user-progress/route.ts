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
    const userId = session.user.id

    const [casesCompleted, totalCases, tasksCompleted, totalTasks, documentsUploaded] = await Promise.all([
      prisma.case.count({
        where: {
          userId,
          status: 'CLOSED',
        },
      }),
      prisma.case.count({
        where: {
          userId,
        },
      }),
      prisma.task.count({
        where: {
          case: {
            userId,
          },
          status: 'COMPLETED',
        },
      }),
      prisma.task.count({
        where: {
          case: {
            userId,
          },
        },
      }),
      prisma.document.count({
        where: {
          case: {
            userId,
          },
        },
      }),
    ])

    const progress = {
      casesCompleted,
      totalCases,
      tasksCompleted,
      totalTasks,
      documentsUploaded,
    }

    return NextResponse.json({ progress })
  } catch (error) {
    console.error("Error fetching user progress:", error)
    return NextResponse.json({ error: "Failed to fetch user progress" }, { status: 500 })
  }
}

