interface BrowserFrameProps {
    children: React.ReactNode
    isMobile: boolean
}

export function BrowserFrame({ children, isMobile }: BrowserFrameProps) {
    return (
        <div className="w-full h-full flex flex-col rounded-lg overflow-hidden border border-blue-500">
            {/* Browser Chrome/Header */}
            <div className="bg-gray-100 border-b border-gray-200">
                {/* URL Bar */}
                <div className="flex items-center px-4 py-2 space-x-2">
                    <div className="flex-1 flex items-center bg-white rounded-md border px-3 py-1 text-sm text-gray-600">
                        <span className="text-green-700">https://</span>
                        <span className="ml-1">landingpage-builder/my-site</span>
                    </div>
                    <button className="text-blue-500 text-sm font-medium px-3 py-1 hover:bg-purple-50 rounded">
                        Share on X
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white overflow-auto">{children}</div>
        </div>
    )
}

