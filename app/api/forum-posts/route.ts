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
    const posts = await prisma.forumPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } } },
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching forum posts:", error)
    return NextResponse.json({ error: "Failed to fetch forum posts" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { title, content } = await req.json()

    const post = await prisma.forumPost.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    })

    return NextResponse.json({ message: "Forum post created successfully", postId: post.id })
  } catch (error) {
    console.error("Error creating forum post:", error)
    return NextResponse.json({ error: "Failed to create forum post" }, { status: 500 })
  }
}

