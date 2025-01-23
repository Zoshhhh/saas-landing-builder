import { NextResponse } from "next/server"
import fs from "fs/promises"
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
        const fileContent = await fs.readFile(filePath, "utf8")
        return new NextResponse(fileContent, {
            headers: { "Content-Type": "text/plain" },
        })
    } catch (error) {
        console.error(`Error reading component file: ${filePath}`, error)

        // Check if the directory exists
        try {
            await fs.access(path.dirname(filePath))
        } catch {
            return NextResponse.json({ error: `Directory not found: ${path.dirname(filePath)}` }, { status: 404 })
        }

        // Check if the file exists
        try {
            await fs.access(filePath)
        } catch {
            return NextResponse.json({ error: `File not found: ${filePath}` }, { status: 404 })
        }

        return NextResponse.json({ error: "Failed to read component file" }, { status: 500 })
    }
}

