"use client"

import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"
import { cn } from "@/lib/utils"

export function Hero() {
    return (
        <div className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden bg-white -mt-20">
            <div className="z-10 max-w-screen-xl mx-auto px-4 md:px-8 text-center">
                {/* Goal Banner */}
                <div className="max-w-fit mx-auto mb-8 py-2 px-4 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border">
                    <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-800">Goal for 2025</span> Create your landing page in minutes 🚀
                    </p>
                </div>

                {/* Main Content */}
                <div className="space-y-6 max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-7xl flex flex-col gap-6">
                        <span>The Ultimate Landing</span>
                          <div className="flex justify-center items-center gap-4">
                            <div className="inline-block">
                    <span className=" px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
                                        Page Builder
                    </span>
                            </div>
                            <span className="inline-block text-6xl">⚡</span>
                        </div>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
                        Design, build and launch beautiful landing pages in minutes. No coding required, just drag and drop
                        components and customize your page instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                        <button className="flex items-center gap-2 px-8 py-3 text-lg font-medium text-gray-700 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-gray-50 w-full sm:w-auto justify-center transition-colors duration-300">
                            <span>How it works</span>
                            <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Interactive Grid Pattern */}
            <InteractiveGridPattern
                className={cn(
                    "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
                    "absolute inset-x-0 inset-y-[-30%] h-[140%] skew-y-12 hover:fill-gray-200",
                )}
                width={40}
                height={40}
                squares={[80, 80]}
            />
        </div>
    )
}

