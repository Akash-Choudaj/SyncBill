"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Phone, Search, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      {/* Top bar */}
      <div className="container mx-auto px-4 hidden md:flex justify-between items-center text-sm py-1 border-b border-zinc-800">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <Phone className="h-3 w-3 mr-2" />
            <span>Toll free: 1800 102 9944</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-3 w-3 mr-2" />
            <span>+91 7305654908</span>
          </div>
          <Link href="/contact" className="hover:text-orange-500 transition-colors">
            Contact Us
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center">
            <Search className="h-3 w-3 mr-1" />
          </button>
          <Link href="/login" className="hover:text-orange-500 transition-colors">
            Log In
          </Link>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
          >
            SyncBill
          </motion.div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className={`flex items-center hover:text-orange-500 transition-colors ${pathname === "/#features" ? "text-orange-500" : ""}`}
          >
            Features
          </a>
          <a
            href="#pricing"
            className={`hover:text-orange-500 transition-colors ${pathname === "/#pricing" ? "text-orange-500" : ""}`}
          >
            Pricing
          </a>
          <a
            href="#customers"
            className={`hover:text-orange-500 transition-colors ${pathname === "/#customers" ? "text-orange-500" : ""}`}
          >
            Customers
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center hover:text-orange-500 transition-colors">
                Resources <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
              <DropdownMenuItem>
                <Link href="/blog" className="w-full">
                  Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/help" className="w-full">
                  Help Center
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/webinars" className="w-full">
                  Webinars
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/api-docs" className="w-full">
                  API Documentation
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            asChild
          >
            <a href="#contact">Contact Sales</a>
          </Button>
          <Button
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
            asChild
          >
            <Link href="/signup">Sign Up Now</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-zinc-900 border-t border-zinc-800"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/#features"
              className="py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/#customers"
              className="py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Customers
            </Link>
            <Link
              href="/resources"
              className="py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/login"
              className="py-2 hover:text-orange-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Log In
            </Link>
            <div className="pt-2 flex flex-col space-y-3">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white w-full"
                asChild
              >
                <Link href="/contact">Get a Demo</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white w-full"
                asChild
              >
                <Link href="/signup">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
