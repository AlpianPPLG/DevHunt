# DevHunt - Developer Tools Discovery Platform

A modern platform for developers to discover, share, and discuss amazing developer tools, libraries, and projects.

## 🚀 Features

- **Product Discovery**: Browse and discover developer tools
- **User Submissions**: Submit new tools with rich media support
- **Voting System**: Upvote your favorite tools
- **Comments & Discussion**: Engage with the community
- **Media Gallery**: Support for images, videos, GIFs, and logos
- **External Image Support**: Pinterest, Imgur, and other external image URLs
- **Responsive Design**: Modern UI with dark theme support

## 🖼️ Image Handling System

### External Image Support

DevHunt now supports external image URLs from various platforms including:

- **Pinterest**: Direct image URLs (e.g., `https://i.pinimg.com/originals/...`)
- **Imgur**: Direct image URLs
- **GitHub**: Repository images and logos
- **Any external image URL**: Automatically handled by the proxy system

### How It Works

1. **Proxy API**: External images are fetched through `/api/images/proxy` to bypass CORS restrictions
2. **Automatic Detection**: The system automatically detects external URLs and routes them through the proxy
3. **Caching**: Images are cached for 24 hours to improve performance
4. **Fallback Handling**: Graceful fallbacks when images fail to load

### Using Pinterest Images

Instead of using `https://pin.it/3FjHo9YqN`, use the direct image URL:

```
❌ Don't use: https://pin.it/3FjHo9YqN
✅ Use instead: https://i.pinimg.com/originals/actual-image.jpg
```

To get the direct URL from Pinterest:
1. Right-click on the image
2. Select "Copy image address"
3. Use that URL in the thumbnail field

## 🛠️ Installation

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devhunt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   ```bash
   # Run the enhanced database migration
   mysql -u your_username -p < pinterest_fix.sql
   ```

4. **Environment Variables**
   Create a `.env.local` file:
   ```env
   DATABASE_URL=mysql://username:password@localhost:3306/devhunt_db
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

### Core Tables

- **products**: Main product information including thumbnail URLs
- **product_media**: Rich media gallery for products
- **users**: User accounts and profiles
- **tags**: Product categorization
- **votes**: User voting system
- **comments**: Discussion threads

### Media Support

The `product_media` table supports:
- **Images**: JPG, PNG, GIF, WebP
- **Videos**: MP4, WebM, OGV
- **Logos**: Product branding images
- **External URLs**: Pinterest, Imgur, etc.

## 🔧 API Endpoints

### Image Proxy
```
GET /api/images/proxy?url={encoded_image_url}
```
Handles external images and serves them to the frontend, bypassing CORS restrictions.

### Product Media
```
GET /api/products/{id}/media
POST /api/products/{id}/media
DELETE /api/products/{id}/media/{mediaId}
```
Manage product media gallery including external images.

### Products
```
GET /api/products
POST /api/products/submit
GET /api/products/{id}
```
Product management and submission.

## 🎨 Components

### ThumbnailImage
Enhanced component that automatically handles external images through the proxy API.

**Features:**
- Automatic external URL detection
- Proxy API integration
- Loading states and fallbacks
- External link indicators

### MediaGallery
Full-featured media gallery with support for external images.

**Features:**
- Multiple media types
- Thumbnail navigation
- Modal view
- External image support

### MediaUpload
Upload interface for adding media to products.

**Features:**
- URL-based uploads
- Image previews
- Multiple media types
- Validation and error handling

## 🧪 Testing

Run the test script to verify the thumbnail system:

```bash
mysql -u your_username -p < test_thumbnails.sql
```

This will:
- Verify table structure
- Check existing products
- Test external URL handling
- Provide recommendations

## 🔍 Troubleshooting

### Images Not Loading

1. **Check URL Format**: Ensure you're using direct image URLs, not page URLs
2. **Verify Proxy API**: Check if `/api/images/proxy` is accessible
3. **Database Connection**: Ensure the database is running and accessible
4. **CORS Issues**: The proxy API should handle these automatically

### Pinterest URLs

- **Problem**: `https://pin.it/...` links don't work
- **Solution**: Use direct image URLs from Pinterest
- **How to get**: Right-click image → Copy image address

### Performance Issues

- **Image Caching**: Images are cached for 24 hours
- **Lazy Loading**: Images load only when needed
- **Optimization**: Consider using WebP format for better compression

## 🚀 Deployment

### Production Considerations

1. **Image Caching**: Configure CDN for better performance
2. **Rate Limiting**: Implement rate limiting for the proxy API
3. **Security**: Validate image URLs and implement size limits
4. **Monitoring**: Monitor proxy API usage and performance

### Environment Variables

```env
# Production
NODE_ENV=production
DATABASE_URL=mysql://username:password@host:port/database
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://yourdomain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section
2. Run the test script
3. Check browser console for errors
4. Verify database connectivity
5. Open an issue with detailed information

---

**Note**: The image proxy system is designed to handle external images safely and efficiently. All images are fetched server-side and served with proper headers to ensure compatibility across different platforms.
