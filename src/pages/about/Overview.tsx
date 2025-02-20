import { ArrowRight, ChevronRight, Download, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react'
import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function CyberResearch() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    })
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-red-900 to-gray-900 text-white py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/70 via-red-900/50 to-transparent" />
        <div className="container mx-auto px-6 relative" data-aos="fade-up">
          <h1 className="text-6xl font-serif mb-8 leading-tight">Global Cyber Intelligence Network</h1>
          <p className="text-xl max-w-3xl mb-6 leading-relaxed">
            Join our elite community of cybersecurity professionals and analysts working together to protect global digital infrastructure through advanced threat intelligence and collaborative defense.
          </p>
          <p className="text-xl font-medium bg-black/40 inline-block px-6 py-3 rounded-lg backdrop-blur-sm">
            Powered by advanced AI and human intelligence collaboration
          </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-gradient-to-br from-red-500 to-red-900 rounded-2xl p-8 shadow-2xl" data-aos="fade-right">
            <img 
              src="https://images.unsplash.com/photo-1551808525-51a94da548ce"
              alt="Cyber Intelligence Dashboard"
              className="w-full h-auto rounded-lg shadow-lg transform hover:scale-[1.02] transition-transform"
            />
          </div>
          <div data-aos="fade-left">
            <h2 className="text-4xl font-serif mb-8 leading-tight">
              Real-time Threat Intelligence Platform
            </h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Access our comprehensive threat intelligence platform that combines machine learning algorithms with human expertise to detect, analyze, and respond to emerging cyber threats in real-time.
            </p>
            <button className="bg-red-500 text-white px-8 py-4 rounded-lg flex items-center gap-3 hover:bg-red-600 transition-all hover:gap-4 shadow-lg">
              <Download className="w-5 h-5" />
              Download Intelligence Report
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-red-50 to-white py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">Intelligence Community Features</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all" data-aos="fade-up" data-aos-delay="100">
              <div className="h-48 bg-gradient-to-br from-red-500 to-red-700">
                <div className="h-full flex items-center justify-center text-white p-8">
                  <h3 className="text-2xl font-bold text-center">Threat Analysis Network</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Connect with security analysts worldwide to share insights, collaborate on investigations, and strengthen global cyber defense capabilities.
                </p>
                <button className="text-red-500 flex items-center gap-2 hover:gap-4 transition-all font-medium">
                  Join the network
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all" data-aos="fade-up" data-aos-delay="200">
              <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-8">
                <h3 className="text-2xl font-bold text-white text-center">Intelligence Exchange</h3>
              </div>
              <div className="p-8">
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Access our secure platform for sharing threat indicators, vulnerability reports, and coordinated response strategies with trusted community members.
                </p>
                <button className="text-gray-900 flex items-center gap-2 hover:gap-4 transition-all font-medium">
                  Learn more
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all" data-aos="fade-up" data-aos-delay="300">
              <div className="h-48 bg-gray-900">
                <img 
                  src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"
                  alt="Advanced Analytics Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4">Advanced Analytics</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Leverage our AI-powered analytics tools to identify patterns, predict threats, and enhance your organization's security posture.
                </p>
                <button className="text-gray-900 flex items-center gap-2 hover:gap-4 transition-all font-medium">
                  Explore analytics
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-red-500 to-red-900 text-white py-24">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <blockquote className="text-3xl text-center max-w-4xl mx-auto leading-relaxed italic">
            "The collaborative nature of this platform has revolutionized how we approach threat intelligence. The ability to share and analyze data in real-time with analysts worldwide has significantly improved our response capabilities."
            <footer className="mt-6 text-xl not-italic">- Sarah Chen, Chief Security Analyst</footer>
          </blockquote>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978"
              alt="Intelligence Team Collaboration"
              className="rounded-2xl shadow-2xl" 
              data-aos="fade-right"
            />
            <div data-aos="fade-left">
              <h2 className="text-4xl font-serif mb-8">Join Our Network</h2>
              <p className="text-gray-600 mb-4 text-lg">Ready to enhance your cyber intelligence capabilities?</p>
              <p className="text-gray-600 mb-10 text-lg">
                Contact us at intelligence@cybernetwork.com or call +1 (888) 555-0123
              </p>
              <div className="flex gap-6">
                <button className="bg-red-500 text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors shadow-lg">
                  Request Access
                </button>
                <button className="border-2 border-red-500 text-red-500 px-8 py-4 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-red-900 to-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm">
              © 2025 Global Cyber Intelligence Network
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-red-300 transition-colors transform hover:scale-110">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-red-300 transition-colors transform hover:scale-110">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-red-300 transition-colors transform hover:scale-110">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-red-300 transition-colors transform hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-red-300 hover:underline">Privacy Policy</a>
              <a href="#" className="hover:text-red-300 hover:underline">Terms and Conditions</a>
              <a href="#" className="hover:text-red-300 hover:underline">Security Information</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}