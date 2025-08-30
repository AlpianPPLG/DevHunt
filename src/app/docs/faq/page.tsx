import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Rocket, 
  User, 
  Shield, 
  BarChart3, 
  Image, 
  Bug, 
  HelpCircle
} from "lucide-react"

export default function FAQPage() {
  const faqSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Rocket className="h-5 w-5" />,
      questions: [
        {
          question: "What is DevHunt?",
          answer: "DevHunt is a platform for developers to discover, share, and discuss amazing developer tools, libraries, and projects. It helps developers find quality tools and resources while providing a community for tool creators to showcase their work."
        },
        {
          question: "How do I create an account?",
          answer: "To create an account:\n1. Visit devhunt.io/register\n2. Fill in your username, email, and password\n3. Verify your email address through the confirmation email\n4. Log in and start exploring!"
        },
        {
          question: "Is DevHunt free to use?",
          answer: "Yes, DevHunt is completely free to use for all basic features. We offer premium features for power users and businesses, but the core platform is free for everyone."
        }
      ]
    },
    {
      id: "using-devhunt",
      title: "Using DevHunt",
      icon: <User className="h-5 w-5" />,
      questions: [
        {
          question: "How do I submit a tool?",
          answer: "To submit a tool:\n1. Click the \"Submit Tool\" button in the navigation bar\n2. Fill in the tool details (name, description, website URL)\n3. Add tags to categorize your tool\n4. Include a thumbnail image for better visibility\n5. Review and submit your tool"
        },
        {
          question: "What makes a good tool submission?",
          answer: "High-quality tool submissions include:\n• A clear, descriptive name\n• Detailed, accurate description\n• Working website or repository URL\n• Relevant tags for discoverability\n• High-quality thumbnail image\n• Proper categorization"
        },
        {
          question: "How does the voting system work?",
          answer: "DevHunt uses a democratic voting system:\n• Upvotes indicate approval or appreciation\n• Downvotes signal low-quality or inappropriate content\n• Your votes help determine trending rankings\n• Each user gets one vote per tool\n• Votes from verified users carry more weight"
        }
      ]
    },
    {
      id: "account-security",
      title: "Account and Security",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          question: "How do I reset my password?",
          answer: "To reset your password:\n1. Go to the login page\n2. Click \"Forgot Password\"\n3. Enter your email address\n4. Check your email for a password reset link\n5. Follow the link and create a new password"
        },
        {
          question: "How do I delete my account?",
          answer: "To delete your account:\n1. Go to your profile settings\n2. Navigate to the \"Account\" section\n3. Click \"Delete Account\"\n4. Confirm the deletion\n5. Your account and all associated data will be permanently removed"
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we take data security seriously:\n• All data is encrypted in transit and at rest\n• We follow industry best practices for security\n• Regular security audits and updates\n• GDPR compliant data handling\n• No selling of user data to third parties"
        }
      ]
    },
    {
      id: "analytics",
      title: "Analytics and Insights",
      icon: <BarChart3 className="h-5 w-5" />,
      questions: [
        {
          question: "How do I access my analytics?",
          answer: "To access your analytics:\n1. Go to your profile page\n2. Click on the \"Analytics\" tab\n3. View your performance metrics, engagement data, and trends\n4. Export data as needed"
        },
        {
          question: "What metrics are tracked?",
          answer: "We track several key metrics:\n• View counts for your tools\n• Vote counts (upvotes and downvotes)\n• Comment counts and engagement\n• Click-through rates\n• Performance scores\n• Traffic sources and demographics"
        }
      ]
    },
    {
      id: "media",
      title: "Media and Images",
      // eslint-disable-next-line jsx-a11y/alt-text
      icon: <Image className="h-5 w-5" />,
      questions: [
        {
          question: "What image formats are supported?",
          answer: "We support the following image formats:\n• JPEG/JPG\n• PNG\n• GIF\n• WebP\n• SVG (for logos)"
        },
        {
          question: "Can I use external image URLs?",
          answer: "Yes, you can use external image URLs from:\n• Pinterest (use direct image URLs, not pin.it links)\n• Imgur\n• GitHub\n• Any HTTPS image URL\n• Our system automatically proxies external images to bypass CORS restrictions"
        }
      ]
    },
    {
      id: "technical",
      title: "Technical Issues",
      icon: <Bug className="h-5 w-5" />,
      questions: [
        {
          question: "Why aren't my images loading?",
          answer: "If images aren't loading:\n1. Check that you're using direct image URLs (not page URLs)\n2. Verify the image URL is accessible in a browser\n3. Ensure the URL uses HTTPS\n4. Try refreshing the page\n5. Clear your browser cache"
        },
        {
          question: "Why is my submission not appearing?",
          answer: "If your submission isn't appearing:\n1. Check if it's pending review (submissions are reviewed for quality)\n2. Verify all required fields were filled correctly\n3. Check your email for any notifications\n4. Contact support if the issue persists"
        }
      ]
    }
  ]

  return (
    <DocPage
      title="Frequently Asked Questions"
      description="Common questions and answers about using DevHunt."
    >
      <div className="space-y-8">
        <p>
          Find answers to common questions about using DevHunt. If you dont see your question here, 
          please dont hesitate to contact our support team or join our community discussions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqSections.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.questions.map((q, index) => (
                    <li key={index}>
                      <a 
                        href={`#${section.id}-${index}`} 
                        className="text-primary hover:underline text-sm"
                      >
                        {q.question}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-12">
          {faqSections.map((section) => (
            <section key={section.id} className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                {section.icon}
                {section.title}
              </h2>
              
              <div className="space-y-8">
                {section.questions.map((q, index) => (
                  <div 
                    key={index} 
                    id={`${section.id}-${index}`} 
                    className="border-b pb-8 last:border-0 last:pb-0"
                  >
                    <h3 className="text-lg font-medium mb-3">{q.question}</h3>
                    <div className="text-muted-foreground whitespace-pre-line">
                      {q.answer}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="bg-primary/5 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Still Need Help?
          </h2>
          <p className="mb-4">
            If you have a question thats not answered here, please dont hesitate to contact our support team or join our community discussions. Wee here to help you get the most out of DevHunt!
          </p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary">support@devhunt.io</Badge>
            <Badge variant="secondary">Discord Community</Badge>
            <Badge variant="secondary">GitHub Issues</Badge>
          </div>
        </section>
      </div>
    </DocPage>
  )
}