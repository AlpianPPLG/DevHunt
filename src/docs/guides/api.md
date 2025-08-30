# Using the DevHunt API

Integrate DevHunt data into your applications using our comprehensive API.

## 🚀 Getting Started

The DevHunt API allows you to programmatically access data from our platform, enabling you to build integrations, dashboards, or custom applications that leverage our developer tools database.

### Base URL
```
https://api.devhunt.io/v1
```

### API Versions
- **v1**: Current stable version
- **v2**: Coming soon with additional features

## 🔐 Authentication

All API requests must be authenticated using an API key. This key should be included in the Authorization header using the Bearer authentication scheme.

### Generating an API Key
1. Log in to your DevHunt account
2. Navigate to Settings > API Keys
3. Click "Generate New Key"
4. Copy and securely store your API key

### Making Authenticated Requests
```bash
curl -X GET "https://api.devhunt.io/v1/tools" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Security Best Practices
- Never expose your API key in client-side code
- Don't commit your API key to version control
- Use environment variables to store your key
- Rotate your keys periodically for enhanced security
- Create separate keys for different applications

## 📡 Rate Limits

To ensure API stability and fair usage, we implement rate limiting:

### Free Tier
- 1,000 requests per day
- 100 requests per hour
- Rate limit headers included in responses

### Premium Tier
- 10,000 requests per day
- 1,000 requests per hour
- Priority access during high traffic

### Rate Limit Headers
All responses include rate limit information:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 986
X-RateLimit-Reset: 1628607246
```

### Handling Rate Limits
If you exceed your rate limit, requests will return a 429 Too Many Requests response. Implement proper error handling and consider adding exponential backoff to your integration.

## 🛠️ API Endpoints

### Tools Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/tools` | GET | List all tools with pagination |
| `/tools/:id` | GET | Get details for a specific tool |
| `/tools/trending` | GET | Get currently trending tools |
| `/tools/submit` | POST | Submit a new tool |
| `/tools/:id/vote` | POST | Vote on a tool |
| `/tools/:id/comments` | GET, POST | Get or add comments to a tool |

### Collections Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/collections` | GET | List all public collections |
| `/collections/:id` | GET | Get details for a specific collection |
| `/collections/:id/products` | GET | Get tools in a collection |

### Users Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/users/:username` | GET | Get public user profile data |
| `/users/:username/analytics` | GET | Get user analytics data |

### Tags Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/tags` | GET | List all available tags |
| `/tags/:name` | GET | Get tools for a specific tag |

## 📥 Request Parameters

### Pagination
All list endpoints support pagination:
- `page`: Page number (default: 1)
- `limit`: Results per page (max: 100, default: 10)

### Sorting
- `sort`: Field to sort by (e.g., `created_at`, `vote_count`)
- `order`: Sort order (`asc` or `desc`)

### Filtering
- `tag`: Filter by tag name
- `q`: Search query string
- `category`: Filter by category

### Example Request
```bash
curl -X GET "https://api.devhunt.io/v1/tools?tag=react&sort=vote_count&order=desc&page=1&limit=20" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 📤 Response Format

All API responses follow a consistent JSON format:

### Success Response
```json
{
  "data": {
    // Resource data
  },
  "meta": {
    // Metadata about the response
  }
}
```

### Error Response
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Additional error details
    }
  }
}
```

## 🛠️ Example Responses

### Tool List Response
```json
{
  "data": [
    {
      "id": "tool-1-uuid",
      "name": "ShadcnUI",
      "tagline": "Beautifully designed components built with Radix UI and Tailwind CSS",
      "description": "Accessible and customizable components that you can copy and paste into your apps.",
      "website_url": "https://ui.shadcn.com",
      "thumbnail_url": "https://ui.shadcn.com/og.jpg",
      "submitter": {
        "username": "shadcn",
        "name": "Shadcn",
        "avatar_url": "https://github.com/shadcn.png"
      },
      "vote_count": 1250,
      "created_at": "2023-03-15T10:30:00Z",
      "tags": [
        {"id": 1, "name": "ui-components"},
        {"id": 2, "name": "react"},
        {"id": 3, "name": "tailwindcss"}
      ]
    }
  ],
  "meta": {
    "total_count": 458,
    "page": 1,
    "per_page": 10,
    "total_pages": 46
  }
}
```

### Single Tool Response
```json
{
  "data": {
    "id": "tool-1-uuid",
    "name": "ShadcnUI",
    "tagline": "Beautifully designed components built with Radix UI and Tailwind CSS",
    "description": "Accessible and customizable components that you can copy and paste into your apps.",
    "website_url": "https://ui.shadcn.com",
    "thumbnail_url": "https://ui.shadcn.com/og.jpg",
    "submitter": {
      "username": "shadcn",
      "name": "Shadcn",
      "avatar_url": "https://github.com/shadcn.png",
      "bio": "Designer, developer, and creator of shadcn/ui."
    },
    "vote_count": 1250,
    "comment_count": 42,
    "view_count": 15420,
    "created_at": "2023-03-15T10:30:00Z",
    "updated_at": "2023-08-20T14:22:00Z",
    "tags": [
      {"id": 1, "name": "ui-components"},
      {"id": 2, "name": "react"},
      {"id": 3, "name": "tailwindcss"}
    ],
    "media": [
      {
        "id": "media-1",
        "url": "https://ui.shadcn.com/demo.png",
        "type": "image",
        "caption": "Demo of shadcn/ui components"
      }
    ]
  }
}
```

## 💻 Code Examples

