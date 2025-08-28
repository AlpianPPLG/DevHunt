// d:\Development\devhunt\src\components\layout\how-it-works-section.tsx
import { 
  Search, ThumbsUp, PlusCircle, Share2
} from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Discover",
      description: "Browse trending developer tools vetted by the community"
    },
    {
      icon: <ThumbsUp className="h-6 w-6" />,
      title: "Vote & Review",
      description: "Upvote tools you love and share your experience"
    },
    {
      icon: <PlusCircle className="h-6 w-6" />,
      title: "Submit",
      description: "Share your own tools or discoveries with the community"
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Connect",
      description: "Engage with fellow developers and build your network"
    }
  ]

  return (
    <section className="py-16 bg-accent/10">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">How DevHunt Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers discovering and sharing the best tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mb-4 relative">
                <span className="absolute -top-2 -right-2 bg-background border-2 border-primary text-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </span>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection;