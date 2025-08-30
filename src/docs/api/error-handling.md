# API Error Handling

Learn how to properly handle errors when working with the DevHunt API.

## 📡 Error Response Format

All DevHunt API errors follow a consistent JSON format to make error handling predictable and straightforward:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Additional error-specific information
    }
  }
}
```

### Error Object Properties

| Property | Type | Description |
|----------|------|-------------|
| `code` | string | Machine-readable error code |
| `message` | string | Human-readable error description |
| `details` | object | Additional context about the error |

## 🚨 HTTP Status Codes

The DevHunt API uses standard HTTP status codes to indicate the success or failure of requests:

### 2xx Success
- **200 OK**: Request successful
- **201 Created**: Resource successfully created
- **204 No Content**: Request successful, no content to return

### 4xx Client Errors
- **400 Bad Request**: Invalid request parameters
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource doesn't exist
- **409 Conflict**: Resource conflict
- **422 Unprocessable Entity**: Validation errors
- **429 Too Many Requests**: Rate limit exceeded

### 5xx Server Errors
- **500 Internal Server Error**: Unexpected server error
- **502 Bad Gateway**: Invalid response from upstream server
- **503 Service Unavailable**: Service temporarily unavailable
- **504 Gateway Timeout**: Upstream server timeout

## 🛠️ Common Error Types

### Authentication Errors

#### 401 Unauthorized
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required",
    "details": {
      "reason": "Missing Authorization header"
    }
  }
}
```

#### 403 Forbidden
```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions",
    "details": {
      "required_permission": "read_write",
      "current_permission": "read_only"
    }
  }
}
```

### Validation Errors

#### 400 Bad Request
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

#### 422 Unprocessable Entity
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "errors": [
        {
          "field": "email",
          "reason": "Invalid email format"
        },
        {
          "field": "password",
          "reason": "Password must be at least 8 characters"
        }
      ]
    }
  }
}
```

### Resource Errors

#### 404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "details": {
      "resource_type": "tool",
      "resource_id": "tool-123"
    }
  }
}
```

#### 409 Conflict
```json
{
  "error": {
    "code": "CONFLICT",
    "message": "Resource already exists",
    "details": {
      "resource_type": "tag",
      "resource_name": "javascript"
    }
  }
}
```

### Rate Limit Errors

#### 429 Too Many Requests
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

### Server Errors

#### 500 Internal Server Error
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "details": {
      "request_id": "req-1234567890"
    }
  }
}
```

## 💻 Implementation Examples

### JavaScript/Fetch

```javascript
async function handleApiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.DEVHUNT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      ...options
    });

    // Handle successful responses
    if (response.ok) {
      return await response.json();
    }

    // Handle error responses
    const errorData = await response.json();
    
    // Handle specific error types
    switch (response.status) {
      case 401:
        throw new Error(`Authentication failed: ${errorData.error.message}`);
      case 403:
        throw new Error(`Permission denied: ${errorData.error.message}`);
      case 404:
        throw new Error(`Resource not found: ${errorData.error.message}`);
      case 429:
        // Handle rate limiting
        const resetTime = new Date(errorData.error.details.reset * 1000);
        throw new Error(`Rate limit exceeded. Try again at ${resetTime}`);
      default:
        throw new Error(`API Error: ${errorData.error.message}`);
    }
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError) {
      throw new Error('Network error - please check your connection');
    }
    
    // Re-throw other errors
    throw error;
  }
}

// Usage example
try {
  const tools = await handleApiRequest('https://api.devhunt.io/v1/tools');
  console.log(tools);
} catch (error) {
  console.error('Failed to fetch tools:', error.message);
}
```

### Python/Requests

```python
import requests
import json
from datetime import datetime

class DevHuntAPIError(Exception):
    def __init__(self, message, status_code=None, error_code=None):
        super().__init__(message)
        self.status_code = status_code
        self.error_code = error_code

