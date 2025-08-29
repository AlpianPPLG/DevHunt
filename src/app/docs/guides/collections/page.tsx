"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Check, Info, AlertCircle, FolderOpen, Share2, Users, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function CollectionsGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Link 
                href="/docs" 
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Documentation
              </Link>
              <div className="p-3 bg-primary/10 rounded-full">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Building Collections
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px]">
                Create curated collections of developer tools for different use cases and technologies.
              </p>
            </div>
          </div>
        </section>

        {/* Guide Content */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {/* Table of Contents */}
              <Card className="mb-10">
                <CardHeader>
                  <CardTitle>Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li>
                      <Link href="#what-are-collections" className="text-primary hover:underline">
                        What Are Collections?
                      </Link>
                    </li>
                    <li>
                      <Link href="#creating-collections" className="text-primary hover:underline">
                        Creating Collections
                      </Link>
                    </li>
                    <li>
                      <Link href="#adding-tools" className="text-primary hover:underline">
                        Adding Tools
                      </Link>
                    </li>
                    <li>
                      <Link href="#writing-great-descriptions" className="text-primary hover:underline">
                        Writing Great Descriptions
                      </Link>
                    </li>
                    <li>
                      <Link href="#sharing-and-promotion" className="text-primary hover:underline">
                        Sharing and Promotion
                      </Link>
                    </li>
                    <li>
                      <Link href="#faqs" className="text-primary hover:underline">
                        FAQs
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Introduction */}
              <p className="lead">
                Collections are curated lists of developer tools that solve specific problems or address particular use cases. 
                They help the community discover related tools and provide context about how they work together.
              </p>

              <div className="flex p-4 mb-6 bg-primary/5 rounded-lg">
                <Info className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <p className="text-sm m-0">
                  Well-curated collections are valuable resources for the developer community and also help 
                  increase your visibility and reputation on DevHunt.
                </p>
              </div>

              {/* What Are Collections */}
              <h2 id="what-are-collections" className="scroll-mt-20">What Are Collections?</h2>
              
              <p>
                Collections on DevHunt serve several important purposes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FolderOpen className="h-5 w-5 text-primary" />
                      Curation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Collections help organize tools that work well together or solve related problems, making it easier for 
                      developers to discover complementary tools.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Community Building
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Collections foster communities around specific technologies, frameworks, or development approaches by 
                      highlighting their ecosystems.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Knowledge Sharing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Well-written collection descriptions share insights about how tools can be used together and best practices 
                      for specific development scenarios.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5 text-primary" />
                      Tool Discovery
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Collections help quality tools get discovered by being included in relevant, popular collections.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-medium mt-6 mb-4">Types of Collections</h3>
              
              <p>
                Collections can be created for various purposes:
              </p>

              <ul className="space-y-4 my-6">
                <li className="flex flex-col gap-1">
                  <strong>Technology-specific collections</strong>
                  <p className="text-muted-foreground">
                    Tools for specific languages, frameworks, or platforms (e.g., Essential React Dev Tools or Python Data Science Toolkit).
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Workflow collections</strong>
                  <p className="text-muted-foreground">
                    Tools that work together for specific development workflows (e.g., Full-Stack Development Essentials or DevOps Pipeline Tools).
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Problem-solving collections</strong>
                  <p className="text-muted-foreground">
                    Tools that address specific challenges (e.g., Accessibility Testing Tools or Performance Optimization Toolkit).
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Comparison collections</strong>
                  <p className="text-muted-foreground">
                    Collections that compare similar tools for different use cases (e.g., Headless CMS Options Compared or JavaScript Testing Frameworks).
                  </p>
                </li>
              </ul>

              {/* Creating Collections */}
              <h2 id="creating-collections" className="scroll-mt-20">Creating Collections</h2>
              
              <p>
                Follow these steps to create a new collection:
              </p>

              <ol className="space-y-6 my-6">
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">1. Navigate to collections</strong>
                  <p className="text-muted-foreground">
                    Go to the Collections section in your profile or click the Create Collection button in the main Collections page.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">2. Provide basic information</strong>
                  <p className="text-muted-foreground">
                    Add a name, slug (URL), and description for your collection. Choose a name that clearly communicates the theme or purpose of your collection.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">3. Upload a cover image</strong>
                  <p className="text-muted-foreground">
                    Add an eye-catching cover image that represents your collections theme. Recommended size is 1200×630 pixels.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">4. Set visibility</strong>
                  <p className="text-muted-foreground">
                    Choose whether your collection should be public (visible to everyone) or private (visible only to you).
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">5. Create the collection</strong>
                  <p className="text-muted-foreground">
                    Click Create Collection to save your collection. You can now start adding tools to it.
                  </p>
                </li>
              </ol>

              <div className="bg-muted p-6 rounded-lg mb-8">
                <h3 className="text-xl font-medium mb-4">Collection Best Practices</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Create focused collections with a clear, specific theme</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Use descriptive, searchable titles that clearly communicate the collections purpose</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Include 5-15 tools for a comprehensive but manageable collection</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Write a detailed description that provides context and value beyond just listing tools</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Use high-quality, relevant cover images that represent the collections theme</span>
                  </li>
                </ul>
              </div>

              {/* Adding Tools */}
              <h2 id="adding-tools" className="scroll-mt-20">Adding Tools</h2>
              
              <p>
                Once youve created a collection, you can start adding tools to it:
              </p>

              <div className="grid grid-cols-1 gap-6 my-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Method 1: From Your Collection Page</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2 text-muted-foreground">
                      <li>1. Navigate to your collection page</li>
                      <li>2. Click the Add Tools button</li>
                      <li>3. Search for tools by name or browse by category</li>
                      <li>4. Select tools to add to your collection</li>
                      <li>5. Click Add Selected Tools to complete the process</li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Method 2: From Individual Tool Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2 text-muted-foreground">
                      <li>1. Navigate to the page of the tool you want to add</li>
                      <li>2. Click the Add to Collection button</li>
                      <li>3. Select the collection from the dropdown menu</li>
                      <li>4. Optionally add a note about why youre including this tool</li>
                      <li>5. Click Add to include the tool in your collection</li>
                    </ol>
                  </CardContent>
                </Card>
              </div>

              <div className="relative my-10 p-6 bg-primary/5 rounded-lg">
                <div className="absolute -top-5 left-6 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Pro Tip
                </div>
                <p className="mt-2">
                  <strong>Add context!</strong> When adding tools to your collection, include a brief note explaining why youve 
                  included each tool and how it fits into the collections theme. This adds tremendous value for users discovering 
                  these tools through your collection.
                </p>
              </div>

              <h3 className="text-xl font-medium mt-6 mb-4">Organizing Tools in Your Collection</h3>
              
              <p>
                Once youve added tools to your collection, you can organize them for maximum impact:
              </p>

              <ul className="space-y-4 my-6">
                <li className="flex flex-col gap-1">
                  <strong>Reordering tools</strong>
                  <p className="text-muted-foreground">
                    Drag and drop tools to change their order. Consider putting the most essential or beginner-friendly tools first.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Adding notes</strong>
                  <p className="text-muted-foreground">
                    Add or edit notes for each tool to explain why its included and how it fits into the collections theme.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Removing tools</strong>
                  <p className="text-muted-foreground">
                    Remove any tools that no longer fit your collections purpose or that have been replaced by better alternatives.
                  </p>
                </li>
              </ul>

              {/* Writing Great Descriptions */}
              <h2 id="writing-great-descriptions" className="scroll-mt-20">Writing Great Descriptions</h2>
              
              <p>
                A well-written collection description transforms a simple list into a valuable resource:
              </p>

              <div className="bg-muted p-6 rounded-lg mb-8">
                <h3 className="text-xl font-medium mb-4">Collection Description Framework</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">1. Introduction</h4>
                    <p className="text-sm text-muted-foreground">
                      Explain what the collection is about and who its for. What problem does this collection help solve?
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">2. Collection Purpose</h4>
                    <p className="text-sm text-muted-foreground">
                      Describe why you created this collection and what developers will gain from exploring it.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">3. Tool Categories</h4>
                    <p className="text-sm text-muted-foreground">
                      Group tools into logical categories if your collection is large (e.g., Frontend Tools, Backend Tools, Testing Tools).
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">4. Use Case Examples</h4>
                    <p className="text-sm text-muted-foreground">
                      Provide examples of how these tools can work together or complement each other in real-world scenarios.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">5. Personal Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Share your personal experience with these tools or why you recommend them.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-medium mt-6 mb-4">Example Description</h3>
              
              <div className="bg-muted p-4 rounded-lg mb-8">
                <h4 className="font-semibold">Modern React Development Stack</h4>
                <div className="text-sm text-muted-foreground mt-2 space-y-3">
                  <p>
                    This collection brings together essential tools for building modern, high-performance React applications in 2025. 
                    Perfect for both beginners looking to set up their first professional React project and experienced developers 
                    wanting to upgrade their toolkit.
                  </p>
                  <p>
                    Ive created this collection after working on over 30 React projects across various industries. These tools have 
                    consistently helped me build more efficiently while maintaining code quality and performance.
                  </p>
                  <p>
                    The collection includes:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Project Scaffolding:</strong> Tools to quickly set up well-structured projects</li>
                    <li><strong>State Management:</strong> Modern solutions for managing application state</li>
                    <li><strong>UI Components:</strong> Libraries to build beautiful, accessible interfaces</li>
                    <li><strong>Performance Optimization:</strong> Tools to ensure your app stays lightning-fast</li>
                    <li><strong>Testing Utilities:</strong> Reliable testing solutions to maintain quality</li>
                  </ul>
                  <p>
                    These tools complement each other particularly well for building data-heavy applications with complex UIs. 
                    For example, you can use SWR for data fetching, Zustand for state management, and Radix UI for accessible 
                    components to create a robust application with minimal boilerplate.
                  </p>
                </div>
              </div>

              {/* Sharing and Promotion */}
              <h2 id="sharing-and-promotion" className="scroll-mt-20">Sharing and Promotion</h2>
              
              <p>
                Once youve created a valuable collection, share it with the community:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5 text-primary" />
                      Social Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Share your collection on Twitter, LinkedIn, and other social platforms. Tag relevant communities and developers 
                      who might find it useful.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5 text-primary" />
                      Developer Communities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Share your collection in relevant Reddit communities, Discord servers, or Slack groups where developers 
                      interested in the topic gather.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5 text-primary" />
                      Include in Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Reference your collection in blog posts, tutorials, or other content you create. It adds value to your 
                      content and drives traffic to your collection.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5 text-primary" />
                      Tool Creators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Let creators of tools in your collection know theyve been featured. They may share your collection with 
                      their audience as well.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex p-4 mb-6 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200 m-0">
                  When sharing your collection, focus on the value it provides to the audience rather than just promoting yourself. 
                  Explain who would benefit from it and what problems it helps solve.
                </p>
              </div>

              <h3 className="text-xl font-medium mt-6 mb-4">Maintaining Your Collections</h3>
              
              <p>
                Keep your collections valuable and relevant with regular maintenance:
              </p>

              <ul className="space-y-4 my-6">
                <li className="flex flex-col gap-1">
                  <strong>Regular updates</strong>
                  <p className="text-muted-foreground">
                    Review your collections periodically to add new tools, remove outdated ones, or update descriptions.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Respond to feedback</strong>
                  <p className="text-muted-foreground">
                    Pay attention to comments on your collections and consider suggestions for additions or improvements.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Track performance</strong>
                  <p className="text-muted-foreground">
                    Monitor views and engagement with your collections to understand what resonates with the community.
                  </p>
                </li>
              </ul>

              {/* FAQs */}
              <h2 id="faqs" className="scroll-mt-20">Frequently Asked Questions</h2>
              
              <div className="space-y-6 my-8">
                <div>
                  <h3 className="text-lg font-medium">How many collections can I create?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Theres no limit to the number of collections you can create. However, we recommend focusing on quality over quantity 
                    to build your reputation as a thoughtful curator.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Can I include my own tools in collections?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Yes, you can include your own tools in your collections. However, to maintain credibility, ensure they genuinely fit the 
                    collections theme and are balanced with other relevant tools.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">How do I make my collection featured?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Featured collections are selected by the DevHunt team based on quality, uniqueness, and value to the community. Focus on 
                    creating exceptional collections, and you may be considered for featuring.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Can I collaborate on collections with other users?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Currently, collections are individual, but were working on collaborative collections for the future. For now, you can mention 
                    contributors in your collection description.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">What makes a collection successful?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Successful collections typically have a clear, specific focus, thoughtfully selected tools, valuable contextual information, 
                    and address a genuine need in the developer community.
                  </p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-primary/5 p-6 rounded-lg mt-10">
                <h2 className="text-xl font-bold mb-4">Ready to create your collection?</h2>
                <p className="mb-6">
                  Now that you understand how to create valuable collections, start curating your first collection to share your 
                  knowledge and favorite tools with the community.
                </p>
                <Button asChild>
                  <Link href="/collections">Create a Collection</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}