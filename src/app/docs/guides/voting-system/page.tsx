"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronUp, ChevronLeft, Check, Info, AlertCircle, ThumbsUp, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function VotingGuidePage() {
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
                <ThumbsUp className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Understanding the Voting System
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px]">
                Learn how the voting system works on DevHunt and how it affects product discovery and trending algorithms.
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
                      <Link href="#how-voting-works" className="text-primary hover:underline">
                        How Voting Works
                      </Link>
                    </li>
                    <li>
                      <Link href="#voting-impact" className="text-primary hover:underline">
                        Impact of Votes
                      </Link>
                    </li>
                    <li>
                      <Link href="#trending-algorithm" className="text-primary hover:underline">
                        Trending Algorithm
                      </Link>
                    </li>
                    <li>
                      <Link href="#voting-etiquette" className="text-primary hover:underline">
                        Voting Etiquette
                      </Link>
                    </li>
                    <li>
                      <Link href="#reputation-points" className="text-primary hover:underline">
                        Reputation Points
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
                Voting is a core feature of DevHunt that helps the community highlight the most valuable developer tools and resources. 
                This guide explains how the voting system works, its impact on product visibility, and how you can effectively 
                participate in the community curation process.
              </p>

              <div className="flex p-4 mb-6 bg-primary/5 rounded-lg">
                <Info className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <p className="text-sm m-0">
                  Voting on DevHunt is meant to highlight quality tools that provide genuine value to developers. 
                  The system is designed to promote authentic engagement and discourage manipulation.
                </p>
              </div>

              {/* How Voting Works */}
              <h2 id="how-voting-works" className="scroll-mt-20">How Voting Works</h2>
              
              <p>
                The voting mechanism on DevHunt is straightforward but powerful. Each registered user can upvote products 
                they find valuable or interesting. Here's how it works:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Finding Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Browse the main feed, collections, or search for specific tools to discover products worth voting for.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Casting Your Vote</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Click the upvote button <ChevronUp className="h-4 w-4 inline-block text-primary" /> to support a product you find valuable.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Changing Your Mind</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Click the upvote button again to remove your vote if you change your mind.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted p-6 rounded-lg mb-8">
                <h3 className="text-xl font-medium mb-4">What You Should Know About Voting</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>You must be logged in to vote on products</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Each user gets one vote per product</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>You can vote for your own submissions (but this is tracked and weighted differently in trending calculations)</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Votes are permanent in our database but can be toggled on/off by users</span>
                  </li>
                </ul>
              </div>

              {/* Impact of Votes */}
              <h2 id="voting-impact" className="scroll-mt-20">Impact of Votes</h2>
              
              <p>
                Votes on DevHunt do more than just show popularity. They impact several aspects of the platform:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Product Ranking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Products with more votes rank higher in search results and category pages, increasing their visibility to other users.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Creator Reputation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      When your submissions receive votes, your reputation in the community increases, unlocking benefits and recognition.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative my-10 p-6 bg-primary/5 rounded-lg">
                <div className="absolute -top-5 left-6 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Pro Tip
                </div>
                <p className="mt-2">
                  <strong>Timing matters!</strong> Recent votes have a stronger impact on trending calculations than older votes. 
                  If you're launching a product, encouraging votes shortly after submission can significantly boost visibility.
                </p>
              </div>

              {/* Trending Algorithm */}
              <h2 id="trending-algorithm" className="scroll-mt-20">Trending Algorithm</h2>
              
              <p>
                The DevHunt trending algorithm determines which products appear at the top of the main feed and in the "Trending" section. 
                It's designed to highlight products gaining momentum rather than just showing all-time popular tools.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-4">How the Trending Score is Calculated</h3>
              
              <p>
                Our trending score combines multiple factors with different weights:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">Factor</th>
                      <th className="border p-2 text-left">Weight</th>
                      <th className="border p-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">Recent votes (24h)</td>
                      <td className="border p-2">10x</td>
                      <td className="border p-2">Votes received in the last 24 hours</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Weekly votes (7d)</td>
                      <td className="border p-2">3x</td>
                      <td className="border p-2">Votes received in the last 7 days</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Recent comments (24h)</td>
                      <td className="border p-2">5x</td>
                      <td className="border p-2">Comments received in the last 24 hours</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Total votes</td>
                      <td className="border p-2">1x</td>
                      <td className="border p-2">All-time vote count (baseline factor)</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Recency boost</td>
                      <td className="border p-2">Varies</td>
                      <td className="border p-2">Bonus for products less than 7 days old</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex p-4 mb-6 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200 m-0">
                  The trending algorithm is periodically updated to improve quality and prevent gaming the system. 
                  The specific weights and factors may change over time.
                </p>
              </div>

              {/* Voting Etiquette */}
              <h2 id="voting-etiquette" className="scroll-mt-20">Voting Etiquette</h2>
              
              <p>
                To maintain a healthy community focused on quality content, we encourage the following voting practices:
              </p>

              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Vote based on quality:</strong> Support tools that are well-built, solve real problems, and provide value to developers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Try before you vote:</strong> Whenever possible, try out a tool or at least thoroughly explore its documentation before voting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Be selective:</strong> Vote for tools you genuinely find valuable rather than upvoting everything you see.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Give constructive feedback:</strong> If possible, leave a comment explaining why you found a tool useful when you upvote it.</span>
                </li>
              </ul>

              <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-lg mb-8">
                <h4 className="text-lg font-medium text-red-700 dark:text-red-300 mb-2">Prohibited Voting Behavior</h4>
                <p className="text-sm text-red-800 dark:text-red-200 mb-3">
                  The following practices are against our community guidelines and may result in account suspension:
                </p>
                <ul className="space-y-1 text-sm text-red-800 dark:text-red-200">
                  <li>• Vote manipulation through multiple accounts</li>
                  <li>• Vote exchange groups or "upvote for upvote" arrangements</li>
                  <li>• Paying for votes or offering incentives for votes</li>
                  <li>• Scripted voting or using bots to automate votes</li>
                </ul>
              </div>

              {/* Reputation Points */}
              <h2 id="reputation-points" className="scroll-mt-20">Reputation Points</h2>
              
              <p>
                Votes contribute to your reputation in the DevHunt community. Here's how voting affects reputation:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Votes You Receive</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      When your products receive votes:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">+3</div>
                        <span>Points per vote received on your submissions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">+100</div>
                        <span>Achievement bonus for receiving 50 votes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">+200</div>
                        <span>Achievement bonus for receiving 100 votes</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Votes You Cast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      When you vote on products:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">+2</div>
                        <span>Points per vote cast (encourages curation)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">+10</div>
                        <span>Achievement bonus for first vote cast</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">+75</div>
                        <span>Achievement bonus for casting 50 votes</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <p>
                As your reputation grows, you'll unlock new features and privileges on the platform, including:
              </p>

              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center font-medium flex-shrink-0">
                    1
                  </div>
                  <span><strong>Contributor Badge:</strong> Displayed on your profile after reaching 100 reputation points</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center font-medium flex-shrink-0">
                    2
                  </div>
                  <span><strong>Featured Collections:</strong> Ability to create featured collections after reaching 500 points</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center font-medium flex-shrink-0">
                    3
                  </div>
                  <span><strong>Moderation Privileges:</strong> Help moderate community content at 1,500 points</span>
                </li>
              </ul>

              {/* FAQs */}
              <h2 id="faqs" className="scroll-mt-20">Frequently Asked Questions</h2>
              
              <div className="space-y-6 my-8">
                <div>
                  <h3 className="text-lg font-medium">Can I vote for my own products?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Yes, you can vote for your own submissions. However, self-votes are weighted differently in the trending algorithm to prevent gaming the system.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Is there a limit to how many products I can vote for?</h3>
                  <p className="mt-1 text-muted-foreground">
                    No, there's no limit to the number of products you can vote for. However, we encourage thoughtful voting rather than mass upvoting everything.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Why did my product stop trending despite getting votes?</h3>
                  <p className="mt-1 text-muted-foreground">
                    The trending algorithm heavily weights recent activity. As your votes become older, their impact on the trending score diminishes. 
                    Consistent engagement over time is key to maintaining visibility.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">How can I see who voted for my product?</h3>
                  <p className="mt-1 text-muted-foreground">
                    For privacy reasons, individual voters are not publicly displayed. However, you can see the total vote count and voting trends in your product analytics.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Do downvotes affect my product's ranking?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Currently, DevHunt only supports upvoting. We believe this creates a more positive community focused on highlighting great tools rather than criticizing others.
                  </p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-primary/5 p-6 rounded-lg mt-10">
                <h2 className="text-xl font-bold mb-4">Ready to start voting?</h2>
                <p className="mb-6">
                  Now that you understand how voting works on DevHunt, start discovering and upvoting products that you find valuable.
                  Your votes help shape the community and ensure the best developer tools get the visibility they deserve.
                </p>
                <Button asChild>
                  <Link href="/">Explore Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-12 bg-muted/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Related Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Building Your Developer Profile</CardTitle>
                  <CardDescription>Learn how to create a compelling profile that showcases your expertise</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/docs/guides/developer-profile">Read Guide</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Creating Effective Collections</CardTitle>
                  <CardDescription>Tips for curating valuable collections that get noticed</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/docs/guides/collections">Read Guide</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Using the DevHunt API</CardTitle>
                  <CardDescription>This comprehensive guide covers authentication, endpoints, rate limits, and best practices for using the DevHunt API.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/docs/guides/api">Read Guide</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}