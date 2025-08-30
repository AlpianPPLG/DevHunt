# API Endpoints Reference

Detailed documentation for all DevHunt API endpoints.

## 📚 Endpoint Categories

### Tools
- [List Tools](#list-tools) - Get a list of all tools
- [Get Tool](#get-tool) - Get details for a specific tool
- [Get Trending Tools](#get-trending-tools) - Get currently trending tools
- [Submit Tool](#submit-tool) - Submit a new tool
- [Vote on Tool](#vote-on-tool) - Vote on a tool
- [Get Tool Comments](#get-tool-comments) - Get comments for a tool
- [Add Tool Comment](#add-tool-comment) - Add a comment to a tool

### Collections
- [List Collections](#list-collections) - Get a list of all collections
- [Get Collection](#get-collection) - Get details for a specific collection
- [Get Collection Tools](#get-collection-tools) - Get tools in a collection

### Users
- [Get User](#get-user) - Get public user profile data
- [Get User Analytics](#get-user-analytics) - Get user analytics data

### Tags
- [List Tags](#list-tags) - Get a list of all tags
- [Get Tag Tools](#get-tag-tools) - Get tools for a specific tag

### Media
- [Get Tool Media](#get-tool-media) - Get media for a tool
- [Add Tool Media](#add-tool-media) - Add media to a tool
- [Delete Tool Media](#delete-tool-media) - Delete media from a tool

### Images
- [Proxy Image](#proxy-image) - Proxy external images

## 🛠️ Tools Endpoints

### List Tools
Get a paginated list of all tools.

**Endpoint**: `GET /tools`  
**Authentication**: Optional  
**Permissions**: Read

#### Parameters
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number | 1 |
| `limit` | integer | Results per page (max: 100) | 10 |
| `sort` | string | Sort field (`created_at`, `vote_count`, `name`) | `created_at` |
| `order` | string | Sort order (`asc`, `desc`) | `desc` |
| `tag` | string | Filter by tag name | |
| `q` | string | Search query | |
| `category` | string | Filter by category | |

#### Response
```json
{
  "data": [
    {
      "id": "tool-123",
      "name": "Example Tool",
      "tagline": "A great tool for developers",
      "description": "Detailed description of the tool",
      "website_url": "https://example.com",
      "thumbnail_url": "https://example.com/thumbnail.jpg",
      "submitter": {
        "username": "submitter",
        "name": "Submitter Name"
      },
      "vote_count": 42,
      "comment_count": 5,
      "view_count": 1200,
      "created_at": "2023-01-01T12:00:00Z",
      "tags": [
        {"id": 1, "name": "javascript"},
        {"id": 2, "name": "frontend"}
      ]
    }
  ],
  "meta": {
    "total_count": 1250,
    "page": 1,
    "per_page": 10,
    "total_pages": 125
  }
}
```

### Get Tool
Get detailed information about a specific tool.

**Endpoint**: `GET /tools/{id}`  
**Authentication**: Optional  
**Permissions**: Read

#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Tool ID |

#### Response
```json
{
  "data": {
    "id": "tool-123",
    "name": "Example Tool",
    "tagline": "A great tool for developers",
    "description": "Detailed description of the tool",
    "website_url": "https://example.com",
    "thumbnail_url": "https://example.com/thumbnail.jpg",
    "submitter": {
      "username": "submitter",
      "name": "Submitter Name",
      "bio": "Developer and tool creator",
      "avatar_url": "https://example.com/avatar.jpg"
    },
    "vote_count": 42,
    "comment_count": 5,
    "view_count": 1200,
    "created_at": "2023-01-01T12:00:00Z",
    "updated_at": "2023-01-15T14:30:00Z",
    "tags": [
      {"id": 1, "name": "javascript"},
      {"id": 2, "name": "frontend"}
    ],
    "media": [
      {
        "id": "media-1",
        "url": "https://example.com/screenshot.jpg",
        "type": "image",
        "caption": "Main interface"
      }
    ]
  }
}
```

### Get Trending Tools
Get currently trending tools based on recent votes and activity.

**Endpoint**: `GET /tools/trending`  
**Authentication**: Optional  
**Permissions**: Read

#### Parameters
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `limit` | integer | Number of tools to return (max: 50) | 10 |

#### Response
```json
{
  "data": [
    {
      "id": "tool-123",
      "name": "Trending Tool",
      "tagline": "Currently trending",
      "vote_count": 1250,
      "trending_score": 95.5,
      "thumbnail_url": "https://example.com/thumbnail.jpg"
    }
  ]
}
```

### Submit Tool
Submit a new tool to DevHunt.

**Endpoint**: `POST /tools/submit`  
**Authentication**: Required  
**Permissions**: Submit

#### Request Body
```json
{
  "name": "New Tool",
  "tagline": "Brief description",
  "description": "Detailed description",
  "website_url": "https://newtool.com",
  "thumbnail_url": "https://newtool.com/thumbnail.jpg",
  "tags": ["javascript", "frontend", "react"]
}
```

#### Response
```json
{
  "data": {
    "id": "tool-456",
    "name": "New Tool",
    "status": "pending_review",
    "created_at": "2023-01-01T12:00:00Z"
  }
}
```

### Vote on Tool
Vote on a tool (upvote or downvote).

**Endpoint**: `POST /tools/{id}/vote`  
**Authentication**: Required  
**Permissions**: Read/Write

#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Tool ID |

#### Request Body
```json
{
  "vote": "up" // or "down"
}
```

#### Response
```json
{
  "data": {
    "vote_count": 43,
    "user_vote": "up"
  }
}
```

### Get Tool Comments
Get comments for a specific tool.

**Endpoint**: `GET /tools/{id}/comments`  
**Authentication**: Optional  
**Permissions**: Read

#### Parameters
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `id` | string | Tool ID | |
| `page` | integer | Page number | 1 |
| `limit` | integer | Results per page (max: 50) | 10 |

#### Response
```json
{
  "data": [
    {
      "id": "comment-1",
      "content": "Great tool!",
      "author": {
        "username": "user1",
        "name": "User One"
      },
      "created_at": "2023-01-01T12:00:00Z",
      "replies": 2
    }
  ],
  "meta": {
    "total_count": 25,
    "page": 1,
    "per_page": 10,
    "total_pages": 3
  }
}
```

### Add Tool Comment
Add a comment to a tool.

**Endpoint**: `POST /tools/{id}/comments`  
**Authentication**: Required  
**Permissions**: Read/Write

#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Tool ID |

#### Request Body
```json
{
  "content": "This is a great tool!",
  "parent_id": "comment-1" // Optional, for replies
}
```

#### Response
```json
{
  "data": {
    "id": "comment-26",
    "content": "This is a great tool!",
    "author": {
      "username": "current_user",
      "name": "Current User"
    },
    "created_at": "2023-01-01T12:00:00Z"
  }
}
```

## 📦 Collections Endpoints

### List Collections
Get a paginated list of all public collections.

**Endpoint**: `GET /collections`  
**Authentication**: Optional  
**Permissions**: Read

#### Parameters
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number | 1 |
| `limit` | integer | Results per page (max: 50) | 10 |
| `sort` | string | Sort field (`created_at`, `name`) | `created_at` |
| `order` | string | Sort order (`asc`, `desc`) | `desc` |
| `q` | string | Search query | |

#### Response
```json
{
  "data": [
    {
      "id": "collection-1",
      "title": "React Tools",
      "description": "Essential tools for React development",
      "tool_count": 25,
      "creator": {
        "username": "creator",
        "name": "Collection Creator"
      },
      "created_at": "2023-01-01T12:00:00Z"
    }
  ],
  "meta": {
    "total_count": 150,
    "page": 1,
    "per_page": 10,
    "total_pages": 15
  }
}
```

### Get Collection
Get detailed information about a specific collection.

**Endpoint**: `GET /collections/{id}`  
**Authentication**: Optional  
**Permissions**: Read

#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Collection ID |

#### Response
```json
{
  "data": {
    "id": "collection-1",
    "title": "React Tools",
    "description": "Essential tools for React development",
    "tool_count": 25,
    "creator": {
      "username": "creator",
      "name": "Collection Creator",
      "bio": "Frontend developer and tool curator"
    },
    "created_at": "2023-01-01T12:00:00Z",
    "updated_at": "2023-01-15T14:30:00Z",
    "tags": [
      {"id": 1, "name": "react"},
      {"id": 2, "name": "frontend"}
    ]
  }
}
```

### Get Collection Tools
Get tools in a specific collection.

**Endpoint**: `GET /collections/{id}/products`  
**Authentication**: Optional  
**Permissions**: Read

#### Parameters
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `id` | string | Collection ID | |
| `page` | integer | Page number | 1 |
| `limit` | integer | Results per page (max: 50) | 10 |

#### Response
```json
{
  "data": [
    {
      "id": "tool-123",
      "name": "Example Tool",
      "tagline": "A great tool for developers",
      "thumbnail_url": "https://example.com/thumbnail.jpg",
      "position": 1
    }
  ],
  "meta": {
    "total_count": 25,
    "page": 1,
    "per_page": 10,
    "total_pages": 3
  }
}
```

## 👤 Users Endpoints

### Get User
Get public profile information for a user.

**Endpoint**: `GET /users/{username}`  
**Authentication**: Optional  
**Permissions**: Read

#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `username` | string | Username |

#### Response
```json
{
  "data": {
    "username": "example_user",
    "name": "Example User",
    "bio": "Developer and tool creator",
    "avatar_url": "https://example.com/avatar.jpg",
    "location": "San Francisco, CA",
    "website": "https://example.com",
    "tool_count": 15,
    "follower_count": 1250,
    "following_count": 250,
    "created_at": "2022-01-01T12:00:00Z"
  }
}
```

### Get User Analytics
Get analytics data for a user's tools.

**Endpoint**: `GET /users/{username}/analytics`  
**Authentication**: Required (user's own data) or Public (if user has public analytics)  
**Permissions**: Read

#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `username` | string | Username |

#### Response
```json
{
  "data": {
    "user": {
      "id": "user-123",
      "name": "Example User",
      "username": "example_user"
    },
    "overview": {
      "total_products": 15,
      "total_votes_received": 1250,
      "total_comments_received": 150,
      "total_views_received": 25000,
      "engagement_rate": 5.6
    },
    "product_performance": [
      {
        "id": "tool-123",
        "name": "Popular Tool",
        "performance_score": 8.5,
        "total_votes": 500,
        "total_comments": 50,
        "total_views": 10000
      }
    ],
    "growth_metrics": {
      "products_this_month": 2,
      "products_this_week": 0
    }
  }
}
```

## 🏷️ Tags Endpoints

### List Tags
Get a list of all available tags.

**Endpoint**: `GET /tags`  
**Authentication**: Optional  
**Permissions**: Read

#### Parameters
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number | 1 |
| `limit` | integer | Results per page (max: 100) | 50 |
| `sort` | string | Sort field (`name`, `tool_count`) | `name` |
| `order` | string | Sort order (`asc`, `desc`) | `asc` |

#### Response
```json
{
  "data": [
    {
      "id": 1,
      "name": "javascript",
      "tool_count": 1250
    }
  ],
  "meta": {
    "total_count": 500,
    "page": 1,
    "per_page": 50,
    "total_pages": 10
  }
}
```

### Get Tag Tools
Get tools associated with a specific tag.

**Endpoint**: `GET /tags/{name}`  
**Authentication**: Optional  
**Permissions**: Read

#### Parameters
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `name` | string | Tag name | |
| `page` | integer | Page number | 1 |
| `limit` | integer | Results per page (max: 50) | 10 |
| `sort` | string | Sort field (`created_at`, `vote_count`) | `created_at` |
| `order` | string | Sort order (`asc`, `desc`) | `desc` |

#### Response
```json
{
  "data": [
    {
      "id": "tool-123",
      "name": "Example Tool",
      "tagline": "A great tool for developers",
      "vote_count": 42,
      "thumbnail_url": "https://example.com/thumbnail.jpg"
    }
  ],
  "meta": {
    "total_count": 1250,
    "page": 1,
    "per_page": 10,
    "total_pages": 125
  }
}
```

## 🖼️ Media Endpoints

### Get Tool Media
Get media associated with a specific tool.

**Endpoint**: `GET /products/{id}/media`  
**Authentication**: Optional  
**Permissions**: Read

#### Parameters
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `id` | string | Tool ID | |
| `page` | integer | Page number | 1 |
| `limit` | integer | Results per page (max: 50) | 10 |

#### Response
```json
{
  "data": [
    {
      "id": "media-1",
      "url": "https://example.com/screenshot.jpg",
      "type": "image",
      "caption": "Main interface",
      "created_at": "2023-01-01T12:00:00Z"
    }
  ],
  "meta": {
    "total_count": 5,
    "page": 1,
    "per_page": 10,
    "total_pages": 1
  }
}
```

### Add Tool Media
Add media to a specific tool.

**Endpoint**: `POST /products/{id}/media`  
**Authentication**: Required (tool owner)  
**Permissions**: Read/Write

#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Tool ID |

#### Request Body
```json
{
  "url": "https://example.com/new-screenshot.jpg",
  "type": "image",
  "caption": "New feature screenshot"
}
```

#### Response
```json
{
  "data": {
    "id": "media-6",
    "url": "https://example.com/new-screenshot.jpg",
    "type": "image",
    "caption": "New feature screenshot",
    "created_at": "2023-01-01T12:00:00Z"
  }
}
```

### Delete Tool Media
Delete media from a specific tool.

**Endpoint**: `DELETE /products/{id}/media/{mediaId}`  
**Authentication**: Required (tool owner)  
**Permissions**: Read/Write

#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Tool ID |
| `mediaId` | string | Media ID |

#### Response
```json
{
  "data": {
    "message": "Media deleted successfully"
  }
}
```

## 🌐 Images Endpoints

### Proxy Image
Proxy external images to bypass CORS restrictions.

**Endpoint**: `GET /images/proxy`  
**Authentication**: Optional  
**Permissions**: Read

#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string | Encoded image URL |

#### Response
Returns the image content with appropriate headers.

## 📡 Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "name",
      "reason": "Name is required"
    }
  }
}
```

### 401 Unauthorized
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### 403 Forbidden
```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 429 Too Many Requests
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded"
  }
}
```

### 500 Internal Server Error
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

## 📈 Rate Limits

### Free Tier
- 1,000 requests per day
- 100 requests per hour

### Premium Tier
- 10,000 requests per day
- 1,000 requests per hour

### Rate Limit Headers
All responses include:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 986
X-RateLimit-Reset: 1628607246
```

This comprehensive endpoint reference provides all the information you need to integrate with the DevHunt API. For implementation examples and best practices, see our [API Guide](../guides/api.md).