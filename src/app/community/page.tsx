import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Github, 
  Twitter, 
  Calendar, 
  ArrowRight, 
  ExternalLink,
  ThumbsUp,
  MessageCircle,
  Star,
  User
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Community - DevHunt",
  description: "Join the DevHunt community. Connect with fellow developers, share resources, and stay updated with the latest in developer tools.",
}

export default function CommunityPage() {
  const upcomingEvents = [
    {
      id: "1",
      title: "DevHunt Community Meetup",
      date: "June 28, 2025",
      time: "6:00 PM - 8:00 PM EST",
      location: "Virtual",
      description: "Join us for our monthly community meetup where we'll discuss the latest developer tools and trends.",
      image: "https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "2",
      title: "DevTools Workshop: Optimizing Your Workflow",
      date: "July 15, 2025",
      time: "2:00 PM - 4:00 PM EST",
      location: "Virtual",
      description: "Learn how to optimize your development workflow with the latest tools and techniques.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "3",
      title: "DevHunt Annual Conference",
      date: "August 10-12, 2025",
      time: "9:00 AM - 5:00 PM EST",
      location: "New York City + Virtual",
      description: "Our annual conference bringing together developers from around the world to share knowledge and insights.",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  const communityMembers = [
    {
      id: "1",
      name: "Alpian",
      role: "Founder & CEO",
      contributions: 87,
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      username: "AlpianPPLG"
    },
    {
      id: "2",
      name: "Sarah Chen",
      role: "Developer Advocate",
      contributions: 63,
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      username: "sarahchen"
    },
    {
      id: "3",
      name: "Miguel Rodriguez",
      role: "Community Manager",
      contributions: 52,
      avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1534&q=80",
      username: "miguelr"
    },
    {
      id: "4",
      name: "Emma Williams",
      role: "Content Creator",
      contributions: 41,
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      username: "emmawilliams"
    },
    {
      id: "5",
      name: "David Kim",
      role: "Open Source Contributor",
      contributions: 38,
      avatar: "https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      username: "davidkim"
    }
  ];

  const discussionTopics = [
    {
      id: "1",
      title: "What's your favorite code editor and why?",
      author: {
        name: "Miguel Rodriguez",
        avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1534&q=80"
      },
      replies: 28,
      likes: 42,
      lastActivity: "2 hours ago",
      tags: ["discussion", "tools"]
    },
    {
      id: "2",
      title: "Announcing DevHunt API Beta - Looking for testers!",
      author: {
        name: "Alpian",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
      },
      replies: 16,
      likes: 53,
      lastActivity: "1 day ago",
      tags: ["announcement", "api"]
    },
    {
      id: "3",
      title: "Best CI/CD tools for small teams in 2025?",
      author: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
      },
      replies: 32,
      likes: 29,
      lastActivity: "3 days ago",
      tags: ["devops", "tools"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Join Our Community
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px]">
                Connect with fellow developers, share resources, and stay updated with the latest in developer tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button asChild>
                  <Link href="#discord">Join Discord</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#discussions">Browse Discussions</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Platforms */}
        <section id="discord" className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Connect With Us</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-[#5865F2]/10 border-[#5865F2]/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.2701 5.41C17.9901 4.8 16.6101 4.35 15.1501 4.06C15.1101 4.06 15.0601 4.09 15.0401 4.15C14.8601 4.48 14.6601 4.93 14.5201 5.3C12.9601 5.03 11.4101 5.03 9.88008 5.3C9.73008 4.93 9.53008 4.48 9.35008 4.15C9.33008 4.09 9.28008 4.06 9.24008 4.06C7.78008 4.35 6.40008 4.8 5.12008 5.41C5.10008 5.41 5.08008 5.42 5.07008 5.45C2.34008 9.51 1.60008 13.47 1.97008 17.38C1.97008 17.42 1.99008 17.46 2.02008 17.48C3.69008 18.74 5.30008 19.51 6.89008 20.02C6.93008 20.03 6.98008 20.02 7.00008 19.98C7.38008 19.46 7.72008 18.91 8.01008 18.33C8.03008 18.26 8.00008 18.19 7.93008 18.17C7.37008 17.94 6.83008 17.67 6.32008 17.36C6.24008 17.31 6.24008 17.2 6.31008 17.14C6.42008 17.06 6.53008 16.97 6.64008 16.89C6.66008 16.87 6.70008 16.87 6.73008 16.88C10.2701 18.5 14.0701 18.5 17.5601 16.88C17.5901 16.87 17.6301 16.87 17.6501 16.89C17.7601 16.98 17.8701 17.06 17.9801 17.14C18.0601 17.2 18.0601 17.31 17.9701 17.36C17.4601 17.68 16.9301 17.94 16.3601 18.16C16.2901 18.19 16.2601 18.26 16.2801 18.33C16.5801 18.91 16.9201 19.45 17.2901 19.97C17.3101 20.02 17.3601 20.03 17.4001 20.02C19.0001 19.51 20.6101 18.74 22.2801 17.48C22.3101 17.46 22.3301 17.42 22.3301 17.38C22.7701 12.87 21.6301 8.95 19.3301 5.45C19.3201 5.42 19.3001 5.41 19.2701 5.41ZM8.79008 15.06C7.81008 15.06 7.00008 14.15 7.00008 13.02C7.00008 11.9 7.79008 10.99 8.79008 10.99C9.80008 10.99 10.5901 11.91 10.5801 13.02C10.5801 14.15 9.79008 15.06 8.79008 15.06ZM15.2101 15.06C14.2201 15.06 13.4201 14.15 13.4201 13.02C13.4201 11.9 14.2101 10.99 15.2101 10.99C16.2201 10.99 17.0101 11.91 17.0001 13.02C17.0001 14.15 16.2201 15.06 15.2101 15.06Z" fill="#5865F2"/>
                    </svg>
                    Discord
                  </CardTitle>
                  <CardDescription>Join our Discord community with over 10,000 developers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our Discord server is the main hub for real-time discussions, support, and announcements. Join channels for specific topics, get help, and connect with other developers.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">#general</Badge>
                    <Badge variant="secondary">#help</Badge>
                    <Badge variant="secondary">#showcase</Badge>
                    <Badge variant="secondary">#announcements</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="https://discord.gg/devhunt" target="_blank" rel="noopener noreferrer">
                      Join Server <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-black/5 dark:bg-white/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    GitHub
                  </CardTitle>
                  <CardDescription>Contribute to our open source projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    All of our projects are open source. Help us improve DevHunt by contributing code, reporting bugs, or suggesting new features on GitHub.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">devhunt/web</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          <span>1.2k</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          <span>134</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">devhunt/api</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          <span>876</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          <span>92</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="https://github.com/AlpianPPLG" target="_blank" rel="noopener noreferrer">
                      Visit GitHub <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-[#1DA1F2]/10 border-[#1DA1F2]/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                    Twitter
                  </CardTitle>
                  <CardDescription>Follow us for updates and developer tips</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Stay updated with the latest announcements, tips, and developer resources. Join the conversation by following our Twitter account.
                  </p>
                  <div className="space-y-3 mb-4">
                    <div className="p-3 rounded-lg bg-background">
                      <p className="text-sm">🚀 Excited to announce the DevHunt API Beta! Apply for early access now: https://devhunt.io/api-beta</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <span>@devhunt</span>
                        <span>2h ago</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="https://twitter.com/devhunt" target="_blank" rel="noopener noreferrer">
                      Follow Us <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Upcoming Events</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="font-medium text-sm w-16">Time:</span>
                        <span className="text-sm text-muted-foreground">{event.time}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-sm w-16">Where:</span>
                        <span className="text-sm text-muted-foreground">{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/events/${event.id}`}>
                        Register <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/events">
                  View All Events <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Community Content */}
        <section id="discussions" className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Community Discussions</h2>
            
            <Tabs defaultValue="popular" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                </TabsList>
                <Button asChild>
                  <Link href="/community/discussions/new">Start Discussion</Link>
                </Button>
              </div>
              
              <TabsContent value="popular">
                <div className="space-y-4">
                  {discussionTopics.map((topic) => (
                    <Card key={topic.id} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={topic.author.avatar} alt={topic.author.name} />
                            <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div>
                              <Link 
                                href={`/community/discussions/${topic.id}`}
                                className="text-lg font-medium hover:underline"
                              >
                                {topic.title}
                              </Link>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span>{topic.author.name}</span>
                                <span className="mx-2">•</span>
                                <span>{topic.lastActivity}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {topic.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{topic.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{topic.replies}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button variant="outline" asChild>
                    <Link href="/community/discussions">
                      View All Discussions <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="recent">
                <div className="flex items-center justify-center py-12">
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground">Select the Popular tab to view discussions</p>
                    <p className="text-sm text-muted-foreground">This is a demo page</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="unanswered">
                <div className="flex items-center justify-center py-12">
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground">Select the Popular tab to view discussions</p>
                    <p className="text-sm text-muted-foreground">This is a demo page</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Community Members */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Top Contributors</h2>
              <Button variant="outline" asChild>
                <Link href="/community/members">
                  View All Members <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {communityMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Avatar className="h-16 w-16 mb-4">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                    <Badge variant="secondary" className="mb-4">
                      {member.contributions} contributions
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/community/members/${member.username}`}>
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Join Our Community Today</h2>
                <p className="text-muted-foreground">
                  Connect with thousands of developers, share your knowledge, and grow together. Whether youre just starting out or an experienced developer, theres a place for you in our community.
                </p>
              </div>
              <div className="md:w-1/2 flex flex-col sm:flex-row gap-4 w-full md:justify-end">
                <Button asChild size="lg">
                  <Link href="https://discord.gg/devhunt">Join Discord</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/register">Create Account</Link>
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