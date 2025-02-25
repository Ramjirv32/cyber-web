import React from 'react';
import { Shield, Database, PenTool, Cloud, ChevronRight, CheckCircle } from 'lucide-react';

const Technology: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/cyber-security-bg.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/50 to-red-900/50" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
            Cyber Security Solutions
          </h1>
          <p className="text-xl mb-8" data-aos="fade-up" data-aos-delay="100">
            Protecting your digital assets with cutting-edge security solutions
          </p>
          <button className="bg-red-500 text-white px-8 py-4 rounded-lg inline-flex items-center gap-2 hover:bg-red-600 transition-all"
            data-aos="fade-up" data-aos-delay="100">
            Explore Our Solutions
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Network Attack Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl" data-aos="fade-up" data-aos-delay="100">
            <img 
              src="/cyber-threat.jpg" 
              alt="Cybersecurity Threat"
              className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-4xl font-bold mb-6">Is Your Network Protected?</h2>
            <div className="w-20 h-1 bg-red-500 mb-8"></div>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              In today's digital landscape, cyber threats are evolving rapidly. Our expert team helps organizations prevent, detect, and respond to network attacks with advanced security solutions and real-time monitoring.
            </p>
            <button className="bg-red-500 text-white px-8 py-4 rounded-lg inline-flex items-center gap-2 hover:bg-red-600 transition-all">
              Discover More
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Security Assessment Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-4xl font-bold mb-6">
              Critical Reasons for Security Assessment
            </h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Understanding your security posture is crucial in today's threat landscape
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Zero Day Exploits",
                description: "Protection against unknown vulnerabilities and emerging threats"
              },
              {
                title: "Data Protection",
                description: "Safeguard sensitive information and maintain compliance"
              },
              {
                title: "Threat Detection",
                description: "Early identification of potential security breaches"
              },
              {
                title: "Mobile Security",
                description: "Comprehensive protection for mobile devices and data"
              },
              {
                title: "Cloud Security",
                description: "Secure cloud infrastructure and applications"
              },
              {
                title: "24/7 Monitoring",
                description: "Continuous security monitoring and incident response"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all"
                data-aos="fade-up" 
                data-aos-delay="100"
              >
                <CheckCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-4xl font-bold mb-6">Our Security Solutions</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield className="w-16 h-16" />, title: "Network Security" },
              { icon: <Database className="w-16 h-16" />, title: "Data Protection" },
              { icon: <Cloud className="w-16 h-16" />, title: "Cloud Security" },
              { icon: <PenTool className="w-16 h-16" />, title: "Penetration Testing" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl text-center hover:shadow-xl transition-all cursor-pointer group"
                data-aos="fade-up" 
                data-aos-delay="100"
              >
                <div className="text-red-500 mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technology;








