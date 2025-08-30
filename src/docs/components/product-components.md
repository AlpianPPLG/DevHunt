# Product Components

Detailed documentation for components related to product display and interaction in DevHunt.

## 📦 Overview

Product components are responsible for displaying, interacting with, and managing developer tools and products within the DevHunt platform. These components provide a rich, interactive experience for users to discover, evaluate, and engage with developer tools.

## 🎨 Core Product Components

### ProductCard
The primary component for displaying a product summary.

**Location:** `src/components/product/product-card.tsx`

**Props:**
- `product`: Product object containing product details
- `className`: Additional CSS classes
- `showVoteButtons`: Boolean to show/hide vote buttons (default: true)
- `showTags`: Boolean to show/hide tags (default: true)

**Features:**
- Displays product thumbnail, name, and tagline
- Shows vote count and comment count
- Renders associated tags
- Provides links to product detail page
- Responsive design for all screen sizes

**Usage:**
```tsx
import { ProductCard } from "@/components/product/product-card"

<ProductCard 
  product={productData} 
  showVoteButtons={true}
  showTags={true}
/>
```

### ProductFeed
A component for displaying a list of products in a feed format.

**Location:** `src/components/product/product-feed.tsx`

**Props:**
- `products`: Array of product objects
- `loading`: Boolean indicating loading state
- `onLoadMore`: Function to load more products
- `hasMore`: Boolean indicating if more products are available

**Features:**
- Infinite scrolling support
- Loading states and skeletons
- Empty state handling
- Responsive grid layout
- Performance optimized rendering

**Usage:**
```tsx
import { ProductFeed } from "@/components/product/product-feed"

<ProductFeed 
  products={products}
  loading={isLoading}
  onLoadMore={loadMoreProducts}
  hasMore={hasMoreProducts}
/>
```

### ThumbnailImage
A specialized image component for product thumbnails with fallback support.

**Location:** `src/components/product/thumbnail-image.tsx`

**Props:**
- `src`: Image source URL
- `alt`: Alternative text
- `className`: Additional CSS classes
- `priority`: Boolean for Next.js Image priority loading

**Features:**
- Automatic external image proxy handling
- Graceful fallback to placeholder when images fail
- Optimized loading with Next.js Image component
- Support for external image URLs (Pinterest, Imgur, etc.)

**Usage:**
```tsx
import { ThumbnailImage } from "@/components/product/thumbnail-image"

<ThumbnailImage 
  src={product.thumbnail_url}
  alt={product.name}
  priority={true}
/>
```

## ⬆️ Voting Components

### VoteButtons
A container component for both upvote and downvote buttons.

**Location:** `src/components/product/vote-buttons.tsx`

**Props:**
- `productId`: ID of the product
- `initialUpvotes`: Initial upvote count
- `initialDownvotes`: Initial downvote count
- `userVote`: User's current vote ("up", "down", or null)
- `onVote`: Callback function when vote changes

**Features:**
- Visual indication of user's current vote
- Real-time vote count updates
- Loading states during vote submission
- Error handling for vote operations
- Accessible keyboard navigation

**Usage:**
```tsx
import { VoteButtons } from "@/components/product/vote-buttons"

<VoteButtons 
  productId={product.id}
  initialUpvotes={product.vote_count.up}
  initialDownvotes={product.vote_count.down}
  userVote={currentUserVote}
  onVote={handleVote}
/>
```

### VoteButton
Individual vote button component (upvote or downvote).

**Location:** `src/components/product/vote-button.tsx`

**Props:**
- `type`: "up" or "down"
- `count`: Vote count
- `isActive`: Boolean indicating if button is active
- `onClick`: Click handler function
- `disabled`: Boolean to disable button

**Features:**
- Animated feedback on interaction
- Accessible ARIA labels
- Visual distinction between active and inactive states
- Loading spinner during API calls
- Responsive touch targets

**Usage:**
```tsx
import { VoteButton } from "@/components/product/vote-button"

<VoteButton 
  type="up"
  count={upvoteCount}
  isActive={userUpvoted}
  onClick={handleUpvote}
  disabled={isSubmitting}
/>
```

## 🖼️ Media Components

### MediaGallery
A comprehensive gallery component for displaying product media.

**Location:** `src/components/product/media-gallery.tsx`

**Props:**
- `media`: Array of media objects
- `productId`: ID of the product
- `onMediaClick`: Callback when media is clicked
- `className`: Additional CSS classes

**Features:**
- Support for images, videos, and GIFs
- Lightbox modal for detailed viewing
- Thumbnail navigation
- Responsive design
- Keyboard navigation support
- Loading states

**Usage:**
```tsx
import { MediaGallery } from "@/components/product/media-gallery"

<MediaGallery 
  media={product.media}
  productId={product.id}
  onMediaClick={handleMediaClick}
/>
```

### MediaUpload
Component for uploading media to a product.

**Location:** `src/components/product/media-upload.tsx`

**Props:**
- `productId`: ID of the product
- `onUploadComplete`: Callback when upload is complete
- `maxFiles`: Maximum number of files allowed

**Features:**
- Drag and drop file upload
- URL-based media addition
- File type validation
- Progress indicators
- Error handling
- Preview before upload

**Usage:**
```tsx
import { MediaUpload } from "@/components/product/media-upload"

<MediaUpload 
  productId={product.id}
  onUploadComplete={handleUploadComplete}
  maxFiles={5}
/>
```

## 🏷️ Tag Components

### TagBadge
A badge component for displaying individual tags.

**Location:** `src/components/product/tag-badge.tsx`

**Props:**
- `tag`: Tag object
- `onClick`: Click handler function
- `variant`: Badge variant ("default", "secondary", etc.)
- `className`: Additional CSS classes

**Features:**
- Clickable for tag filtering
- Color-coded for visual distinction
- Hover effects
- Accessible keyboard navigation
- Truncated long tag names

**Usage:**
```tsx
import { TagBadge } from "@/components/product/tag-badge"

<TagBadge 
  tag={tag}
  onClick={handleTagClick}
  variant="secondary"
/>
```

### TagFilter
A component for filtering products by tags.

**Location:** `src/components/product/tag-filter.tsx`

**Props:**
- `tags`: Array of available tags
- `selectedTags`: Array of currently selected tag IDs
- `onTagSelect`: Callback when tag selection changes
- `maxTags`: Maximum number of tags to display

**Features:**
- Multi-select tag filtering
- Searchable tag list
- Clear all functionality
- Responsive design
- Keyboard navigation

**Usage:**
```tsx
import { TagFilter } from "@/components/product/tag-filter"

<TagFilter 
  tags={availableTags}
  selectedTags={selectedTagIds}
  onTagSelect={handleTagSelect}
/>
```

## 🔍 Search and Filter Components

### AdvancedSearch
A comprehensive search component with multiple filter options.

**Location:** `src/components/product/advanced-search.tsx`

**Props:**
- `onSearch`: Callback when search parameters change
- `initialFilters`: Initial filter values
- `tagOptions`: Available tags for filtering

**Features:**
- Text search input
- Tag filtering
- Category filtering
- Sorting options
- Saved searches
- Responsive layout

**Usage:**
```tsx
import { AdvancedSearch } from "@/components/product/advanced-search"

<AdvancedSearch 
  onSearch={handleSearch}
  initialFilters={initialFilters}
  tagOptions={tags}
/>
```

### SortSelector
A component for selecting sort order for product listings.

**Location:** `src/components/product/sort-selector.tsx`

**Props:**
- `value`: Current sort value
- `onChange`: Callback when sort selection changes
- `options`: Available sort options

**Features:**
- Dropdown selection interface
- Common sort options (newest, most voted, etc.)
- Custom sort options
- Accessible keyboard navigation
- Responsive design

**Usage:**
```tsx
import { SortSelector } from "@/components/product/sort-selector"

<SortSelector 
  value={sortValue}
  onChange={handleSortChange}
  options={sortOptions}
/>
```

### TrendingHeader
A header component for trending products section.

**Location:** `src/components/product/trending-header.tsx`

**Props:**
- `timeRange`: Current time range ("daily", "weekly", "monthly")
- `onTimeRangeChange`: Callback when time range changes

**Features:**
- Time range selection
- Trending badge
- Responsive design
- Smooth transitions

**Usage:**
```tsx
import { TrendingHeader } from "@/components/product/trending-header"

<TrendingHeader 
  timeRange={currentTimeRange}
  onTimeRangeChange={handleTimeRangeChange}
/>
```

## 📤 Submission Components

### SubmitForm
A comprehensive form for submitting new products.

**Location:** `src/components/product/submit-form.tsx`

**Props:**
- `onSubmit`: Callback when form is submitted
- `initialData`: Initial form data
- `isSubmitting`: Boolean indicating submission state

**Features:**
- Form validation
- Media upload integration
- Tag selection
- Preview functionality
- Progress indicators
- Error handling

**Usage:**
```tsx
import { SubmitForm } from "@/components/product/submit-form"

<SubmitForm 
  onSubmit={handleSubmit}
  isSubmitting={isSubmittingForm}
/>
```

## 📱 Responsive Design

All product components are designed with responsive principles:

### Mobile-First Approach
- Components adapt to small screens first
- Touch-friendly targets (minimum 44px)
- Simplified layouts on mobile
- Progressive enhancement for larger screens

### Breakpoints
- **Small**: 640px and below
- **Medium**: 641px - 1024px
- **Large**: 1025px and above

### Adaptive Features
- Grid layouts adjust based on screen size
- Text sizes scale appropriately
- Interactive elements resize for touch
- Media queries for optimal display

## ♿ Accessibility

Product components follow accessibility best practices:

### ARIA Labels
- Descriptive labels for interactive elements
- Status announcements for dynamic content
- Role attributes for complex components

### Keyboard Navigation
- Full keyboard operability
- Focus management
- Skip links where appropriate
- Logical tab order

### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy
- Alternative text for images
- Live regions for updates

## 🚀 Performance Optimization

### Lazy Loading
- Components load only when needed
- Image lazy loading with Intersection Observer
- Code splitting for large components

### Memoization
- React.memo for performance optimization
- useMemo for expensive calculations
- useCallback for stable function references

### Bundle Optimization
- Tree-shaking for unused code
- Dynamic imports for code splitting
- Minification and compression

## 🧪 Testing

### Unit Tests
- Component rendering tests
- Props validation
- Event handling
- State management

### Integration Tests
- API interaction testing
- Form submission flows
- User interaction scenarios

### Visual Regression
- Storybook for component visualization
- Snapshot testing
- Cross-browser compatibility

## 🛠️ Customization

### Styling
- Tailwind CSS utility classes
- CSS variables for theming
- Component-specific overrides
- Dark mode support

### Extension
- Component composition
- Props for customization
- Slot patterns for flexibility
- Theme provider integration

Product components form the core of the DevHunt user experience, providing intuitive interfaces for discovering, evaluating, and engaging with developer tools. By following the patterns and best practices outlined in this documentation, developers can maintain consistency and quality across the platform.