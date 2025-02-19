"use client"

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Dr. Emily Chen",
    role: "Chief Information Security Officer",
    company: "TechGuard Solutions",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    quote:
      "The Cyber Intelligence Community has been an invaluable resource for staying ahead of emerging threats. Their insights have significantly enhanced our security posture.",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Senior Threat Analyst",
    company: "Global Cybersecurity Institute",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    quote:
      "I've been a member for over five years, and the quality of research and collaboration opportunities provided by the community are unparalleled.",
  },
  {
    id: 3,
    name: "Sarah Thompson",
    role: "Director of Cybersecurity",
    company: "Secure Innovations Inc.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
    quote:
      "The networking events and conferences organized by the Cyber Intelligence Community have been instrumental in fostering partnerships and knowledge sharing in our industry.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="mt-16 bg-white rounded-2xl shadow-lg p-8" data-aos="fade-up">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Our Members Say</h2>
      <div className="relative">
        <div className="flex items-center justify-center">
          <button
            onClick={prevTestimonial}
            className="absolute left-0 z-10 p-2 text-gray-600 hover:text-red-500 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="mx-12 max-w-2xl">
            <div className="text-center">
              <img
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 italic mb-4">"{testimonials[currentIndex].quote}"</p>
              <h3 className="font-semibold text-gray-900">{testimonials[currentIndex].name}</h3>
              <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
              <p className="text-sm text-gray-500">{testimonials[currentIndex].company}</p>
            </div>
          </div>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 z-10 p-2 text-gray-600 hover:text-red-500 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

