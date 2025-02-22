import React from 'react';
import { Download, ChevronRight } from 'lucide-react';

interface Award {
  title: string;
  description: string;
  category: string;
}

const Awards: React.FC = () => {
  const awards: Record<string, Award[]> = {
    "Excellence in Cybersecurity": [
      {
        title: "Cyber Defender of the Year",
        description: "Recognizing outstanding achievements in protecting critical infrastructure and implementing innovative security solutions.",
        category: "excellence"
      },
      {
        title: "Security Research Impact Award",
        description: "For groundbreaking research contributions that advance the field of cybersecurity and digital defense.",
        category: "excellence"
      },
      {
        title: "Incident Response Excellence",
        description: "Celebrating teams and individuals who demonstrated exceptional handling of critical security incidents.",
        category: "excellence"
      },
      {
        title: "Lifetime Achievement in Cybersecurity",
        description: "Honoring distinguished careers dedicated to advancing cybersecurity practices and education.",
        category: "excellence"
      }
    ],
    "Innovation Awards": [
      {
        title: "AI Security Innovation",
        description: "For innovative applications of artificial intelligence in cybersecurity threat detection and response.",
        category: "innovation"
      },
      {
        title: "Zero Trust Architecture Implementation",
        description: "Recognizing excellence in implementing and advancing zero trust security frameworks.",
        category: "innovation"
      },
      {
        title: "Cloud Security Pioneer",
        description: "For outstanding contributions to cloud security architecture and best practices.",
        category: "innovation"
      },
      {
        title: "Emerging Technology Security",
        description: "Recognizing innovative approaches to securing emerging technologies and platforms.",
        category: "innovation"
      }
    ],
    "Leadership & Education": [
      {
        title: "Security Education Excellence",
        description: "For outstanding contributions to cybersecurity education and awareness programs.",
        category: "education"
      },
      {
        title: "CISO of the Year",
        description: "Recognizing exceptional leadership in enterprise security strategy and implementation.",
        category: "education"
      },
      {
        title: "Security Mentor Award",
        description: "Celebrating individuals who excel at mentoring the next generation of security professionals.",
        category: "education"
      }
    ],
    "Community Impact": [
      {
        title: "Threat Intelligence Sharing",
        description: "For significant contributions to the security community through threat intelligence sharing.",
        category: "community"
      },
      {
        title: "Open Source Security",
        description: "Recognizing valuable contributions to open source security tools and frameworks.",
        category: "community"
      },
      {
        title: "Security Advocacy",
        description: "For outstanding efforts in promoting cybersecurity awareness and best practices.",
        category: "community"
      }
    ]
  };

  const relatedContent = [
    {
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      title: "Award Nomination Guidelines",
      description: "Information about nominating individuals or teams for cybersecurity awards.",
      link: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      title: "Past Award Winners",
      description: "Explore the achievements of previous cybersecurity award recipients.",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Notice Banner */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <p className="text-gray-700">
            The Royal Society awards that are open for nominations from 29 November 2024 to 21 February 2025 are:
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