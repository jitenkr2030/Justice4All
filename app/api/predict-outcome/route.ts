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
    const { caseDetails } = await req.json()

    const response = await openai.createChatCompletion({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "You are a legal expert AI that predicts case outcomes based on provided details." },
        { role: "user", content: `Predict the outcome of this case: ${caseDetails}` }
      ],
    })

    const data = await response.json()
    const prediction = data.choices[0].message.content

    return NextResponse.json({ prediction })
  } catch (error) {
    console.error("Error predicting case outcome:", error)
    return NextResponse.json({ error: "Failed to predict case outcome" }, { status: 500 })
  }
}

