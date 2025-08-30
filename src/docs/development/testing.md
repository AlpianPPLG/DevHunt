# Testing Guide

Comprehensive guide to testing in the DevHunt codebase.

## 🧪 Testing Philosophy

DevHunt follows a comprehensive testing approach to ensure code quality, reliability, and maintainability. Our testing strategy includes unit tests, integration tests, and end-to-end tests to cover different aspects of the application.

### Testing Principles
- **Test Pyramid**: More unit tests, fewer integration tests, fewer E2E tests
- **Early Testing**: Write tests during development, not after
- **Automated Testing**: All tests run automatically in CI/CD
- **Meaningful Coverage**: Focus on critical paths, not just coverage percentage
- **Fast Feedback**: Tests should run quickly to provide immediate feedback

## 🛠️ Testing Tools and Frameworks

### Unit and Integration Testing
- **Jest**: JavaScript testing framework
- **React Testing Library**: React component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM assertions

### End-to-End Testing
- **Cypress**: End-to-end testing framework
- **Playwright**: Cross-browser testing tool

### Visual Testing
- **Storybook**: Component development and testing environment
- **Chromatic**: Visual regression testing for Storybook

### Performance Testing
- **Lighthouse**: Web performance auditing
- **Web Vitals**: Core web vitals monitoring

### Code Quality
- **ESLint**: Static code analysis
- **TypeScript**: Compile-time type checking

## 📁 Test Organization

### Test Directory Structure
```
__tests__/
├── components/          # Component tests
│   ├── ui/
│   ├── product/
│   ├── analytics/
│   └── ...
├── pages/              # Page component tests
├── api/                # API route tests
├── lib/                # Library function tests
├── integration/        # Integration tests
├── e2e/                # End-to-end tests
└── utils/              # Utility function tests
```

### Component Tests
Located alongside components:
```
src/components/product/
├── product-card.tsx
├── product-card.test.tsx
└── product-card.stories.tsx
```

## 🧪 Unit Testing

### Testing Components
Use React Testing Library for component testing:

```tsx
// product-card.test.tsx
import { render, screen } from "@testing-library/react"
import { ProductCard } from "@/components/product/product-card"
import { mockProduct } from "@/__tests__/mocks/products"

describe("ProductCard", () => {
  it("renders product name and tagline", () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.tagline)).toBeInTheDocument()
  })

  it("displays correct vote count", () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText(mockProduct.vote_count.toString())).toBeInTheDocument()
  })

  it("renders thumbnail image", () => {
    render(<ProductCard product={mockProduct} />)
    
    const image = screen.getByRole("img")
    expect(image).toHaveAttribute("src", mockProduct.thumbnail_url)
    expect(image).toHaveAttribute("alt", mockProduct.name)
  })
})
```

### Testing Hooks
Test custom hooks with React Testing Library:

```tsx
// use-analytics.test.ts
import { renderHook, act } from "@testing-library/react"
import { useAnalytics } from "@/lib/hooks/use-analytics"

describe("useAnalytics", () => {
  it("fetches analytics data", async () => {
    const { result } = renderHook(() => useAnalytics({ username: "testuser" }))
    
    expect(result.current.loading).toBe(true)
    
    // Wait for data to load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeDefined()
  })
})
```

### Testing Utility Functions
Test pure functions with Jest:

```ts
// utils.test.ts
import { formatNumber, slugify } from "@/lib/utils"

describe("formatNumber", () => {
  it("formats numbers with commas", () => {
    expect(formatNumber(1000)).toBe("1,000")
    expect(formatNumber(1000000)).toBe("1,000,000")
  })

  it("handles small numbers", () => {
    expect(formatNumber(100)).toBe("100")
    expect(formatNumber(0)).toBe("0")
  })
})

describe("slugify", () => {
  it("converts text to URL-friendly slugs", () => {
    expect(slugify("Hello World")).toBe("hello-world")
    expect(slugify("React & Next.js")).toBe("react-next-js")
  })
})
```

## 🔗 Integration Testing

### API Route Testing
Test API routes with Jest and Supertest:

```ts
// api/products/route.test.ts
import { GET } from "@/app/api/products/route"
import { mockProducts } from "@/__tests__/mocks/products"

// Mock database functions
jest.mock("@/lib/database", () => ({
  getProducts: jest.fn().mockResolvedValue(mockProducts)
}))

describe("GET /api/products", () => {
  it("returns products list", async () => {
    const response = await GET()
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.data).toEqual(mockProducts)
    expect(data.meta.total_count).toBe(mockProducts.length)
  })

  it("handles pagination parameters", async () => {
    const request = new Request("http://localhost:3000/api/products?page=2&limit=5")
    const response = await GET(request)
    const data = await response.json()
    
    expect(data.meta.page).toBe(2)
    expect(data.meta.per_page).toBe(5)
  })
})
```

### Database Integration Testing
Test database operations:

```ts
// database.test.ts
import { getProducts, createProduct } from "@/lib/database"
import { mockProduct } from "@/__tests__/mocks/products"

describe("Database Operations", () => {
  beforeEach(async () => {
    // Clear test database
    await clearTestDatabase()
  })

  it("creates and retrieves products", async () => {
    // Create product
    const createdProduct = await createProduct(mockProduct)
    expect(createdProduct.id).toBeDefined()
    
    // Retrieve product
    const products = await getProducts()
    expect(products).toContainEqual(
      expect.objectContaining({
        name: mockProduct.name,
        tagline: mockProduct.tagline
      })
    )
  })
})
```

## 🌐 End-to-End Testing

### Cypress Tests
Use Cypress for end-to-end testing:

```js
// cypress/e2e/product-submission.cy.js
describe("Product Submission", () => {
  beforeEach(() => {
    cy.visit("/submit")
    cy.login("testuser@example.com", "password123")
  })

  it("submits a new product successfully", () => {
    cy.get('[data-testid="product-name"]').type("Test Product")
    cy.get('[data-testid="product-tagline"]').type("A test product for developers")
    cy.get('[data-testid="product-description"]').type("Detailed description of the test product")
    cy.get('[data-testid="product-url"]').type("https://testproduct.com")
    cy.get('[data-testid="product-thumbnail"]').type("https://testproduct.com/image.jpg")
    
    cy.get('[data-testid="submit-button"]').click()
    
    cy.url().should("include", "/product/")
    cy.contains("Test Product").should("be.visible")
    cy.contains("Product submitted successfully").should("be.visible")
  })

  it("shows validation errors for incomplete form", () => {
    cy.get('[data-testid="submit-button"]').click()
    
    cy.contains("Name is required").should("be.visible")
    cy.contains("URL is required").should("be.visible")
  })
})
```

### Playwright Tests
Use Playwright for cross-browser testing:

```ts
// tests/product-page.spec.ts
import { test, expect } from "@playwright/test"

test("product page displays correctly", async ({ page }) => {
  await page.goto("/product/test-product-id")
  
  // Check page title
  await expect(page).toHaveTitle(/Test Product/)
  
  // Check product information
  await expect(page.locator("h1")).toContainText("Test Product")
  await expect(page.locator('[data-testid="product-tagline"]')).toContainText("A test product")
  
  // Check voting functionality
  const upvoteButton = page.locator('[data-testid="upvote-button"]')
  await expect(upvoteButton).toContainText("10")
  
  // Test voting
  await upvoteButton.click()
  await expect(upvoteButton).toContainText("11")
})
```

## 🎨 Visual Testing

### Storybook Stories
Create stories for component visualization:

```tsx
// product-card.stories.tsx
import { ProductCard } from "@/components/product/product-card"
import { mockProduct } from "@/__tests__/mocks/products"

export default {
  title: "Components/Product/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered"
  }
}

export const Default = {
  args: {
    product: mockProduct
  }
}

export const WithLongName = {
  args: {
    product: {
      ...mockProduct,
      name: "Very Long Product Name That Might Cause Layout Issues"
    }
  }
}

export const NoThumbnail = {
  args: {
    product: {
      ...mockProduct,
      thumbnail_url: null
    }
  }
}
```

### Chromatic Visual Regression
Configure Chromatic for visual testing:

```js
// .storybook/main.js
module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook"
  ]
}
```

## 📊 Test Coverage

### Coverage Goals
- **Unit Tests**: 80%+ coverage for critical business logic
- **Component Tests**: 70%+ coverage for UI components
- **Integration Tests**: 60%+ coverage for API routes
- **E2E Tests**: 50%+ coverage for critical user flows

### Running Coverage
```bash
# Run tests with coverage
npm run test:coverage

# Open coverage report
npm run test:coverage:open
```

### Coverage Configuration
```json
// jest.config.js
{
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.*"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}
```

## 🚀 Continuous Integration

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run test
      - run: npm run test:e2e
      - run: npm run lint
```

### Pre-commit Hooks
Use Husky for pre-commit testing:

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test && npm run lint"
    }
  }
}
```

## 🐛 Debugging Tests

### Common Issues and Solutions

#### Async Operations
```tsx
// Wrong - test may finish before async operation
it("handles async operation", () => {
  fetchData().then(data => {
    expect(data).toBeDefined()
  })
})

// Correct - return promise or use async/await
it("handles async operation", async () => {
  const data = await fetchData()
  expect(data).toBeDefined()
})
```

#### Component State Updates
```tsx
// Wrong - state update may not be reflected
it("updates component state", () => {
  const { getByRole } = render(<Counter />)
  const button = getByRole("button")
  
  fireEvent.click(button)
  expect(button).toHaveTextContent("1") // May fail
})

// Correct - wrap in act
it("updates component state", () => {
  const { getByRole } = render(<Counter />)
  const button = getByRole("button")
  
  act(() => {
    fireEvent.click(button)
  })
  expect(button).toHaveTextContent("1")
})
```

## 🧼 Test Maintenance

### Keeping Tests Up-to-Date
- Update tests when changing component APIs
- Remove obsolete tests when removing features
- Refactor tests when refactoring code
- Regular test review and cleanup

### Mocking Best Practices
```ts
// Good - specific, focused mocks
jest.mock("@/lib/database", () => ({
  getProducts: jest.fn().mockResolvedValue([
    { id: "1", name: "Product 1" },
    { id: "2", name: "Product 2" }
  ])
}))

// Bad - overly complex mocks
jest.mock("@/lib/database", () => ({
  // Mocking entire database module with complex setup
}))
```

## 📈 Performance Testing

### Web Vitals Monitoring
```tsx
// web-vitals.test.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals"

describe("Web Vitals", () => {
  it("meets performance thresholds", () => {
    // Test performance metrics
    getCLS(console.log)
    getFID(console.log)
    getFCP(console.log)
    getLCP(console.log)
    getTTFB(console.log)
  })
})
```

### Lighthouse CI
```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "staticDistDir": "./out"
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}]
      }
    }
  }
}
```

## 🤝 Test Collaboration

### Team Testing Practices
- Code reviews include test review
- Pair programming for complex test scenarios
- Shared test utilities and helpers
- Regular test refactoring sessions

### Documentation
- Test naming conventions
- Test structure guidelines
- Mocking strategies
- Testing best practices

This comprehensive testing guide ensures that DevHunt maintains high code quality and reliability through systematic testing practices. By following these guidelines, contributors can write effective tests that improve the overall quality of the application.