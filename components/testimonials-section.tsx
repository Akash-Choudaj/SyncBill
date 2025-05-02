"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const testimonials = [
  {
    id: 1,
    content:
      "SyncBill has completely transformed how we manage our inventory and billing. The interface is intuitive, and the automation features have saved us countless hours.",
    author: "Sarah Johnson",
    position: "Owner, Retail Store",
    avatar: "SJ",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    content:
      "We've tried several inventory management systems, but SyncBill stands out with its comprehensive features and excellent customer support. It's been a game-changer for our business.",
    author: "Michael Chen",
    position: "Operations Manager, Distribution Company",
    avatar: "MC",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    content:
      "The reporting capabilities in SyncBill give us insights we never had before. We can now make data-driven decisions that have significantly improved our profitability.",
    author: "Jessica Williams",
    position: "CFO, Manufacturing Firm",
    avatar: "JW",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    content:
      "Setting up SyncBill was incredibly easy, and the team was supportive throughout the process. Within days, we were fully operational and seeing the benefits.",
    author: "David Rodriguez",
    position: "IT Director, Wholesale Business",
    avatar: "DR",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    content:
      "The mobile access feature allows me to check inventory and approve orders even when I'm away from the office. SyncBill has given me back my freedom while keeping me connected.",
    author: "Emma Thompson",
    position: "CEO, E-commerce Store",
    avatar: "ET",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 6,
    content:
      "Customer management in SyncBill has helped us build stronger relationships with our clients. The system remembers everything, so we can provide personalized service every time.",
    author: "Robert Kim",
    position: "Sales Director, Service Provider",
    avatar: "RK",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.ceil(testimonials.length / 3)

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const visibleTestimonials = testimonials.slice(currentPage * 3, currentPage * 3 + 3)

  return (
    <section className="py-20 bg-black" ref={ref} id="customers">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Thousands of businesses trust SyncBill to manage their inventory and billing. Here's what some of them have
            to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              className="bg-zinc-900 p-6 rounded-lg border border-zinc-800"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-orange-500 fill-orange-500" />
                ))}
              </div>
              <p className="text-zinc-300 mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={testimonial.image} alt={testimonial.author} />
                  <AvatarFallback className="bg-orange-500/10 text-orange-500">{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-zinc-500">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2 h-2 rounded-full ${currentPage === i ? "bg-orange-500" : "bg-zinc-700"}`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
