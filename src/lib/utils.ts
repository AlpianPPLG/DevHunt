import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert Pinterest pin.it URLs to direct image URLs
 * @param url - The Pinterest URL (pin.it or pinterest.com)
 * @returns Direct image URL or null if conversion not possible
 */
export function convertPinterestUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    
    // Handle pin.it URLs
    if (urlObj.hostname === 'pin.it') {
      // pin.it URLs need to be converted to pinterest.com first
      const pinId = urlObj.pathname.slice(1) // Remove leading slash
      return `https://www.pinterest.com/pin/${pinId}/`
    }
    
    // Handle pinterest.com URLs
    if (urlObj.hostname.includes('pinterest.com')) {
      // For pinterest.com URLs, we need to extract the pin ID
      const pinMatch = urlObj.pathname.match(/\/pin\/([^\/]+)/)
      if (pinMatch) {
        const pinId = pinMatch[1]
        // Return the pinterest.com URL for now - user needs to get direct image URL
        return `https://www.pinterest.com/pin/${pinId}/`
      }
    }
    
    return null
  } catch {
    return null
  }
}

/**
 * Check if a URL is a direct image URL
 * @param url - The URL to check
 * @returns True if it's a direct image URL
 */
export function isDirectImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    
    // Check if it's a direct image file
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp']
    const hasImageExtension = imageExtensions.some(ext => 
      urlObj.pathname.toLowerCase().includes(ext)
    )
    
    // Check if it's from known image hosting services
    const imageHosts = [
      'i.pinimg.com',      // Pinterest images
      'images.unsplash.com', // Unsplash
      'cdn.discordapp.com',  // Discord
      'media.giphy.com',     // Giphy
      'i.imgur.com',         // Imgur
      'raw.githubusercontent.com', // GitHub raw
      'avatars.githubusercontent.com' // GitHub avatars
    ]
    
    const isFromImageHost = imageHosts.some(host => 
      urlObj.hostname.includes(host)
    )
    
    return hasImageExtension || isFromImageHost
  } catch {
    return false
  }
}

/**
 * Check if a URL is a Pinterest page URL (not a direct image)
 * @param url - The URL to check
 * @returns True if it's a Pinterest page URL
 */
export function isPinterestPageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    
    // Check for pin.it URLs
    if (urlObj.hostname === 'pin.it') {
      return true
    }
    
    // Check for pinterest.com URLs that are not direct images
    if (urlObj.hostname.includes('pinterest.com') && !urlObj.hostname.includes('i.pinimg.com')) {
      return true
    }
    
    return false
  } catch {
    return false
  }
}

/**
 * Get helpful message for different URL types
 * @param url - The URL to analyze
 * @returns Helpful message for the user
 */
export function getUrlHelpMessage(url: string): string {
  try {
    const urlObj = new URL(url)
    
    if (urlObj.hostname === 'pin.it') {
      return "⚠️ This is a Pinterest pin link. Right-click the image and 'Copy image address' to get the direct URL."
    }
    
    if (urlObj.hostname.includes('pinterest.com') && !urlObj.hostname.includes('i.pinimg.com')) {
      return "⚠️ This is a Pinterest page. Right-click the image and 'Copy image address' to get the direct URL."
    }
    
    if (isDirectImageUrl(url)) {
      return "✅ This appears to be a direct image URL. It should work!"
    }
    
    return "⚠️ This doesn't appear to be a direct image URL. Try to get the direct link to the image file."
  } catch {
    return "❌ Invalid URL format. Please enter a valid URL."
  }
}

/**
 * Get detailed Pinterest conversion guidance
 * @param url - The Pinterest URL
 * @returns Detailed guidance object
 */
export function getPinterestConversionGuidance(url: string): {
  isPinterestUrl: boolean
  message: string
  steps: string[]
  example: {
    wrong: string
    correct: string
  }
} | null {
  if (!isPinterestPageUrl(url)) {
    return null
  }
  
  return {
    isPinterestUrl: true,
    message: "This is a Pinterest page link, not a direct image URL. You need to get the direct image URL instead.",
    steps: [
      "Go to the Pinterest page",
      "Right-click on the image you want to use",
      "Select 'Copy image address' or 'Copy image URL'",
      "Paste the copied URL here"
    ],
    example: {
      wrong: url,
      correct: "https://i.pinimg.com/originals/actual-image.jpg"
    }
  }
}

/**
 * Extract domain from URL for display purposes
 * @param url - The URL to extract domain from
 * @returns Domain name or null
 */
export function extractDomain(url: string): string | null {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return null
  }
}

/**
 * Validate and suggest fixes for image URLs
 * @param url - The URL to validate
 * @returns Validation result with suggestions
 */
export function validateImageUrl(url: string): {
  isValid: boolean
  isDirectImage: boolean
  isPinterestPage: boolean
  suggestions: string[]
  correctedUrl?: string
} {
  try {
    new URL(url)
  } catch {
    return {
      isValid: false,
      isDirectImage: false,
      isPinterestPage: false,
      suggestions: ["Please enter a valid URL format"]
    }
  }
  
  const isDirectImage = isDirectImageUrl(url)
  const isPinterestPage = isPinterestPageUrl(url)
  
  const suggestions: string[] = []
  
  if (isPinterestPage) {
    suggestions.push("This is a Pinterest page link. You need the direct image URL.")
    suggestions.push("Right-click on the image and select 'Copy image address'")
  }
  
  if (!isDirectImage && !isPinterestPage) {
    suggestions.push("This doesn't appear to be a direct image URL")
    suggestions.push("Make sure you're using the direct link to the image file")
  }
  
  return {
    isValid: true,
    isDirectImage,
    isPinterestPage,
    suggestions
  }
}
