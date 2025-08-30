# Deployment Guide

Learn how to deploy DevHunt to various hosting platforms and environments.

## 🚀 Deployment Options

DevHunt can be deployed to several hosting platforms. This guide covers the most common deployment scenarios.

### Supported Platforms
- **Vercel** (Recommended)
- **Netlify**
- **AWS**
- **Google Cloud Platform**
- **DigitalOcean**
- **Self-hosted servers**

## ☁️ Vercel Deployment (Recommended)

Vercel is the recommended platform for deploying DevHunt due to its seamless Next.js integration and excellent performance.

### Prerequisites
- A [Vercel account](https://vercel.com)
- A GitHub, GitLab, or Bitbucket account
- A domain name (optional)

### Deployment Steps

#### 1. Connect Repository
1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your DevHunt repository
4. Grant Vercel access to your Git provider if prompted

#### 2. Configure Project
Vercel will automatically detect the Next.js framework. Review the settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### 3. Environment Variables
Add your environment variables in the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
DATABASE_URL=your_production_database_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://yourdomain.com
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

#### 4. Deploy
1. Click "Deploy"
2. Vercel will automatically build and deploy your application
3. Your site will be available at a `.vercel.app` subdomain

#### 5. Custom Domain (Optional)
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Vercel will automatically provision an SSL certificate

### Vercel Features

#### Automatic HTTPS
Vercel automatically provisions and renews SSL certificates for all deployments.

#### Preview Deployments
Every pull request automatically gets a preview deployment URL for testing.

#### Serverless Functions
Next.js API routes are automatically deployed as serverless functions.

#### Global CDN
Vercel's edge network ensures fast global performance.

## 🌐 Netlify Deployment

Netlify is another excellent option for deploying DevHunt.

### Prerequisites
- A [Netlify account](https://netlify.com)
- A GitHub, GitLab, or Bitbucket account

### Deployment Steps

#### 1. Connect Repository
1. Visit [Netlify Dashboard](https://app.netlify.com)
2. Click "New site from Git"
3. Choose your Git provider
4. Select your DevHunt repository

#### 2. Configure Build Settings
Set the following build settings:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Base directory**: Leave empty

#### 3. Environment Variables
Add environment variables in the Netlify dashboard:

1. Go to Site settings > Build & deploy > Environment
2. Add your environment variables:

```
DATABASE_URL=your_production_database_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://yourdomain.netlify.app
```

#### 4. Deploy
Click "Deploy site" to start the deployment process.

## ☁️ AWS Deployment

Deploy DevHunt to AWS using Elastic Beanstalk or ECS.

### Prerequisites
- An [AWS account](https://aws.amazon.com)
- AWS CLI installed and configured
- Docker (for containerized deployment)

### Option 1: Elastic Beanstalk

#### 1. Prepare Application
Create a `Procfile` in your project root:

```
web: npm start
```

#### 2. Create Environment
1. Visit [Elastic Beanstalk Console](https://console.aws.amazon.com/elasticbeanstalk)
2. Click "Create Application"
3. Choose "Node.js" platform
4. Upload your application code

#### 3. Configure Environment Variables
In the Elastic Beanstalk console:
1. Go to Configuration > Software
2. Add environment properties for your variables

### Option 2: ECS with Docker

#### 1. Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### 2. Build and Push to ECR
```bash
# Build image
docker build -t devhunt .

# Tag image
docker tag devhunt:latest your-account.dkr.ecr.region.amazonaws.com/devhunt:latest

# Push to ECR
docker push your-account.dkr.ecr.region.amazonaws.com/devhunt:latest
```

#### 3. Deploy to ECS
1. Create an ECS task definition
2. Create an ECS service
3. Configure load balancer
4. Set environment variables in task definition

## 🐳 Docker Deployment

Deploy DevHunt using Docker for self-hosted environments.

### Prerequisites
- Docker installed
- Docker Compose installed (optional)

### Single Container Deployment

#### 1. Create Dockerfile
```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --gid 1001 --system nodejs
RUN adduser --uid 1001 --system --group nodejs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nodejs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nodejs:nodejs /app/.next/static ./.next/static

USER nodejs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### 2. Update next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // ... other config
}

module.exports = nextConfig
```

#### 3. Build and Run
```bash
# Build image
docker build -t devhunt .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL=your_database_url \
  -e NEXTAUTH_SECRET=your_secret \
  -e NEXTAUTH_URL=http://localhost:3000 \
  devhunt
```

### Docker Compose Deployment

#### 1. Create docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://user:password@db:3306/devhunt_db
      - NEXTAUTH_SECRET=your_secret_key
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=rootpassword
      - MYSQL_DATABASE=devhunt_db
      - MYSQL_USER=devhunt_user
      - MYSQL_PASSWORD=devhunt_password
    volumes:
      - db_data:/var/lib/mysql
      - ./src/scripts/03-enhanced-schema.sql:/docker-entrypoint-initdb.d/1-schema.sql
      - ./src/scripts/04-analytics-schema.sql:/docker-entrypoint-initdb.d/2-analytics.sql
    ports:
      - "3306:3306"
    restart: unless-stopped

volumes:
  db_data:
```

#### 2. Deploy
```bash
docker-compose up -d
```

## 🏢 Self-Hosted Deployment

Deploy DevHunt to your own server or VPS.

### Prerequisites
- A server with Node.js 18+ installed
- MySQL 8.0+ installed
- Nginx or Apache for reverse proxy (optional)
- SSL certificate (Let's Encrypt recommended)

### Deployment Steps

#### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL
sudo apt install mysql-server -y

# Install PM2 for process management
sudo npm install -g pm2
```

#### 2. Database Setup
```bash
# Secure MySQL installation
sudo mysql_secure_installation

# Create database and user
sudo mysql -u root -p
```

```sql
CREATE DATABASE devhunt_db;
CREATE USER 'devhunt_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON devhunt_db.* TO 'devhunt_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Application Deployment
```bash
# Clone repository
git clone https://github.com/yourusername/devhunt.git
cd devhunt

# Install dependencies
npm install

# Run database migrations
mysql -u devhunt_user -p devhunt_db < src/scripts/03-enhanced-schema.sql
mysql -u devhunt_user -p devhunt_db < src/scripts/04-analytics-schema.sql

# Create environment file
cat > .env.production << EOF
DATABASE_URL=mysql://devhunt_user:secure_password@localhost:3306/devhunt_db
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://yourdomain.com
EOF
```

#### 4. Build and Start Application
```bash
# Build for production
npm run build

# Start with PM2
pm2 start npm --name "devhunt" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

#### 5. Nginx Configuration (Optional)
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 6. SSL Setup with Let's Encrypt
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com
```

## 🛡️ Security Considerations

### Environment Variables
Never commit environment variables to version control. Use:
- Vercel/Netlify environment variables
- Docker secrets
- Server environment files (not in repo)

### Database Security
- Use strong database passwords
- Restrict database access to application server only
- Enable SSL for database connections
- Regular backups

### Application Security
- Keep dependencies updated
- Use security headers
- Implement rate limiting
- Validate all user input

## 📈 Performance Optimization

### Caching Strategies
- Enable browser caching headers
- Use Redis for application caching
- Implement CDN for static assets
- Database query caching

### Image Optimization
- Use Next.js Image component
- Implement responsive images
- Compress images before upload
- Use WebP format when possible

### Database Optimization
- Add indexes to frequently queried columns
- Use connection pooling
- Optimize slow queries
- Monitor database performance

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🆘 Troubleshooting

### Common Issues

#### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Ensure environment variables are set

#### Database Connection Errors
- Verify database URL format
- Check database credentials
- Ensure database server is running

#### Runtime Errors
- Check application logs
- Verify environment variables
- Ensure required ports are open

### Monitoring and Logging
- Set up application monitoring (Sentry, etc.)
- Implement structured logging
- Monitor server resources
- Set up alerts for critical issues

## 📊 Monitoring and Analytics

### Application Monitoring
- Error tracking with Sentry
- Performance monitoring with Datadog
- Uptime monitoring with UptimeRobot
- Log aggregation with ELK stack

### User Analytics
- Google Analytics for page views
- Custom analytics for user actions
- Performance metrics tracking
- Conversion funnel analysis

This deployment guide provides comprehensive instructions for deploying DevHunt to various platforms. Choose the option that best fits your requirements and infrastructure.