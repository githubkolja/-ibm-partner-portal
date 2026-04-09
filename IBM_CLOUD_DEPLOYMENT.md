# IBM Cloud Deployment Guide

## 🚀 Deployment Architecture for IBM Partner Portal

This guide outlines multiple deployment options for hosting the IBM Partner Portal on IBM Cloud, leveraging various IBM Cloud services for optimal performance, scalability, and integration.

---

## 📊 Recommended Architecture

### **Option 1: Static Web App with CDN (Recommended for MVP)**

```
┌─────────────────────────────────────────────────────────────┐
│                        IBM Cloud                             │
│                                                              │
│  ┌──────────────────┐      ┌─────────────────────────┐    │
│  │  Code Engine      │      │  Cloud Object Storage   │    │
│  │  (Static Site)    │─────▶│  (Assets & Backups)     │    │
│  └──────────────────┘      └─────────────────────────┘    │
│           │                                                  │
│           ▼                                                  │
│  ┌──────────────────┐      ┌─────────────────────────┐    │
│  │  CDN (Akamai)     │      │  Internet Services      │    │
│  │  (Global Cache)   │      │  (DNS, DDoS, WAF)       │    │
│  └──────────────────┘      └─────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Services Used:**
- **IBM Cloud Code Engine**: Serverless platform for hosting static React build
- **IBM Cloud Object Storage**: Store static assets, images, and backups
- **IBM Cloud Internet Services**: CDN, DNS, DDoS protection, and WAF
- **IBM Cloud Monitoring**: Application performance monitoring

**Cost**: ~$50-100/month for moderate traffic

---

### **Option 2: Full-Stack with Backend Services**

```
┌─────────────────────────────────────────────────────────────────────┐
│                           IBM Cloud                                  │
│                                                                      │
│  ┌──────────────────┐      ┌─────────────────────────────────┐    │
│  │  Code Engine      │      │  Cloudant / Databases for       │    │
│  │  (React Frontend) │─────▶│  PostgreSQL (Content Storage)   │    │
│  └──────────────────┘      └─────────────────────────────────┘    │
│           │                              │                          │
│           ▼                              ▼                          │
│  ┌──────────────────┐      ┌─────────────────────────────────┐    │
│  │  API Gateway      │      │  Watson Assistant               │    │
│  │  (REST APIs)      │─────▶│  (Chatbot Support)              │    │
│  └──────────────────┘      └─────────────────────────────────┘    │
│           │                                                          │
│           ▼                                                          │
│  ┌──────────────────┐      ┌─────────────────────────────────┐    │
│  │  App ID           │      │  Cloud Object Storage           │    │
│  │  (Authentication) │      │  (Media & Documents)            │    │
│  └──────────────────┘      └─────────────────────────────────┘    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Services Used:**
- **IBM Cloud Code Engine**: Host React frontend and Node.js backend
- **IBM Cloudant** or **Databases for PostgreSQL**: Store news, partners, events data
- **IBM API Connect**: Manage and secure APIs
- **IBM App ID**: User authentication and authorization
- **Watson Assistant**: AI-powered chatbot for partner support
- **IBM Cloud Object Storage**: Store videos, images, documents
- **IBM Cloud Monitoring & Log Analysis**: Observability

**Cost**: ~$200-500/month depending on usage

---

### **Option 3: Enterprise-Grade with Red Hat OpenShift**

```
┌──────────────────────────────────────────────────────────────────────┐
│                        IBM Cloud (Red Hat OpenShift)                  │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    OpenShift Cluster                         │   │
│  │                                                              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │  Frontend    │  │  Backend API │  │  Admin Panel │     │   │
│  │  │  (React)     │  │  (Node.js)   │  │  (React)     │     │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘     │   │
│  │                                                              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │  Redis Cache │  │  PostgreSQL  │  │  Kafka Queue │     │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│                              ▼                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  watsonx.ai (Content Generation & Personalization)          │   │
│  │  Watson Discovery (Search & Analytics)                      │   │
│  │  Watson Assistant (Conversational AI)                       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

**Services Used:**
- **Red Hat OpenShift on IBM Cloud**: Container orchestration platform
- **IBM Databases for PostgreSQL**: Managed database
- **IBM Messages for RabbitMQ**: Message queue
- **IBM Databases for Redis**: Caching layer
- **watsonx.ai**: AI-powered content generation and personalization
- **Watson Discovery**: Advanced search and analytics
- **Watson Assistant**: Conversational AI
- **IBM Cloud Object Storage**: Media storage
- **IBM Cloud Monitoring, Logging, Security Advisor**: Full observability

**Cost**: ~$1,000-3,000/month for enterprise features

---

## 🛠️ Deployment Steps

### **Option 1: Deploy to IBM Cloud Code Engine (Quickest)**

#### Prerequisites
```bash
# Install IBM Cloud CLI
curl -fsSL https://clis.cloud.ibm.com/install/linux | sh

