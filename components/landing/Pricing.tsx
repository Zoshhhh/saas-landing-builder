import React from "react"
import { Code, Palette, Smartphone, Search } from "lucide-react"

const PricingAndFeatures = () => {
    const plan = {
        name: "Pro Plan",
        desc: "Perfect for developers looking to build and export stunning landing pages in Next.js.",
        price: 39,
        isMostPop: true,
        features: [
            "Export projects in Next.js",
            "Unlimited page creation",
            "Custom domains",
            "Responsive design templates",
            "Access to premium components",
            "SEO optimization tools",
            "Priority support",
            "Version control for projects",
        ],
    }

    const features = [
        {
            name: (
                <span className="inline-block px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
          Next.js Export
        </span>
            ),
            desc: "Seamlessly export your landing pages in production-ready Next.js code for ultimate flexibility.",
            icon: <Code className="w-6 h-6" />,
        },
        {
            name: (
                <span className="inline-block px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
          Customizable Components
        </span>
            ),
            desc: "Choose from a library of professionally designed, customizable components to make your page stand out.",
            icon: <Palette className="w-6 h-6" />,
        },
        {
            name: (
                <span className="inline-block px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
          Responsive Design
        </span>
            ),
            desc: "All templates are fully responsive, ensuring your landing pages look great on every device.",
            icon: <Smartphone className="w-6 h-6" />,
        },
        {
            name: (
                <span className="inline-block px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
          SEO Tools
        </span>
            ),
            desc: "Boost your visibility with built-in SEO optimization features tailored for Next.js.",
            icon: <Search className="w-6 h-6" />,
        },
    ]

    return (
        <section className="relative py-14">
            <div className="max-w-screen-xl mx-auto text-gray-600 md:px-8">
                <div className="relative max-w-xl space-y-3 px-4 md:px-0">
                    <h3 className="text-blue-500 font-semibold">Pricing</h3>
                    <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">Build better, faster</p>
                    <div className="max-w-xl">
                        <p>Empower your web projects with our landing page creator. Export, customize, and deploy in no time.</p>
                    </div>
                </div>

                <div className="mt-16 justify-between gap-8 md:flex flex-row-reverse">
                    <div className="flex-1 flex flex-col border-y mt-6 md:max-w-xl md:rounded-xl md:border md:border-x-none md:shadow-lg md:mt-0">
                        <div className="p-4 py-8 border-b md:p-8">
                            <div className="justify-between flex">
                                <div className="max-w-xs">
                                    <span className="text-2xl text-gray-800 font-semibold sm:text-3xl">{plan.name}</span>
                                    <p className="mt-3 sm:text-sm">{plan.desc}</p>
                                </div>
                                <div className="flex-none text-gray-800 text-2xl font-semibold sm:text-3xl">
                                    ${plan.price} <span className="text-xl text-gray-600 font-normal">/ lifetime</span>
                                </div>
                            </div>
                            <button className="mt-4 px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-blue-500 hover:bg-indigo-500 active:bg-indigo-700">
                                Start Now
                            </button>
                        </div>
                        <ul className="p-4 space-y-3 sm:grid sm:grid-cols-2 md:block md:p-8 lg:grid">
                            <div className="pb-2 col-span-2 text-gray-800 font-medium">
                                <p>Included Features</p>
                            </div>
                            {plan.features.map((featureItem, idx) => (
                                <li key={idx} className="flex items-center gap-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-blue-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    {featureItem}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <ul className="flex-1 max-w-md space-y-10 px-4 md:px-0">
                        {features.map((item, idx) => (
                            <li key={idx} className="flex gap-x-3">
                                <div className="flex-none w-12 h-12 rounded-full bg-indigo-50 text-blue-500 flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg text-gray-800 font-medium">{item.name}</h4>
                                    <p className="text-gray-600 mt-2 md:text-sm">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default PricingAndFeatures

