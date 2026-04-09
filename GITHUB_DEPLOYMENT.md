# 🚀 GitHub Deployment Guide

## Push IBM Partner Portal to GitHub

Your project is ready to be pushed to GitHub! Follow these steps.

---

## 📋 Prerequisites

✅ Git initialized (Done!)
✅ Files committed (Done!)
⬜ GitHub account
⬜ GitHub repository created

---

## 🎯 Step-by-Step Guide

### Step 1: Create GitHub Repository

1. **Go to GitHub**: https://github.com/new

2. **Repository Settings**:
   - **Name**: `ibm-partner-portal`
   - **Description**: `IBM Partner Portal - Automation & Data AI Resources`
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

3. **Click "Create repository"**

### Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
cd ibm-partner-portal

# Add GitHub remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/ibm-partner-portal.git

# Push to GitHub
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/ibm-partner-portal.git
git push -u origin main
```

### Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all 38 files uploaded
3. README.md will be displayed on the main page

---

## 🌐 Deploy to GitHub Pages (Free Hosting!)

Once pushed to GitHub, you can deploy the site for free:

### Option 1: Automated Deployment with gh-pages

```bash
cd ibm-partner-portal

# Install gh-pages
npm install --save-dev gh-pages

# Add homepage to package.json
# Add this line after "name": "ibm-partner-portal",
# "homepage": "https://YOUR-USERNAME.github.io/ibm-partner-portal",

# Add deploy scripts to package.json
# Add these to "scripts" section:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"

# Deploy to GitHub Pages
npm run deploy
```

Your site will be live at: `https://YOUR-USERNAME.github.io/ibm-partner-portal`

### Option 2: Manual GitHub Pages Setup

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **gh-pages** branch
4. Click **Save**
5. Your site will be live in a few minutes!

---

## 📦 Quick Deploy Script

Create this file: `deploy-to-github.sh`

```bash
#!/bin/bash

echo "🚀 Deploying IBM Partner Portal to GitHub Pages..."

# Build production version
npm run build

# Install gh-pages if not installed
npm list gh-pages || npm install --save-dev gh-pages

# Deploy
npm run deploy

echo "✅ Deployment complete!"
echo "🌐 Your site will be live at:"
echo "   https://YOUR-USERNAME.github.io/ibm-partner-portal"
```

Make it executable and run:
```bash
chmod +x deploy-to-github.sh
./deploy-to-github.sh
```

---

## 🔄 Update Your Site

After making changes:

```bash
# Stage changes
git add .

# Commit changes
git commit -m "Update: description of changes"

# Push to GitHub
git push origin main

# Deploy to GitHub Pages (if using gh-pages)
npm run deploy
```

---

## 🎨 Customize Repository

### Add Repository Topics

On GitHub, click the ⚙️ icon next to "About" and add topics:
- `ibm`
- `carbon-design-system`
- `react`
- `partner-portal`
- `automation`
- `artificial-intelligence`
- `watsonx`

### Update Repository Description

Add this description:
```
IBM Partner Portal showcasing automation and AI products with IBM Carbon Design System. Features news, events, videos, and partner resources.
```

### Add Repository Website

Set the website URL to your GitHub Pages URL:
```
https://YOUR-USERNAME.github.io/ibm-partner-portal
```

---

## 📊 Repository Structure

Your GitHub repository will contain:

```
ibm-partner-portal/
├── .gitignore                      # Git ignore rules
├── README.md                       # Main documentation
├── QUICKSTART.md                   # Quick start guide
├── FREE_DEPLOYMENT_GUIDE.md        # Free hosting options
├── IBM_CLOUD_DEPLOYMENT.md         # IBM Cloud deployment
├── SEISMIC_INTEGRATION_GUIDE.md    # Seismic integration
├── EXPORT_GUIDE.md                 # Export instructions
├── GITHUB_DEPLOYMENT.md            # This file
├── package.json                    # Dependencies
├── package-lock.json               # Dependency lock
├── create-export.sh                # Export script (Mac/Linux)
├── create-export.bat               # Export script (Windows)
├── public/                         # Public assets
├── src/                            # Source code
│   ├── components/                 # React components
│   ├── data/                       # JSON data files
│   ├── App.js                      # Main app
│   ├── App.scss                    # App styles
│   └── ...
└── ...
```

---

## 🔐 Security Best Practices

### Protect Sensitive Data

If you add API keys or secrets later:

1. **Never commit secrets to Git**
2. **Use environment variables**
3. **Add `.env` to `.gitignore`** (already done)
4. **Use GitHub Secrets** for CI/CD

### Example .env file (never commit this):
```bash
REACT_APP_API_KEY=your_secret_key
REACT_APP_SEISMIC_CLIENT_ID=your_client_id
```

---

## 🤝 Collaboration

### Invite Collaborators

1. Go to **Settings** → **Collaborators**
2. Click **Add people**
3. Enter GitHub usernames or emails
4. Set permissions (Read, Write, or Admin)

### Enable Issues

1. Go to **Settings** → **General**
2. Check **Issues** under "Features"
3. Colleagues can report bugs or suggest features

### Set Up Branch Protection

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch
3. Enable:
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date

---

## 📈 GitHub Actions (CI/CD)

### Automated Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

This will automatically deploy your site when you push to main!

---

## 📝 Commit Message Guidelines

Use clear, descriptive commit messages:

```bash
# Good examples:
git commit -m "Add: Seismic integration component"
git commit -m "Fix: Search functionality on mobile devices"
git commit -m "Update: Partner news data with latest articles"
git commit -m "Docs: Add deployment instructions"

# Categories:
# Add: New features
# Fix: Bug fixes
# Update: Changes to existing features
# Docs: Documentation changes
# Style: Code formatting
# Refactor: Code restructuring
# Test: Adding tests
```

---

## 🎯 Next Steps

1. ✅ **Create GitHub repository**
2. ✅ **Push code to GitHub**
3. ✅ **Deploy to GitHub Pages**
4. ✅ **Share repository URL with colleagues**
5. ✅ **Set up automated deployment (optional)**

---

## 📞 Support

- **GitHub Docs**: https://docs.github.com
- **GitHub Pages**: https://pages.github.com
- **GitHub Actions**: https://docs.github.com/actions

---

## 🎉 You're Ready!

Your IBM Partner Portal is ready to be shared on GitHub!

**Commands Summary:**

```bash
# 1. Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR-USERNAME/ibm-partner-portal.git
git push -u origin main

# 2. Deploy to GitHub Pages:
npm install --save-dev gh-pages
npm run deploy

# 3. Share your live site:
https://YOUR-USERNAME.github.io/ibm-partner-portal
```

**Happy coding!** 🚀