"use client"

import React, { useCallback } from "react"
import dynamic from "next/dynamic"
import type { ContentEditableEvent } from "react-simple-wysiwyg"

// Dynamically import the Editor to avoid SSR issues
const Editor = dynamic(() => import("react-simple-wysiwyg").then((mod) => mod.Editor), { ssr: false })

interface TextEditorProps {
    initialValue: string
    onChangeCallback: (value: string) => void
}

export function TextEditor({ initialValue, onChangeCallback }: TextEditorProps) {
    const handleChange = useCallback(
        (e: ContentEditableEvent) => {
            onChangeCallback(e.target.value)
        },
        [onChangeCallback],
    )

    return <Editor value={initialValue} onChange={handleChange} />
}