# Install Code Engine plugin
ibmcloud plugin install code-engine

# Login to IBM Cloud
ibmcloud login --sso
```

#### Step 1: Build Production Bundle
```bash
cd ibm-partner-portal
npm run build
```

#### Step 2: Create Code Engine Project
```bash
# Create project
ibmcloud ce project create --name ibm-partner-portal

# Select project
ibmcloud ce project select --name ibm-partner-portal
```

#### Step 3: Deploy Application
```bash
# Create application from local source
ibmcloud ce application create \
  --name partner-portal \
  --build-source . \
  --strategy dockerfile \
  --port 8080 \
  --min-scale 1 \
  --max-scale 5 \
  --cpu 0.5 \
  --memory 1G
```

#### Step 4: Get Application URL
```bash
ibmcloud ce application get --name partner-portal
```

---

### **Option 2: Deploy with Cloud Object Storage + CDN**

#### Step 1: Create Cloud Object Storage Bucket
```bash
# Create COS instance
ibmcloud resource service-instance-create \
  partner-portal-storage \
  cloud-object-storage \
  standard \
  global

# Create bucket
ibmcloud cos bucket-create \
  --bucket partner-portal-web \
  --ibm-service-instance-id <instance-id> \
  --region us-south
```

#### Step 2: Upload Build Files
```bash
# Build production
npm run build

# Upload to COS
ibmcloud cos upload \
  --bucket partner-portal-web \
  --key index.html \
  --file build/index.html

# Upload all static files
ibmcloud cos upload-folder \
  --bucket partner-portal-web \
  --folder build/
```

#### Step 3: Configure CDN
```bash
# Enable public access
ibmcloud cos bucket-cors-put \
  --bucket partner-portal-web \
  --cors-configuration file://cors-config.json

# Set up IBM Cloud Internet Services for CDN
# (Configure through IBM Cloud Console)
```

---

### **Option 3: Deploy to Red Hat OpenShift**

#### Step 1: Create Dockerfile
```dockerfile
# Create Dockerfile in project root
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

#### Step 2: Deploy to OpenShift
```bash
# Login to OpenShift
oc login --token=<token> --server=<server-url>

# Create new project
oc new-project ibm-partner-portal

# Create application from source
oc new-app . --name=partner-portal

# Expose service
oc expose svc/partner-portal

# Get route
oc get route partner-portal
```

---

## 🔧 Enhanced Features with IBM Cloud Services

### **1. Add Watson Assistant Chatbot**

```javascript
// Install Watson Assistant SDK
npm install ibm-watson

// Add to your React app
import AssistantV2 from 'ibm-watson/assistant/v2';

const assistant = new AssistantV2({
  version: '2021-11-27',
  authenticator: new IamAuthenticator({
    apikey: process.env.REACT_APP_WATSON_APIKEY,
  }),
  serviceUrl: process.env.REACT_APP_WATSON_URL,
});
```

### **2. Add Content Management with Cloudant**

```javascript
// Install Cloudant SDK
npm install @ibm-cloud/cloudant

// Connect to Cloudant
const { CloudantV1 } = require('@ibm-cloud/cloudant');

const client = CloudantV1.newInstance({
  serviceName: 'CLOUDANT',
});
```

### **3. Add Analytics with Watson Discovery**

```javascript
// Install Watson Discovery SDK
npm install ibm-watson

// Implement search
import DiscoveryV2 from 'ibm-watson/discovery/v2';

const discovery = new DiscoveryV2({
  version: '2020-08-30',
  authenticator: new IamAuthenticator({
    apikey: process.env.REACT_APP_DISCOVERY_APIKEY,
  }),
  serviceUrl: process.env.REACT_APP_DISCOVERY_URL,
});
```

