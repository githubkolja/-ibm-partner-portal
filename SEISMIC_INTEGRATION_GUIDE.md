# Seismic Integration Guide for IBM Partner Portal

## 🔗 Connecting Seismic to IBM Partner Portal

This guide explains how to integrate Seismic (sales enablement platform) with your IBM Partner Portal to provide seamless access to sales content, presentations, and marketing materials.

---

## 📋 What is Seismic?

**Seismic** is a leading sales enablement platform that helps organizations:
- Store and organize sales content
- Deliver personalized content to buyers
- Track content engagement and effectiveness
- Enable sales teams with the right materials

**IBM + Seismic Integration Benefits:**
- ✅ Centralized content repository
- ✅ Real-time content updates
- ✅ Analytics and insights
- ✅ Personalized content delivery
- ✅ Mobile-ready access

---

## 🏗️ Integration Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  IBM Partner Portal                          │
│                                                              │
│  ┌──────────────────┐      ┌─────────────────────────┐    │
│  │  React Frontend  │─────▶│  Seismic API Client     │    │
│  │  (Portal UI)     │      │  (Integration Layer)    │    │
│  └──────────────────┘      └─────────────────────────┘    │
│                                      │                       │
└──────────────────────────────────────┼───────────────────────┘
                                       │
                                       ▼
                        ┌──────────────────────────┐
                        │   Seismic Platform       │
                        │                          │
                        │  • Content Library       │
                        │  • Analytics             │
                        │  • User Management       │
                        │  • Search & Discovery    │
                        └──────────────────────────┘
```

---

## 🔑 Prerequisites

### 1. Seismic Account & API Access
- Seismic Enterprise account
- API credentials (Client ID & Secret)
- API endpoint URL
- Appropriate permissions

### 2. IBM Cloud Services (Optional)
- IBM API Connect (for API management)
- IBM App ID (for authentication)
- IBM Cloud Functions (for serverless integration)

---

## 🚀 Integration Methods

### **Method 1: Direct API Integration (Recommended)**

#### Step 1: Install Seismic SDK
```bash
cd ibm-partner-portal
npm install axios
```

#### Step 2: Create Seismic API Client

Create `src/services/seismicClient.js`:

```javascript
import axios from 'axios';

class SeismicClient {
  constructor() {
    this.baseURL = process.env.REACT_APP_SEISMIC_API_URL;
    this.clientId = process.env.REACT_APP_SEISMIC_CLIENT_ID;
    this.clientSecret = process.env.REACT_APP_SEISMIC_CLIENT_SECRET;
    this.accessToken = null;
  }

  // Authenticate with Seismic
  async authenticate() {
    try {
      const response = await axios.post(
        `${this.baseURL}/oauth/token`,
        {
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }
      );
      this.accessToken = response.data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Seismic authentication failed:', error);
      throw error;
    }
  }

