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
    // Fetch user's recent activity and case history
    const userActivity = await prisma.userActivity.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    const userCases = await prisma.case.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      take: 5,
    })

    // Generate personalized recommendations based on user activity and cases
    const recommendations = generateRecommendations(userActivity, userCases)

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error("Error fetching personalized recommendations:", error)
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
  }
}

function generateRecommendations(userActivity, userCases) {
  // Implement recommendation logic here
  // This is a placeholder implementation
  return [
    {
      id: '1',
      title: 'Review Your Latest Case',
      description: 'Based on your recent activity, it might be helpful to review your latest case details.',
      type: 'action',
    },
    {
      id: '2',
      title: 'Legal Research Guide',
      description: 'This guide could help you with your current legal research needs.',
      type: 'resource',
      url: '/resources/legal-research-guide',
    },
  ]
}

