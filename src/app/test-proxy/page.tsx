/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ExternalLink, AlertCircle, CheckCircle, Info } from "lucide-react"
import { getUrlHelpMessage, isDirectImageUrl, extractDomain, isPinterestPageUrl, getPinterestConversionGuidance } from "@/lib/utils"
import { cn } from "@/lib/utils"

export default function TestProxyPage() {
  const [testUrl, setTestUrl] = useState("")
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [error, setError] = useState("")
  const [urlValidation, setUrlValidation] = useState<any>(null)

  const testUrls = [
    "https://pin.it/2T0kR4APX", // Pinterest page URL (will fail)
    "https://i.pinimg.com/originals/example.jpg", // Pinterest direct image (should work)
    "https://images.unsplash.com/photo-1234567890", // Unsplash (should work)
    "https://i.imgur.com/example.png" // Imgur (should work)
  ]

  const handleTest = async () => {
    if (!testUrl.trim()) return

    setIsTesting(true)
    setError("")
    setTestResult(null)

    try {
      // Test the proxy API
      const proxyUrl = `/api/images/proxy?url=${encodeURIComponent(testUrl)}`
      
      const response = await fetch(proxyUrl)
      const contentType = response.headers.get('content-type')
      
      if (response.ok) {
        setTestResult({
          success: true,
          status: response.status,
          contentType,
          proxyUrl,
          originalUrl: testUrl,
          headers: Object.fromEntries(response.headers.entries())
        })
      } else {
        const errorData = await response.json().catch(() => ({}))
        setTestResult({
          success: false,
          status: response.status,
          error: errorData.error || 'Unknown error',
          details: errorData.details || '',
          guidance: errorData.guidance || null,
          proxyUrl,
          originalUrl: testUrl
        })
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred')
    } finally {
      setIsTesting(false)
    }
  }

  const handleUrlSelect = (url: string) => {
    setTestUrl(url)
    // Validate URL when selected
    validateUrl(url)
  }

  const validateUrl = (url: string) => {
    if (!url.trim()) {
      setUrlValidation(null)
      return
    }

    try {
      new URL(url)
      const isPinterestPage = isPinterestPageUrl(url)
      const isDirectImage = isDirectImageUrl(url)
      const guidance = getPinterestConversionGuidance(url)
      
      setUrlValidation({
        isValid: true,
        isPinterestPage,
        isDirectImage,
        guidance,
        helpMessage: getUrlHelpMessage(url)
      })
    } catch {
      setUrlValidation({
        isValid: false,
        isPinterestPage: false,
        isDirectImage: false,
        guidance: null,
        helpMessage: "❌ Invalid URL format"
      })
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setTestUrl(url)
    validateUrl(url)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Image Proxy Test Page</h1>
          <p className="text-muted-foreground mt-2">
            Test the image proxy API with different URLs
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Test Image Proxy</CardTitle>
            <CardDescription>
              Enter an image URL to test if it can be loaded through the proxy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Test URLs */}
            <div className="space-y-2">
              <Label>Quick Test URLs:</Label>
              <div className="flex flex-wrap gap-2">
                {testUrls.map((url) => (
                  <Button
                    key={url}
                    variant="outline"
                    size="sm"
                    onClick={() => handleUrlSelect(url)}
                  >
                    {extractDomain(url)}
                  </Button>
                ))}
              </div>
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <Label htmlFor="test-url">Image URL to Test:</Label>
              <div className="flex gap-2">
                <Input
                  id="test-url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={testUrl}
                  onChange={handleUrlChange}
                />
                <Button 
                  onClick={handleTest} 
                  disabled={!testUrl.trim() || isTesting}
                >
                  {isTesting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    "Test"
                  )}
                </Button>
              </div>
            </div>

            {/* Enhanced URL Analysis */}
            {urlValidation && (
              <div className="space-y-2">
                <Label>URL Analysis:</Label>
                <div className="p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    {urlValidation.isDirectImage ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : urlValidation.isPinterestPage ? (
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm font-medium">
                      {urlValidation.isDirectImage ? "Direct Image URL" : 
                       urlValidation.isPinterestPage ? "Pinterest Page URL" : 
                       "Page URL"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {urlValidation.helpMessage}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Domain: {extractDomain(testUrl)}
                  </p>
                  
                  {/* Pinterest specific guidance */}
                  {urlValidation.guidance && (
                    <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                      <div className="flex items-center gap-1 mb-1">
                        <Info className="h-3 w-3" />
                        <span className="font-medium">Pinterest URL Detected</span>
                      </div>
                      <p className="mb-2">{urlValidation.guidance.message}</p>
                      <div className="space-y-1">
                        {urlValidation.guidance.steps.map((step: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                          <p key={index} className="text-xs">{step}</p>
                        ))}
                      </div>
                      <div className="mt-2 p-2 bg-blue-100 rounded text-xs">
                        <strong>Example:</strong><br/>
                        ❌ <code className="bg-blue-200 px-1 rounded">{urlValidation.guidance.example.wrong}</code><br/>
                        ✅ <code className="bg-blue-200 px-1 rounded">{urlValidation.guidance.example.correct}</code>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Enhanced Test Results */}
            {testResult && (
              <div className="space-y-2">
                <Label>Test Results:</Label>
                <div className={cn(
                  "p-4 rounded-md border",
                  testResult.success 
                    ? "bg-green-50 border-green-200" 
                    : "bg-red-50 border-red-200"
                )}>
                  <div className="flex items-center gap-2 mb-2">
                    {testResult.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-medium">
                      {testResult.success ? "Success!" : "Failed"}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Status:</strong> {testResult.status}
                    </div>
                    <div>
                      <strong>Original URL:</strong> 
                      <a href={testResult.originalUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline flex items-center gap-1">
                        {testResult.originalUrl}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div>
                      <strong>Proxy URL:</strong> 
                      <code className="ml-2 bg-muted px-2 py-1 rounded text-xs">
                        {testResult.proxyUrl}
                      </code>
                    </div>
                    
                    {testResult.success ? (
                      <div>
                        <strong>Content Type:</strong> {testResult.contentType}
                      </div>
                    ) : (
                      <div>
                        <strong>Error:</strong> {testResult.error}
                        {testResult.details && (
                          <div className="text-muted-foreground mt-1">
                            Details: {testResult.details}
                          </div>
                        )}
                        
                        {/* Enhanced error guidance */}
                        {testResult.guidance && (
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                            <div className="flex items-center gap-2 mb-2">
                              <Info className="h-4 w-4 text-blue-600" />
                              <span className="font-medium text-blue-800">Guidance</span>
                            </div>
                            <p className="text-sm text-blue-700 mb-2">
                              {testResult.guidance.message}
                            </p>
                            {testResult.guidance.steps && (
                              <ol className="list-decimal list-inside text-xs text-blue-600 space-y-1">
                                {testResult.guidance.steps.map((step: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ol>
                            )}
                            {testResult.guidance.reasons && (
                              <ul className="list-disc list-inside text-xs text-blue-600 space-y-1 mt-2">
                                {testResult.guidance.reasons.map((reason: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                                  <li key={index}>{reason}</li>
                                ))} 
                              </ul>
                            )}
                            {testResult.guidance.example && (
                              <div className="mt-2 p-2 bg-blue-100 rounded text-xs">
                                <strong>Example:</strong><br/>
                                ❌ <code className="bg-blue-200 px-1 rounded">{testResult.guidance.example.wrong}</code><br/>
                                ✅ <code className="bg-blue-200 px-1 rounded">{testResult.guidance.example.correct}</code>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Image Preview */}
        {testResult?.success && testResult.contentType?.startsWith('image/') && (
          <Card>
            <CardHeader>
              <CardTitle>Image Preview</CardTitle>
              <CardDescription>
                Preview of the image loaded through the proxy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto">
                <img
                  src={testResult.proxyUrl}
                  alt="Test image preview"
                  className="w-full h-auto rounded-lg border"
                  crossOrigin="anonymous"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">For Pinterest Images:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Go to the Pinterest pin page</li>
                <li>Right-click on the image</li>
                <li>Select Copy image address or Copy image URL</li>
                <li>Paste the copied URL here and test</li>
              </ol>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Supported Platforms:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Pinterest (i.pinimg.com)</li>
                <li>Imgur (i.imgur.com)</li>
                <li>Unsplash (images.unsplash.com)</li>
                <li>GitHub (raw.githubusercontent.com)</li>
                <li>Any direct image URL</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
