import React from "react"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer1() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold mb-4">Your Company</h3>
                        <p className="text-gray-400">Building the future, one pixel at a time.</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-gray-300 transition-colors">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="hover:text-gray-300 transition-colors">
                                <Twitter size={24} />
                            </a>
                            <a href="#" className="hover:text-gray-300 transition-colors">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="hover:text-gray-300 transition-colors">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

