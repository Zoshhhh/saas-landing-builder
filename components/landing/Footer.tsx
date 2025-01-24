import Image from "next/image";
import Link from "next/link";

export function Footer() {
    const footerNavs = [
        { href: "/terms", name: "Terms" },
        { href: "/license", name: "License" },
        { href: "/privacy", name: "Privacy" },
        { href: "/about", name: "About Us" },
    ];


    return (
        <footer className="bg-gray-50 pt-10">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="space-y-6 sm:max-w-lg sm:mx-auto sm:text-center">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Build your Next.js landing pages faster
                    </h3>
                    <p className="text-gray-600">
                        Start creating and exporting stunning landing pages today with our intuitive builder.
                    </p>
                    <div className="flex justify-center gap-x-4">
                        <Link
                            href="/get-started"
                            className="py-2 px-4 text-white font-medium bg-blue-500 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/pricing"
                            className="py-2 px-4 text-blue-500 font-medium border border-blue-500 rounded-lg hover:bg-indigo-50"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>
                <div className="mt-10 border-t py-8 sm:flex sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} MakeMyLanding. All rights reserved.
                    </p>
                    <ul className="flex items-center gap-x-4 mt-4 sm:mt-0">
                        {footerNavs.map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    href={item.href}
                                    className="text-gray-800 hover:text-blue-500 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}