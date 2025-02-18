"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import {
  ChevronDown,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Shield,
  Brain,
  Building2,
  Calendar,
  Users,
  Globe,
  LogIn,
  UserPlus,
} from "lucide-react"

const menuItems = [
  {
    title: "About Us",
    icon: Shield,
    items: ["Overview", "Mission", "Vision", "History"],
  },
  {
    title: "CyIntelligence",
    icon: Brain,
    items: ["Research", "Innovation", "Technology", "Solutions"],
  },
  {
    title: "Governance",
    icon: Building2,
    items: ["Board", "Policies", "Reports", "MOU"],
  },
  
  {
    title: "Happenings",
    icon: Calendar,
    items: ["Events", "FDP", "Webinars"],
  },
  {
    title: "Membership",
    icon: Calendar,
    items: ["Awards", "Benefits"],
  },
]

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const navigate = useNavigate()

  const handleAuthClick = (path: string) => {
    setIsAuthOpen(false)
    navigate(path)
  }

  return (
    <motion.nav
      className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="border-b border-gray-100 py-2 flex justify-between items-center">
          <div className="flex gap-4">
            <motion.a
              whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))" }}
              className="text-gray-600 hover:text-red-500 transition-all duration-300"
            >
              <Facebook className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))" }}
              className="text-gray-600 hover:text-red-500 transition-all duration-300"
            >
              <Twitter className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))" }}
              className="text-gray-600 hover:text-red-500 transition-all duration-300"
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
          </div>

          <motion.div className="flex items-center gap-2 text-gray-600 font-medium" whileHover={{ scale: 1.05 }}>
            <Mail className="h-4 w-4" />
            <span className="text-sm">contact@cyberintelligencesociety.org</span>
          </motion.div>
        </div>

        {/* Main Navigation */}
        <div className="py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer" 
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
          >
            <Globe className="h-8 w-8 text-red-500 animate-pulse" />
            <Link to="/" className="text-left">
              <div className="text-xs md:text-sm text-gray-600">Society for</div>
              <div className="text-base md:text-xl font-bold text-gray-900 glitch-text">
                Cyber Intelligence Systems
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Main Menu Items */}
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.title)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className="flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-red-500 transition-all duration-300 font-medium whitespace-nowrap">
                    <item.icon className="h-4 w-4" />
                    {item.title}
                    <ChevronDown className={`h-4 w-4 transform transition-transform duration-300 ${
                      activeMenu === item.title ? "rotate-180" : ""
                    }`} />
                  </button>

                  <AnimatePresence>
                    {activeMenu === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 mt-2"
                      >
                        {item.items.map((subItem) => (
                          <a
                            key={subItem}
                            href="#"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 font-medium"
                          >
                            {subItem}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Additional Nav Items - Now Horizontal */}
            <div className="flex items-center space-x-8">
             

              <button className="flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-red-500 transition-all duration-300 font-medium whitespace-nowrap">
                <Mail className="h-4 w-4" />
                Reach Us
              </button>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-red-500 transition-all duration-300 font-medium whitespace-nowrap"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-sm whitespace-nowrap"
                >
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 transition-all duration-300 hover:opacity-70"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div
              className={`w-6 h-0.5 bg-gray-600 mb-1.5 transition-transform ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></div>
            <div className={`w-6 h-0.5 bg-gray-600 mb-1.5 ${isMobileMenuOpen ? "opacity-0" : ""}`}></div>
            <div
              className={`w-6 h-0.5 bg-gray-600 transition-transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              {menuItems.map((item) => (
                <div key={item.title} className="py-2">
                  <button
                    onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                    className="flex items-center justify-between w-full px-4 py-2 text-gray-600 font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${activeMenu === item.title ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeMenu === item.title && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-50 px-8 py-2"
                      >
                        {item.items.map((subItem) => (
                          <a
                            key={subItem}
                            href="#"
                            className="block py-2 text-sm text-gray-600 hover:text-red-500 font-medium"
                          >
                            {subItem}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="py-2 border-t border-gray-100 mt-2">
                <button
                  onClick={() => handleAuthClick("/login")}
                  className="flex items-center gap-2 w-full px-4 py-2 text-gray-600 hover:text-red-500"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </button>
                <button
                  onClick={() => handleAuthClick("/signup")}
                  className="flex items-center gap-2 w-full px-4 py-2 text-gray-600 hover:text-red-500"
                >
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

