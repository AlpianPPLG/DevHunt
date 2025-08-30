# API Rate Limits

Understand DevHunt's API rate limiting policies and how to work within them effectively.

## 🚦 Rate Limiting Overview

To ensure fair usage and maintain service quality for all users, the DevHunt API implements rate limiting. These limits prevent any single user or application from overwhelming our servers and degrading the experience for others.

## 📊 Rate Limit Tiers

### Free Tier
- **Daily Limit**: 1,000 requests per day
- **Hourly Limit**: 100 requests per hour
- **Best For**: Individual developers, small projects, testing

### Premium Tier
- **Daily Limit**: 10,000 requests per day
- **Hourly Limit**: 1,000 requests per hour
- **Best For**: Production applications, high-traffic services, businesses

## ⏱️ How Rate Limits Work

### Time Windows
Rate limits are enforced in two time windows:
- **Hourly Window**: Resets every hour on the hour
- **Daily Window**: Resets every day at midnight UTC

### Request Counting
- All authenticated requests count toward your limits
- Some endpoints may have different weighting
- Failed requests (4xx, 5xx) still count toward your limits
- Successful and redirected requests both count

### Per-Key Limits
Each API key has its own rate limit bucket:
- Limits are not shared across keys
- Each application should use its own key
- You can create multiple keys for different purposes

## 📡 Rate Limit Headers

Every API response includes headers that provide information about your current rate limit status:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 986
X-RateLimit-Reset: 1628607246
```

### Header Descriptions

#### X-RateLimit-Limit
The maximum number of requests allowed in the current window.

#### X-RateLimit-Remaining
The number of requests remaining in the current window.

#### X-RateLimit-Reset
The Unix timestamp (in seconds) when the current window resets.

### Example Header Values
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 750
X-RateLimit-Reset: 1628607600
```

This means:
- Your limit is 1,000 requests per day
- You have 750 requests remaining
- Your limit will reset at Unix timestamp 1628607600 (August 10, 2021 7:00:00 PM UTC)

## ⚠️ Rate Limit Responses

