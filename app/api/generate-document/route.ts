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
    const { documentType, jurisdiction, parties, details } = await req.json()

    const prompt = `Generate a ${documentType} for the jurisdiction of ${jurisdiction} with the following details:
    Parties involved: ${JSON.stringify(parties)}
    Additional details: ${details}
    
    The document should be in a proper legal format and include all necessary clauses and information based on the provided details.`

    const response = await openai.createChatCompletion({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "You are a legal document generator. Create professional and accurate legal documents based on the given information." },
        { role: "user", content: prompt }
      ],
    })

    const data = await response.json()
    const generatedDocument = data.choices[0].message.content

    return NextResponse.json({ document: generatedDocument })
  } catch (error) {
    console.error("Error generating document:", error)
    return NextResponse.json({ error: "Failed to generate document" }, { status: 500 })
  }
}

