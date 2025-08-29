"use client"

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  FileText, 
  ShieldCheck, 
  Users, 
  AlertTriangle 
} from "lucide-react"

export function TermsSection() {
  return (
    <section id="terms" className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Terms of Service</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using our platform.
            By accessing DevHunt, you agree to be bound by these terms.
          </p>
        </div>
        
        {/* Introduction Card */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Last Updated: May 15, 2024
            </CardTitle>
            <CardDescription>
              These Terms of Service govern your use of the DevHunt platform and website.
            </CardDescription>
          </CardHeader>
        </Card>
        
        {/* Terms Content */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Navigation Sidebar */}
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contents</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <a 
                    href="#acceptance" 
                    className="block px-4 py-2 hover:bg-accent transition-colors border-l-2 border-transparent hover:border-primary"
                  >
                    Acceptance of Terms
                  </a>
                  <a 
                    href="#user-accounts" 
                    className="block px-4 py-2 hover:bg-accent transition-colors border-l-2 border-transparent hover:border-primary"
                  >
                    User Accounts
                  </a>
                  <a 
                    href="#content" 
                    className="block px-4 py-2 hover:bg-accent transition-colors border-l-2 border-transparent hover:border-primary"
                  >
                    User Content
                  </a>
                  <a 
                    href="#conduct" 
                    className="block px-4 py-2 hover:bg-accent transition-colors border-l-2 border-transparent hover:border-primary"
                  >
                    Prohibited Conduct
                  </a>
                  <a 
                    href="#intellectual-property" 
                    className="block px-4 py-2 hover:bg-accent transition-colors border-l-2 border-transparent hover:border-primary"
                  >
                    Intellectual Property
                  </a>
                  <a 
                    href="#termination" 
                    className="block px-4 py-2 hover:bg-accent transition-colors border-l-2 border-transparent hover:border-primary"
                  >
                    Termination
                  </a>
                  <a 
                    href="#limitation" 
                    className="block px-4 py-2 hover:bg-accent transition-colors border-l-2 border-transparent hover:border-primary"
                  >
                    Limitation of Liability
                  </a>
                  <a 
                    href="#changes" 
                    className="block px-4 py-2 hover:bg-accent transition-colors border-l-2 border-transparent hover:border-primary"
                  >
                    Changes to Terms
                  </a>
                </nav>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-6">
                <ShieldCheck className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Have Questions?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have any questions about our Terms of Service, please contact us.
                </p>
                <a href="#contact" className="text-primary hover:underline font-medium">Contact Support</a>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Terms Content */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="h-[600px] overflow-y-auto pr-4">
                  <div className="space-y-8">
                    <div id="acceptance" className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        1. Acceptance of Terms
                      </h3>
                      <p className="text-muted-foreground">
                        By accessing or using DevHunt, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
                        If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div id="user-accounts" className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        2. User Accounts
                      </h3>
                      <p className="text-muted-foreground">
                        To access certain features of the platform, you may be required to register for an account. 
                        You agree to provide accurate, current, and complete information during the registration process 
                        and to update such information to keep it accurate, current, and complete.
                      </p>
                      <p className="text-muted-foreground">
                        You are responsible for safeguarding your password and for all activities that occur under your account. 
                        You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div id="content" className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        3. User Content
                      </h3>
                      <p className="text-muted-foreground">
                        You retain all rights to the content you post, upload, or otherwise make available on DevHunt. 
                        By posting content, you grant DevHunt a worldwide, non-exclusive, royalty-free license to use, 
                        reproduce, modify, adapt, publish, translate, and distribute your content.
                      </p>
                      <p className="text-muted-foreground">
                        You represent and warrant that you own or have the necessary rights to the content 
                        you post and that your content does not violate the rights of any third party.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div id="conduct" className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-primary" />
                        4. Prohibited Conduct
                      </h3>
                      <p className="text-muted-foreground">
                        You agree not to use DevHunt for any illegal or unauthorized purpose. You must not, in the use of the service, 
                        violate any laws in your jurisdiction (including but not limited to copyright laws).
                      </p>
                      <p className="text-muted-foreground">
                        Prohibited activities include but are not limited to:
                      </p>
                      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                        <li>Posting content that is illegal, harmful, threatening, abusive, or otherwise objectionable</li>
                        <li>Impersonating any person or entity or falsely stating your affiliation with a person or entity</li>
                        <li>Interfering with or disrupting the services or servers or networks connected to the services</li>
                        <li>Attempting to gain unauthorized access to the platform or user accounts</li>
                        <li>Engaging in any automated use of the system, such as using scripts to add content</li>
                      </ul>
                    </div>
                    
                    {/* Additional sections would continue here */}
                    <Separator />
                    
                    <div id="intellectual-property" className="space-y-4">
                      <h3 className="text-xl font-semibold">5. Intellectual Property</h3>
                      <p className="text-muted-foreground">
                        The DevHunt platform, including its logo, design, text, graphics, and other materials, is protected 
                        by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection 
                        with any product or service without the prior written consent of DevHunt.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div id="termination" className="space-y-4">
                      <h3 className="text-xl font-semibold">6. Termination</h3>
                      <p className="text-muted-foreground">
                        We may terminate or suspend your account and access to DevHunt immediately, without prior notice or 
                        liability, for any reason, including without limitation if you breach the Terms of Service.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div id="limitation" className="space-y-4">
                      <h3 className="text-xl font-semibold">7. Limitation of Liability</h3>
                      <p className="text-muted-foreground">
                        In no event shall DevHunt, its officers, directors, employees, or agents, be liable for any indirect, 
                        incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether 
                        incurred directly or indirectly.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div id="changes" className="space-y-4">
                      <h3 className="text-xl font-semibold">8. Changes to Terms</h3>
                      <p className="text-muted-foreground">
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                        We will provide notice of any changes by posting the new Terms on this page. 
                        Your continued use of the platform after any such changes constitutes your acceptance of the new Terms.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TermsSection;