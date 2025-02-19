import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
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
  UserPlus
} from "lucide-react"
import lo from "./images/lo.png"


const menuItems = [
  {
    title: "AboutUs",
    icon: Shield,
    items: [
      { name: "Overview", path: "/overview" },
      { name: "Mission", path: "/vision-mission" },
      { name: "Vision", path: "/vision-mission" },
      { name: "History", path: "/history" }
    ],
  },
  {
    title: "CyIntelligence",
    icon: Brain,
    items: [
      { name: "Research", path: "/research" },
      { name: "Innovation", path: "/innovation" },
      { name: "Technology", path: "/technology" },
      { name: "Solutions", path: "/solutions" }
    ],
  },
  {
    title: "Governance",
    icon: Building2,
    items: [
      { name: "Board", path: "/board" },
      { name: "Policies", path: "/policies" },
      { name: "Reports", path: "/reports" },
      { name: "MOU", path: "/mou" }
    ],
  },
  {
    title: "Happenings",
    icon: Calendar,
    items: [
      { name: "Events", path: "/events" },
      { name: "FDP", path: "/fdp" },
      { name: "Webinars", path: "/webinars" },
      { name: "Conferences", path: "/conferences" }
    ],
  },
  {
    title: "Membership",
    icon: Calendar,
    items: [
      { name: "Awards", path: "/awards" },
      { name: "Benefits", path: "/benefits" }
    ],
  },
  {
    title: "Journals",
    icon: Calendar,
    items: [
      { name: "Journal1", path: "/journal1" },
      { name: "Journal2", path: "/journal2" }
    ],
  },
  {
    title: "ReachUs",
    icon: Calendar,
    items: [
      { name: "ContactUs", path: "/contact" }
    ],
  },
]

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="border-b py-2 flex justify-between items-center">
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-red-500 transition-all duration-300 transform hover:scale-110">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-500 transition-all duration-300 transform hover:scale-110">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-500 transition-all duration-300 transform hover:scale-110">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <Mail className="h-4 w-4 text-red-500" />
            <span className="text-sm">contact@cyberintelligencesociety.org</span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
<img src={lo} alt="logo" className="h-200 w-68 object-contain  transform hover:scale-105 transition-transform duration-300 ml-[-200px]"/>
<Link to="/">
            {/* <Globe className="h-8 w-8 text-red-500 transform hover:rotate-180 transition-all duration-500" /> */}
            <div className="text-left" >
            <div className="text-sm text-gray-600 font-medium">Society for </div>
              <div className="font-serif"  style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
           

            color: '#2d3436',
          }}>Cyber Intelligence Systems</div>
             
            </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.title)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-all duration-300 font-medium">
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
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500 font-medium"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center gap-4 ml-6 border-l pl-6">
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-all duration-300 font-medium"
              >
                <LogIn className="h-4 w-4" />
                SignIn
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-8 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <UserPlus className="h-7 w-4" />
                CreateAccount
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 transition-all duration-300 hover:opacity-70" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-gray-600 mb-1.5 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-600 mb-1.5 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-600 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
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
                    className="flex items-center justify-between w-full px-4 py-2 text-gray-700 font-medium"
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
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block py-2 text-sm text-gray-600 hover:text-red-500 font-medium"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="py-4 border-t border-gray-100 mt-2">
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500"
                >
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}