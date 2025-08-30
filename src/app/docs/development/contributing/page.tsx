import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Heart,
  GitBranch,
  FileText,
  TestTube,
  Zap,
  Shield
} from "lucide-react"

export default function ContributingPage() {
  const contributionSections = [
    {
      id: "setup",
      title: "Development Setup",
      icon: <Zap className="h-5 w-5" />,
      content: `
1. Fork the repository on GitHub
2. Clone your forked repository:
   \`\`\`bash
   git clone https://github.com/your-username/devhunt.git
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   cd devhunt
   npm install
   \`\`\`
4. Set up environment variables:
   Copy .env.example to .env and fill in the required values
5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
6. Open http://localhost:3000 in your browser
`
    },
    {
      id: "workflow",
      title: "Development Workflow",
      icon: <GitBranch className="h-5 w-5" />,
      content: `
1. Create a new branch for your feature or bug fix:
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`
2. Make your changes
3. Write tests for your changes
4. Run the test suite:
   \`\`\`bash
   npm test
   \`\`\`
5. Commit your changes with a descriptive message:
   \`\`\`bash
   git commit -m "Add feature: description of your feature"
   \`\`\`
6. Push to your fork:
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`
7. Create a pull request on GitHub
`
    },
    {
      id: "standards",
      title: "Code Standards",
      icon: <Shield className="h-5 w-5" />,
      content: `
- Follow the existing code style (TypeScript, Tailwind CSS)
- Write clear, self-documenting code
- Include JSDoc comments for functions and components
- Use meaningful variable and function names
- Keep functions small and focused
- Prefer functional components over class components
- Use TypeScript for type safety
- Write unit tests for new functionality
`
    }
  ]

  return (
    <DocPage
      title="Contributing to DevHunt"
      description="Learn how to contribute to the DevHunt platform and become part of our community."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            We love your input! We want to make contributing to DevHunt as easy and 
            transparent as possible, whether its:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reporting a bug</li>
            <li>Discussing the current state of the code</li>
            <li>Submitting a fix</li>
            <li>Proposing new features</li>
            <li>Becoming a maintainer</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            We Develop with GitHub
          </h2>
          <p>
            We use GitHub to host code, to track issues and feature requests, 
            as well as accept pull requests.
          </p>
        </section>

        <div className="space-y-12">
          {contributionSections.map((section) => (
            <section key={section.id} className="space-y-6">
              <div className="flex items-center gap-3">
                {section.icon}
                <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <pre className="whitespace-pre-wrap text-sm">
                    {section.content}
                  </pre>
                </CardContent>
              </Card>
            </section>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Reporting Bugs
          </h2>
          <p>
            We use GitHub issues to track public bugs. Report a bug by 
            <a href="https://github.com/devhunt/devhunt/issues/new" className="text-primary hover:underline"> opening a new issue</a>.
          </p>
          <p>
            Write bug reports with detail, background, and sample code. 
            Include the following in your report:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A quick summary and/or background</li>
            <li>Steps to reproduce</li>
            <li>Be specific!</li>
            <li>Give sample code if you can</li>
            <li>What you expected would happen</li>
            <li>What actually happens</li>
            <li>Notes (possibly including why you think this might be happening, or stuff you tried that didnt work)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <TestTube className="h-6 w-6 text-primary" />
            Testing
          </h2>
          <p>
            All code changes should be accompanied by tests. We use Jest for 
            unit tests and Cypress for end-to-end tests. Make sure all tests 
            pass before submitting your pull request.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">License</h2>
          <p>
            By contributing, you agree that your contributions will be licensed 
            under the MIT License.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">References</h2>
          <p>
            This document was adapted from the open-source contribution guidelines 
            for Facebooks Draft.js.
          </p>
        </section>
      </div>
    </DocPage>
  )
}