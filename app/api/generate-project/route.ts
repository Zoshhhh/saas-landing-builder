import { NextResponse } from "next/server"
import archiver from "archiver"
import fs from "fs"
import path from "path"

export async function POST(req: Request) {
  const { selectedStyles } = await req.json()

  const archive = archiver("zip", {
    zlib: { level: 9 },
  })

  const output = fs.createWriteStream("/tmp/project.zip")

  archive.pipe(output)

  // Ajoutez les fichiers de base du projet Next.js
  const templateDir = path.join(process.cwd(), "project-template")
  archive.directory(templateDir, "project/")

  // Ajoutez les composants sélectionnés
  Object.entries(selectedStyles).forEach(([section, style]) => {
    const templatePath = path.join(process.cwd(), "components", section, `${style}.tsx`)
    archive.file(templatePath, { name: `project/components/${section}.tsx` })
  })

  await archive.finalize()

  const zipBuffer = fs.readFileSync("/tmp/project.zip")

  return new NextResponse(zipBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=landing-page-project.zip",
    },
  })
}

