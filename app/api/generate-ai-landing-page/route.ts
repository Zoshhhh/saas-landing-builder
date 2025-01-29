import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const availableComponents = [
    "Header1",
    "Header2",
    "Hero1",
    "Hero2",
    "Footer1",
    "Footer2",
    "FAQ1",
    "FAQ2",
    "Pricing1",
    "Pricing2",
    "Pricing3",
    "Testimonials1",
    "Testimonials2",
    "ImageGallery1",
    "ImageGallery2",
    "Text1",
    "Text2",
    "Features",
    "CTA",
    "Services",
    "Contact",
    "About",
    "FeaturedPosts",
    "PostGrid",
    "Newsletter",
]

export async function POST(req: Request) {
    try {
        const { request } = await req.json()

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are an AI assistant that helps create landing pages. Based on the user's request, suggest appropriate components for a landing page. Here are the available components with their descriptions:

- Header1, Header2: Navigation components for the top of the page, typically containing logo, menu items, and sometimes a call-to-action button.
- Hero1, Hero2: Large, eye-catching introductory sections at the top of the page, often with a headline, subtext, and a main call-to-action.
- Footer1, Footer2: Bottom page components with links, social media icons, and additional information about the company or website.
- FAQ1, FAQ2: Sections for Frequently Asked Questions, helping to address common user queries and concerns.
- Pricing1, Pricing2, Pricing3: Various layouts for displaying product or service pricing options, features, and plans.
- Testimonials1, Testimonials2: Sections showcasing customer reviews, feedback, or success stories to build trust and credibility.
- ImageGallery1, ImageGallery2: Components for displaying multiple images, useful for showcasing products, portfolio items, or visual content.
- Text1, Text2: Flexible text content sections for detailed information, explanations, or storytelling.
- Features: Sections highlighting key features, benefits, or unique selling points of a product or service.
- CTA (Call-to-Action): Prominent buttons or sections designed to encourage user action, such as signing up or making a purchase.
- Services: Components for showcasing and explaining the services offered by a company or individual.
- Contact: Forms or information sections for users to get in touch or find contact details.
- About: Sections providing information about the company, team, or individual behind the website.
- FeaturedPosts: Components displaying highlighted or recent blog posts, articles, or news items.
- PostGrid: Grid layouts for showcasing multiple blog posts or content pieces, typically with images and short descriptions.
- Newsletter: Email signup forms for users to subscribe to newsletters or updates.

Respond with a comma-separated list of 4-7 most appropriate components based on the user's request, considering the purpose and content needs of the landing page.`,
                },
                { role: "user", content: request },
            ],
        })

        // Filter and process the suggested components
        const suggestedComponents = completion.choices[0].message.content
            ?.split(",")
            .map((component) => component.trim())
            .filter((component) => availableComponents.includes(component))
            .map((component) => {
                const [id, variant] = component.split(/(\d+)/)
                return { id: id.toLowerCase(), variant: component }
            })

        return NextResponse.json({ components: suggestedComponents })
    } catch (error) {
        console.error("Error generating AI landing page:", error)
        return NextResponse.json({ error: "Failed to generate AI landing page" }, { status: 500 })
    }
}