When you exceed your rate limit, the API returns a 429 Too Many Requests status code with the following response:

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "details": {
      "limit": 1000,
      "remaining": 0,
      "reset": 1628607600
    }
  }
}
```

## 🛠️ Handling Rate Limits

### Client-Side Strategies

#### Check Headers Before Requests
Monitor your remaining requests and proactively throttle when approaching limits:

```javascript
// Example rate limit checking
async function makeRequest(url) {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });
  
  // Check rate limit headers
  const remaining = response.headers.get('X-RateLimit-Remaining');
  const resetTime = response.headers.get('X-RateLimit-Reset');
  
  if (remaining && parseInt(remaining) < 10) {
    console.warn(`Approaching rate limit. ${remaining} requests remaining.`);
    // Consider delaying subsequent requests
  }
  
  return response;
}
```

#### Exponential Backoff
Implement exponential backoff when you receive a 429 response:

```javascript
async function requestWithBackoff(url, maxRetries = 3) {
  let retries = 0;
  
  while (retries <= maxRetries) {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (response.status === 429) {
        throw new Error('Rate limited');
      }
      
      return response;
    } catch (error) {
      if (error.message === 'Rate limited' && retries < maxRetries) {
        const delay = Math.pow(2, retries) * 1000; // Exponential backoff
        console.log(`Rate limited. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        retries++;
      } else {
        throw error;
      }
    }
  }
}
```

#### Caching Strategies
Reduce API calls by implementing caching:

```javascript
// Simple in-memory cache
const cache = new Map();

async function getCachedData(key, fetchFunction, ttl = 300000) { // 5 minutes TTL
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  
  const data = await fetchFunction();
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
  
  return data;
}
```

### Server-Side Strategies

#### Request Batching
Combine multiple requests into single batch requests where possible:

```javascript
// Instead of multiple individual requests
const tools = await Promise.all([
  fetchTool('tool-1'),
  fetchTool('tool-2'),
  fetchTool('tool-3')
]);

// Use batch endpoints when available
const tools = await fetchTools(['tool-1', 'tool-2', 'tool-3']);
```

#### Efficient Pagination
Use appropriate page sizes to minimize requests:

```javascript
// Less efficient - more requests
const allTools = [];
for (let page = 1; page <= 10; page++) {
  const response = await fetch(`/tools?page=${page}&limit=10`);
  const data = await response.json();
  allTools.push(...data.data);
}

// More efficient - fewer requests with larger pages
const allTools = [];
let page = 1;
let hasMore = true;

while (hasMore) {
  const response = await fetch(`/tools?page=${page}&limit=100`); // Larger page size
  const data = await response.json();
  allTools.push(...data.data);
  hasMore = page < data.meta.total_pages;
  page++;
}
```

## 📈 Monitoring Usage

### Dashboard Analytics
Track your API usage through the DevHunt dashboard:
- View requests per hour/day
- See which endpoints you use most
- Monitor your rate limit consumption
- Set up alerts for unusual activity

### Programmatic Monitoring
Check your usage programmatically:

```javascript
// Check current rate limit status
async function getRateLimitStatus() {
  const response = await fetch('/health', {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });
  
  const data = await response.json();
  return {
    limit: response.headers.get('X-RateLimit-Limit'),
    remaining: response.headers.get('X-RateLimit-Remaining'),
    reset: response.headers.get('X-RateLimit-Reset')
  };
}
```

## 🆙 Upgrading Your Tier

### When to Upgrade
Consider upgrading if you:
- Consistently hit rate limits
- Run production applications
- Need higher reliability
- Want priority support

### Upgrade Process
1. Visit your account settings
2. Navigate to the "Billing" section
3. Select the Premium tier
4. Enter payment information
5. Your limits will update immediately

### Premium Benefits
- 10x higher rate limits
- Priority API access during high traffic
- Enhanced support options
- Additional API features

## 🚫 Abuse Prevention

### Detection Mechanisms
We monitor for abusive patterns including:
- Excessive requests in short time periods
- Automated scraping behavior
- Multiple failed authentication attempts
- Unusual request patterns

### Consequences of Abuse
- Temporary rate limit reductions
- API key suspension
- Account restrictions
- Permanent banning in severe cases

### Responsible Usage
To avoid issues:
- Implement proper rate limiting in your applications
- Use caching to reduce unnecessary requests
- Respect the API and its limitations
- Contact support if you have legitimate high-volume needs

## 🧪 Testing and Development

### Sandbox Environment
For testing rate limit handling:
- Use a separate API key for testing
- Monitor your usage during development
- Test your backoff mechanisms
- Simulate rate limit exceeded scenarios

### Mocking Rate Limits
During development, you can mock rate limit responses:

```javascript
// Mock rate limit exceeded response
const mockRateLimitResponse = {
  status: 429,
  headers: {
    'X-RateLimit-Limit': '1000',
    'X-RateLimit-Remaining': '0',
    'X-RateLimit-Reset': (Math.floor(Date.now() / 1000) + 3600).toString()
  },
  json: () => Promise.resolve({
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Rate limit exceeded. Please try again later.'
    }
  })
};
```

## 📞 Support and Questions

If you have questions about rate limits or need higher limits for legitimate use cases:

1. Check our [API FAQ](../faq.md)
2. Review your usage patterns in the dashboard
3. Contact our support team at api-support@devhunt.io
4. Join our [Discord community](https://discord.gg/devhunt) for real-time assistance

### Requesting Higher Limits
For legitimate high-volume use cases:
- Provide details about your application
- Explain your usage patterns
- Demonstrate responsible API usage
- Consider upgrading to the Premium tier

Rate limiting is designed to ensure fair access to the DevHunt API for all users. By understanding and respecting these limits, you help maintain a reliable service for the entire community.