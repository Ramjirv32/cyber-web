import React from 'react';
import { Download, ChevronRight } from 'lucide-react';

interface Award {
  title: string;
  description: string;
  category: string;
}

const Awards: React.FC = () => {
  const awards: Record<string, Award[]> = {
    "Technical Excellence": [
      {
        title: "Intelligent Systems Innovation Award",
        description: "Recognizing breakthrough innovations in AI-driven cybersecurity systems and intelligent threat detection.",
        category: "excellence"
      },
      {
        title: "Automated Defense Systems Award",
        description: "For exceptional achievements in developing autonomous cyber defense systems and intelligent response mechanisms.",
        category: "excellence"
      },
      {
        title: "Smart Security Architecture Award",
        description: "Celebrating innovative architectural designs in intelligent cybersecurity systems.",
        category: "excellence"
      },
      {
        title: "Pioneer in Cyber Intelligence",
        description: "Honoring transformative contributions to the field of cyber intelligent systems.",
        category: "excellence"
      }
    ],
    "Research & Development": [
      {
        title: "AI Security Research Excellence",
        description: "For groundbreaking research in artificial intelligence applications for cybersecurity.",
        category: "innovation"
      },
      {
        title: "Intelligent Threat Detection",
        description: "Recognizing excellence in developing intelligent systems for cyber threat detection and analysis.",
        category: "innovation"
      },
      {
        title: "Machine Learning Security Innovation",
        description: "For outstanding applications of machine learning in cybersecurity systems.",
        category: "innovation"
      },
      {
        title: "Next-Gen Security Systems",
        description: "Recognizing innovative approaches to future-ready intelligent security systems.",
        category: "innovation"
      }
    ],
    "Academic & Research Excellence": [
      {
        title: "Cyber Intelligence Education",
        description: "For outstanding contributions to education in cyber intelligent systems.",
        category: "education"
      },
      {
        title: "Research Leadership Award",
        description: "Recognizing exceptional leadership in cyber intelligence research and development.",
        category: "education"
      },
      {
        title: "Academic Achievement Award",
        description: "Celebrating academic excellence in cyber intelligent systems research.",
        category: "education"
      }
    ],
    "Industry Impact": [
      {
        title: "Industry Implementation Excellence",
        description: "For successful implementation of intelligent cybersecurity solutions in industry.",
        category: "community"
      },
      {
        title: "Open Innovation Award",
        description: "Recognizing valuable open-source contributions to cyber intelligent systems.",
        category: "community"
      },
      {
        title: "Cyber Intelligence Advocacy",
        description: "For promoting awareness and adoption of intelligent cybersecurity systems.",
        category: "community"
      }
    ]
  };

  const relatedContent = [
    {
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      title: "CIS Society Award Nominations",
      description: "Guidelines for nominating outstanding contributors in cyber intelligent systems.",
      link: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      title: "Award Winners Archive",
      description: "Discover the achievements of past CIS Society award recipients.",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Notice Banner */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <p className="text-gray-700">
            The Cyber Intelligent System Society awards are open for nominations from 29 November 2024 to 21 February 2025.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Awards Sections */}
          <div className="lg:col-span-3">
            {Object.entries(awards).map(([category, categoryAwards]) => (
              <section key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
                <div className="space-y-8">
                  {categoryAwards.map((award, index) => (
                    <div key={index} className="group">
                      <h3 className="text-lg font-semibold text-red-600 hover:text-red-700 cursor-pointer mb-2">
                        {award.title}
                      </h3>
                      <p className="text-gray-600">{award.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Downloads</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                >
                  <Download className="w-4 h-4" />
                  The Royal Society Medals and Awards: Nominations guidance
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Content */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedContent.map((content, index) => (
              <div key={index} className="group cursor-pointer">
                <img 
                  src={content.image} 
                  alt={content.title} 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600">
                  {content.title}
                </h3>
                <p className="text-gray-600">
                  {content.description}
                </p>
                <span className="inline-flex items-center text-red-600 font-medium mt-2 group-hover:text-red-700">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Awards;