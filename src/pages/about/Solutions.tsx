import { useState, useEffect } from 'react';
import { Shield, Database, Cloud, Lock, CheckCircle, Edit3, ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Technology() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Changed h-screen to h-[70vh] for a shorter height */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
          alt="Cybersecurity Technology"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-6 relative z-20" data-aos="fade-up">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-serif text-white mb-8 leading-tight">
              Advanced Cyber Security Solutions
            </h1>
            <p className="text-xl text-gray-200 mb-12 max-w-2xl leading-relaxed">
              Protecting your digital assets with cutting-edge technology and comprehensive security solutions.
            </p>
            <button className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-all transform hover:translate-x-2 flex items-center gap-3 text-lg font-medium">
              Discover Our Solutions
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-serif mb-8 text-gray-900">Enterprise-Grade Security Infrastructure</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our comprehensive security solutions combine advanced threat detection, real-time monitoring, and rapid response capabilities to protect your organization from evolving cyber threats.
              </p>
              <div className="space-y-4">
                {[
                  "24/7 Security Operations Center",
                  "Advanced Threat Detection & Response",
                  "Zero Trust Architecture Implementation",
                  "Cloud Security Solutions"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-red-600" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative" data-aos="fade-left">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"
                alt="Security Operations Center"
                className="relative rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Comprehensive Security Solutions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all transform hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-red-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{solution.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{solution.description}</p>
                <button className="text-red-500 flex items-center gap-2 hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-4xl font-serif mb-8">Ready to Secure Your Infrastructure?</h2>
            <p className="text-gray-600 text-lg mb-12 leading-relaxed">
              Join leading organizations that trust our security solutions to protect their critical assets and data.
            </p>
            <div className="flex gap-6 justify-center">
              <button className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors">
                Get Started
              </button>
              <button className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const solutions = [
  {
    icon: <Shield className="w-7 h-7 text-white" />,
    title: "Threat Detection & Response",
    description: "Advanced monitoring and rapid response capabilities to identify and neutralize security threats in real-time."
  },
  {
    icon: <Cloud className="w-7 h-7 text-white" />,
    title: "Cloud Security",
    description: "Comprehensive protection for cloud infrastructure, ensuring data security across all cloud platforms."
  },
  {
    icon: <Lock className="w-7 h-7 text-white" />,
    title: "Zero Trust Security",
    description: "Implement robust zero trust architecture to ensure secure access control and data protection."
  },
  {
    icon: <Database className="w-7 h-7 text-white" />,
    title: "Data Protection",
    description: "Advanced encryption and security measures to protect sensitive data and ensure compliance."
  },
  {
    icon: <Edit3 className="w-7 h-7 text-white" />,
    title: "Security Assessment",
    description: "Comprehensive evaluation of your security infrastructure to identify and address vulnerabilities."
  },
  {
    icon: <CheckCircle className="w-7 h-7 text-white" />,
    title: "Compliance Management",
    description: "Ensure adherence to industry regulations and security standards with our compliance solutions."
  }
];