import { NextResponse } from "next/server"
import { Configuration, OpenAIApi } from "openai-edge"

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export async function POST(req: Request) {
  try {
    const { formType, userInfo, additionalInfo } = await req.json()

    const prompt = `Assist in completing a ${formType} form with the following information:
    Name: ${userInfo.name}
    Email: ${userInfo.email}
    Phone: ${userInfo.phone}
    Additional Information: ${additionalInfo || 'None provided'}

    Please provide a completed form with any additional fields that might be required for a ${formType}.`

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a legal form completion assistant. Fill out forms accurately based on the provided information." },
        { role: "user", content: prompt }
      ],
    })

    const data = await response.json()
    const assistedForm = data.choices[0].message.content

    return NextResponse.json({ assistedForm })
  } catch (error) {
    console.error("Error assisting with form completion:", error)
    return NextResponse.json({ error: "Failed to assist with form completion" }, { status: 500 })
  }
}

