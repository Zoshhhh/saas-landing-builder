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

    // Generate and add a main page that includes all selected components
    const mainPageContent = `
import React from 'react';
${Object.entries(selectedStyles)
        .map(([section, style]) => `import ${style} from '../components/${section}';`)
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

    Object.entries(selectedStyles).forEach(([section, style]: [string, string]) => {
      const templatePath = path.join(process.cwd(), "components", "templates", section, `${style}.tsx`)
      if (fs.existsSync(templatePath)) {
        const content = editableContent[section] || ""

        let componentContent = fs.readFileSync(templatePath, "utf-8")
        // Remove any existing content assignment
        componentContent = componentContent.replace(/const content = .*?;(\r?\n|\r)/s, "")
        // Add the new content
        componentContent = componentContent.replace(
            "export default function",
            `const content = ${JSON.stringify(content)};

export default function`,
        )
        // Update how content is used in the component
        componentContent = componentContent.replace(
            /<([^>]+)>(\s*{content}\s*)<\/([^>]+)>/,
            "<$1 dangerouslySetInnerHTML={{ __html: content }} />",
        )

        const fileName = `${style.toLowerCase()}.tsx`
        archive.append(componentContent, { name: `project/components/${section}/${fileName}` })
      } else {
        console.warn(`Component file not found: ${templatePath}`)
        // Add a placeholder component with different text styles if the file is not found
        const placeholderContent = `
import React from 'react';

export default function ${style}() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-3xl font-bold">${style} Component</h2>
      
      {/* Short line of text */}
      <p className="text-sm">This is a short line of text.</p>
      
      {/* Centered paragraph */}
      <p className="text-center max-w-2xl mx-auto">
        This is a centered paragraph. It has a maximum width and is aligned in the center of its container.
        The text wraps to multiple lines if it exceeds the maximum width.
      </p>
      
      {/* Left-aligned paragraph */}
      <p className="text-left">
        This is a left-aligned paragraph. It starts from the left side of its container and continues
        to the right. This is the default alignment for most text on web pages. It's easy to read
        and follows the natural reading direction in many languages.
      </p>
      
      {/* Additional text styles */}
      <div className="space-y-4">
        <p className="font-bold">This is bold text.</p>
        <p className="italic">This text is italicized.</p>
        <p className="underline">This text has an underline.</p>
        <p className="text-xl">This text is larger than the default size.</p>
      </div>
    </div>
  );
}
`
        archive.append(placeholderContent, { name: `project/components/${section}.tsx` })
      }
    })

    archive.finalize()
  })
}

