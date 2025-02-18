"use client"

import { useEffect } from "react"
import { motion } from "framer-motion" 
import AOS from "aos"
import "aos/dist/aos.css"
import { Award, BookOpen, Users, Microscope, Lightbulb, GraduationCap, LucideIcon } from "lucide-react"
import medal from "./images/medals.avif";
import ani from "./images/ani.avif"
import research from "./images/research.avif"

interface Card {
  title: string
  description: string
  icon: LucideIcon
  image: string
}

interface CardProps {
  card: Card
  index: number
}


const cards: Card[] = [
  {
    title: "Medals and awards",
    description: "Nominations are now open for the Royal Society's medals and awards 2025.",
    icon: Award,
    image: medal,},
  {
    title: "Anniversary Day",
    description: "The President delivers the 2024 Anniversary Day Address.",
    icon: Users,
    image: ani,},
  {
    title: "Science Book Prize",
    description: "A City on Mars wins the Royal Society Science Book Prize.",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Research Initiatives",
    description: "Exploring new frontiers in scientific research and innovation.",
    icon: Microscope,
    image: research,
  },
  {
    title: "Innovation Hub",
    description: "Supporting breakthrough ideas and technological advancement.",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Education Programs",
    description: "Fostering the next generation of scientific leaders.",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  },
]
export default function FeaturedCards() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    })
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-xl md:text-3xl font-bold text-center mb-12 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Highlights
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Card key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Card({ card, index }: CardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = "/fallback-image.jpg"
    target.onerror = null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
      }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={card.image}
          alt={card.title}
          onError={handleImageError}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <card.icon className="h-12 w-12 text-white drop-shadow-lg" />
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">
          {card.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {card.description}
        </p>
        <motion.button
          className="mt-4 text-red-500 font-bold group flex items-center"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          Learn more
          <motion.span
            className="ml-2"
            animate={{ x: [0, 3, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1,
              ease: "easeInOut" 
            }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  )
}

// Add to your global CSS file
const styles = `
  .cyber-glitch-text {
    text-shadow: 
      0.05em 0 0 rgba(255,0,0,0.75),
      -0.025em -0.05em 0 rgba(0,255,0,0.75),
      0.025em 0.05em 0 rgba(0,0,255,0.75);
    animation: cyber-glitch 500ms infinite;
  }

  @keyframes cyber-glitch {
    0% {
      text-shadow: 
        0.05em 0 0 rgba(255,0,0,0.75),
        -0.05em -0.025em 0 rgba(0,255,0,0.75),
        -0.025em 0.05em 0 rgba(0,0,255,0.75);
    }
    15% {
      text-shadow: 
        -0.05em -0.025em 0 rgba(255,0,0,0.75),
        0.025em 0.025em 0 rgba(0,255,0,0.75),
        -0.05em -0.05em 0 rgba(0,0,255,0.75);
    }
    50% {
      text-shadow: 
        0.025em 0.05em 0 rgba(255,0,0,0.75),
        0.05em 0 0 rgba(0,255,0,0.75),
        0 -0.05em 0 rgba(0,0,255,0.75);
    }
  }
`

