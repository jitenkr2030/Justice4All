import { NextResponse } from "next/server"
import { Configuration, OpenAIApi } from "openai-edge"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

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
    const { documentText } = await req.json()

    const prompt = `Review the following legal document and highlight any potential issues, ambiguities, or areas that may need clarification:

    ${documentText}

    Provide a detailed analysis of the document, including:
    1. Potential legal issues
    2. Ambiguous clauses
    3. Missing information
    4. Suggestions for improvement`

    const response = await openai.createChatCompletion({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "You are a legal document reviewer. Analyze legal documents and provide detailed feedback on potential issues and improvements." },
        { role: "user", content: prompt }
      ],
    })

    const data = await response.json()
    const review = data.choices[0].message.content

    return NextResponse.json({ review })
  } catch (error) {
    console.error("Error reviewing document:", error)
    return NextResponse.json({ error: "Failed to review document" }, { status: 500 })
  }
}

