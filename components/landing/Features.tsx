import Image from "next/image"
import {Video} from "lucide-react";

export function Features() {
    const features = [
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                </svg>
            ),
            title: (
                <span className="inline-block px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
          AI-Powered Design
        </span>
            ),
            desc: "Leverage cutting-edge AI to generate stunning, responsive landing pages tailored to your brand and goals.",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                </svg>
            ),
            title: (
                <span className="inline-block px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
          Next.js Export
        </span>
            ),
            desc: "Instantly extract production-ready Next.js code, allowing for seamless integration and deployment of your AI-generated landing pages.",
        },
    ]

    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-16 justify-between md:px-8 lg:flex lg:flex-row-reverse">
                <div className="lg:w-1/2">
                    <div className="max-w-xl space-y-3">
                        <h3 className="text-blue-500 font-semibold">Features</h3>
                        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">AI-Powered Landing Page Generation</p>
                        <p>
                            Create stunning, high-converting landing pages in minutes with our AI-driven builder. Design, customize,
                            and export Next.js code with ease.
                        </p>
                    </div>
                    <div className="mt-12 max-w-lg lg:max-w-none">
                        <ul className="space-y-8">
                            {features.map((item, idx) => (
                                <li key={idx} className="flex gap-x-4">
                                    <div className="flex-none w-16 h-16 bg-indigo-50 text-blue-500 rounded-lg flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg text-gray-800 font-semibold">{item.title}</h4>
                                        <p className="mt-3">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-full lg:w-7/12 mt-20 lg:mt-40">
                    <video
                        src="/features.mp4"
                        width={500}
                        height={333}
                        className="w-full rounded-lg shadow-md"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                    />
                </div>
            </div>
        </section>
    )
}
