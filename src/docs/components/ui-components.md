# UI Components

Overview of reusable UI components in the DevHunt codebase.

## 🧩 Component Architecture

DevHunt uses a component-based architecture built with React and TypeScript. Components are organized into logical groups based on their functionality and purpose.

### Component Structure
```
src/components/
├── ui/              # Base UI components
├── layout/          # Layout components
├── product/         # Product-related components
├── comments/        # Comment system components
├── analytics/       # Analytics dashboard components
├── auth/            # Authentication components
├── collections/     # Collection components
├── profile/         # User profile components
└── user/            # User interaction components
```

## 🎨 UI Component Library

### Button
A versatile button component with multiple variants.

**Props:**
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `size`: "default" | "sm" | "lg"
- `disabled`: boolean
- `onClick`: function

**Usage:**
```tsx
import { Button } from "@/components/ui/button"

<Button variant="default" onClick={handleClick}>
  Click me
</Button>
```

### Card
A container component for grouping related content.

**Props:**
- `className`: string
- `children`: ReactNode

**Subcomponents:**
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`

**Usage:**
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
</Card>
```

### Input
A styled input field component.

**Props:**
- `type`: string
- `placeholder`: string
- `value`: string
- `onChange`: function
- `disabled`: boolean

**Usage:**
```tsx
import { Input } from "@/components/ui/input"

<Input 
  type="text" 
  placeholder="Enter text" 
  value={value}
  onChange={handleChange}
/>
```

### Textarea
A multi-line text input component.

**Props:**
- `placeholder`: string
- `value`: string
- `onChange`: function
- `rows`: number

**Usage:**
```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea 
  placeholder="Enter your message" 
  value={message}
  onChange={handleMessageChange}
  rows={4}
/>
```

### Select
A dropdown selection component.

**Props:**
- `value`: string
- `onValueChange`: function
- `disabled`: boolean

**Subcomponents:**
- `SelectTrigger`
- `SelectContent`
- `SelectItem`
- `SelectValue`

