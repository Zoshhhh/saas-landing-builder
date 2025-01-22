import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const style = searchParams.get("style")

    if (!id || !style) {
        return NextResponse.json({ error: "Missing id or style parameter" }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), "components", "templates", id, `${style}.tsx`)

    try {
        const fileContent = await fs.promises.readFile(filePath, "utf8")
        return new NextResponse(fileContent, {
            headers: { "Content-Type": "text/plain" },
        })
    } catch (error) {
        console.error("Error reading component file:", error)
        return NextResponse.json({ error: "Failed to read component file" }, { status: 500 })
    }
}