def handle_api_request(url, method='GET', data=None, headers=None):
    if headers is None:
        headers = {}
    
    headers.update({
        'Authorization': f'Bearer {os.environ.get("DEVHUNT_API_KEY")}',
        'Content-Type': 'application/json'
    })
    
    try:
        if method == 'GET':
            response = requests.get(url, headers=headers)
        elif method == 'POST':
            response = requests.post(url, headers=headers, json=data)
        elif method == 'PUT':
            response = requests.put(url, headers=headers, json=data)
        elif method == 'DELETE':
            response = requests.delete(url, headers=headers)
        else:
            raise ValueError(f"Unsupported method: {method}")
        
        # Handle successful responses
        if response.status_code < 400:
            return response.json()
        
        # Handle error responses
        try:
            error_data = response.json()
        except json.JSONDecodeError:
            raise DevHuntAPIError(
                f"HTTP {response.status_code}: {response.text}",
                status_code=response.status_code
            )
        
        # Handle specific error types
        if response.status_code == 401:
            raise DevHuntAPIError(
                f"Authentication failed: {error_data['error']['message']}",
                status_code=401,
                error_code=error_data['error']['code']
            )
        elif response.status_code == 403:
            raise DevHuntAPIError(
                f"Permission denied: {error_data['error']['message']}",
                status_code=403,
                error_code=error_data['error']['code']
            )
        elif response.status_code == 429:
            reset_time = datetime.fromtimestamp(error_data['error']['details']['reset'])
            raise DevHuntAPIError(
                f"Rate limit exceeded. Try again at {reset_time}",
                status_code=429,
                error_code=error_data['error']['code']
            )
        else:
            raise DevHuntAPIError(
                f"API Error: {error_data['error']['message']}",
                status_code=response.status_code,
                error_code=error_data['error']['code']
            )
            
    except requests.exceptions.ConnectionError:
        raise DevHuntAPIError("Network error - please check your connection")
    except requests.exceptions.Timeout:
        raise DevHuntAPIError("Request timeout - please try again")

# Usage example
try:
    tools = handle_api_request('https://api.devhunt.io/v1/tools')
    print(tools)
except DevHuntAPIError as e:
    print(f"Failed to fetch tools: {e}")
```

### Ruby/Net::HTTP

```ruby
require 'net/http'
require 'json'
require 'time'

class DevHuntAPIError < StandardError
  attr_reader :status_code, :error_code
  
  def initialize(message, status_code = nil, error_code = nil)
    super(message)
    @status_code = status_code
    @error_code = error_code
  end
end

def handle_api_request(url, method = 'GET', data = nil)
  uri = URI(url)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  
  headers = {
    'Authorization' => "Bearer #{ENV['DEVHUNT_API_KEY']}",
    'Content-Type' => 'application/json'
  }
  
  request = case method.upcase
            when 'GET'
              Net::HTTP::Get.new(uri, headers)
            when 'POST'
              req = Net::HTTP::Post.new(uri, headers)
              req.body = data.to_json if data
              req
            when 'PUT'
              req = Net::HTTP::Put.new(uri, headers)
              req.body = data.to_json if data
              req
            when 'DELETE'
              Net::HTTP::Delete.new(uri, headers)
            else
              raise ArgumentError, "Unsupported method: #{method}"
            end
  
  response = http.request(request)
  
  # Handle successful responses
  if response.code.to_i < 400
    return JSON.parse(response.body) if response.body && !response.body.empty?
    return {}
  end
  
  # Handle error responses
  begin
    error_data = JSON.parse(response.body)
  rescue JSON::ParserError
    raise DevHuntAPIError.new(
      "HTTP #{response.code}: #{response.body}",
      response.code.to_i
    )
  end
  
  # Handle specific error types
  case response.code.to_i
  when 401
    raise DevHuntAPIError.new(
      "Authentication failed: #{error_data['error']['message']}",
      401,
      error_data['error']['code']
    )
  when 403
    raise DevHuntAPIError.new(
      "Permission denied: #{error_data['error']['message']}",
      403,
      error_data['error']['code']
    )
  when 429
    reset_time = Time.at(error_data['error']['details']['reset'])
    raise DevHuntAPIError.new(
      "Rate limit exceeded. Try again at #{reset_time}",
      429,
      error_data['error']['code']
    )
  else
    raise DevHuntAPIError.new(
      "API Error: #{error_data['error']['message']}",
      response.code.to_i,
      error_data['error']['code']
    )
  end