### JavaScript/Node.js
```javascript
// Fetch trending tools from DevHunt API
async function getTrendingTools() {
  const response = await fetch(
    'https://api.devhunt.io/v1/tools/trending',
    {
      headers: {
        'Authorization': `Bearer ${process.env.DEVHUNT_API_KEY}`
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch trending tools');
  }
  
  return response.json();
}

// Submit a new tool
async function submitTool(toolData) {
  const response = await fetch(
    'https://api.devhunt.io/v1/tools/submit',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEVHUNT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toolData)
    }
  );
  
  return response.json();
}
```

### Python
```python
import requests
import os

def get_trending_tools():
    api_key = os.environ.get("DEVHUNT_API_KEY")
    
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    response = requests.get(
        "https://api.devhunt.io/v1/tools/trending",
        headers=headers
    )
    
    response.raise_for_status()
    return response.json()

def search_tools(query, tag=None):
    api_key = os.environ.get("DEVHUNT_API_KEY")
    
    params = {"q": query}
    if tag:
        params["tag"] = tag
    
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    response = requests.get(
        "https://api.devhunt.io/v1/tools",
        headers=headers,
        params=params
    )
    
    response.raise_for_status()
    return response.json()
```

### Ruby
```ruby
require 'net/http'
require 'json'

class DevHuntAPI
  BASE_URL = 'https://api.devhunt.io/v1'
  
  def initialize(api_key)
    @api_key = api_key
  end
  
  def get_trending_tools
    url = "#{BASE_URL}/tools/trending"
    headers = {
      'Authorization' => "Bearer #{@api_key}"
    }
    
    response = make_request(:get, url, headers)
    JSON.parse(response.body)
  end
  
  def search_tools(query, options = {})
    url = "#{BASE_URL}/tools"
    params = { q: query }.merge(options)
    headers = {
      'Authorization' => "Bearer #{@api_key}"
    }
    
    response = make_request(:get, url, headers, params)
    JSON.parse(response.body)
  end
  
  private
  
  def make_request(method, url, headers = {}, params = {})
    uri = URI(url)
    uri.query = URI.encode_www_form(params) if params.any?
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = case method
              when :get
                Net::HTTP::Get.new(uri)
              end
    
    headers.each { |key, value| request[key] = value }
    
    http.request(request)
  end
end
```

## 🧪 Best Practices

### Caching
Implement client-side caching to reduce API calls and improve performance:
```javascript
// Example caching header usage
if (response.headers.has('ETag')) {
  localStorage.setItem(
    'cache-etag', 
    response.headers.get('ETag')
  );
}
```

### Error Handling
Implement robust error handling for different HTTP status codes:
```javascript
// Example error handling
if (!response.ok) {
  if (response.status === 429) {
    // Implement backoff strategy
  } else if (response.status === 401) {
    // Handle authentication errors
  }
}
```

### Pagination
Always use pagination parameters to limit response size:
```javascript
// Example pagination implementation
async function fetchAllTools() {
  let page = 1;
  let allTools = [];
  let hasMore = true;
  
  while (hasMore) {
    const response = await fetch(
      `/v1/tools?page=${page}&limit=100`
    );
    const data = await response.json();
    allTools = [...allTools, ...data.data];
    
    hasMore = page < data.meta.total_pages;
    page++;
  }
  
  return allTools;
}
```

### Filtering
Use query parameters to filter results on the server side:
```javascript
// Instead of this:
const allTools = await fetch('/v1/tools');
const jsTools = allTools.filter(
  tool => tool.tags.includes('javascript')
);

// Do this:
const jsTools = await fetch(
  '/v1/tools?tag=javascript'
);
```

## 🚫 Common Errors

### HTTP Status Codes
- **200**: Success
- **400**: Bad Request - Check your parameters
- **401**: Unauthorized - Invalid or missing API key
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource doesn't exist
- **429**: Too Many Requests - Rate limit exceeded
- **500**: Internal Server Error - Something went wrong on our end

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request parameters are invalid",
    "details": {
      "field": "name",
      "reason": "Name is required"
    }
  }
}
```

## 📈 SDKs and Libraries

### Official SDKs
We offer official SDKs for popular languages:
- **JavaScript/TypeScript**: [@devhunt/api-client](https://npmjs.com/package/@devhunt/api-client)
- **Python**: [devhunt-api](https://pypi.org/project/devhunt-api/)
- **Ruby**: [devhunt_api](https://rubygems.org/gems/devhunt_api)

### Installation
```bash
# JavaScript
npm install @devhunt/api-client

# Python
pip install devhunt-api

# Ruby
gem install devhunt_api
```

### Usage Example (JavaScript)
```javascript
import { DevHuntClient } from '@devhunt/api-client';

const client = new DevHuntClient({
  apiKey: process.env.DEVHUNT_API_KEY
});

const tools = await client.tools.list({
  tag: 'react',
  limit: 20
});
```

## 🤝 Support and Feedback

### Getting Help
- Check our [API Reference](../api/endpoints.md) for detailed endpoint documentation
- Join our [Discord community](https://discord.gg/devhunt) for real-time assistance
- Contact support at api-support@devhunt.io for integration help

### Reporting Issues
- Open issues on our [GitHub repository](https://github.com/devhunt/api)
- Provide detailed information about the problem
- Include example requests and responses
- Mention your API key tier (free/premium)

### Feature Requests
We're constantly improving our API. To request new features:
- Submit feature requests through our feedback form
- Discuss ideas in our Discord community
- Contribute to our GitHub repository

The DevHunt API provides powerful access to our developer tools database. By following these guidelines and best practices, you can build compelling integrations that enhance the DevHunt experience for yourself and others.