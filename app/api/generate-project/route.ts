import { NextResponse } from "next/server"
import archiver from "archiver"
import fs from "fs"
import path from "path"

interface RequestBody {
  selectedStyles: { [key: string]: string }
  componentsOrder: string[]
  editableContent: { [key: string]: string }
}

export async function POST(req: Request) {
  const { selectedStyles, componentsOrder, editableContent }: RequestBody = await req.json()
  console.log("Received data for export:", { selectedStyles, componentsOrder, editableContent })

  const archive: archiver.Archiver = archiver("zip", {
    zlib: { level: 9 },
  })

  return new Promise<NextResponse>((resolve, reject) => {
    const chunks: Uint8Array[] = []

    archive.on("data", (chunk) => chunks.push(chunk))
    archive.on("error", (err) => reject(err))
    archive.on("end", () => {
      const zipBuffer = Buffer.concat(chunks)
      const response = new NextResponse(zipBuffer, {
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": "attachment; filename=landing-page-project.zip",
        },
      })
      resolve(response)
    })

    // Add files to the archive
    const templateDir = path.join(process.cwd(), "project-template")
    if (fs.existsSync(templateDir)) {
      archive.directory(templateDir, "project/")
    } else {
      console.warn(`Template directory not found: ${templateDir}`)
    }

    // Generate and add package.json
    const packageJson = {
      name: "landing-page-project",
      version: "1.0.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        lint: "next lint",
      },
      dependencies: {
        next: "^13.0.0",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        "@radix-ui/react-icons": "^1.3.0",
        "class-variance-authority": "^0.4.0",
        clsx: "^1.2.1",
        "tailwind-merge": "^1.12.0",
        "tailwindcss-animate": "^1.0.5",
      },
      devDependencies: {
        "@types/node": "^18.0.0",
        "@types/react": "^18.0.0",
        "@types/react-dom": "^18.0.0",
        autoprefixer: "^10.4.7",
        postcss: "^8.4.14",
        tailwindcss: "^3.3.0",
        typescript: "^4.7.4",
      },
    }

    archive.append(JSON.stringify(packageJson, null, 2), { name: "project/package.json" })

    // Ensure the components directory exists
    archive.append("", { name: "project/components/" })

    // Create subdirectories for each component type

    // Generate and add a main page that includes all selected components
    const mainPageContent = `
import React from "react";
${Object.entries(selectedStyles)
        .map(([section, style]) => `import ${style} from '../components/${style}';`)
        .join("\n")}

export default function Home() {
  return (
    <div>
      ${componentsOrder.map((section: string) => `<${selectedStyles[section]} />`).join("\n      ")}
    </div>
  );
}
`
    archive.append(mainPageContent, { name: "project/pages/index.tsx" })

    // Génération des composants
    Object.entries(selectedStyles).forEach(([section, style]: [string, string]) => {
      const templatePath = path.join(process.cwd(), "components", "templates", section.split("-")[0], `${style}.tsx`)
      if (fs.existsSync(templatePath)) {
        const componentContent = fs.readFileSync(templatePath, "utf-8")
        archive.append(componentContent, { name: `project/components/${style}.tsx` })
      } else {
        console.warn(`Component file not found: ${templatePath}`)
      }
    })

    archive.finalize()
  })
}

