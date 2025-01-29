import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
    try {
        const { request, existingComponents } = await req.json()

        const prompt = `
      You are a landing page content generator and component selector. The user's request is: "${request}"
      
      Based on this request, you need to:
      1. Select appropriate components for a landing page. Choose from: Header, Hero, Features, Pricing, Testimonials, FAQ, CTA, Footer.
      2. For each selected component, generate suitable content.
      
      If there are existing components, update their content. If not, create new ones.
      
      Respond with a JSON array where each object contains:
      - id: the component type (e.g., "header", "hero", etc.)
      - variant: the variant of the component (e.g., "Header1", "Hero2", etc.)
      - content: the generated content for that component
      
      Ensure the content is engaging, professional, and relevant to the user's request.
      Include appropriate HTML tags in the content for formatting.
    `

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 1500,
        })

        console.log("Raw AI response:", completion.choices[0].message.content)

        let cleanedContent = completion.choices[0].message.content?.trim() || "[]"
        cleanedContent = cleanedContent.replace(/^```json\s*/, "").replace(/\s*```$/, "")

        console.log("Cleaned content:", cleanedContent)

        let generatedComponents
        try {
            generatedComponents = JSON.parse(cleanedContent)
        } catch (parseError) {
            console.error("JSON parse error:", parseError)
            console.log("Content that failed to parse:", cleanedContent)

            // Attempt to fix common JSON issues
            cleanedContent = cleanedContent.replace(/'/g, '"').replace(/\n/g, "")
            try {
                generatedComponents = JSON.parse(cleanedContent)
            } catch (secondParseError) {
                console.error("Second JSON parse attempt failed:", secondParseError)
                return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 })
            }
        }

        if (!Array.isArray(generatedComponents)) {
            console.error("Parsed content is not an array:", generatedComponents)
            return NextResponse.json({ error: "Invalid AI response format" }, { status: 500 })
        }

        return NextResponse.json({ components: generatedComponents })
    } catch (error) {
        console.error("Error generating content:", error)
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
    }
}

