/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { toast } from "sonner"

/**
 * Utility functions for sharing analytics data
 */

interface ShareOptions {
  title?: string
  url?: string
  text?: string
  hashtags?: string[]
}

/**
 * Share via Web Share API if available, or fallback to clipboard copying
 */
export async function shareAnalytics(options: ShareOptions) {
  const { title = 'DevHunt Analytics', url = window.location.href, text = 'Check out my analytics on DevHunt' } = options
  
  // Check if Web Share API is available
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      })
      return true
    } catch (error) {
      // User cancelled or share failed
      console.error('Error sharing:', error)
      return false
    }
  } else {
    // Fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard!')
      return true
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      toast.error('Failed to copy link')
      return false
    }
  }
}

/**
 * Share to Twitter
 */
export function shareToTwitter(options: ShareOptions) {
  const { title = 'DevHunt Analytics', url = window.location.href, hashtags = ['devhunt', 'analytics'] } = options
  
  const tweetText = encodeURIComponent(`${title} ${url} ${hashtags.map(tag => `#${tag}`).join(' ')}`)
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`
  
  window.open(twitterUrl, '_blank')
}

/**
 * Share to LinkedIn
 */
export function shareToLinkedIn(options: ShareOptions) {
  const { url = window.location.href } = options
  
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  window.open(linkedinUrl, '_blank')
}

/**
 * Share to Facebook
 */
export function shareToFacebook(options: ShareOptions) {
  const { url = window.location.href } = options
  
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  window.open(facebookUrl, '_blank')
}

/**
 * Generate a shareable embed code for the analytics
 */
export function generateEmbedCode(username: string, timeRange: string) {
  return `<iframe 
  src="${window.location.origin}/embed/analytics/${username}?timeRange=${timeRange}" 
  width="100%" 
  height="600" 
  style="border:0;border-radius:8px;" 
  loading="lazy"
></iframe>`
}

/**
 * Generate a shareable link with custom parameters
 */
export function generateShareableLink(username: string, timeRange: string, filterParams?: Record<string, any>) {
  const baseUrl = `${window.location.origin}/analytics/share/${username}`
  const params = new URLSearchParams()
  
  params.append('timeRange', timeRange)
  
  if (filterParams) {
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          params.append(key, value.join(','))
        } else {
          params.append(key, String(value))
        }
      }
    })
  }
  
  return `${baseUrl}?${params.toString()}`
}