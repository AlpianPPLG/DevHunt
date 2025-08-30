# API Authentication

Learn how to authenticate with the DevHunt API to access protected resources.

## 🔐 Authentication Methods

DevHunt API uses API key-based authentication to secure access to its endpoints. All requests to protected endpoints must include a valid API key.

### API Key Authentication
API keys are the primary method for authenticating with the DevHunt API. Each key is associated with a user account and has specific permissions.

## 🗝️ Getting Your API Key

### Generating a New API Key
1. Log in to your DevHunt account
2. Navigate to your profile settings
3. Go to the "API Keys" section
4. Click "Generate New Key"
5. Give your key a descriptive name (e.g., "My App Production")
6. Select the appropriate permissions
7. Click "Create Key"
8. Copy and securely store your API key

### API Key Permissions
When creating an API key, you can specify its permissions:
- **Read Only**: Access to GET endpoints only
- **Read/Write**: Full access to all endpoints
- **Submit Only**: Permission to submit new tools only

### Managing API Keys
- View all your API keys in the dashboard
- Rename keys for better organization
- Revoke keys that are no longer needed
- Monitor key usage and activity

## 🛡️ Security Best Practices

### Protecting Your API Keys
- Never commit API keys to version control systems
- Use environment variables to store keys
- Rotate keys periodically
- Use different keys for different applications
- Revoke compromised keys immediately

### Environment Variables
Store your API keys in environment variables:
```bash
# .env file
DEVHUNT_API_KEY=sk_1234567890abcdef
```

```javascript
// JavaScript example
const apiKey = process.env.DEVHUNT_API_KEY;
```

```python
# Python example
import os
api_key = os.environ.get('DEVHUNT_API_KEY')
```

### Key Rotation
Regularly rotate your API keys:
1. Generate a new key with the same permissions
2. Update your applications to use the new key
3. Test that everything works correctly
4. Revoke the old key after confirming the new one works

## 📡 Making Authenticated Requests

### Request Headers
Include your API key in the `Authorization` header using the Bearer scheme:

```http
Authorization: Bearer YOUR_API_KEY
```

### Example Requests

#### cURL
```bash
curl -X GET "https://api.devhunt.io/v1/tools" \
  -H "Authorization: Bearer sk_1234567890abcdef"
```

#### JavaScript/Fetch
```javascript
const response = await fetch('https://api.devhunt.io/v1/tools', {
  headers: {
    'Authorization': 'Bearer sk_1234567890abcdef'
  }
});
```

#### Python/Requests
```python
import requests

headers = {
    'Authorization': 'Bearer sk_1234567890abcdef'
}

response = requests.get('https://api.devhunt.io/v1/tools', headers=headers)
```

## 🔍 Authentication Response Codes

### Successful Authentication
- **200 OK**: Request successful with valid authentication
- **201 Created**: Resource created successfully

### Authentication Errors
- **401 Unauthorized**: Missing or invalid API key
- **403 Forbidden**: Valid key but insufficient permissions
- **429 Too Many Requests**: Rate limit exceeded

### Error Responses
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid API key provided"
  }
}
```

## ⚙️ API Key Management

### Key Metadata
Each API key includes metadata to help you manage access:
- **Name**: Descriptive name for the key
- **Created**: Date and time the key was created
- **Last Used**: Date and time the key was last used
- **Permissions**: Access level granted to the key
- **Status**: Active or revoked

### Monitoring Key Usage
- View usage statistics in your dashboard
- Set up alerts for unusual activity
- Track which applications are using each key
- Monitor rate limit usage

### Revoking Keys
To revoke an API key:
1. Go to your API Keys dashboard
2. Find the key you want to revoke
3. Click the "Revoke" button
4. Confirm the revocation

Revoked keys immediately lose access to the API.

## 🧪 Testing Authentication

### Health Check Endpoint
Use the health check endpoint to test your authentication:
```bash
curl -X GET "https://api.devhunt.io/v1/health" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Expected Response
```json
{
  "status": "ok",
  "authenticated": true,
  "user": {
    "id": "user-123",
    "username": "yourusername"
  }
}
```

## 🚫 Common Authentication Issues

### Invalid API Key
**Problem**: API returns 401 Unauthorized
**Solutions**:
- Verify the API key is correct
- Check that the key hasn't been revoked
- Ensure you're using the Bearer scheme correctly

### Permission Denied
**Problem**: API returns 403 Forbidden
**Solutions**:
- Check that your key has the required permissions
- Generate a new key with appropriate permissions
- Contact support if you believe this is an error

### Rate Limiting
**Problem**: API returns 429 Too Many Requests
**Solutions**:
- Implement exponential backoff
- Check your key's rate limit in the dashboard
- Upgrade to a higher tier if needed

## 🔄 Token Management

### Key Expiration
API keys do not expire by default, but you can set expiration dates:
- 30 days
- 90 days
- 1 year
- Never (default)

### Automated Key Rotation
For enterprise users, we offer automated key rotation:
- Generate new keys on a schedule
- Automatically revoke old keys
- Notify applications of key changes

## 📊 Rate Limit Headers

All authenticated requests include rate limit information:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 986
X-RateLimit-Reset: 1628607246
```

### Header Descriptions
- **X-RateLimit-Limit**: Maximum requests allowed per window
- **X-RateLimit-Remaining**: Requests remaining in current window
- **X-RateLimit-Reset**: Unix timestamp when limit resets

## 🛠️ Client Libraries

### Official SDKs
Our official SDKs handle authentication automatically:

#### JavaScript
```javascript
import { DevHuntClient } from '@devhunt/api-client';

const client = new DevHuntClient({
  apiKey: process.env.DEVHUNT_API_KEY
});

// Authentication handled automatically
const tools = await client.tools.list();
```

#### Python
```python
from devhunt_api import DevHuntClient

client = DevHuntClient(api_key=os.environ['DEVHUNT_API_KEY'])

# Authentication handled automatically
tools = client.tools.list()
```

## 🤝 Getting Help

If you're having trouble with API authentication:
1. Check our [API FAQ](../faq.md)
2. Verify your API key in the dashboard
3. Contact our support team at api-support@devhunt.io
4. Join our [Discord community](https://discord.gg/devhunt) for real-time assistance

Proper authentication is essential for secure access to the DevHunt API. By following these guidelines, you can ensure your applications maintain secure and reliable access to our platform.