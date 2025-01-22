import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function CTA() {
    return (
        <section className="max-w-screen-xl mx-auto py-12 px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                    <div className="py-4">
                        <h3 className="text-3xl text-gray-800 font-semibold md:text-4xl">
                            Build your websites with <span className="text-blue-500">high performance</span>
                        </h3>
                        <p className="text-gray-500 leading-relaxed mt-3">
                            Nam erat risus, sodales sit amet lobortis ut, finibus eget metus. Cras aliquam ante ut tortor posuere
                            feugiat. Duis sodales nisi id porta lacinia.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="group px-4 py-2 text-blue-500 font-medium bg-indigo-50 rounded-full inline-flex items-center"
                    >
                        Try it out
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 ml-1 duration-150 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Button>
                </div>
                <div className="w-full md:w-1/2 max-w-md">
                    <Skeleton className="w-full h-64 rounded-lg bg-gray-300" />
                </div>
            </div>
        </section>
    )
}

