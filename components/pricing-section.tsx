"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small businesses just getting started",
    price: "₹999",
    period: "per month",
    features: [
      "Up to 1,000 products",
      "2 user accounts",
      "Basic reporting",
      "Customer management",
      "Email support",
      "Mobile access",
    ],
    popular: false,
    buttonText: "Get Started",
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses with more needs",
    price: "₹2,499",
    period: "per month",
    features: [
      "Up to 10,000 products",
      "5 user accounts",
      "Advanced reporting",
      "Customer management",
      "Priority support",
      "Mobile access",
      "Multi-location support",
      "API access",
    ],
    popular: true,
    buttonText: "Get Started",
  },
  {
    name: "Enterprise",
    description: "For large businesses with complex requirements",
    price: "₹4,999",
    period: "per month",
    features: [
      "Unlimited products",
      "Unlimited user accounts",
      "Custom reporting",
      "Advanced customer management",
      "24/7 dedicated support",
      "Mobile access",
      "Multi-location support",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
    ],
    popular: false,
    buttonText: "Contact Sales",
  },
]

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-zinc-900" ref={ref} id="pricing">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Choose the plan that works best for your business. All plans include core features with different limits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            >
              <Card
                className={`relative h-full flex flex-col ${
                  plan.popular
                    ? "bg-gradient-to-b from-zinc-800 to-zinc-900 border-orange-500"
                    : "bg-zinc-900 border-zinc-800"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-zinc-400">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-zinc-400 ml-2">{plan.period}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-orange-500 mr-2" />
                        <span className="text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                        : "bg-zinc-800 hover:bg-zinc-700 text-white"
                    }`}
                    asChild
                  >
                    <Link href={plan.name === "Enterprise" ? "/contact" : "/signup"}>{plan.buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
