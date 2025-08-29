"use client"

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ShieldCheck, 
  Eye, 
  Lock,
  Cookie,
  Fingerprint,
  Mail,
  BarChart4,
  GlobeLock,
  Clock
} from "lucide-react"

export function PrivacySection() {
  return (
    <section id="privacy" className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Privacy Policy</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            At DevHunt, we take your privacy seriously. This policy explains how we collect, use, 
            and protect your information when you use our platform.
          </p>
        </div>
        
        {/* Introduction Card */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Last Updated: May 15, 2024
            </CardTitle>
            <CardDescription>
              This Privacy Policy applies to all information collected through our website and services.
            </CardDescription>
          </CardHeader>
        </Card>
        
        {/* Privacy Policy Content */}
        <div className="grid md:grid-cols-4 gap-10">
          {/* Policy Features */}
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Privacy Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Transparency</p>
                    <p className="text-xs text-muted-foreground">Clear about data usage</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Data Security</p>
                    <p className="text-xs text-muted-foreground">Industry-standard protection</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Fingerprint className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">User Control</p>
                    <p className="text-xs text-muted-foreground">Manage your data</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <GlobeLock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">GDPR Compliant</p>
                    <p className="text-xs text-muted-foreground">EU privacy standards</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-6">
                <Mail className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Questions?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have any questions about our Privacy Policy, please contact our Data Protection Officer.
                </p>
                <a href="mailto:Nova07pplg@gmail.com" className="text-primary hover:underline font-medium">Nova07pplg@gmail.com</a>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Privacy Content */}
          <div className="md:col-span-3">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="collection">Data Collection</TabsTrigger>
                    <TabsTrigger value="usage">Data Usage</TabsTrigger>
                    <TabsTrigger value="rights">Your Rights</TabsTrigger>
                  </TabsList>
                  
                  <div className="h-[600px] overflow-y-auto mt-6 pr-4">
                    <TabsContent value="overview" className="space-y-8 mt-0">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Privacy Policy Overview</h3>
                        <p className="text-muted-foreground">
                          DevHunt is committed to protecting your privacy. This Privacy Policy explains how we collect,
                          use, disclose, and safeguard your information when you visit our website or use our platform.
                        </p>
                        <p className="text-muted-foreground">
                          Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                          please do not access the site.
                        </p>
                        
                        <div className="bg-accent/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            Changes to This Policy
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            We reserve the right to make changes to this Privacy Policy at any time and for any reason.
                            We will alert you about any changes by updating the Last Updated date of this Privacy Policy.
                            You are encouraged to periodically review this Privacy Policy to stay informed of updates.
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Key Points</h3>
                        <ul className="space-y-3">
                          <li className="flex gap-3">
                            <div className="mt-0.5">
                              <Cookie className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Cookies & Tracking</p>
                              <p className="text-sm text-muted-foreground">
                                We use cookies and similar tracking technologies to track activity on our platform and hold certain information.
                              </p>
                            </div>
                          </li>
                          
                          <li className="flex gap-3">
                            <div className="mt-0.5">
                              <Lock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Security</p>
                              <p className="text-sm text-muted-foreground">
                                We use administrative, technical, and physical security measures to protect your personal information.
                              </p>
                            </div>
                          </li>
                          
                          <li className="flex gap-3">
                            <div className="mt-0.5">
                              <BarChart4 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Analytics</p>
                              <p className="text-sm text-muted-foreground">
                                We may use third-party service providers to monitor and analyze the use of our platform.
                              </p>
                            </div>
                          </li>
                          
                          <li className="flex gap-3">
                            <div className="mt-0.5">
                              <Fingerprint className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Your Choices</p>
                              <p className="text-sm text-muted-foreground">
                                You have control over your personal data and can request access, correction, or deletion.
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="collection" className="space-y-8 mt-0">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Information We Collect</h3>
                        <p className="text-muted-foreground">
                          We collect information that you voluntarily provide to us when you register on the platform,
                          express interest in obtaining information about us or our products and services, participate in activities
                          on the platform, or otherwise contact us.
                        </p>
                        
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium">Personal Data</h4>
                          <p className="text-muted-foreground">
                            The personal information we may collect includes but is not limited to:
                          </p>
                          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                            <li>Name and contact information (email address, phone number)</li>
                            <li>Account login credentials</li>
                            <li>User preferences and settings</li>
                            <li>Profile information (username, avatar, bio)</li>
                            <li>Information submitted in public forums (comments, reviews)</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium">Automatically Collected Information</h4>
                          <p className="text-muted-foreground">
                            When you visit our platform, we may automatically collect certain information, including:
                          </p>
                          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                            <li>Device information (type, operating system, browser)</li>
                            <li>IP address and location information</li>
                            <li>Pages visited and interactions with the platform</li>
                            <li>Time spent on the platform and usage patterns</li>
                            <li>Referring websites or sources</li>
                          </ul>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Cookies and Tracking Technologies</h3>
                        <p className="text-muted-foreground">
                          We use cookies and similar tracking technologies to access or store information. These technologies
                          help us understand user behavior, improve your experience, remember your preferences, and gather information
                          about your interactions with our platform.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <Card className="bg-accent/50">
                            <CardContent className="p-4">
                              <h4 className="font-medium mb-2">Essential Cookies</h4>
                              <p className="text-sm text-muted-foreground">
                                Necessary for the platform to function properly. These cannot be disabled.
                              </p>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-accent/50">
                            <CardContent className="p-4">
                              <h4 className="font-medium mb-2">Analytics Cookies</h4>
                              <p className="text-sm text-muted-foreground">
                                Help us understand how visitors interact with our platform.
                              </p>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-accent/50">
                            <CardContent className="p-4">
                              <h4 className="font-medium mb-2">Functionality Cookies</h4>
                              <p className="text-sm text-muted-foreground">
                                Remember your settings and preferences to enhance your experience.
                              </p>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-accent/50">
                            <CardContent className="p-4">
                              <h4 className="font-medium mb-2">Advertising Cookies</h4>
                              <p className="text-sm text-muted-foreground">
                                Used to deliver relevant ads and track ad campaign performance.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="usage" className="space-y-8 mt-0">
                      {/* Data Usage content would go here */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">How We Use Your Information</h3>
                        <p className="text-muted-foreground">
                          We use the information we collect in various ways, including to:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                          <li>Provide, operate, and maintain our platform</li>
                          <li>Improve, personalize, and expand our platform</li>
                          <li>Understand and analyze how you use our platform</li>
                          <li>Develop new products, services, features, and functionality</li>
                          <li>Communicate with you, either directly or through one of our partners</li>
                          <li>Send you emails and updates</li>
                          <li>Find and prevent fraud</li>
                          <li>For compliance purposes, including enforcing our Terms of Service</li>
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Disclosure of Your Information</h3>
                        <p className="text-muted-foreground">
                          We may share information we have collected about you in certain situations.
                          Your information may be disclosed as follows:
                        </p>
                        
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium">Business Transfers</h4>
                          <p className="text-muted-foreground">
                            If we or our subsidiaries are involved in a merger, acquisition, or asset sale, 
                            your information may be transferred.
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium">Third-Party Service Providers</h4>
                          <p className="text-muted-foreground">
                            We may share your information with third parties that perform services for us or on our behalf, 
                            including payment processing, data analysis, email delivery, hosting services, customer service, 
                            and marketing assistance.
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium">Legal Requirements</h4>
                          <p className="text-muted-foreground">
                            We may disclose your information where we are legally required to do so in order to 
                            comply with applicable law, governmental requests, a judicial proceeding, court order, 
                            or legal process, such as in response to a court order or a subpoena.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="rights" className="space-y-8 mt-0">
                      {/* Your Rights content would go here */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Your Privacy Rights</h3>
                        <p className="text-muted-foreground">
                          Depending on your location, you may have certain rights regarding your personal information, including:
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <Eye className="h-4 w-4 text-primary" />
                              Right to Access
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              You can request copies of your personal information that we hold.
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <Fingerprint className="h-4 w-4 text-primary" />
                              Right to Rectification
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              You can ask us to correct inaccurate information or complete incomplete information.
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <Lock className="h-4 w-4 text-primary" />
                              Right to Erasure
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              You can ask us to delete your personal information in certain circumstances.
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <BarChart4 className="h-4 w-4 text-primary" />
                              Right to Restrict Processing
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              You can ask us to limit the processing of your information in certain circumstances.
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <Cookie className="h-4 w-4 text-primary" />
                              Right to Data Portability
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              You can ask us to transfer your information to another organization or to you.
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <GlobeLock className="h-4 w-4 text-primary" />
                              Right to Object
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              You can object to the processing of your personal data in certain circumstances.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">How to Exercise Your Rights</h3>
                        <p className="text-muted-foreground">
                          If you would like to exercise any of these rights, please contact us at:
                        </p>
                        <div className="bg-accent/50 p-4 rounded-lg">
                          <p className="font-medium text-center">Nova07pplg@gmail.com</p>
                        </div>
                        <p className="text-muted-foreground">
                          We will respond to your request within a reasonable timeframe, typically within 30 days.
                          We may need to verify your identity before processing your request.
                        </p>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrivacySection;