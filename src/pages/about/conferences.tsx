import { useEffect } from 'react';
import AOS from 'aos';

export default function CyberConference() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cybersecurity & Digital Forensics Summit 2024</h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the latest advancements in cybersecurity, ethical hacking, and digital forensics with global experts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
        <div className="bg-white rounded-2xl shadow-lg p-8" data-aos="fade-right">
          <img src="https://source.unsplash.com/400x250/?cybersecurity,hacking" alt="Cybersecurity Research" className="rounded-lg mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cyber Threat Intelligence</h2>
          <p className="text-gray-600">Discover the latest research on cyber threats, attack prevention, and AI-powered security solutions.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8" data-aos="fade-up">
          <img src="https://source.unsplash.com/400x250/?digitalforensics,investigation" alt="Forensics" className="rounded-lg mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Digital Forensics</h2>
          <p className="text-gray-600">Learn cutting-edge techniques in cybercrime investigation, forensic analysis, and evidence recovery.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8" data-aos="fade-left">
          <img src="https://source.unsplash.com/400x250/?ai,security" alt="AI and Cybersecurity" className="rounded-lg mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI in Cybersecurity</h2>
          <p className="text-gray-600">Explore how artificial intelligence is shaping the future of cybersecurity and automation.</p>
        </div>
      </div>
    </div>
  );
}
