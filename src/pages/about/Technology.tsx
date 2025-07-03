import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Database, PenTool, Cloud, ChevronRight, CheckCircle, Lock, Code, Server, Globe, ChevronDown, ArrowRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Technology: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  
  const securityStats = [
    { value: '43%', label: 'of cyber attacks target small businesses' },
    { value: '300%', label: 'increase in reported ransomware attacks since 2020' },
    { value: '$4.35M', label: 'average cost of a data breach in 2023' },
    { value: '80%', label: 'of attacks leverage password vulnerabilities' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[80vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/cyber-security-bg.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/50 to-red-900/50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
            Advanced Cyber Security <span className="text-red-400">Technologies</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Leveraging cutting-edge technologies to protect your digital assets from evolving threats in today's interconnected world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="300">
            <Link 
              to="/solutions"
              className="bg-red-500 text-white px-8 py-4 rounded-lg inline-flex items-center gap-2 hover:bg-red-600 transition-all"
            >
              Explore Our Solutions
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              to="/security-assessment"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg inline-flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              Request Security Assessment
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce">
          <ChevronDown className="w-10 h-10 text-white/70" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-gray-900 to-red-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityStats.map((stat, index) => (
              <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={100 * index}>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-red-300">{stat.value}</div>
                <div className="text-sm md:text-base opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network Attack Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl relative group" data-aos="fade-up" data-aos-delay="100">
            <img 
              src="/cyber-threat.jpg" 
              alt="Cybersecurity Threat"
              className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-6">
                <h3 className="text-white text-2xl font-bold mb-2">Threat Intelligence</h3>
                <p className="text-white/80">Real-time monitoring and analysis to stay ahead of cyber threats</p>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-4xl font-bold mb-6">Is Your Network <span className="text-red-500">Truly Protected?</span></h2>
            <div className="w-20 h-1 bg-red-500 mb-8"></div>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              In today's digital landscape, cyber threats are evolving at an unprecedented rate. Traditional security measures are no longer sufficient to protect against sophisticated attacks.
            </p>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              Our expert team combines advanced threat intelligence, AI-powered monitoring, and rapid incident response to create a comprehensive security posture that adapts to emerging threats in real-time.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {['AI-Powered Protection', 'Real-time Monitoring', '24/7 Response Team', 'Behavioral Analysis'].map((item, i) => (
                <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  {item}
                </span>
              ))}
            </div>
            <Link 
              to="/threat-intelligence"
              className="bg-red-500 text-white px-8 py-4 rounded-lg inline-flex items-center gap-2 hover:bg-red-600 transition-all"
            >
              Discover Our Approach
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Technology Tabs Section */}
      <div className="bg-gray-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-6">Our Security Technologies</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-gray-300">
              We leverage the latest technologies to provide comprehensive protection across your entire digital ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-12" data-aos="fade-up" data-aos-delay="100">
            {[
              { title: "Network Security", icon: <Server className="w-6 h-6" /> },
              { title: "Application Security", icon: <Code className="w-6 h-6" /> },
              { title: "Cloud Infrastructure", icon: <Cloud className="w-6 h-6" /> },
              { title: "End User Protection", icon: <Shield className="w-6 h-6" /> }
            ].map((tab, index) => (
              <button 
                key={index}
                className={`flex items-center justify-center gap-3 py-4 px-6 rounded-lg transition-all ${
                  activeTab === index 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.icon}
                <span>{tab.title}</span>
              </button>
            ))}
          </div>
          
          <div className="bg-gray-800 p-8 rounded-2xl" data-aos="fade-up" data-aos-delay="200">
            {activeTab === 0 && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Advanced Network Security</h3>
                  <p className="text-gray-300 mb-6">
                    Our next-generation firewalls, intrusion detection systems, and network monitoring tools create multiple layers of protection against external and internal threats.
                  </p>
                  <ul className="space-y-3">
                    {['Deep Packet Inspection', 'Traffic Analysis', 'Behavioral Monitoring', 'Automated Threat Response'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-80">
                  <img 
                    src="/network-security.jpg" 
                    alt="Network Security" 
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            )}
            
            {activeTab === 1 && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Application Security</h3>
                  <p className="text-gray-300 mb-6">
                    Protect your web and mobile applications from OWASP Top 10 vulnerabilities with our comprehensive application security testing and monitoring.
                  </p>
                  <ul className="space-y-3">
                    {['Secure Code Reviews', 'SAST & DAST Testing', 'API Security', 'Runtime Application Self-Protection'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-80">
                  <img 
                    src="/application-security.jpg" 
                    alt="Application Security" 
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            )}
            
            {activeTab === 2 && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Cloud Infrastructure Security</h3>
                  <p className="text-gray-300 mb-6">
                    Secure your cloud environments across AWS, Azure, and Google Cloud with comprehensive cloud security posture management.
                  </p>
                  <ul className="space-y-3">
                    {['Identity & Access Management', 'Configuration Auditing', 'Container Security', 'Data Loss Prevention'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-80">
                  <img 
                    src="/cloud-security.jpg" 
                    alt="Cloud Security" 
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            )}
            
            {activeTab === 3 && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">End User Protection</h3>
                  <p className="text-gray-300 mb-6">
                    Secure your workforce with advanced endpoint protection, phishing prevention, and security awareness training.
                  </p>
                  <ul className="space-y-3">
                    {['Endpoint Detection & Response', 'Email Security', 'Security Awareness Training', 'Multi-Factor Authentication'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-80">
                  <img 
                    src="/endpoint-security.jpg" 
                    alt="Endpoint Security" 
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            )}
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
              Regular security assessments are essential to identify vulnerabilities before they can be exploited
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <AlertTriangle className="w-12 h-12" />,
                title: "Zero Day Exploits",
                description: "Protection against unknown vulnerabilities and emerging threats that traditional security measures might miss",
                link: "/security/zero-day-protection"
              },
              {
                icon: <Lock className="w-12 h-12" />,
                title: "Data Protection",
                description: "Safeguard sensitive information and maintain compliance with regulations like GDPR, HIPAA, and PCI DSS",
                link: "/security/data-protection"
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: "Threat Detection",
                description: "Early identification of potential security breaches through comprehensive monitoring and analysis",
                link: "/security/threat-detection"
              },
              {
                icon: <Globe className="w-12 h-12" />,
                title: "Mobile Security",
                description: "Comprehensive protection for mobile devices, applications and data across your organization",
                link: "/security/mobile-security"
              },
              {
                icon: <Cloud className="w-12 h-12" />,
                title: "Cloud Security",
                description: "Secure cloud infrastructure and applications with specialized tools and configurations",
                link: "/security/cloud-security"
              },
              {
                icon: <Server className="w-12 h-12" />,
                title: "24/7 Monitoring",
                description: "Continuous security monitoring and incident response to detect and mitigate threats in real-time",
                link: "/security/continuous-monitoring"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all border-t-4 border-red-500"
                data-aos="fade-up" 
                data-aos-delay={100 + (index * 50)}
              >
                <div className="text-red-500 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <Link to={item.link} className="text-red-500 inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
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
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Comprehensive security solutions designed for today's complex threat landscape
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Shield className="w-16 h-16" />, 
                title: "Network Security",
                description: "Protect your network infrastructure with advanced firewalls and intrusion prevention",
                link: "/solutions/network-security"
              },
              { 
                icon: <Database className="w-16 h-16" />, 
                title: "Data Protection",
                description: "Secure sensitive data with encryption, access controls and DLP solutions",
                link: "/solutions/data-protection"
              },
              { 
                icon: <Cloud className="w-16 h-16" />, 
                title: "Cloud Security",
                description: "Secure your cloud environments with specialized tools and configurations",
                link: "/solutions/cloud-security"
              },
              { 
                icon: <PenTool className="w-16 h-16" />, 
                title: "Penetration Testing",
                description: "Identify vulnerabilities through simulated cyber attacks by our experts",
                link: "/solutions/penetration-testing"
              },
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl text-center hover:shadow-xl transition-all cursor-pointer group"
                data-aos="fade-up" 
                data-aos-delay={100 + (index * 50)}
              >
                <div className="text-red-500 mb-6 transform group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <Link to={item.link} className="text-red-500 inline-flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-900 py-20 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">Ready to Secure Your Digital Assets?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Schedule a comprehensive security assessment with our experts to identify vulnerabilities and strengthen your security posture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
            <Link
              to="/security-assessment"
              className="bg-white text-red-600 px-8 py-4 rounded-lg inline-flex items-center justify-center gap-2 hover:bg-gray-100 transition-all font-medium"
            >
              Schedule Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technology;








