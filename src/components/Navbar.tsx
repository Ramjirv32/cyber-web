"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { scrollToTop } from '../utils/scrollUtils'
import { useNavigationWithLoading } from '../hooks/useNavigationWithLoading'
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
  LogIn, 
  UserPlus
} from 'lucide-react'

import lo from "./images/lo.png"

const menuItems = [
  {
    title: "AboutUs",
    icon: Shield,
    items: [
      { name: "Overview", path: "/overview" },
      { name: "Vision & Mission", path: "/vision-mission" },
      { name: "History", path: "/history" },
    ],
  },
  {
    title: "CyIntelligence",
    icon: Brain,
    items: [
      { name: "Research", path: "/research" },
      { name: "Innovation & Technology", path: "/technology" },
      { name: "Solutions", path: "/solutions" },
    ],
  },
  {
    title: "Governance",
    icon: Building2,
    items: [
      { name: "Board", path: "/board" },
      { name: "Policies", path: "/policies" },
      { name: "Reports", path: "/reports" },
      { name: "MOU", path: "/mou" },
    ],
  },
  {
    title: "Happenings",
    icon: Calendar,
    items: [
      { name: "Events", path: "/events" },
      { name: "FDP", path: "/fdp" },
      { name: "Webinars", path: "/webinars" },
      { name: "Conferences", path: "/conferences" },
    ],
  },
  {
    title: "Membership",
    icon: Calendar,
    items: [
      { name: "Awards", path: "/awards" },
      { name: "Benefits", path: "/benefits" },
    ],
  },
  {
    title: "Journals",
    icon: Calendar,
    items: [
      { name: "Journal1", path: "/journal1" },
      { name: "Journal2", path: "/journal2" },
    ],
  },
  {
    title: "ReachUs",
    icon: Calendar,
    items: [{ name: "ContactUs", path: "/contact" }],
  },
/*   {
    title: "Services",
    icon: Calendar,
    items: [
      { name: "Professional Services", path: "/service" },
      { name: "Consulting", path: "/consulting" },
    ],
  }, */
]

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { navigateWithLoading } = useNavigationWithLoading();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    
    checkAuthStatus();
    
    window.addEventListener('storage', checkAuthStatus);
    window.addEventListener('authStatusChanged', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener('authStatusChanged', checkAuthStatus);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsAuthenticated(false);
    
    window.dispatchEvent(new Event('authStatusChanged'));
    
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4">

        <div className="border-b py-2">
          <div className="flex justify-between items-center">
       
            <div className="flex items-center gap-4 text-sm text-gray-600">
             
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <Mail className="h-4 w-4 text-red-500" />
                <span className="text-sm">info@societycis.org</span>
              </div>
              <div className="flex gap-4 border-l pl-4">
                <a
                  href="https://www.facebook.com/"
                  className="text-gray-600 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/"
                  className="text-gray-600 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.LinkedIn.com/"
                  className="text-gray-600 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className="py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Logo and title - Now with less margin */}
              <div className="flex items-center gap-4">
                <img
                  src={lo || "/placeholder.svg"}
                  alt="logo"
                  className="h-16 w-16 sm:h-24 sm:w-24 lg:h-36 lg:w-36 object-contain transform hover:scale-105 transition-transform duration-300"
                />
                <Link to="/" className="hidden sm:block">
                  <div className="text-left">
                    <div className="text-sm lg:text-base text-gray-600 font-medium">Society for</div>
                    <div className="font-serif text-xl lg:text-2xl font-bold text-[#2d3436]">
                      Cyber Intelligent System
                    </div>
                  </div>
                </Link>
              </div>

    
              <div className="hidden lg:flex items-center justify-end flex-grow ml-[150px]">
                {menuItems.map((item) => (
                  <div
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(item.title)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <button className="flex items-center px-4 text-sm text-gray-700 hover:text-red-500 transition-all duration-300 font-medium">
                      <item.icon className="h-4 w-4" />
                      {item.title}
                      <ChevronDown
                        className={`h-4 w-4 transform transition-transform duration-300 ${
                          activeMenu === item.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeMenu === item.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 mt-2 z-50"
                        >                          {item.items.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={() => {
                                scrollToTop();
                                navigateWithLoading(subItem.path);
                                setActiveMenu(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500 font-medium w-full text-left"
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

            
                <div className="hidden sm:flex items-center gap-2 ml-4">
                  {isAuthenticated ? (
                    <button 
                      onClick={handleLogout}
                      className="text-gray-800 hover:text-red-600 transition duration-300"
                    >
                      Logout
                    </button>                  ) : (
                    <>
                      <button
                        onClick={() => {
                          scrollToTop();
                          navigateWithLoading("/login");
                        }}
                        className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-all duration-300 font-medium text-sm"
                      >
                        <LogIn className="h-4 w-4" />
                        SignIn
                      </button>
                      <button
                        onClick={() => {
                          scrollToTop();
                          navigateWithLoading("/signIn");
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-sm"
                      >
                        <UserPlus className="h-4 w-4" />
                        CreateAccount
                      </button>
                    </>
                  )}
                </div>
              </div>


              <button
                className="lg:hidden p-2 transition-all duration-300 hover:opacity-70"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <div
                  className={`w-6 h-0.5 bg-gray-600 mb-1.5 transition-transform ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-gray-600 mb-1.5 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-gray-600 transition-transform ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></div>
              </button>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden mt-4"
                >
                  {menuItems.map((item) => (
                    <div key={item.title} className="py-2">
                      <button
                        onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                        className="flex items-center justify-between w-full px-4 py-2 text-gray-700 font-medium"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {item.title}
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            activeMenu === item.title ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeMenu === item.title && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-50 px-8 py-2"
                          >                            {item.items.map((subItem) => (
                              <button
                                key={subItem.name}
                                onClick={() => {
                                  scrollToTop();
                                  navigateWithLoading(subItem.path);
                                  setIsMobileMenuOpen(false);
                                  setActiveMenu(null);
                                }}
                                className="block py-2 text-sm text-gray-600 hover:text-red-500 font-medium w-full text-left"
                              >
                                {subItem.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  <div className="sm:hidden py-4 border-t border-gray-100 mt-2">
                    {isAuthenticated ? (
                      <button 
                        onClick={handleLogout}
                        className="text-gray-800 hover:text-red-600 transition duration-300"
                      >
                        Logout
                      </button>                    ) : (
                      <>
                        <button
                          onClick={() => {
                            scrollToTop();
                            navigateWithLoading("/login");
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500 w-full text-left"
                        >
                          <LogIn className="h-4 w-4" />
                          Sign In
                        </button>
                        <button
                          onClick={() => {
                            scrollToTop();
                            navigateWithLoading("/signup");
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500 w-full text-left"
                        >
                          <UserPlus className="h-4 w-4" />
                          CreateAccount
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  )
}