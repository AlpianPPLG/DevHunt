/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Copy, 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Mail, 
  Check,
  Code
} from "lucide-react"
import { toast } from "sonner"
import {
  shareToTwitter,
  shareToLinkedIn,
  shareToFacebook,
  generateEmbedCode,
  generateShareableLink,
  shareAnalytics
} from "@/lib/share-utils"

interface ShareDialogProps {
  username: string
  timeRange: string
  filterOptions?: Record<string, any>
  analyticsData?: any
  children?: React.ReactNode
}

export function ShareAnalyticsDialog({ 
  username, 
  timeRange,
  filterOptions,
  children 
}: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const shareableLink = generateShareableLink(username, timeRange, filterOptions)
  const embedCode = generateEmbedCode(username, timeRange)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      toast.success('Embed code copied to clipboard!')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to copy embed code')
    }
  }

  const handleNativeShare = async () => {
    const title = `DevHunt Analytics Dashboard - ${username}`
    const text = `Check out ${username}'s analytics dashboard on DevHunt.`
    
    const success = await shareAnalytics({
      title,
      text,
      url: shareableLink,
      hashtags: ['devhunt', 'analytics', 'developer']
    })
    
    if (success) {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Analytics</DialogTitle>
          <DialogDescription>
            Share your analytics dashboard with others
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <Tabs defaultValue="link">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="link">Link</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="embed">Embed</TabsTrigger>
            </TabsList>
            
            {/* Link Sharing */}
            <TabsContent value="link" className="mt-4 space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  readOnly
                  value={shareableLink}
                  className="flex-1"
                />
                <Button size="icon" variant="outline" onClick={handleCopyLink}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              
              {/* Share options */}
              <div className="pt-4">
                <Button 
                  className="w-full"
                  onClick={handleNativeShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Now
                </Button>
              </div>
            </TabsContent>
            
            {/* Social Media Sharing */}
            <TabsContent value="social" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button 
                  variant="outline" 
                  className="flex flex-col h-auto py-4"
                  onClick={() => shareToTwitter({
                    title: `Check out ${username}'s analytics on DevHunt:`,
                    url: shareableLink
                  })}
                >
                  <Twitter className="h-5 w-5 mb-1 text-blue-500" />
                  <span className="text-xs">Twitter</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col h-auto py-4"
                  onClick={() => shareToLinkedIn({ url: shareableLink })}
                >
                  <Linkedin className="h-5 w-5 mb-1 text-blue-700" />
                  <span className="text-xs">LinkedIn</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col h-auto py-4"
                  onClick={() => shareToFacebook({ url: shareableLink })}
                >
                  <Facebook className="h-5 w-5 mb-1 text-blue-600" />
                  <span className="text-xs">Facebook</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col h-auto py-4"
                  onClick={() => {
                    window.location.href = `mailto:?subject=DevHunt Analytics for ${username}&body=Check out this analytics dashboard: ${encodeURIComponent(shareableLink)}`
                  }}
                >
                  <Mail className="h-5 w-5 mb-1 text-gray-600" />
                  <span className="text-xs">Email</span>
                </Button>
              </div>
              
              <div className="mt-4 text-center">
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Time Range: {timeRange}
                </Badge>
              </div>
            </TabsContent>
            
            {/* Embed Code */}
            <TabsContent value="embed" className="mt-4 space-y-4">
              <div>
                <Label htmlFor="embed-code">Embed Code</Label>
                <div className="mt-1 relative">
                  <Textarea
                    id="embed-code"
                    readOnly
                    rows={5}
                    value={embedCode}
                    className="font-mono text-xs"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={handleCopyEmbed}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This will embed your analytics dashboard with the current time range.
                </p>
              </div>
              
              <div className="border rounded p-4 bg-muted/10">
                <div className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Code className="h-4 w-4" />
                  Preview
                </div>
                <div className="bg-background border rounded-md p-4 text-xs text-center text-muted-foreground">
                  Analytics dashboard for @{username} - {timeRange} time range
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter className="sm:justify-start">
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}