"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { 
  Mail, 
  MessageSquare,
  Building,
  Phone,
  Github,
  Twitter,
  Linkedin,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

export function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      toast.error("Please fill out all fields");
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Send data to API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Success
      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(typeof error === 'string' ? error : "Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Contact Us</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get In Touch</CardTitle>
                <CardDescription>
                  Our team is here to help you with any questions you may have.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email Us</p>
                    <a 
                      href="mailto:Nova07pplg@gmail.com" 
                      className="text-sm text-primary hover:underline"
                    >
                      Nova07pplg@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      Samarinda, Kalimantan Timur<br />
                        Indonesia
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+62 0812-5844-194</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
                <CardDescription>
                  Follow us on social media to stay updated
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <a 
                    href="https://github.com/AlpianPPLG" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a 
                    href="https://twitter.com/devhunt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/alpian-%E3%85%A4-7a16522bb/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-6">
                <MessageSquare className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Support Hours</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our support team is available:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM ET</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 2:00 PM ET</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select 
                      value={subject} 
                      onValueChange={setSubject}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message"
                      placeholder="Your message"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>Sending Message...</>
                        ) : (
                          <>Send Message</>
                        )}
                      </Button>
                    </div>
                    
                    <div>
                      {isSubmitting ? (
                        <div className="animate-pulse">
                          <AlertCircle className="h-5 w-5 text-primary" />
                        </div>
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and
                    <a href="/terms" className="text-primary hover:underline"> Terms of Service</a>.
                  </p>
                </form>
              </CardContent>
            </Card>
            
            {/* FAQ Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">How long does it take to get a response?</h4>
                    <p className="text-sm text-muted-foreground">
                      We aim to respond to all inquiries within 24-48 business hours.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Can I submit a tool without creating an account?</h4>
                    <p className="text-sm text-muted-foreground">
                      No, you need to create an account to submit a tool to our platform.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">How do I report a bug or issue?</h4>
                    <p className="text-sm text-muted-foreground">
                      Use this contact form with the subject "Technical Support" to report any issues.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Do you offer partnership opportunities?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes! Select "Partnership Opportunity" in the subject dropdown for more information.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection;