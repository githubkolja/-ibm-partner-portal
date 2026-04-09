# 🆓 Free Deployment Guide for IBM Partner Portal

## Yes, You Can Deploy This Portal for FREE!

This guide shows you how to deploy the IBM Partner Portal using **100% free services** from IBM Cloud and alternative platforms.

---

## 🎯 Option 1: IBM Cloud Free Tier (Recommended)

### ✅ What's Included in IBM Cloud Free Tier

IBM Cloud offers generous free tiers that are **perfect for this portal**:

| Service | Free Tier | Sufficient For |
|---------|-----------|----------------|
| **Code Engine** | 100K vCPU-seconds/month | ✅ Yes - Low to moderate traffic |
| **Cloud Object Storage** | 25GB storage, 2K Class A requests | ✅ Yes - Static assets |
| **Cloudant Lite** | 1GB storage, 20 lookups/sec | ✅ Yes - Content database |
| **Internet Services** | 1 zone, basic DDoS | ✅ Yes - DNS and basic CDN |

**Total Cost: $0/month** 🎉

---

## 🚀 Step-by-Step Free Deployment

### Prerequisites

1. **Create IBM Cloud Account** (Free, no credit card required for Lite tier)
   - Visit: https://cloud.ibm.com/registration
   - Sign up with email
   - Verify your account

2. **Install IBM Cloud CLI**
   ```bash
   # macOS
   curl -fsSL https://clis.cloud.ibm.com/install/osx | sh
   
   # Linux
   curl -fsSL https://clis.cloud.ibm.com/install/linux | sh
   
   # Windows (PowerShell)
   iex(New-Object Net.WebClient).DownloadString('https://clis.cloud.ibm.com/install/powershell')
   ```

3. **Install Code Engine Plugin**
   ```bash
   ibmcloud plugin install code-engine
   ```

---

### Method 1: Deploy to IBM Cloud Code Engine (Easiest)

#### Step 1: Login to IBM Cloud
```bash
ibmcloud login
# Or use SSO
ibmcloud login --sso
```

#### Step 2: Create Code Engine Project
```bash
# Create a new project (FREE)
ibmcloud ce project create --name partner-portal-free

# Select the project
ibmcloud ce project select --name partner-portal-free
```

#### Step 3: Build Your Application
```bash
cd ibm-partner-portal
npm run build
```

#### Step 4: Create Dockerfile (if not exists)
```dockerfile
# Create this file: ibm-partner-portal/Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

#### Step 5: Create nginx.conf
```nginx
# Create this file: ibm-partner-portal/nginx.conf
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 8080;
        server_name _;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

#### Step 6: Deploy to Code Engine
```bash
# Deploy from local source (FREE within limits)
ibmcloud ce application create \
  --name partner-portal \
  --build-source . \
  --strategy dockerfile \
  --port 8080 \
  --min-scale 0 \
  --max-scale 1 \
  --cpu 0.25 \
  --memory 0.5G \
  --build-timeout 600

# This will:
# - Build your Docker image
# - Deploy to Code Engine
# - Give you a public URL
```

#### Step 7: Get Your Free URL
```bash
ibmcloud ce application get --name partner-portal --output url
```

**Your portal is now live!** 🎉

Example URL: `https://partner-portal.1234abcd.us-south.codeengine.appdomain.cloud`

---

### Method 2: Deploy to IBM Cloud Object Storage (Static Hosting)

#### Step 1: Create Cloud Object Storage Instance
```bash
# Create FREE Lite instance
ibmcloud resource service-instance-create \
  partner-portal-storage \
  cloud-object-storage \
  lite \
  global
```

#### Step 2: Create Bucket
```bash
# Get instance ID
INSTANCE_ID=$(ibmcloud resource service-instance partner-portal-storage --output json | jq -r '.[0].id')

# Create public bucket
ibmcloud cos bucket-create \
  --bucket partner-portal-web \
  --ibm-service-instance-id $INSTANCE_ID \
  --region us-south \
  --class Standard
```

#### Step 3: Build and Upload
```bash
# Build production bundle
npm run build

# Upload files
cd build
for file in $(find . -type f); do
  ibmcloud cos object-put \
    --bucket partner-portal-web \
    --key ${file#./} \
    --body $file
done
```

#### Step 4: Enable Public Access
```bash
# Make bucket public
ibmcloud cos bucket-cors-put \
  --bucket partner-portal-web \
  --cors-configuration '{
    "CORSRules": [{
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET"],
      "AllowedHeaders": ["*"]
    }]
  }'
```

#### Step 5: Access Your Site
URL format: `https://partner-portal-web.s3.us-south.cloud-object-storage.appdomain.cloud/index.html`

---

## 🌐 Option 2: Alternative Free Hosting Platforms

### A. GitHub Pages (100% Free)

**Perfect for static React apps!**

#### Setup Steps:
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
{
  "homepage": "https://yourusername.github.io/ibm-partner-portal",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}

# Deploy
npm run deploy
```

**URL**: `https://yourusername.github.io/ibm-partner-portal`

**Pros**:
- ✅ Completely free
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Built-in CDN

---

### B. Netlify (Free Tier)

**Best for React apps with continuous deployment**

#### Setup Steps:
1. Push code to GitHub
2. Visit https://netlify.com
3. Click "New site from Git"
4. Connect GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Deploy!

**Free Tier Includes**:
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domain
- ✅ Continuous deployment
- ✅ Form handling

