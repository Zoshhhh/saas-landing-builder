import Image from "next/image"
import Link from "next/link"

export function CTA() {
    return (
        <section className="relative py-20 bg-gray-50">
            <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="gap-5 items-center lg:flex">
                    <div className="flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
                        <h2 className="text-5xl font-bold leading-tight text-gray-900 md:text-5xl">
                            Build your websites with{" "}
                            <span className="inline-block w-fit px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
                Page Builder
              </span>
                        </h2>
                        <p className="text-gray-500 leading-relaxed mt-3 text-lg">
                            Create stunning, responsive landing pages in minutes with our intuitive drag-and-drop builder. Boost your
                            conversion rates and grow your business faster.
                        </p>
                        <Link
                            href="/dashboard"
                            className="mt-5 px-4 py-2 text-blue-600 font-medium bg-blue-50 rounded-full inline-flex items-center hover:bg-blue-100 transition duration-150 ease-in-out text-lg"
                        >
                            Try it out
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 ml-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                    <div className="flex-1 mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
                        <Image
                            src="/placeholder.svg"
                            alt="Landing Page Builder Demo"
                            width={600}
                            height={400}
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
        </section>
    )
}