  // Get content library
  async getContentLibrary(filters = {}) {
    if (!this.accessToken) {
      await this.authenticate();
    }

    try {
      const response = await axios.get(
        `${this.baseURL}/api/v1/content`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          params: filters,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch content:', error);
      throw error;
    }
  }

  // Search content
  async searchContent(query, filters = {}) {
    if (!this.accessToken) {
      await this.authenticate();
    }

    try {
      const response = await axios.get(
        `${this.baseURL}/api/v1/content/search`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          params: {
            q: query,
            ...filters,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  }

  // Get content by ID
  async getContentById(contentId) {
    if (!this.accessToken) {
      await this.authenticate();
    }

    try {
      const response = await axios.get(
        `${this.baseURL}/api/v1/content/${contentId}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch content:', error);
      throw error;
    }
  }

  // Get content analytics
  async getContentAnalytics(contentId, dateRange) {
    if (!this.accessToken) {
      await this.authenticate();
    }

    try {
      const response = await axios.get(
        `${this.baseURL}/api/v1/analytics/content/${contentId}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          params: dateRange,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      throw error;
    }
  }

  // Download content
  async downloadContent(contentId) {
    if (!this.accessToken) {
      await this.authenticate();
    }

    try {
      const response = await axios.get(
        `${this.baseURL}/api/v1/content/${contentId}/download`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          responseType: 'blob',
        }
      );
      return response.data;
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }
}

export default new SeismicClient();
```

#### Step 3: Create Seismic Content Component

Create `src/components/SeismicContent.js`:

```javascript
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Column,
  Tile,
  Search,
  Button,
  Tag,
  Loading,
} from '@carbon/react';
import { Download, View } from '@carbon/icons-react';
import seismicClient from '../services/seismicClient';
import './SeismicContent.scss';

function SeismicContent() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const data = await seismicClient.getContentLibrary({
        category: 'IBM Partner Resources',
        limit: 20,
      });
      setContent(data.items || []);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        setLoading(true);
        const data = await seismicClient.searchContent(query);
        setContent(data.items || []);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    } else if (query.length === 0) {
      loadContent();
    }
  };

  const handleDownload = async (contentId, fileName) => {
    try {
      const blob = await seismicClient.downloadContent(contentId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (loading) {
    return <Loading description="Loading content..." />;
  }

  return (
    <section className="seismic-content">
      <div className="section-container">
        <h2 className="section-title">Sales Enablement Content</h2>
        
        <Search
          size="lg"
          placeholder="Search presentations, documents, and resources..."
          labelText="Search Seismic content"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchQuery}
        />

        <Grid className="content-grid">
          {content.map((item) => (
            <Column key={item.id} sm={4} md={4} lg={4}>
              <Tile className="content-card">
                <div className="content-header">
                  <Tag type="blue">{item.contentType}</Tag>
                  <span className="content-date">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="content-title">{item.title}</h3>
                <p className="content-description">{item.description}</p>
                
                <div className="content-meta">
                  <span>👁️ {item.views} views</span>
                  <span>⬇️ {item.downloads} downloads</span>
                </div>

                <div className="content-actions">
                  <Button
                    kind="tertiary"
                    size="sm"
                    renderIcon={View}
                    onClick={() => window.open(item.viewUrl, '_blank')}
                  >
                    View
                  </Button>
                  <Button
                    kind="primary"
                    size="sm"
                    renderIcon={Download}
                    onClick={() => handleDownload(item.id, item.fileName)}
                  >
                    Download
                  </Button>
                </div>
              </Tile>
            </Column>
          ))}
        </Grid>
      </div>
    </section>
  );
}

export default SeismicContent;
```

#### Step 4: Add Environment Variables

Create `.env` file:

```bash
REACT_APP_SEISMIC_API_URL=https://api.seismic.com
REACT_APP_SEISMIC_CLIENT_ID=your_client_id
REACT_APP_SEISMIC_CLIENT_SECRET=your_client_secret
```

#### Step 5: Integrate into App

Update `src/App.js`:

```javascript
import SeismicContent from './components/SeismicContent';

// Add to your content area
<SeismicContent />
```

---

### **Method 2: IBM Cloud Functions Integration**

For serverless integration with enhanced security:

#### Step 1: Create IBM Cloud Function

```javascript
// seismic-proxy.js
const axios = require('axios');

async function main(params) {
  const { action, contentId, query } = params;
  
  // Authenticate with Seismic
  const authResponse = await axios.post(
    'https://api.seismic.com/oauth/token',
    {
      grant_type: 'client_credentials',
      client_id: process.env.SEISMIC_CLIENT_ID,
      client_secret: process.env.SEISMIC_CLIENT_SECRET,
    }
  );
  
  const accessToken = authResponse.data.access_token;
  
  // Handle different actions
  switch (action) {
    case 'getContent':
      const content = await axios.get(
        'https://api.seismic.com/api/v1/content',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return { body: content.data };
      
    case 'search':
      const results = await axios.get(
        'https://api.seismic.com/api/v1/content/search',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { q: query },
        }
      );
      return { body: results.data };
      
    default:
      return { error: 'Invalid action' };
  }
}

exports.main = main;
```

#### Step 2: Deploy to IBM Cloud

```bash
ibmcloud fn action create seismic-proxy seismic-proxy.js \
  --param SEISMIC_CLIENT_ID "your_client_id" \
  --param SEISMIC_CLIENT_SECRET "your_client_secret" \
  --web true
```

#### Step 3: Call from React App

```javascript
const response = await fetch(
  'https://us-south.functions.cloud.ibm.com/api/v1/web/your-namespace/default/seismic-proxy',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'getContent' }),
  }
);
const data = await response.json();
```

---

## 🔐 Security Best Practices

1. **Never expose API credentials in frontend code**
   - Use environment variables
   - Implement backend proxy
   - Use IBM Cloud Functions

2. **Implement authentication**
   - Use IBM App ID for user authentication
   - Validate user permissions
   - Implement role-based access control

3. **Secure API calls**
   - Use HTTPS only
   - Implement rate limiting
   - Add request validation

4. **Monitor and audit**
   - Log all API calls
   - Track content access
   - Monitor for suspicious activity

---

## 📊 Use Cases

### 1. **Sales Presentations Library**
Display IBM partner presentations from Seismic in the portal

### 2. **Marketing Materials**
Provide access to co-branded marketing materials

### 3. **Product Documentation**
Centralize product docs and datasheets

### 4. **Training Resources**
Deliver partner training materials

### 5. **Case Studies & Success Stories**
Showcase customer success stories

---

## 🎯 Features to Implement

### Phase 1: Basic Integration
- ✅ Content library display
- ✅ Search functionality
- ✅ Content download
- ✅ Basic analytics

### Phase 2: Enhanced Features
- ✅ Content recommendations
- ✅ Personalized content
- ✅ Advanced search filters
- ✅ Content sharing

### Phase 3: Advanced Integration
- ✅ Real-time sync
- ✅ Custom workflows
- ✅ AI-powered search
- ✅ Integration with Watson

---

## 📈 Analytics & Tracking

### Track Content Engagement

```javascript
// Track content views
const trackContentView = async (contentId) => {
  await seismicClient.trackEvent({
    event: 'content_view',
    contentId,
    userId: currentUser.id,
    timestamp: new Date().toISOString(),
  });
};