**URL**: `https://your-site-name.netlify.app`

---

### C. Vercel (Free Tier)

**Optimized for React and Next.js**

#### Setup Steps:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd ibm-partner-portal
vercel

# Follow prompts
```

**Free Tier Includes**:
- ✅ Unlimited bandwidth
- ✅ Automatic HTTPS
- ✅ Custom domain
- ✅ Edge network (CDN)
- ✅ Serverless functions

**URL**: `https://ibm-partner-portal.vercel.app`

---

### D. Cloudflare Pages (Free)

**Fast global CDN with unlimited bandwidth**

#### Setup Steps:
1. Visit https://pages.cloudflare.com
2. Connect GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Build output: `build`
4. Deploy!

**Free Tier Includes**:
- ✅ Unlimited bandwidth
- ✅ Unlimited requests
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Custom domain

**URL**: `https://ibm-partner-portal.pages.dev`

---

## 📊 Free Tier Comparison

| Platform | Bandwidth | Build Minutes | Custom Domain | HTTPS | Best For |
|----------|-----------|---------------|---------------|-------|----------|
| **IBM Cloud Code Engine** | 100K vCPU-sec | Included | ✅ | ✅ | IBM ecosystem |
| **GitHub Pages** | 100GB/month | Unlimited | ✅ | ✅ | Simple static sites |
| **Netlify** | 100GB/month | 300 min/month | ✅ | ✅ | React apps |
| **Vercel** | Unlimited | 6000 min/month | ✅ | ✅ | React/Next.js |
| **Cloudflare Pages** | Unlimited | 500 builds/month | ✅ | ✅ | Global performance |

---

## 🎯 Recommended Free Deployment Strategy

### For Development/Testing:
**Use GitHub Pages** - Simplest, no configuration needed

### For Production (IBM Ecosystem):
**Use IBM Cloud Code Engine** - Free tier, IBM branding, easy to upgrade

### For Production (Best Performance):
**Use Vercel or Cloudflare Pages** - Unlimited bandwidth, global CDN

---

## 💡 Tips to Stay Within Free Limits

### IBM Cloud Code Engine:
1. **Set min-scale to 0** - Scale to zero when not in use
2. **Use small CPU/memory** - 0.25 vCPU, 0.5G memory is enough
3. **Enable caching** - Reduce compute time
4. **Optimize images** - Smaller assets = faster builds

### General Tips:
1. **Optimize bundle size**:
   ```bash
   npm run build
   # Check bundle size
   npm install -g source-map-explorer
   source-map-explorer build/static/js/*.js
   ```

2. **Enable compression** in nginx.conf:
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   ```

3. **Use lazy loading** for images and components

4. **Implement code splitting** in React

---

## 🔄 Continuous Deployment (Free)

### GitHub Actions + IBM Cloud Code Engine

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to IBM Cloud

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install IBM Cloud CLI
        run: |
          curl -fsSL https://clis.cloud.ibm.com/install/linux | sh
          ibmcloud plugin install code-engine
      
      - name: Login to IBM Cloud
        run: |
          ibmcloud login --apikey ${{ secrets.IBM_CLOUD_API_KEY }} -r us-south
          ibmcloud ce project select --name partner-portal-free
      
      - name: Deploy
        run: |
          ibmcloud ce application update --name partner-portal --build-source .
```

---

## 📈 Monitoring (Free)

### IBM Cloud Monitoring Lite:
- ✅ Basic metrics
- ✅ 7-day retention
- ✅ Dashboard

### Alternative Free Monitoring:
- **Google Analytics** - Free website analytics
- **Sentry** - Free error tracking (5K events/month)
- **LogRocket** - Free session replay (1K sessions/month)

---

## 🎓 Next Steps After Free Deployment

Once deployed for free, you can:

1. **Test with real users** - Get feedback
2. **Monitor performance** - Check load times
3. **Optimize** - Improve based on metrics
4. **Scale up** - Upgrade to paid tier when needed

---

## ❓ FAQ

**Q: Will my site go down if I exceed free limits?**
A: On IBM Cloud Code Engine, your app will scale to zero. On other platforms, you'll get notifications before any charges.

**Q: Can I use a custom domain?**
A: Yes! All platforms support custom domains for free.

**Q: How long does deployment take?**
A: 5-10 minutes for first deployment, 2-3 minutes for updates.

**Q: Can I upgrade later?**
A: Yes! All platforms offer seamless upgrades to paid tiers.

**Q: Is HTTPS included?**
A: Yes! All platforms provide free SSL certificates.

---

## 🚀 Quick Start Command

**Deploy to IBM Cloud Code Engine in 3 commands:**

```bash
# 1. Login
ibmcloud login --sso

# 2. Create project
ibmcloud ce project create --name partner-portal-free && \
ibmcloud ce project select --name partner-portal-free

# 3. Deploy
cd ibm-partner-portal && \
ibmcloud ce application create \
  --name partner-portal \
  --build-source . \
  --strategy dockerfile \
  --port 8080 \
  --min-scale 0 \
  --max-scale 1 \
  --cpu 0.25 \
  --memory 0.5G
```

**That's it! Your portal is live for FREE!** 🎉

---

## 📞 Support

- **IBM Cloud Support**: https://cloud.ibm.com/docs
- **Community Forum**: https://community.ibm.com
- **Stack Overflow**: Tag with `ibm-cloud`

---

**Happy Free Hosting!** 🚀