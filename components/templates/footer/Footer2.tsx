import React from "react"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer2() {
  return (
      <footer className="bg-gray-100 text-gray-600 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Company</h3>
              <p className="mb-4">Empowering businesses with innovative solutions.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Web Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    E-commerce Solutions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Mobile Apps
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Digital Marketing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail size={16} className="mr-2" /> info@yourcompany.com
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2" /> +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <MapPin size={16} className="mr-2" /> 123 Business St, City, Country
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