// Track downloads
const trackDownload = async (contentId) => {
  await seismicClient.trackEvent({
    event: 'content_download',
    contentId,
    userId: currentUser.id,
    timestamp: new Date().toISOString(),
  });
};
```

---

## 🔄 Sync Strategy

### Real-time Sync with Webhooks

```javascript
// Seismic webhook handler
app.post('/webhooks/seismic', async (req, res) => {
  const { event, data } = req.body;
  
  switch (event) {
    case 'content.created':
      await updateContentCache(data);
      break;
    case 'content.updated':
      await refreshContent(data.id);
      break;
    case 'content.deleted':
      await removeContent(data.id);
      break;
  }
  
  res.status(200).send('OK');
});
```

---

## 💡 Best Practices

1. **Cache content locally** - Reduce API calls
2. **Implement pagination** - Handle large content libraries
3. **Use lazy loading** - Improve performance
4. **Add error handling** - Graceful degradation
5. **Monitor API usage** - Stay within rate limits
6. **Optimize images** - Faster loading times
7. **Implement search** - Better user experience

---

## 📚 Additional Resources

- [Seismic API Documentation](https://developer.seismic.com)
- [IBM API Connect](https://www.ibm.com/cloud/api-connect)
- [IBM Cloud Functions](https://www.ibm.com/cloud/functions)
- [IBM App ID](https://www.ibm.com/cloud/app-id)

---

## 🆘 Troubleshooting

### Common Issues

**Authentication Fails:**
- Verify API credentials
- Check token expiration
- Ensure proper permissions

**Content Not Loading:**
- Check API endpoint URL
- Verify network connectivity
- Review CORS settings

**Slow Performance:**
- Implement caching
- Use pagination
- Optimize queries

---

## 📞 Support

For Seismic integration support:
- **Seismic Support**: support@seismic.com
- **IBM Partner Support**: https://www.ibm.com/partnerworld
- **Technical Documentation**: See links above

---

**Ready to integrate Seismic with your IBM Partner Portal!** 🚀