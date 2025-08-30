# Installation Guide

This guide will help you set up DevHunt locally for development or self-hosting.

## 🛠️ Prerequisites

Before installing DevHunt, ensure you have the following software installed:

### Required Software
- **Node.js 18+** - JavaScript runtime
- **MySQL 8.0+** - Database management system
- **npm or yarn** - Package manager
- **Git** - Version control system

### Recommended Software
- **VS Code** - Code editor with excellent TypeScript/React support
- **MySQL Workbench** - Database management tool
- **Postman** - API testing tool

## 📦 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/devhunt/devhunt.git
cd devhunt
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using pnpm:
```bash
pnpm install
```

### 3. Database Setup

#### Create Database
```sql
CREATE DATABASE devhunt_db;
```

#### Run Database Migrations
```bash
# Run the enhanced database migration
mysql -u your_username -p devhunt_db < src/scripts/03-enhanced-schema.sql

# Run the analytics schema migration
mysql -u your_username -p devhunt_db < src/scripts/04-analytics-schema.sql

# Add downvote support
mysql -u your_username -p devhunt_db < src/scripts/05-add-downvote.sql
```

#### Seed Initial Data (Optional)
```bash
mysql -u your_username -p devhunt_db < src/scripts/02-seed-data.sql
```

### 4. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_URL=mysql://username:password@localhost:3306/devhunt_db

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Optional: SMTP Configuration for Contact Form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional: Analytics Configuration
ANALYTICS_ENABLED=true
ANALYTICS_DEBOUNCE_MS=1000
```

### 5. Run Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your DevHunt instance running.

## 🏗️ Project Structure

```
devhunt/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── lib/              # Utility functions and libraries
│   └── scripts/          # Database scripts
├── public/               # Static assets
├── styles/               # Global styles
├── .env.local            # Environment variables
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## 🔧 Development Workflow

### Code Quality Tools

The project includes several code quality tools:

#### ESLint
```bash
# Check for linting errors
npm run lint

# Fix auto-fixable linting errors
npm run lint:fix
```

#### TypeScript
```bash
# Check for TypeScript errors
npm run type-check
```

### Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🗄️ Database Schema Overview

### Core Tables
- **users** - User accounts and profiles
- **products** - Main product/tool information
- **product_media** - Rich media gallery for products
- **tags** - Product categorization system
- **product_tags** - Many-to-many relationship between products and tags
- **votes** - User voting system (upvotes/downvotes)
- **comments** - Discussion threads
- **collections** - Curated lists of products
- **collection_products** - Many-to-many relationship between collections and products

### Analytics Tables
- **product_views** - Tracking product views
- **product_clicks** - Tracking product clicks
- **user_activity_log** - Comprehensive user activity
- **analytics_summary** - Daily aggregated data
- **product_performance** - Cached performance metrics

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/current` - Get current user
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - List products
- `POST /api/products/submit` - Submit new product
- `GET /api/products/[id]` - Get product details
- `POST /api/products/[id]/vote` - Vote on product
- `POST /api/products/[id]/comments` - Add comment to product

### Media
- `GET /api/products/[id]/media` - Get product media
- `POST /api/products/[id]/media` - Add media to product
- `DELETE /api/products/[id]/media/[mediaId]` - Delete product media

### Images
- `GET /api/images/proxy?url={encoded_image_url}` - Proxy external images

### Analytics
- `GET /api/users/[username]/analytics` - Get user analytics
- `POST /api/products/[id]/track` - Track product views/clicks

## 🎨 Component Architecture

### UI Components
Located in `src/components/ui/`:
- Buttons, cards, dialogs, forms
- Custom components built with Radix UI and Tailwind CSS

### Layout Components
Located in `src/components/layout/`:
- Header, footer, navigation
- Section components for pages

### Feature Components
Located in `src/components/[feature]/`:
- Product components (cards, gallery, voting)
- Comment components
- Analytics components
- User profile components

## 🚀 Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Docker Deployment (Coming Soon)
We're working on Docker support for easier self-hosting.

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 🔍 Troubleshooting

### Common Issues

#### Database Connection Errors
1. Verify your `DATABASE_URL` in `.env.local`
2. Ensure MySQL is running
3. Check that the database exists and is accessible

#### Environment Variables Not Loading
1. Ensure you're using `.env.local` (not `.env`)
2. Restart your development server after changing environment variables

#### Build Errors
1. Check for TypeScript errors with `npm run type-check`
2. Fix linting errors with `npm run lint:fix`

### Performance Optimization
- Use image optimization through Next.js Image component
- Implement proper caching strategies
- Optimize database queries with indexes

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](../development/contributing.md) for details on how to contribute to DevHunt.

## 🆘 Support

If you encounter issues during installation:
1. Check the [FAQ section](../faq.md)
2. Open an issue on our [GitHub repository](https://github.com/devhunt/devhunt)
3. Contact our support team at support@devhunt.io