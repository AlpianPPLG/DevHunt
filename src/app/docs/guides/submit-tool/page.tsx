"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Check, Info, AlertCircle, FileText } from "lucide-react"
import Link from "next/link"

export default function SubmitToolGuidePage() {
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
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                How to Submit a Tool
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px]">
                Learn how to submit your developer tool to DevHunt, from preparation to publication.
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
                      <Link href="#preparation" className="text-primary hover:underline">
                        Preparation
                      </Link>
                    </li>
                    <li>
                      <Link href="#submission-process" className="text-primary hover:underline">
                        Submission Process
                      </Link>
                    </li>
                    <li>
                      <Link href="#requirements" className="text-primary hover:underline">
                        Requirements
                      </Link>
                    </li>
                    <li>
                      <Link href="#best-practices" className="text-primary hover:underline">
                        Best Practices
                      </Link>
                    </li>
                    <li>
                      <Link href="#after-submission" className="text-primary hover:underline">
                        After Submission
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
                DevHunt is a community-driven platform for discovering and sharing developer tools. 
                This guide will walk you through the process of submitting your own developer tool to the platform.
              </p>

              <div className="flex p-4 mb-6 bg-primary/5 rounded-lg">
                <Info className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <p className="text-sm m-0">
                  Before submitting your tool, make sure its ready for users. A complete submission with 
                  high-quality information helps your tool stand out and get more attention from the community.
                </p>
              </div>

              {/* Preparation */}
              <h2 id="preparation" className="scroll-mt-20">Preparation</h2>
              
              <p>
                Before submitting your developer tool to DevHunt, you should prepare the following information and assets:
              </p>

              <div className="bg-muted p-6 rounded-lg mb-8">
                <h3 className="text-xl font-medium mb-4">Submission Checklist</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Tool name (clear, unique, and memorable)</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Concise and compelling tagline (max 60 characters)</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Detailed description explaining what your tool does and who its for</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>High-quality logo or icon (square format, at least 512×512px)</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Website URL (functional and with complete information)</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>GitHub repository URL (if open-source)</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Demo URL (if applicable)</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Relevant tags (3-5 tags that accurately categorize your tool)</span>
                  </li>
                </ul>
              </div>

              {/* Submission Process */}
              <h2 id="submission-process" className="scroll-mt-20">Submission Process</h2>
              
              <p>
                Follow these steps to submit your developer tool to DevHunt:
              </p>

              <ol className="space-y-6 my-6">
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">1. Create an account</strong>
                  <p className="text-muted-foreground">
                    Sign up for a DevHunt account if you dont already have one. Youll need to be logged in to submit a tool.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">2. Navigate to the submission page</strong>
                  <p className="text-muted-foreground">
                    Click on the Submit button in the top navigation bar, or visit <code>/submit</code> directly.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">3. Fill out the submission form</strong>
                  <p className="text-muted-foreground">
                    Complete all required fields with the information you prepared. Be thorough and accurate in your descriptions.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">4. Upload your logo/icon</strong>
                  <p className="text-muted-foreground">
                    Upload a high-quality image that represents your tool. This will be the first visual impression users have.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">5. Select relevant tags</strong>
                  <p className="text-muted-foreground">
                    Choose 3-5 tags that best describe your tool to help users find it when browsing or searching.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">6. Review and submit</strong>
                  <p className="text-muted-foreground">
                    Review all information for accuracy and completeness, then click the Submit button.
                  </p>
                </li>
              </ol>

              {/* Requirements */}
              <h2 id="requirements" className="scroll-mt-20">Requirements</h2>
              
              <p>
                To ensure quality and relevance, all tools submitted to DevHunt must meet the following requirements:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Functionality</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your tool must be fully functional and ready for users. Beta products are acceptable if theyre stable enough for practical use.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Developer Focus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The tool should be specifically designed for developers or directly related to software development.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Accessible Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your tools website must provide clear information about what the tool does, how to use it, and pricing (if applicable).
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Original Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Submitted content must be your own or content youre authorized to submit. No duplicates of existing submissions.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex p-4 mb-6 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200 m-0">
                  Submissions that dont meet these requirements may be rejected. If your submission is rejected, 
                  youll receive feedback explaining why and how you can improve it for resubmission.
                </p>
              </div>

              {/* Best Practices */}
              <h2 id="best-practices" className="scroll-mt-20">Best Practices</h2>
              
              <p>
                Follow these best practices to maximize the impact of your submission:
              </p>

              <ul className="space-y-4 my-6">
                <li className="flex flex-col gap-1">
                  <strong>Write a compelling tagline</strong>
                  <p className="text-muted-foreground">
                    Your tagline should clearly and concisely explain what your tool does in a way that highlights its unique value.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Craft a detailed description</strong>
                  <p className="text-muted-foreground">
                    Dont just list features—explain how your tool solves specific problems for developers and what makes it unique.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Use high-quality visuals</strong>
                  <p className="text-muted-foreground">
                    Upload a professional, recognizable logo that looks good at different sizes. Avoid busy designs or text-heavy logos.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Select accurate tags</strong>
                  <p className="text-muted-foreground">
                    Choose tags that precisely match your tools category and function rather than broad or trending tags that arent directly relevant.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Prepare your website</strong>
                  <p className="text-muted-foreground">
                    Ensure your landing page clearly demonstrates your tools value, has working links, and provides easy access to documentation.
                  </p>
                </li>
              </ul>

              {/* After Submission */}
              <h2 id="after-submission" className="scroll-mt-20">After Submission</h2>
              
              <p>
                Heres what happens after you submit your tool:
              </p>

              <ol className="space-y-4 my-6">
                <li className="flex flex-col gap-1">
                  <strong>Review process</strong>
                  <p className="text-muted-foreground">
                    Our team will review your submission to ensure it meets our quality guidelines and requirements. This typically takes 1-3 business days.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Publication</strong>
                  <p className="text-muted-foreground">
                    If approved, your tool will be published on DevHunt and will appear in the New section. Youll receive a notification when this happens.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Promotion</strong>
                  <p className="text-muted-foreground">
                    Share your DevHunt listing with your audience and encourage them to upvote if they find your tool valuable.
                  </p>
                </li>
                
                <li className="flex flex-col gap-1">
                  <strong>Engagement</strong>
                  <p className="text-muted-foreground">
                    Respond to comments and questions from the community to build engagement around your tool.
                  </p>
                </li>
              </ol>

              <div className="relative my-10 p-6 bg-primary/5 rounded-lg">
                <div className="absolute -top-5 left-6 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Pro Tip
                </div>
                <p className="mt-2">
                  <strong>Timing matters!</strong> Consider launching your tool on DevHunt when you have time to actively engage with early users.
                  The first 48 hours after publication are crucial for gaining initial traction.
                </p>
              </div>

              {/* FAQs */}
              <h2 id="faqs" className="scroll-mt-20">Frequently Asked Questions</h2>
              
              <div className="space-y-6 my-8">
                <div>
                  <h3 className="text-lg font-medium">Can I submit a tool thats still in beta?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Yes, beta tools are allowed as long as theyre functional and provide value to users. 
                    Make sure to clearly indicate that its in beta in your description.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Can I edit my submission after its published?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Yes, you can update your tools information at any time from your account dashboard. 
                    Major changes might require re-approval by our team.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">How long does the review process take?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Typically 1-3 business days. During periods of high submission volume, it may take longer.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">What if my submission is rejected?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Youll receive feedback explaining why it was rejected. You can make the necessary improvements and resubmit your tool.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Can I submit multiple tools?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Yes, you can submit as many legitimate tools as you want, as long as each one meets our quality guidelines.
                  </p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-primary/5 p-6 rounded-lg mt-10">
                <h2 className="text-xl font-bold mb-4">Ready to submit your tool?</h2>
                <p className="mb-6">
                  Now that you understand the submission process, its time to share your developer tool with the community.
                </p>
                <Button asChild>
                  <Link href="/submit">Submit Your Tool</Link>
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