**Usage:**
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select value={selectedValue} onValueChange={setSelectedValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Dialog
A modal dialog component.

**Props:**
- `open`: boolean
- `onOpenChange`: function

**Subcomponents:**
- `DialogTrigger`
- `DialogContent`
- `DialogHeader`
- `DialogTitle`
- `DialogDescription`
- `DialogFooter`
- `DialogClose`

**Usage:**
```tsx
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content</p>
  </DialogContent>
</Dialog>
```

### Tabs
A tabbed interface component.

**Props:**
- `defaultValue`: string
- `value`: string
- `onValueChange`: function

**Subcomponents:**
- `TabsList`
- `TabsTrigger`
- `TabsContent`

**Usage:**
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <p>Content for Tab 1</p>
  </TabsContent>
  <TabsContent value="tab2">
    <p>Content for Tab 2</p>
  </TabsContent>
</Tabs>
```

### Badge
A small labeled indicator component.

**Props:**
- `variant`: "default" | "secondary" | "destructive" | "outline"
- `children`: ReactNode

**Usage:**
```tsx
import { Badge } from "@/components/ui/badge"

<Badge variant="default">New</Badge>
```

### Avatar
A user avatar component.

**Props:**
- `src`: string
- `alt`: string
- `fallback`: string

**Subcomponents:**
- `AvatarImage`
- `AvatarFallback`

**Usage:**
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>
```

## 📐 Layout Components

### Header
The main navigation header component.

**Props:**
- `className`: string

**Usage:**
```tsx
import { Header } from "@/components/layout/header"

<Header />
```

### Footer
The main footer component.

**Props:**
- `className`: string

**Usage:**
```tsx
import { Footer } from "@/components/layout/footer"

<Footer />
```

### HeroSection
A prominent hero section for landing pages.

**Props:**
- `title`: string
- `description`: string
- `children`: ReactNode

**Usage:**
```tsx
import { HeroSection } from "@/components/layout/hero-section"

<HeroSection 
  title="Welcome to DevHunt"
  description="Discover amazing developer tools"
>
  <Button>Get Started</Button>
</HeroSection>
```

## 🛠️ Product Components

### ProductCard
A card component for displaying product information.

**Props:**
- `product`: Product object
- `onVote`: function
- `onComment`: function

**Usage:**
```tsx
import { ProductCard } from "@/components/product/product-card"

<ProductCard product={product} onVote={handleVote} onComment={handleComment} />
```

### VoteButton
A button component for voting on products.

**Props:**
- `voteType`: "up" | "down"
- `isActive`: boolean
- `count`: number
- `onClick`: function

**Usage:**
```tsx
import { VoteButton } from "@/components/product/vote-button"

<VoteButton 
  voteType="up" 
  isActive={userVote === "up"}
  count={upvoteCount}
  onClick={handleUpvote}
/>
```

### MediaGallery
A gallery component for displaying product media.

**Props:**
- `media`: Media array
- `onMediaClick`: function

**Usage:**
```tsx
import { MediaGallery } from "@/components/product/media-gallery"

<MediaGallery media={productMedia} onMediaClick={handleMediaClick} />
```

### TagBadge
A badge component for displaying product tags.

**Props:**
- `tag`: Tag object
- `onClick`: function

**Usage:**
```tsx
import { TagBadge } from "@/components/product/tag-badge"

<TagBadge tag={tag} onClick={handleTagClick} />
```

## 💬 Comments Components

### CommentsSection
A section component for displaying comments.

**Props:**
- `comments`: Comment array
- `onSubmit`: function

**Usage:**
```tsx
import { CommentsSection } from "@/components/comments/comments-section"

<CommentsSection comments={comments} onSubmit={handleSubmitComment} />
```

### CommentForm
A form component for submitting comments.

**Props:**
- `onSubmit`: function
- `parentId`: string (optional)

**Usage:**
```tsx
import { CommentForm } from "@/components/comments/comment-form"

<CommentForm onSubmit={handleSubmit} />
```

## 📊 Analytics Components

### UserAnalyticsDashboard
A dashboard component for displaying user analytics.

**Props:**
- `analyticsData`: Analytics data object

**Usage:**
```tsx
import { UserAnalyticsDashboard } from "@/components/analytics/user-analytics-dashboard"

<UserAnalyticsDashboard analyticsData={userAnalytics} />
```

### AnalyticsTab
A tab component for analytics data.

**Props:**
- `data`: Analytics data
- `timeRange`: "7d" | "30d" | "90d"

**Usage:**
```tsx
import { AnalyticsTab } from "@/components/analytics/analytics-tab"

<AnalyticsTab data={analyticsData} timeRange="30d" />
```

## 🔐 Authentication Components

### LoginForm
A form component for user login.

**Props:**
- `onSubmit`: function

**Usage:**
```tsx
import { LoginForm } from "@/components/auth/login-form"

<LoginForm onSubmit={handleLogin} />
```

### RegisterForm
A form component for user registration.

**Props:**
- `onSubmit`: function

**Usage:**
```tsx
import { RegisterForm } from "@/components/auth/register-form"

<RegisterForm onSubmit={handleRegister} />
```

## 📦 Collections Components

### CollectionCard
A card component for displaying collections.

**Props:**
- `collection`: Collection object
- `onClick`: function

**Usage:**
```tsx
import { CollectionCard } from "@/components/collections/collection-card"

<CollectionCard collection={collection} onClick={handleCollectionClick} />
```

## 👤 Profile Components

### ProfileSettingsForm
A form component for profile settings.

**Props:**
- `user`: User object
- `onSubmit`: function

**Usage:**
```tsx
import { ProfileSettingsForm } from "@/components/profile/profile-settings-form"

<ProfileSettingsForm user={currentUser} onSubmit={handleProfileUpdate} />
```

## 🎯 User Interaction Components

### FollowButton
A button component for following users.

**Props:**
- `isFollowing`: boolean
- `onClick`: function

**Usage:**
```tsx
import { FollowButton } from "@/components/user/follow-button"

<FollowButton isFollowing={isFollowing} onClick={handleFollow} />
```

## 🎨 Styling and Customization

### Tailwind CSS
All components are styled using Tailwind CSS classes. You can customize the appearance by passing additional className props:

```tsx
<Button className="bg-purple-500 hover:bg-purple-600">
  Custom Styled Button
</Button>
```

### CSS Variables
The application uses CSS variables for consistent theming:

```css
:root {
  --primary: 222 43% 11%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 43% 11%;
}
```

## 🧪 Testing Components

### Unit Testing
Components are tested using Jest and React Testing Library:

```tsx
import { render, screen } from "@testing-library/react"
import { Button } from "@/components/ui/button"

test("renders button with correct text", () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText("Click me")).toBeInTheDocument()
})
```

### Storybook
Components are documented using Storybook for easy visualization and testing of different states and props.

## 🚀 Performance Optimization

### Lazy Loading
Components are optimized for lazy loading to improve initial page load times:

```tsx
import dynamic from "next/dynamic"

const ProductCard = dynamic(() => import("@/components/product/product-card"))
```

### Memoization
Components use React.memo for performance optimization:

```tsx
const ProductCard = React.memo(({ product }) => {
  // Component implementation
})
```

This comprehensive UI component library provides a solid foundation for building consistent, accessible, and performant user interfaces in the DevHunt application.