### **4. Add User Authentication with App ID**

```javascript
// Install App ID SDK
npm install ibmcloud-appid-js

// Configure App ID
import AppID from 'ibmcloud-appid-js';

const appID = new AppID();
appID.init({
  clientId: process.env.REACT_APP_APPID_CLIENT_ID,
  discoveryEndpoint: process.env.REACT_APP_APPID_DISCOVERY_ENDPOINT,
});
```

---

## 📊 Cost Estimation

### **Lite/Free Tier (Development)**
- Code Engine: Free tier (100K vCPU-seconds/month)
- Cloud Object Storage: 25GB free
- **Total: $0/month**

### **Standard Tier (Production)**
- Code Engine: ~$30/month
- Cloud Object Storage: ~$10/month
- Internet Services (CDN): ~$20/month
- Monitoring: ~$10/month
- **Total: ~$70/month**

### **Enterprise Tier**
- Red Hat OpenShift: ~$500/month
- Databases for PostgreSQL: ~$200/month
- Watson Services: ~$300/month
- Advanced Security: ~$100/month
- **Total: ~$1,100/month**

---

## 🔐 Security Best Practices

1. **Enable HTTPS**: Use IBM Cloud Internet Services SSL certificates
2. **Configure WAF**: Protect against common web attacks
3. **Implement DDoS Protection**: Use IBM Cloud Internet Services
4. **Use App ID**: Secure user authentication
5. **Enable Encryption**: Encrypt data at rest and in transit
6. **Set up Security Advisor**: Monitor security posture
7. **Implement CORS**: Configure proper CORS policies
8. **Use Secrets Manager**: Store API keys and credentials securely

---

## 📈 Monitoring & Observability

### **IBM Cloud Monitoring**
```bash
# Install monitoring agent
ibmcloud ob monitoring config create \
  --instance <monitoring-instance-name> \
  --agent-namespace ibm-observe
```

### **IBM Log Analysis**
```bash
# Configure logging
ibmcloud ob logging config create \
  --instance <logging-instance-name> \
  --agent-namespace ibm-observe
```

---

## 🚀 CI/CD Pipeline

### **Using IBM Cloud Toolchain**

1. **Create Toolchain**
   - Connect GitHub repository
   - Configure Delivery Pipeline
   - Set up automated testing

2. **Pipeline Stages**
   - **Build**: `npm run build`
   - **Test**: `npm test`
   - **Deploy**: Deploy to Code Engine or OpenShift
   - **Verify**: Run smoke tests

3. **Automated Deployment**
   ```yaml
   # .bluemix/pipeline.yml
   stages:
     - name: Build
       jobs:
         - name: Build
           script: |
             npm install
             npm run build
     - name: Deploy
       jobs:
         - name: Deploy to Code Engine
           script: |
             ibmcloud ce application update --name partner-portal
   ```

---

## 📚 Additional Resources

- [IBM Cloud Code Engine Documentation](https://cloud.ibm.com/docs/codeengine)
- [IBM Cloud Object Storage Documentation](https://cloud.ibm.com/docs/cloud-object-storage)
- [Red Hat OpenShift on IBM Cloud](https://cloud.ibm.com/docs/openshift)
- [Watson Services Documentation](https://cloud.ibm.com/docs/watson)
- [IBM Cloud Internet Services](https://cloud.ibm.com/docs/cis)

---

## 🎯 Recommended Approach

**For this Partner Portal, we recommend:**

**Phase 1 (MVP)**: Option 1 - Code Engine + COS + CDN
- Quick deployment
- Low cost
- Scalable
- Easy maintenance

**Phase 2 (Growth)**: Add Watson Assistant, Cloudant, Analytics
- Enhanced user experience
- Dynamic content management
- AI-powered features

**Phase 3 (Enterprise)**: Migrate to OpenShift with full IBM Cloud suite
- Enterprise-grade reliability
- Advanced security
- Full observability
- Integration with IBM ecosystem

---

**Need help with deployment? Contact IBM Cloud Support or your IBM Partner representative.**