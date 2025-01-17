import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Configuration, OpenAIApi } from "openai-edge"

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { query } = await req.json()

    const response = await openai.createChatCompletion({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "You are an AI-driven legal research assistant. Provide relevant case laws and legal precedents based on the given query." },
        { role: "user", content: `Perform legal research on: ${query}` }
      ],
    })

    const data = await response.json()
    const researchResults = JSON.parse(data.choices[0].message.content)

    return NextResponse.json({ results: researchResults })
  } catch (error) {
    console.error("Error performing legal research:", error)
    return NextResponse.json({ error: "Failed to perform legal research" }, { status: 500 })
  }
}

