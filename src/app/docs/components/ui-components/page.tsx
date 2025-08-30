import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Box,
  Palette,
  Layout,
  Package} from "lucide-react"

export default function UIComponentsPage() {
  const componentCategories = [
    {
      id: "ui",
      title: "UI Component Library",
      icon: <Box className="h-5 w-5" />,
      description: "Base UI components for building consistent interfaces",
      components: [
        {
          name: "Button",
          description: "A versatile button component with multiple variants",
          props: [
            "variant: default | destructive | outline | secondary | ghost | link",
            "size: default | sm | lg",
            "disabled: boolean",
            "onClick: function"
          ],
          usage: `import { Button } from "@/components/ui/button"

<Button variant="default" onClick={handleClick}>
  Click me
</Button>`
        },
        {
          name: "Card",
          description: "A container component for grouping related content",
          props: [
            "className: string",
            "children: ReactNode"
          ],
          subcomponents: [
            "CardHeader",
            "CardTitle",
            "CardDescription",
            "CardContent",
            "CardFooter"
          ],
          usage: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
</Card>`
        },
        {
          name: "Input",
          description: "A styled input field component",
          props: [
            "type: string",
            "placeholder: string",
            "value: string",
            "onChange: function",
            "disabled: boolean"
          ],
          usage: `import { Input } from "@/components/ui/input"

<Input 
  type="text" 
  placeholder="Enter text" 
  value={value}
  onChange={handleChange}
/>`
        }
      ]
    },
    {
      id: "layout",
      title: "Layout Components",
      icon: <Layout className="h-5 w-5" />,
      description: "Components for structuring page layouts",
      components: [
        {
          name: "Header",
          description: "The main navigation header component",
          props: [
            "className: string"
          ],
          usage: `import { Header } from "@/components/layout/header"

<Header />`
        },
        {
          name: "Footer",
          description: "The main footer component",
          props: [
            "className: string"
          ],
          usage: `import { Footer } from "@/components/layout/footer"

<Footer />`
        }
      ]
    },
    {
      id: "product",
      title: "Product Components",
      icon: <Package className="h-5 w-5" />,
      description: "Components for displaying product information",
      components: [
        {
          name: "ProductCard",
          description: "A card component for displaying product information",
          props: [
            "product: Product object",
            "onVote: function",
            "onComment: function"
          ],
          usage: `import { ProductCard } from "@/components/product/product-card"

<ProductCard product={product} onVote={handleVote} onComment={handleComment} />`
        },
        {
          name: "VoteButton",
          description: "A button component for voting on products",
          props: [
            "voteType: up | down",
            "isActive: boolean",
            "count: number",
            "onClick: function"
          ],
          usage: `import { VoteButton } from "@/components/product/vote-button"

<VoteButton 
  voteType="up" 
  isActive={userVote === "up"}
  count={upvoteCount}
  onClick={handleUpvote}
/>`
        }
      ]
    }
  ]

  return (
    <DocPage
      title="UI Components"
      description="Overview of reusable UI components in the DevHunt codebase."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            DevHunt uses a component-based architecture built with React and TypeScript. 
            Components are organized into logical groups based on their functionality and purpose.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Component Structure</h2>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm">
              {`src/components/
├── ui/              # Base UI components
├── layout/          # Layout components
├── product/         # Product-related components
├── comments/        # Comment system components
├── analytics/       # Analytics dashboard components
├── auth/            # Authentication components
├── collections/     # Collection components
├── profile/         # User profile components
└── user/            # User interaction components`}
            </pre>
          </div>
        </section>

        <div className="space-y-12">
          {componentCategories.map((category) => (
            <section key={category.id} className="space-y-6">
              <div className="flex items-center gap-3">
                {category.icon}
                <h2 className="text-2xl font-bold tracking-tight">{category.title}</h2>
              </div>
              <p className="text-muted-foreground">{category.description}</p>
              
              <div className="space-y-8">
                {category.components.map((component, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{component.name}</span>
                        <Badge variant="secondary">{category.title}</Badge>
                      </CardTitle>
                      <p className="text-muted-foreground">{component.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Props:</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {component.props.map((prop, propIndex) => (
                            <li key={propIndex} className="text-sm bg-muted p-2 rounded">
                              {prop}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {component.subcomponents && (
                        <div>
                          <h3 className="font-medium mb-2">Subcomponents:</h3>
                          <div className="flex flex-wrap gap-2">
                            {component.subcomponents.map((sub, subIndex) => (
                              <Badge key={subIndex} variant="outline">{sub}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h3 className="font-medium mb-2">Usage:</h3>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{component.usage}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Palette className="h-6 w-6 text-primary" />
            Styling and Customization
          </h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Tailwind CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                All components are styled using Tailwind CSS classes. You can customize the appearance by passing additional className props:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`<Button className="bg-purple-500 hover:bg-purple-600">
  Custom Styled Button
</Button>`}</code>
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>CSS Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                The application uses CSS variables for consistent theming:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`:root {
  --primary: 222 43% 11%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 43% 11%;
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </section>
      </div>
    </DocPage>
  )
}