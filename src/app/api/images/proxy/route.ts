import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  let imageUrl: string | null = null
  
  try {
    const { searchParams } = new URL(request.url)
    imageUrl = searchParams.get('url')
    
    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    // Validate URL
    try {
      new URL(imageUrl)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    // Check if this is a Pinterest page URL (not a direct image URL)
    if (imageUrl.includes('pin.it/') || (imageUrl.includes('pinterest.com') && !imageUrl.includes('i.pinimg.com'))) {
      console.error(`[Image Proxy] Pinterest page URL detected: ${imageUrl}`)
      return NextResponse.json({ 
        error: "Pinterest page URL detected",
        details: "This is a Pinterest page link, not a direct image URL. Please use the direct image URL instead.",
        guidance: {
          message: "To get the direct image URL:",
          steps: [
            "1. Go to the Pinterest page",
            "2. Right-click on the image",
            "3. Select 'Copy image address' or 'Copy image URL'",
            "4. Use that URL instead"
          ],
          example: {
            wrong: imageUrl,
            correct: "https://i.pinimg.com/originals/actual-image.jpg"
          }
        }
      }, { status: 400 })
    }

    console.log(`[Image Proxy] Attempting to fetch: ${imageUrl}`)

    // Enhanced headers for better compatibility
    const fetchOptions = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.google.com/',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      // Add timeout
      signal: AbortSignal.timeout(10000) // 10 second timeout
    }

    // Fetch the image from external URL
    const imageResponse = await fetch(imageUrl, fetchOptions)

    if (!imageResponse.ok) {
      console.error(`[Image Proxy] HTTP ${imageResponse.status}: ${imageUrl}`)
      return NextResponse.json({ 
        error: `Failed to fetch image: HTTP ${imageResponse.status}`,
        details: `URL: ${imageUrl}, Status: ${imageResponse.status}`,
        guidance: {
          message: "The image server returned an error. This could mean:",
          reasons: [
            "The image URL is incorrect or expired",
            "The image has been removed or is private",
            "The server is temporarily unavailable",
            "Access is restricted by the image host"
          ]
        }
      }, { status: 404 })
    }

    // Check if response is actually an image
    const contentType = imageResponse.headers.get('content-type')
    if (!contentType || !contentType.startsWith('image/')) {
      console.error(`[Image Proxy] Invalid content type: ${contentType} for ${imageUrl}`)
      return NextResponse.json({ 
        error: "Response is not an image",
        details: `Content-Type: ${contentType}, URL: ${imageUrl}`,
        guidance: {
          message: "The URL returned HTML or text instead of an image. This usually means:",
          reasons: [
            "You're using a page URL instead of a direct image URL",
            "The image host requires authentication",
            "The image has been moved or deleted"
          ]
        }
      }, { status: 400 })
    }

    // Get image content and headers
    const imageBuffer = await imageResponse.arrayBuffer()
    const contentLength = imageResponse.headers.get('content-length')

    console.log(`[Image Proxy] Successfully fetched: ${imageUrl} (${imageBuffer.byteLength} bytes, ${contentType})`)

    // Create response with proper headers
    const response = new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': contentLength || imageBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'X-Proxy-Source': imageUrl,
        'X-Proxy-Cache': '24h'
      }
    })

    return response

  } catch (error) {
    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error(`[Image Proxy] Timeout error for: ${imageUrl || 'unknown URL'}`)
        return NextResponse.json({ 
          error: "Image fetch timeout",
          details: "Request took too long to complete",
          guidance: {
            message: "The image server is taking too long to respond. This could mean:",
            reasons: [
              "The image is very large",
              "The server is slow or overloaded",
              "Network connectivity issues"
            ]
          }
        }, { status: 408 })
      }
      
      if (error.message.includes('fetch')) {
        console.error(`[Image Proxy] Network error for: ${imageUrl || 'unknown URL'}`, error.message)
        return NextResponse.json({ 
          error: "Network error",
          details: "Failed to connect to image server",
          guidance: {
            message: "Unable to connect to the image server. This could mean:",
            reasons: [
              "The image URL is incorrect",
              "The server is down or unreachable",
              "Network connectivity issues",
              "Firewall or security restrictions"
            ]
          }
        }, { status: 503 })
      }
    }

    console.error(`[Image Proxy] Unexpected error for: ${imageUrl || 'unknown URL'}`, error)
    return NextResponse.json({ 
      error: "Failed to proxy image",
      details: error instanceof Error ? error.message : "Unknown error",
      guidance: {
        message: "An unexpected error occurred while trying to fetch the image.",
        reasons: [
          "Check if the image URL is correct",
          "Verify the image is publicly accessible",
          "Try a different image or image host"
        ]
      }
    }, { status: 500 })
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}
