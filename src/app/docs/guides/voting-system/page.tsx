"use client"

import { DocPage } from "@/components/docs/doc-page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ThumbsUp, 
  ThumbsDown, 
  TrendingUp, 
  Shield, 
  Users, 
  HelpCircle 
} from "lucide-react"
import Link from "next/link"

export default function VotingSystemGuidePage() {
  return (
    <DocPage
      title="Understanding the Voting System"
      description="Learn how DevHunt's voting system works and how to participate effectively in the community."
    >
      <div className="space-y-8">
        {/* Introduction */}
        <div className="space-y-4">
          <p className="text-lg">
            DevHunt uses a democratic voting system that allows community members to express 
            their opinions about tools and influence their visibility on the platform.
          </p>
        </div>

        {/* Table of Contents */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <ul className="space-y-1">
              <li>
                <Link href="#how-voting-works" className="text-primary hover:underline">
                  How Voting Works
                </Link>
              </li>
              <li>
                <Link href="#impact-of-voting" className="text-primary hover:underline">
                  Impact of Voting
                </Link>
              </li>
              <li>
                <Link href="#voting-guidelines" className="text-primary hover:underline">
                  Voting Guidelines
                </Link>
              </li>
            </ul>
            <ul className="space-y-1">
              <li>
                <Link href="#strategic-voting" className="text-primary hover:underline">
                  Strategic Voting
                </Link>
              </li>
              <li>
                <Link href="#vote-metrics" className="text-primary hover:underline">
                  Understanding Vote Metrics
                </Link>
              </li>
              <li>
                <Link href="#voting-integrity" className="text-primary hover:underline">
                  Voting Integrity
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* How Voting Works */}
        <section className="space-y-4">
          <h2 id="how-voting-works" className="text-2xl font-bold tracking-tight scroll-mt-20">How Voting Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5" />
                  Upvotes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Indicate approval or appreciation for a tool. Upvotes help quality tools 
                  gain visibility and recognition.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThumbsDown className="h-5 w-5" />
                  Downvotes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Signal that a tool is low-quality or inappropriate. Downvotes help 
                  maintain the quality of tools on the platform.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted p-4 rounded-lg my-6">
            <h3 className="font-medium mb-2">Voting Mechanics:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>Each user gets one vote per tool (up or down)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>You can change your vote at any time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>Votes from verified users carry more weight</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>New accounts may have temporary voting restrictions</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Impact of Voting */}
        <section className="space-y-4">
          <h2 id="impact-of-voting" className="text-2xl font-bold tracking-tight scroll-mt-20">Impact of Voting</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Algorithm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Votes are a crucial factor in determining which tools appear in the Trending section.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Recent Votes (10x weight)</li>
                  <li>• Weekly Votes (3x weight)</li>
                  <li>• Total Votes (baseline)</li>
                  <li>• Recency Boost (first 7 days)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tool Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                    <span>Highly voted tools appear more prominently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                    <span>Tools with many downvotes may be flagged for review</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                    <span>Voting affects search result rankings</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Voting Guidelines */}
        <section className="space-y-4">
          <h2 id="voting-guidelines" className="text-2xl font-bold tracking-tight scroll-mt-20">Voting Guidelines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle>When to Upvote</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                    <span>The tool is genuinely useful or innovative</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                    <span>The description is accurate and well-written</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                    <span>The tool works as advertised</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                    <span>Youve had a positive experience with the tool</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>When to Downvote</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                    <span>The tool is broken or non-functional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                    <span>The description is misleading or inaccurate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                    <span>The tool is a duplicate of existing submissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                    <span>The submission violates community guidelines</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Strategic Voting */}
        <section className="space-y-4">
          <h2 id="strategic-voting" className="text-2xl font-bold tracking-tight scroll-mt-20">Strategic Voting</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle>Building a Better Community</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Vote thoughtfully and honestly</li>
                  <li>• Consider the tools value to the broader community</li>
                  <li>• Leave constructive comments when downvoting</li>
                  <li>• Encourage quality submissions with upvotes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maximizing Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Engage with tools in your areas of expertise</li>
                  <li>• Help new submitters by providing feedback</li>
                  <li>• Participate in discussions about tools youve voted on</li>
                  <li>• Follow through on votes with engagement</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Vote Metrics */}
        <section className="space-y-4">
          <h2 id="vote-metrics" className="text-2xl font-bold tracking-tight scroll-mt-20">Understanding Vote Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle>Individual Tool Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Vote Ratio: Upvotes vs. downvotes</li>
                  <li>• Net Score: Total upvotes minus downvotes</li>
                  <li>• Engagement Rate: Votes + comments vs. views</li>
                  <li>• Growth Rate: Change in votes over time</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Voter Participation: Active users who vote</li>
                  <li>• Vote Distribution: Upvotes vs. downvotes spread</li>
                  <li>• Consensus Levels: Agreement among voters</li>
                  <li>• Trend Analysis: Voting patterns over time</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Voting Integrity */}
        <section className="space-y-4">
          <h2 id="voting-integrity" className="text-2xl font-bold tracking-tight scroll-mt-20">Voting Integrity</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Preventing Manipulation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Accounts must be verified to vote</li>
                  <li>• Suspicious voting patterns are monitored</li>
                  <li>• Vote brigading is detected and addressed</li>
                  <li>• New accounts may have restrictions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Vote based on tool merit, not submitter</li>
                  <li>• Avoid personal bias or vendettas</li>
                  <li>• Consider diverse perspectives</li>
                  <li>• Vote consistently with stated preferences</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Prohibited Activities */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight scroll-mt-20">Prohibited Voting Activities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle>Manipulation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Using multiple accounts to vote</li>
                  <li>• Coordinating vote brigading</li>
                  <li>• Trading votes or incentives</li>
                  <li>• Automated voting systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Abuse</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Voting on your own submissions</li>
                  <li>• Revenge voting against users</li>
                  <li>• Voting based on personal disputes</li>
                  <li>• Harassment through voting patterns</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Conclusion */}
        <section className="space-y-4">
          <div className="bg-primary/5 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Need Help?
            </h2>
            <p className="mb-4">
              The voting system is fundamental to DevHunts community-driven approach to 
              discovering quality developer tools. By participating thoughtfully and responsibly, 
              you help maintain the platforms value for all users.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild>
                <Link href="/docs/faq">Check FAQ</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </DocPage>
  )
}