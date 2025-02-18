import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ChevronLeft, ChevronRight, Mail, Share2, Facebook, Twitter, Linkedin, Building2, MessageSquare, GraduationCap, ArrowRight } from 'lucide-react';
import ai from "../components/images/s1.avif";
import ai2 from "../components/images/s2.avif";
import ai3 from "../components/images/s3.avif";
const slides = [
  {
    image: ai, // Digital technology visualization
    subtitle: 'Innovating the Future',
    description: 'Join us in the journey of technological advancements and collaborative research.'
  },
  {
    image: ai2, // AI and data visualization
    subtitle: 'Advancing AI',
    description: 'Leading the way in artificial intelligence and machine learning research.'
  },
  {
image: ai3, // Digital cityscape or network
    subtitle: 'Innovation Hub',
    description: 'A hub for innovation and cutting-edge technology solutions.'
  },
 
];


function Card({ 
  title, 
  items, 
  icon: Icon,
  bgImage
}: { 
  title: string; 
  items: string[]; 
  icon: React.ElementType;
  bgImage: string;
}) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '380px',
      minHeight: '500px',
      borderRadius: '16px',
      padding: '2rem',
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImage})`;
    }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}>
          <Icon style={{ width: '40px', height: '40px', color: '#ff4757' }} />
        </div>
        
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          {title}
        </h2>
        
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          marginBottom: '2rem',
          width: '100%',
        }}>
          {items.map((item, index) => (
            <li key={index} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
              color: 'white',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: index % 2 === 0 ? 'white' : '#ff4757',
                marginRight: '1rem',
              }}></span>
              <span style={{ fontSize: '1rem' }}>{item}</span>
            </li>
          ))}
        </ul>
        
        <button style={{
          marginTop: 'auto',
          padding: '0.75rem 2rem',
          backgroundColor: '#ff4757',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        >
          View More
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function Home() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true
    });

    // Set up automatic slide rotation with animation
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const navigateSlide = (direction: 'prev' | 'next') => {
    setCurrentSlideIndex((prevIndex) => {
      if (direction === 'prev') {
        return prevIndex === 0 ? slides.length - 1 : prevIndex - 1;
      } else {
        return (prevIndex + 1) % slides.length;
      }
    });
  };

  const cards = [
    {
      title: "Collaborative Research",
      icon: Building2,
      bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      items: [
        "Computational Intelligence",
        "Edge Intelligence",
        "Internet of Things",
        "Learning Analytics",
        "Data Science"
      ]
    },
    {
      title: "Forum for Knowledge Exchange",
      icon: MessageSquare,
      bgImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      items: [
        "Digital Meet-ups",
        "Conference",
        "Talk Series",
        "FDP",
        "Webinar"
      ]
    },
    {
      title: "Empowerment",
      icon: GraduationCap,
      bgImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
      items: [
        "Industry-Connect",
        "Consultancy",
        "Projects",
        "Training",
        "Placement Assistance"
      ]
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
    }}>
      <section className="relative h-[600px] overflow-hidden">
        <div
          key={currentSlideIndex}
          className="absolute inset-0 w-full h-full"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <img
            src={slides[currentSlideIndex].image}
            className="w-full h-full object-cover"
            alt={`Slide ${currentSlideIndex + 1}`}
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        
        {/* Navigation Buttons */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 z-20"
          onClick={() => navigateSlide('prev')}
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </button>
        
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 z-20"
          onClick={() => navigateSlide('next')}
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlideIndex 
                  ? 'bg-white w-4' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => setCurrentSlideIndex(index)}
            />
          ))}
        </div>

        <div 
          className="relative z-10 container mx-auto px-6 h-full flex items-center"
          data-aos="fade-right"
        >
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Society for{' '}
              <span className="text-red-400">Intelligent</span>{' '}
              <span className="text-red-400">Systems</span>
            </h1>
            <p className="text-xl mb-4 opacity-90">{slides[currentSlideIndex].subtitle}</p>
            <p className="text-lg mb-8 opacity-90">{slides[currentSlideIndex].description}</p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full inline-flex items-center gap-2 transition-colors text-lg font-medium">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
      <div style={{
        padding: '5rem 1rem',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '4rem',
            color: '#2d3436',
          }}>
            Our Services
          </h1>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            justifyItems: 'center',
          }}>
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                items={card.items}
                icon={card.icon}
                bgImage={card.bgImage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;