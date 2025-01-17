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
        { role: "system", content: "You are a personalized AI legal assistant, providing advice and helping users navigate legal matters." },
        { role: "user", content: query }
      ],
    })

    const data = await response.json()
    const assistantResponse = data.choices[0].message.content

    return NextResponse.json({ response: assistantResponse })
  } catch (error) {
    console.error("Error getting AI assistant response:", error)
    return NextResponse.json({ error: "Failed to get AI assistant response" }, { status: 500 })
  }
}