rescue Net::OpenTimeout, Net::ReadTimeout
  raise DevHuntAPIError.new("Request timeout - please try again")
rescue SocketError
  raise DevHuntAPIError.new("Network error - please check your connection")
end

# Usage example
begin
  tools = handle_api_request('https://api.devhunt.io/v1/tools')
  puts tools
rescue DevHuntAPIError => e
  puts "Failed to fetch tools: #{e.message}"
end
```

## 🧪 Testing Error Handling

### Unit Testing Error Scenarios

```javascript
// Jest test example
describe('API Error Handling', () => {
  test('handles 401 Unauthorized', async () => {
    // Mock the fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({
          error: {
            code: 'UNAUTHORIZED',
            message: 'Invalid API key'
          }
        })
      })
    );
    
    await expect(handleApiRequest('/tools')).rejects.toThrow('Authentication failed');
  });
  
  test('handles network errors', async () => {
    // Mock a network error
    global.fetch = jest.fn(() => 
      Promise.reject(new TypeError('Failed to fetch'))
    );
    
    await expect(handleApiRequest('/tools')).rejects.toThrow('Network error');
  });
});
```

### Integration Testing

```python
# Pytest example
import pytest
import responses

@responses.activate
def test_api_rate_limit():
    responses.add(
        responses.GET,
        'https://api.devhunt.io/v1/tools',
        json={
            'error': {
                'code': 'RATE_LIMIT_EXCEEDED',
                'message': 'Rate limit exceeded'
            }
        },
        status=429
    )
    
    with pytest.raises(DevHuntAPIError) as exc_info:
        handle_api_request('https://api.devhunt.io/v1/tools')
    
    assert exc_info.value.status_code == 429
    assert 'Rate limit exceeded' in str(exc_info.value)
```

## 🛡️ Best Practices

### Robust Error Handling

1. **Always Check Response Status**
   ```javascript
   if (!response.ok) {
     // Handle error before trying to parse JSON
   }
   ```

2. **Provide User-Friendly Messages**
   ```javascript
   // Good
   showError('Unable to load tools. Please try again later.');
   
   // Bad
   showError('HTTP 500: Internal Server Error');
   ```

3. **Log Technical Details**
   ```javascript
   console.error('API Error Details:', {
     status: response.status,
     error: errorData,
     url: response.url
   });
   ```

### Graceful Degradation

```javascript
async function fetchToolsWithFallback() {
  try {
    return await fetchToolsFromAPI();
  } catch (error) {
    console.warn('API request failed, using cached data:', error.message);
    return getCachedTools() || [];
  }
}
```

### Retry Logic

```javascript
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await handleApiRequest(url);
    } catch (error) {
      // Don't retry for client errors
      if (error.status_code && error.status_code < 500) {
        throw error;
      }
      
      // Don't retry for rate limiting
      if (error.status_code === 429) {
        throw error;
      }
      
      // Retry for server errors
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      } else {
        throw error;
      }
    }
  }
}
```

## 🆘 Getting Help

If you encounter persistent errors or need help with error handling:

1. Check our [API FAQ](../faq.md)
2. Review the error details in your logs
3. Contact our support team at api-support@devhunt.io
4. Join our [Discord community](https://discord.gg/devhunt) for real-time assistance

Proper error handling is crucial for building robust applications that provide a good user experience even when things go wrong. By following these guidelines, you can ensure your integration with the DevHunt API handles errors gracefully and provides helpful feedback to users.