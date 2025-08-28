"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface FooterLink {
  title: string
  href: string
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "error">("idle")

  const footerSections: FooterSection[] = [
    {
      title: "Product",
      links: [
        { title: "Features", href: "/features" },
        { title: "Categories", href: "/categories" },
        { title: "Collections", href: "/collections" },
        { title: "Submit a Tool", href: "/submit" },
      ]
    },
    {
      title: "Resources",
      links: [
        { title: "Documentation", href: "/docs" },
        { title: "API", href: "/api-docs" },
        { title: "Blog", href: "/blog" },
        { title: "Community", href: "/community" },
      ]
    },
    {
      title: "Company",
      links: [
        { title: "About", href: "/about" },
        { title: "Terms", href: "/terms" },
        { title: "Privacy", href: "/privacy" },
        { title: "Contact", href: "/contact" },
      ]
    }
  ]

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || isSubscribing) return
    
    setIsSubscribing(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubscriptionStatus("success")
      setEmail("")
    } catch (error) {
      setSubscriptionStatus("error")
    } finally {
      setIsSubscribing(false)
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubscriptionStatus("idle")
      }, 3000)
    }
  }

  return (
    <footer className="bg-background border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and newsletter */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">DH</span>
              </div>
              <span className="font-bold text-xl">DevHunt</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Discover the best developer tools and resources, all in one place.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-2">
              <p className="text-sm font-medium">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="max-w-[220px]"
                  required
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  disabled={isSubscribing}
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              {subscriptionStatus === "success" && (
                <p className="text-sm text-green-500">Thanks for subscribing!</p>
              )}
              {subscriptionStatus === "error" && (
                <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
          
          {/* Links sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-medium">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevHunt. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <Link href="https://github.com/AlpianPPLG" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/alpian-%E3%85%A4-7a16522bb/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="mailto:contact@Nova07pplg@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 inline" /> for developers
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;