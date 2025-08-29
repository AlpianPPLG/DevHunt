"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { 
  Users, 
  Code, 
  Globe, 
  ArrowRight, 
  Lightbulb,
  Clock,
  Target
} from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Side - About Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">About DevHunt</h2>
              <p className="mt-4 text-muted-foreground">
                DevHunt is a community-driven platform that helps developers discover the best tools, 
                libraries, and resources to enhance their development workflow. Our mission is to 
                connect developers with the tools they need to build better software.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="text-muted-foreground">
                We believe that the right tools can dramatically improve the development experience.
                DevHunt aims to cut through the noise and highlight tools that actually make a difference
                to developers workflows and productivity.
              </p>
            </div>
            
            <div>
              <Button asChild className="mt-4 group">
                <Link href="#team">
                  Meet Our Team 
                  <ArrowRight suppressHydrationWarning className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Side - Card Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-6">
                <Users suppressHydrationWarning className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Our platform is powered by developers like you who share, vote, and discover tools together.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-6">
                <Code suppressHydrationWarning className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">For Developers</h3>
                <p className="text-sm text-muted-foreground">
                  Built by developers for developers, focusing on tools that actually matter.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-6">
                <Target suppressHydrationWarning className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Curated Selection</h3>
                <p className="text-sm text-muted-foreground">
                  Quality over quantity—we highlight the most valuable developer tools.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-6">
                <Globe suppressHydrationWarning className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Global Community</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with developers from around the world and expand your toolkit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Timeline Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-10">Our Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              <div className="relative">
                <div className="flex items-center justify-center">
                  <div className="absolute z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Clock suppressHydrationWarning className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="md:text-right md:pr-10">
                    <h3 className="font-bold">2023</h3>
                    <h4 className="text-lg font-semibold">DevHunt Founded</h4>
                    <p className="text-muted-foreground mt-2">
                      We launched with a simple mission: help developers find the best tools.
                    </p>
                  </div>
                  <div className="md:pl-10">
                    {/* Empty for layout */}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-center">
                  <div className="absolute z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Lightbulb suppressHydrationWarning className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="md:text-right md:pr-10">
                    {/* Empty for layout */}
                  </div>
                  <div className="md:pl-10">
                    <h3 className="font-bold">2024</h3>
                    <h4 className="text-lg font-semibold">Community Growth</h4>
                    <p className="text-muted-foreground mt-2">
                      Our community expanded to over 20,000 developers sharing and discovering tools together.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-center">
                  <div className="absolute z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Target suppressHydrationWarning className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="md:text-right md:pr-10">
                    <h3 className="font-bold">Present</h3>
                    <h4 className="text-lg font-semibold">Looking Ahead</h4>
                    <p className="text-muted-foreground mt-2">
                      Were continuously improving DevHunt with new features to better serve the developer community.
                    </p>
                  </div>
                  <div className="md:pl-10">
                    {/* Empty for layout */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection;