"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-zinc-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                SyncBill
              </div>
            </Link>
            <p className="text-zinc-400 mb-6">
              Modern inventory and billing management system for businesses of all sizes.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="bg-zinc-800 w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-orange-500 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="bg-zinc-800 w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-orange-500 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="bg-zinc-800 w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-orange-500 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="bg-zinc-800 w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-orange-500 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-zinc-400 hover:text-orange-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-zinc-400 hover:text-orange-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-zinc-400 hover:text-orange-500 transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-zinc-400 hover:text-orange-500 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-zinc-400 hover:text-orange-500 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-zinc-400 hover:text-orange-500 transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-zinc-400 hover:text-orange-500 transition-colors">
                  System Status
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-zinc-400 hover:text-orange-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-zinc-400 mb-4">Subscribe to our newsletter to get the latest updates.</p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-zinc-800 border-zinc-700 text-zinc-300 focus-visible:ring-orange-500"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Subscribe</Button>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-orange-500 mr-2" />
                <span className="text-zinc-400">support@syncbill.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-orange-500 mr-2" />
                <span className="text-zinc-400">+91 7305654908</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} SyncBill. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-zinc-500 text-sm hover:text-orange-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-zinc-500 text-sm hover:text-orange-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-zinc-500 text-sm hover:text-orange-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
