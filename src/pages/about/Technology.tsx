import React from 'react';
import { Shield, Database, PenTool, Cloud, ChevronRight, CheckCircle } from 'lucide-react';

const Technology: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50" />
      </div>
      {/* Network Attack Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(169)-uytwMhPN9ZXOv9LRB3gncgnU9aMJQY.png" 
              alt="Cybersecurity Threat"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">IS YOUR COMPUTER NETWORK UNDER ATTACK?</h2>
            <p className="text-gray-600 mb-8">
              First response is crucial and every minute counts. Cyber crime is growing rapidly and always evolving, so you need to be able to fight back. Cyber Security Innovations security experts help businesses and organizations prevent, detect, respond to, and predict network attacks.
            </p>
            <button className="bg-[#1a1a2e] text-white px-8 py-3 rounded-md inline-flex items-center gap-2 hover:bg-[#2a2a4e] transition-colors">
              LEARN MORE
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>


      {/* 6 Reasons Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            6 REASONS WHY YOUR COMPANY NEEDS AN IT SECURITY ASSESSMENT
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Focus",
                description: "Nearly every security assessment uncovers gaping security flaws and exploits that could cripple a company's network."
              },
              {
                title: "Zero Day Exploits",
                description: "Hackers have access to exploits which the software manufactures are unaware of and have not yet patched."
              },
              {
                title: "Undetected Breaches",
                description: "Many companies do not even realize they have been compromised and may be leaking data for months and even years."
              },
              {
                title: "Mobile Data Exposure",
                description: "Mobile devices are often unencrypted and vulnerable to theft or loss."
              },
              {
                title: "Global Hacking",
                description: "International hackers are working around the clock to find new ways to breach systems."
              },
              {
                title: "Cloud Security",
                description: "Companies making a move towards the cloud must understand the security risk and procedures."
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-purple-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


            {/* Our Solutions Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">OUR SOLUTIONS</h2>
        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-16">
          We take a proactive – as opposed to a reactive – approach to Information Assurance and Cybersecurity (IA&C) to help our clients proactively prevent attacks and resolve potential threats before they become reality.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Database className="w-12 h-12" />, title: "FISMA Compliance" },
            { icon: <PenTool className="w-12 h-12" />, title: "Security Assessment" },
            { icon: <Cloud className="w-12 h-12" />, title: "Cloud Security" },
            { icon: <Shield className="w-12 h-12" />, title: "Penetration Testing" },
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="mb-4 text-purple-700 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-[#1a1a2e] text-white px-8 py-3 rounded-md inline-flex items-center gap-2 hover:bg-[#2a2a4e] transition-colors">
            LEARN MORE
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Technology;








