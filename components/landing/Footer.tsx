export function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Product</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Careers
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Tutorials
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 flex justify-between items-center">
                    <p className="text-gray-400">&copy; 2023 Landing Page Generator. All rights reserved.</p>
                    <div className="flex space-x-6">{/* Add social media icons here */}</div>
                </div>
            </div>
        </footer>
    )
}

