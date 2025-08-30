import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Package} from "lucide-react"

export default function ProductComponentsPage() {
  const components = [
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
    },
    {
      name: "MediaGallery",
      description: "A gallery component for displaying product media",
      props: [
        "media: Media array",
        "onMediaClick: function"
      ],
      usage: `import { MediaGallery } from "@/components/product/media-gallery"

<MediaGallery media={productMedia} onMediaClick={handleMediaClick} />`
    },
    {
      name: "TagBadge",
      description: "A badge component for displaying product tags",
      props: [
        "tag: Tag object",
        "onClick: function"
      ],
      usage: `import { TagBadge } from "@/components/product/tag-badge"

<TagBadge tag={tag} onClick={handleTagClick} />`
    },
    {
      name: "ProductFeed",
      description: "A feed component for displaying multiple products",
      props: [
        "products: Product array",
        "onVote: function",
        "onComment: function"
      ],
      usage: `import { ProductFeed } from "@/components/product/product-feed"

<ProductFeed products={products} onVote={handleVote} onComment={handleComment} />`
    }
  ]

  return (
    <DocPage
      title="Product Components"
      description="Components for displaying and interacting with developer tools and products."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            Product components are specialized UI elements designed for displaying and interacting 
            with developer tools and products on DevHunt. These components provide consistent 
            presentation and functionality across the platform.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            Available Components
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {components.map((component, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{component.name}</span>
                    <Badge variant="secondary">Product</Badge>
                  </CardTitle>
                  <p className="text-muted-foreground">{component.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Props:</h3>
                    <ul className="grid grid-cols-1 gap-2">
                      {component.props.map((prop, propIndex) => (
                        <li key={propIndex} className="text-sm bg-muted p-2 rounded">
                          {prop}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
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

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Implementation Details</h2>
          <p>
            Product components are designed to be flexible and reusable while maintaining 
            consistent styling and behavior across the platform. They integrate with the 
            analytics system to track user interactions and with the voting system to 
            enable community engagement.
          </p>
        </section>
      </div>
    </DocPage>
  )
}