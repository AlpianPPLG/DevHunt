"use client"

import { useState } from "react"
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Globe,
  Briefcase,
  Code,
  Users,
  Zap
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  department: "leadership" | "engineering" | "design" | "product"
  imageUrl: string
  links: {
    github?: string
    twitter?: string
    linkedin?: string
    website?: string
    email?: string
  }
  skills?: string[]
}

export function TeamSection() {
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Alpian",
      role: "Founder & CEO",
      bio: "Former software engineer with a passion for developer tools. Founded DevHunt to help developers discover the tools they need to build better software.",
      department: "leadership",
      imageUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      links: {
        github: "https://github.com/AlpianPPLG",
        twitter: "https://twitter.com/alpian",
        linkedin: "https://www.linkedin.com/in/alpian-%E3%85%A4-7a16522bb/",
        email: "alpian@devhunt.io"
      },
      skills: ["Leadership", "Product Strategy", "Software Engineering"]
    },
    {
      id: "2",
      name: "Sarah Chen",
      role: "CTO",
      bio: "Full-stack developer with 10+ years of experience building scalable web applications. Leads the technical direction and architecture of DevHunt.",
      department: "leadership",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      links: {
        github: "https://github.com/sarahchen",
        twitter: "https://twitter.com/sarahchen",
        linkedin: "https://linkedin.com/in/sarahchen"
      },
      skills: ["System Architecture", "Cloud Infrastructure", "Team Leadership"]
    },
    {
      id: "3",
      name: "Miguel Rodriguez",
      role: "Lead Frontend Engineer",
      bio: "React specialist with a keen eye for UI/UX. Responsible for creating the intuitive and responsive DevHunt interface.",
      department: "engineering",
      imageUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1534&q=80",
      links: {
        github: "https://github.com/miguelr",
        twitter: "https://twitter.com/miguelr",
        website: "https://miguel.dev"
      },
      skills: ["React", "TypeScript", "UI/UX", "Next.js"]
    },
    {
      id: "4",
      name: "Priya Patel",
      role: "Backend Engineer",
      bio: "Database expert and API architect. Builds the robust systems that power DevHunt's data and analytics.",
      department: "engineering",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      links: {
        github: "https://github.com/priyap",
        linkedin: "https://linkedin.com/in/priyap"
      },
      skills: ["Node.js", "MySQL", "AWS", "API Design"]
    },
    {
      id: "5",
      name: "Alex Johnson",
      role: "UX Designer",
      bio: "Creates beautiful, functional interfaces with a focus on user experience and accessibility.",
      department: "design",
      imageUrl: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      links: {
        twitter: "https://twitter.com/alexj",
        website: "https://alexjohnson.design"
      },
      skills: ["UI Design", "User Research", "Prototyping", "Figma"]
    },
    {
      id: "6",
      name: "Emma Williams",
      role: "Product Manager",
      bio: "Translates user needs into product features, ensuring DevHunt delivers maximum value to developers.",
      department: "product",
      imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      links: {
        linkedin: "https://linkedin.com/in/emmaw",
        twitter: "https://twitter.com/emmaw"
      },
      skills: ["Product Strategy", "User Stories", "Roadmapping", "Analytics"]
    },
    {
      id: "7",
      name: "David Kim",
      role: "DevOps Engineer",
      bio: "Automation specialist focused on maintaining DevHunt's infrastructure and deployment pipelines.",
      department: "engineering",
      imageUrl: "https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      links: {
        github: "https://github.com/davidkim",
        linkedin: "https://linkedin.com/in/davidkim"
      },
      skills: ["CI/CD", "Docker", "Kubernetes", "Infrastructure as Code"]
    },
    {
      id: "8",
      name: "Olivia Martinez",
      role: "Community Manager",
      bio: "Builds and nurtures the DevHunt community, facilitating connections between developers.",
      department: "product",
      imageUrl: "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      links: {
        twitter: "https://twitter.com/oliviam",
        linkedin: "https://linkedin.com/in/oliviam"
      },
      skills: ["Community Building", "Content Strategy", "Social Media", "Event Planning"]
    }
  ])

  // Department labels and icons
  const departments = [
    { id: "all", label: "All Team", icon: <Users className="h-4 w-4" /> },
    { id: "leadership", label: "Leadership", icon: <Briefcase className="h-4 w-4" /> },
    { id: "engineering", label: "Engineering", icon: <Code className="h-4 w-4" /> },
    { id: "design", label: "Design", icon: <Zap className="h-4 w-4" /> },
    { id: "product", label: "Product", icon: <Globe className="h-4 w-4" /> }
  ]

  return (
    <section id="team" className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-2">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The talented individuals behind DevHunt, working together to help developers discover the best tools.
          </p>
        </div>
        
        {/* Team Directory */}
        <Tabs defaultValue="all" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              {departments.map((dept) => (
                <TabsTrigger key={dept.id} value={dept.id} className="flex items-center gap-1.5">
                  {dept.icon}
                  <span>{dept.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {/* All Team */}
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>
          
          {/* Leadership Team */}
          <TabsContent value="leadership" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers
                .filter(member => member.department === "leadership")
                .map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))
              }
            </div>
          </TabsContent>
          
          {/* Engineering Team */}
          <TabsContent value="engineering" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers
                .filter(member => member.department === "engineering")
                .map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))
              }
            </div>
          </TabsContent>
          
          {/* Design Team */}
          <TabsContent value="design" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers
                .filter(member => member.department === "design")
                .map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))
              }
            </div>
          </TabsContent>
          
          {/* Product Team */}
          <TabsContent value="product" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers
                .filter(member => member.department === "product")
                .map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Team Values */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and culture at DevHunt
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe in building and nurturing a strong developer community. Everything we do is aimed at empowering developers.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We constantly push the boundaries of what's possible, creating new ways for developers to discover and connect with tools.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Quality Code</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We hold ourselves to high standards, writing clean, maintainable code that we can be proud of and that serves our users well.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

// Team Member Card Component
function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square relative">
        <ImageWithFallback 
          src={member.imageUrl} 
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{member.name}</CardTitle>
        <CardDescription>{member.role}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
        
        {member.skills && member.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {member.skills.slice(0, 3).map(skill => (
              <Badge key={skill} variant="secondary" className="text-xs font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2">
          {member.links.github && (
            <Link 
              href={member.links.github}
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                "h-8 w-8 rounded-full flex items-center justify-center"
              )}
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          )}
          
          {member.links.twitter && (
            <Link 
              href={member.links.twitter}
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                "h-8 w-8 rounded-full flex items-center justify-center"
              )}
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Link>
          )}
          
          {member.links.linkedin && (
            <Link 
              href={member.links.linkedin}
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                "h-8 w-8 rounded-full flex items-center justify-center"
              )}
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          )}
          
          {member.links.website && (
            <Link 
              href={member.links.website}
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                "h-8 w-8 rounded-full flex items-center justify-center"
              )}
            >
              <Globe className="h-4 w-4" />
              <span className="sr-only">Website</span>
            </Link>
          )}
          
          {member.links.email && (
            <Link 
              href={`mailto:${member.links.email}`}
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                "h-8 w-8 rounded-full flex items-center justify-center"
              )}
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default TeamSection;