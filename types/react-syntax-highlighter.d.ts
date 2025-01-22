declare module "react-syntax-highlighter" {
    import { ReactNode } from "react"

    export interface SyntaxHighlighterProps {
        language?: string
        style?: { [key: string]: React.CSSProperties }
        children: string
        customStyle?: React.CSSProperties
        [key: string]: any
    }

    export const Prism: React.FC<SyntaxHighlighterProps>
    export const Light: React.FC<SyntaxHighlighterProps>
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
    const vscDarkPlus: { [key: string]: React.CSSProperties }
    export { vscDarkPlus }
}

