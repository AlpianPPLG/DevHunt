"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Check, Info, AlertCircle, UserCircle, Star, Github, Twitter, Globe, Mail } from "lucide-react"
import Link from "next/link"

export default function DeveloperProfileGuidePage() {
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
                <UserCircle className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Creating a Developer Profile
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px]">
                Set up your profile to showcase your tools and contributions.
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
                      <Link href="#profile-basics" className="text-primary hover:underline">
                        Profile Basics
                      </Link>
                    </li>
                    <li>
                      <Link href="#optimizing-your-profile" className="text-primary hover:underline">
                        Optimizing Your Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="#adding-social-links" className="text-primary hover:underline">
                        Adding Social Links
                      </Link>
                    </li>
                    <li>
                      <Link href="#showcasing-your-tools" className="text-primary hover:underline">
                        Showcasing Your Tools
                      </Link>
                    </li>
                    <li>
                      <Link href="#building-reputation" className="text-primary hover:underline">
                        Building Reputation
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
                Your DevHunt profile is your professional identity within the community. It showcases your contributions, 
                tools youve created, and helps you build connections with other developers.
              </p>

              <div className="flex p-4 mb-6 bg-primary/5 rounded-lg">
                <Info className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <p className="text-sm m-0">
                  A complete and well-crafted profile increases your visibility in the community and adds 
                  credibility to the tools you submit. It only takes a few minutes to set up, but makes a big difference.
                </p>
              </div>

              {/* Profile Basics */}
              <h2 id="profile-basics" className="scroll-mt-20">Profile Basics</h2>
              
              <p>
                Lets start with setting up the essential elements of your DevHunt profile:
              </p>

              <ol className="space-y-6 my-6">
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">1. Create an account</strong>
                  <p className="text-muted-foreground">
                    If you havent already, sign up for DevHunt using your email or via GitHub authentication.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">2. Navigate to profile settings</strong>
                  <p className="text-muted-foreground">
                    Once logged in, click on your profile picture in the top-right corner and select Profile Settings from the dropdown menu.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">3. Add your profile photo</strong>
                  <p className="text-muted-foreground">
                    Upload a clear, professional headshot or avatar that represents you. Recommended size is 500×500 pixels.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">4. Complete your basic information</strong>
                  <p className="text-muted-foreground">
                    Fill in your name, username, and location. Choose a username thats professional and easy to remember.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">5. Write your bio</strong>
                  <p className="text-muted-foreground">
                    Craft a concise bio (150-200 characters) that highlights your expertise, interests, and the types of tools you create.
                  </p>
                </li>
              </ol>

              {/* Optimizing Your Profile */}
              <h2 id="optimizing-your-profile" className="scroll-mt-20">Optimizing Your Profile</h2>
              
              <p>
                Now that youve set up the basics, lets optimize your profile to make it more compelling:
              </p>

              <div className="bg-muted p-6 rounded-lg mb-8">
                <h3 className="text-xl font-medium mb-4">Profile Optimization Checklist</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Add your professional skills and areas of expertise (e.g., Full-stack Developer, UX Designer)</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Specify the technologies you work with (e.g., React, Node.js, Python)</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Mention your current company or projects youre working on</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Include your years of experience in relevant areas</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Use a friendly, professional tone in your writing</span>
                  </li>
                </ul>
              </div>

              <div className="relative my-10 p-6 bg-primary/5 rounded-lg">
                <div className="absolute -top-5 left-6 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Pro Tip
                </div>
                <p className="mt-2">
                  <strong>Show your personality!</strong> While keeping it professional, dont be afraid to let your personality 
                  shine through in your bio. What makes you unique as a developer? What are you passionate about beyond code?
                </p>
              </div>

              {/* Adding Social Links */}
              <h2 id="adding-social-links" className="scroll-mt-20">Adding Social Links</h2>
              
              <p>
                Connecting your social profiles adds credibility and gives others ways to connect with you:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Github className="h-5 w-5 text-primary" />
                      GitHub
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Link your GitHub account to showcase your repositories and contributions.
                    </p>
                    <Button variant="outline" size="sm" disabled>
                      username
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Twitter className="h-5 w-5 text-primary" />
                      Twitter
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Connect your Twitter profile to share updates and engage with the community.
                    </p>
                    <Button variant="outline" size="sm" disabled>
                      @username
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Personal Website
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Add your portfolio site or blog to showcase your work in more detail.
                    </p>
                    <Button variant="outline" size="sm" disabled>
                      https://yoursite.com
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Include your professional email if youre open to direct contact.
                    </p>
                    <Button variant="outline" size="sm" disabled>
                      name@example.com
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Showcasing Your Tools */}
              <h2 id="showcasing-your-tools" className="scroll-mt-20">Showcasing Your Tools</h2>
              
              <p>
                Your profile automatically displays all the tools youve submitted to DevHunt. Heres how to make them shine:
              </p>

              <ul className="space-y-4 my-6">
                <li className="flex flex-col gap-1">
                  <strong>Submit your best work</strong>
                  <p className="text-muted-foreground">
                    Prioritize quality over quantity. Submit tools that showcase your best work and demonstrate your expertise.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Keep tool information updated</strong>
                  <p className="text-muted-foreground">
                    Regularly update your tool submissions with new features, improved descriptions, or better screenshots.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Respond to comments</strong>
                  <p className="text-muted-foreground">
                    Engage with users who comment on your tool submissions. Answer questions and acknowledge feedback.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Create meaningful collections</strong>
                  <p className="text-muted-foreground">
                    Curate collections of tools (your own and others) around specific themes to showcase your expertise in particular areas.
                  </p>
                </li>
              </ul>

              {/* Building Reputation */}
              <h2 id="building-reputation" className="scroll-mt-20">Building Reputation</h2>
              
              <p>
                Your reputation in the DevHunt community grows through your contributions and interactions:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Submit Quality Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Each upvote your submissions receive contributes to your reputation score and visibility.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Engage With Others
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Comment on other tools, participate in discussions, and provide valuable feedback.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Curate Collections
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Create thoughtful collections that help others discover useful tools for specific needs.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Help Others
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Answer questions, provide support, and share your knowledge with the community.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex p-4 mb-6 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200 m-0">
                  Reputation is built over time through consistent positive contributions. Focus on quality interactions 
                  rather than quantity, and your standing in the community will naturally grow.
                </p>
              </div>

              {/* FAQs */}
              <h2 id="faqs" className="scroll-mt-20">Frequently Asked Questions</h2>
              
              <div className="space-y-6 my-8">
                <div>
                  <h3 className="text-lg font-medium">Can I change my username after creating my account?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Yes, you can change your username once every 30 days from your profile settings. Remember that changing your username 
                    will also change your profile URL.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Who can see my email address?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Your email is private by default. You can choose to display a public contact email on your profile, which can be 
                    different from your account email.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">How do I gain reputation points?</h3>
                  <p className="mt-1 text-muted-foreground">
                    You earn reputation points when your submitted tools receive upvotes, when you create popular collections, and through 
                    consistent positive engagement with the community.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Can I have multiple profiles for different types of tools?</h3>
                  <p className="mt-1 text-muted-foreground">
                    We recommend maintaining a single profile for all your contributions. You can use collections to organize different 
                    types of tools or projects.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">How do I feature my best tools at the top of my profile?</h3>
                  <p className="mt-1 text-muted-foreground">
                    In your profile settings, you can pin up to three tools to appear at the top of your profile page.
                  </p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-primary/5 p-6 rounded-lg mt-10">
                <h2 className="text-xl font-bold mb-4">Ready to enhance your profile?</h2>
                <p className="mb-6">
                  Now that you know how to create an effective developer profile, take a few minutes to update yours. 
                  A complete and engaging profile helps you connect with other developers and increases the visibility of your tools.
                </p>
                <Button asChild>
                  <Link href="/settings">Edit Your Profile</Link>
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