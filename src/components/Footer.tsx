"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Facebook, Twitter, Linkedin, Instagram, Youtube, ChevronRight } from "lucide-react"
import logo from "./images/lo.png"

const footerLinks = {
  "Useful links": ["Fellow login", "E-lect", "Careers", "Flexi grant"],
  Legal: ["Terms and conditions", "Privacy policy", "Manage cookies", "Cookies", "Modern Slavery Statement"],
  "Visit us": ["Contact us", "How to find us", "Venue hire", "Visit the library"],
}

const socialIcons = [
  { Icon: Facebook, href: "#" },
  { Icon: Twitter, href: "#" },
  { Icon: Linkedin, href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Youtube, href: "#" },
]

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState("")

  return (
    <footer className="bg-white/5 border-t border-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            className="col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={logo}
              alt="Logo"
              className="h-200 w-48 object-contain mb-6 transform hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-base md:text-lg font-bold mb-6 text-gray-800">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-red-500 transition-all duration-300 text-sm font-medium group flex items-center"
                      onMouseEnter={() => setHoveredLink(link)}
                      onMouseLeave={() => setHoveredLink("")}
                    >
                      <ChevronRight
                        className={`h-4 w-4 mr-2 transition-all duration-300 ${
                          hoveredLink === link ? "opacity-100 translate-x-1" : "opacity-0 -translate-x-1"
                        }`}
                      />
                      <span className="text-sm">{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 pt-8 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <span className="text-sm font-bold text-gray-700">Follow us</span>
              <div className="flex gap-4">
                {socialIcons.map(({ Icon, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    className="text-gray-400 hover:text-red-500"
                    whileHover={{ 
                      scale: 1.2,
                      filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))" 
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-600">
              © {new Date().getFullYear()} The Society. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}