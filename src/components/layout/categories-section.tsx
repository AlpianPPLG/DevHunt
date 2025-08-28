"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Code, Database, LineChart, Terminal, 
  GitBranch, Layout, Cpu, Cloud,
  Server, Wrench, Lock, Globe
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Category {
  name: string
  slug: string
  icon: React.ReactNode
  count: number
}

export function CategoriesSection() {
  const [categories] = useState<Category[]>([
    { name: "Frontend", slug: "frontend", icon: <Layout className="h-6 w-6" />, count: 248 },
    { name: "Backend", slug: "backend", icon: <Server className="h-6 w-6" />, count: 187 },
    { name: "DevOps", slug: "devops", icon: <GitBranch className="h-6 w-6" />, count: 129 },
    { name: "Database", slug: "database", icon: <Database className="h-6 w-6" />, count: 98 },
    { name: "AI & ML", slug: "ai-ml", icon: <Cpu className="h-6 w-6" />, count: 92 },
    { name: "Testing", slug: "testing", icon: <Wrench className="h-6 w-6" />, count: 84 },
    { name: "Security", slug: "security", icon: <Lock className="h-6 w-6" />, count: 76 },
    { name: "Cloud", slug: "cloud", icon: <Cloud className="h-6 w-6" />, count: 115 },
    { name: "Analytics", slug: "analytics", icon: <LineChart className="h-6 w-6" />, count: 67 },
    { name: "CLI", slug: "cli", icon: <Terminal className="h-6 w-6" />, count: 58 },
    { name: "API Tools", slug: "api-tools", icon: <Globe className="h-6 w-6" />, count: 89 },
    { name: "Programming", slug: "programming", icon: <Code className="h-6 w-6" />, count: 143 }
  ])

  return (
    <section className="py-16 bg-background/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Browse Developer Tools by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect tools for your development workflow, organized by category
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link 
              href={`/tag/${category.slug}`} 
              key={category.slug}
              className={cn(
                "p-4 border rounded-lg hover:border-primary transition-all",
                "bg-card flex flex-col items-center text-center gap-2"
              )}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                {category.icon}
              </div>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.count} tools</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection;