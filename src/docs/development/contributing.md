# Contributing to DevHunt

Thank you for your interest in contributing to DevHunt! This guide will help you understand how to contribute effectively to the project.

## 🎯 Welcome Contributors

DevHunt is an open-source project that welcomes contributions from developers of all skill levels. Whether you're a seasoned developer or new to open source, there are many ways you can help improve DevHunt.

### Ways to Contribute
- **Code Contributions**: Fix bugs, add features, improve performance
- **Documentation**: Improve docs, write guides, fix typos
- **Testing**: Report bugs, write tests, improve test coverage
- **Design**: Improve UI/UX, create mockups, enhance accessibility
- **Community**: Answer questions, help other users, spread the word

## 🚀 Getting Started

### Prerequisites
Before you start contributing, ensure you have:
- **Git** installed on your system
- **Node.js 18+** installed
- **MySQL 8.0+** installed
- A **GitHub account**
- Basic knowledge of **React** and **TypeScript**

### Setting Up Your Development Environment

1. **Fork the Repository**
   - Visit the [DevHunt repository](https://github.com/devhunt/devhunt)
   - Click the "Fork" button in the top right corner
   - This creates your own copy of the repository

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/devhunt.git
   cd devhunt
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/devhunt/devhunt.git
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Set Up Database**
   ```sql
   CREATE DATABASE devhunt_db;
   ```
   ```bash
   mysql -u your_username -p devhunt_db < src/scripts/03-enhanced-schema.sql
   mysql -u your_username -p devhunt_db < src/scripts/04-analytics-schema.sql
   ```

6. **Configure Environment Variables**
   Create a `.env.local` file:
   ```env
   DATABASE_URL=mysql://username:password@localhost:3306/devhunt_db
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

7. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🛠️ Development Workflow

### Branching Strategy
We follow the GitHub Flow branching strategy:

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, well-documented code
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add feature: brief description of changes"
   ```

4. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Visit your fork on GitHub
   - Click "Compare & pull request"
   - Fill out the PR template
   - Submit your pull request

### Commit Message Guidelines
We follow conventional commit messages:

```
type(scope): brief description

Detailed description of the changes (optional)

Fixes #123 (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(products): add media gallery component

- Implement MediaGallery component for product pages
- Add support for images, videos, and GIFs
- Include lightbox viewing functionality

Closes #456
```

```
fix(auth): resolve login redirect issue

- Fix infinite redirect loop after login
- Update session handling logic
- Add proper error handling

Fixes #789
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test:watch src/components/product/product-card.test.tsx
```

### Writing Tests
- Use Jest for unit tests
- Use React Testing Library for component tests
- Use Cypress for end-to-end tests
- Aim for high test coverage for new features
- Test both happy paths and error cases

### Test Structure
```tsx
// Example component test
import { render, screen } from "@testing-library/react"
import { ProductCard } from "@/components/product/product-card"

describe("ProductCard", () => {
  const mockProduct = {
    id: "1",
    name: "Test Product",
    tagline: "A test product",
    thumbnail_url: "https://example.com/image.jpg",
    vote_count: { up: 10, down: 2 },
    comment_count: 5
  }

  it("renders product name and tagline", () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText("Test Product")).toBeInTheDocument()
    expect(screen.getByText("A test product")).toBeInTheDocument()
  })

  it("displays correct vote count", () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText("10")).toBeInTheDocument()
  })
})
```

## 📝 Documentation

### Writing Documentation
- Use clear, concise language
- Include code examples where appropriate
- Follow the existing documentation style
- Update documentation when making code changes
- Add new documentation for new features

### Documentation Structure
```
docs/
├── getting-started/
│   ├── introduction.md
│   ├── quick-start.md
│   └── installation.md
├── guides/
│   ├── submitting-tools.md
│   ├── collections.md
│   └── ...
├── api/
│   ├── authentication.md
│   ├── endpoints.md
│   └── ...
├── components/
│   ├── ui-components.md
│   └── ...
├── development/
│   ├── architecture.md
│   ├── contributing.md
│   └── ...
└── analytics/
    ├── overview.md
    └── ...
```

## 🎨 Code Style and Standards

### TypeScript
- Use strict TypeScript mode
- Define interfaces for props and state
- Use generics where appropriate
- Enable strict null checks

### React
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for prop validation
- Implement proper error boundaries

### Styling
- Use Tailwind CSS utility classes
- Follow existing class naming conventions
- Use consistent spacing and layout
- Implement responsive design

### Code Quality
- Follow ESLint rules
- Maintain consistent code formatting
- Write self-documenting code
- Use meaningful variable and function names

## 🐛 Reporting Bugs

### Before Submitting a Bug Report
- Check existing issues to avoid duplicates
- Try to reproduce the issue on the latest version
- Gather relevant information (browser, OS, steps to reproduce)

### Submitting a Bug Report
1. Visit the [Issues page](https://github.com/devhunt/devhunt/issues)
2. Click "New Issue"
3. Select the bug report template
4. Fill in all required information:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment information
   - Screenshots if applicable

### Example Bug Report
```
Title: Product submission form fails with external Pinterest images

Description:
When submitting a new product with a Pinterest image URL, the form fails with a validation error.

Steps to Reproduce:
1. Navigate to /submit
2. Fill in product details
3. Enter a Pinterest image URL (e.g., https://pin.it/xyz123)
4. Click "Submit"
5. Observe validation error

Expected Behavior:
Product should be submitted successfully with Pinterest image

Actual Behavior:
Form shows "Invalid image URL" error

Environment:
- Browser: Chrome 98.0.4758.102
- OS: macOS 12.2.1
- DevHunt Version: 1.2.3

Additional Context:
The issue seems to be related to Pinterest's URL structure. Direct image URLs work fine.
```

## 💡 Suggesting Features

### Before Submitting a Feature Request
- Check existing issues and feature requests
- Consider if the feature aligns with DevHunt's goals
- Think about implementation complexity

### Submitting a Feature Request
1. Visit the [Issues page](https://github.com/devhunt/devhunt/issues)
2. Click "New Issue"
3. Select the feature request template
4. Fill in all required information:
   - Clear title
   - Detailed description
   - Use cases and benefits
   - Potential implementation approach
   - Alternatives considered

### Example Feature Request
```
Title: Add dark mode toggle to user preferences

Description:
Add a dark mode toggle to user profile settings that persists across sessions.

Use Cases:
- Users who prefer dark interfaces
- Reduced eye strain in low-light environments
- Battery savings on OLED screens

Benefits:
- Improved user experience
- Better accessibility
- Modern UI trend compliance

Implementation Approach:
- Add dark mode toggle to profile settings
- Store preference in user database
- Implement CSS variables for theme switching
- Use next-themes library for Next.js integration

Alternatives:
- Browser-level dark mode detection
- Time-based automatic switching
```

## 🔄 Pull Request Process

### Before Submitting a Pull Request
- Ensure your code follows the style guide
- Run all tests and ensure they pass
- Update documentation if needed
- Squash related commits
- Write a clear, descriptive PR title

### Pull Request Template
```markdown
## Description
Brief description of the changes and why they were made.

## Related Issue
Fixes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have made corresponding changes to documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective
- [ ] New and existing unit tests pass locally
```

### Code Review Process
1. Automated checks run on all PRs
2. Maintainers review the code
3. Feedback is provided within 48 hours
4. Address feedback and make requested changes
5. PR is merged once approved

## 🤝 Community Guidelines

### Code of Conduct
We follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/). By participating, you are expected to uphold this code.

### Respectful Communication
- Be kind and respectful to all contributors
- Provide constructive feedback
- Focus on the code, not the person
- Welcome newcomers and help them get started

### Inclusive Language
- Use gender-neutral terms
- Avoid jargon that might exclude newcomers
- Be mindful of cultural differences
- Use clear, accessible language

## 🎉 Recognition

### Contributor Benefits
- Your name in the contributors list
- GitHub contributor badge
- Early access to new features
- Invitation to contributor community

### Highlighting Contributions
- Feature contributions in release notes
- Spotlight significant contributions
- Thank contributors in community updates
- Recognize consistent contributors

## 🆘 Getting Help

### Communication Channels
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and community discussion
- **Discord**: For real-time chat with contributors
- **Email**: For private inquiries (contributors@devhunt.io)

### Mentorship Program
New contributors can request mentorship from experienced contributors:
- Pair programming sessions
- Code review guidance
- Project architecture overview
- Best practices training

## 📈 Contribution Metrics

### Tracking Your Contributions
- GitHub contribution graph
- Pull request history
- Issue participation
- Documentation contributions

### Community Impact
- Lines of code contributed
- Bugs fixed
- Features implemented
- Documentation improved

Thank you for contributing to DevHunt! Your efforts help make this platform better for developers worldwide.