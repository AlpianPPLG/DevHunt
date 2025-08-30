import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent } from "@/components/ui/card"
import { 
  TestTube,
  Bug,
  Zap,
  FileText
} from "lucide-react"

export default function TestingPage() {
  const testingSections = [
    {
      id: "unit",
      title: "Unit Testing",
      icon: <TestTube className="h-5 w-5" />,
      content: `
Unit tests are written using Jest and React Testing Library. They focus on 
testing individual components and functions in isolation.

Example unit test for a button component:
\`\`\`tsx
import { render, screen } from "@testing-library/react"
import { Button } from "@/components/ui/button"

test("renders button with correct text", () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText("Click me")).toBeInTheDocument()
})
\`\`\`

Test organization:
\`\`\`
__tests__/
├── components/         # Component tests
├── pages/              # Page tests
├── api/                # API route tests
├── lib/                # Library function tests
└── integration/        # Integration tests
\`\`\`
`
    },
    {
      id: "integration",
      title: "Integration Testing",
      icon: <Zap className="h-5 w-5" />,
      content: `
Integration tests verify that different parts of the application work together 
correctly. These tests typically involve testing API routes with a real database 
or testing how components interact with each other.

Example integration test for an API route:
\`\`\`tsx
import { GET } from "@/app/api/products/route"
import { mockRequest } from "@/__tests__/utils"

test("returns list of products", async () => {
  const request = mockRequest()
  const response = await GET(request)
  const data = await response.json()
  
  expect(response.status).toBe(200)
  expect(Array.isArray(data)).toBe(true)
})
\`\`\`
`
    },
    {
      id: "e2e",
      title: "End-to-End Testing",
      icon: <Bug className="h-5 w-5" />,
      content: `
End-to-end tests use Cypress to simulate real user interactions with the application. 
These tests cover critical user flows like registration, login, submitting a product, 
and voting.

Example E2E test for user registration:
\`\`\`tsx
describe("User Registration", () => {
  it("should allow a user to register", () => {
    cy.visit("/register")
    cy.get("[data-testid=username]").type("testuser")
    cy.get("[data-testid=email]").type("test@example.com")
    cy.get("[data-testid=password]").type("password123")
    cy.get("[data-testid=submit]").click()
    cy.url().should("include", "/dashboard")
  })
})
\`\`\`
`
    }
  ]

  return (
    <DocPage
      title="Testing Guidelines"
      description="Learn about the testing strategies and tools used in the DevHunt platform."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            Testing is a critical part of the DevHunt development process. 
            We use a combination of unit tests, integration tests, and end-to-end 
            tests to ensure the quality and reliability of our platform.
          </p>
        </section>

        <div className="space-y-12">
          {testingSections.map((section) => (
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
            Test Coverage
          </h2>
          <p>
            We aim for comprehensive test coverage across all parts of the application. 
            Critical business logic and user-facing components should have thorough 
            test coverage. New features should include appropriate tests before 
            being merged.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Running Tests</h2>
          <p>
            To run the test suite locally:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run specific test file
npm test __tests__/components/button.test.tsx

# Run E2E tests
npm test:e2e`}</code>
          </pre>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Continuous Integration</h2>
          <p>
            All tests are run automatically in our CI pipeline on every pull request. 
            Pull requests cannot be merged until all tests pass. Code coverage reports 
            are generated to ensure new code is properly tested.
          </p>
        </section>
      </div>
    </DocPage>
  )
}