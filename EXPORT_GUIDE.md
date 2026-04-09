# 📦 Export Guide - Share Your IBM Partner Portal

## Quick Export Instructions

Follow these steps to create a shareable HTML export of your IBM Partner Portal.

---

## 🚀 Method 1: Build and Zip (Recommended)

### Step 1: Build Production Version
```bash
cd ibm-partner-portal
npm run build
```

This creates an optimized production build in the `build/` directory.

### Step 2: Create Zip File

**On macOS/Linux:**
```bash
cd ibm-partner-portal
zip -r ibm-partner-portal-export.zip build/ README.md QUICKSTART.md
```

**On Windows (PowerShell):**
```powershell
cd ibm-partner-portal
Compress-Archive -Path build\*,README.md,QUICKSTART.md -DestinationPath ibm-partner-portal-export.zip
```

### Step 3: Share the Zip File

The `ibm-partner-portal-export.zip` file now contains:
- ✅ All HTML, CSS, and JavaScript files
- ✅ Optimized and minified code
- ✅ All images and assets
- ✅ Documentation files

**File size**: Approximately 2-5 MB

---

## 📂 What's Inside the Export

```
ibm-partner-portal-export.zip
├── build/
│   ├── index.html              # Main HTML file
│   ├── static/
│   │   ├── css/               # Compiled CSS
│   │   ├── js/                # Compiled JavaScript
│   │   └── media/             # Images and fonts
│   ├── manifest.json          # PWA manifest
│   └── favicon.ico            # Site icon
├── README.md                  # Full documentation
└── QUICKSTART.md              # Quick start guide
```

---

## 🌐 How Colleagues Can View the Site

### Option 1: Simple HTTP Server (Easiest)

**Using Python (pre-installed on macOS/Linux):**
```bash
# Unzip the file
unzip ibm-partner-portal-export.zip

# Navigate to build directory
cd build

# Start server
python3 -m http.server 8000

# Open browser to: http://localhost:8000
```

**Using Node.js:**
```bash
# Install serve globally (one-time)
npm install -g serve

# Unzip and serve
unzip ibm-partner-portal-export.zip
cd build
serve -s . -p 8000

# Open browser to: http://localhost:8000
```

**Using VS Code:**
1. Unzip the file
2. Open `build` folder in VS Code
3. Install "Live Server" extension
4. Right-click `index.html` → "Open with Live Server"

---

### Option 2: Deploy to Free Hosting

**GitHub Pages:**
```bash
# Create new GitHub repo
# Upload build folder contents
# Enable GitHub Pages in repo settings
# Access at: https://username.github.io/repo-name
```

**Netlify Drop:**
1. Visit https://app.netlify.com/drop
2. Drag and drop the `build` folder
3. Get instant live URL
4. Share URL with colleagues

**Vercel:**
```bash
npm install -g vercel
cd build
vercel --prod
# Get instant live URL
```

---

## 📧 Sharing Options

### Option 1: Email
- Attach `ibm-partner-portal-export.zip` (2-5 MB)
- Include viewing instructions from above
- Recommend using Python HTTP server

### Option 2: Cloud Storage
- Upload to Google Drive / OneDrive / Dropbox
- Share link with colleagues
- Include README.md for instructions

### Option 3: Internal File Share
- Upload to company SharePoint / Box
- Share with team members
- Include deployment instructions

### Option 4: Live Demo URL
- Deploy to free hosting (Netlify/Vercel)
- Share live URL
- No installation needed for colleagues

---

## 🎯 Complete Package Script

Create this script to automate the export process:

**`create-export.sh` (macOS/Linux):**
```bash
#!/bin/bash

echo "🚀 Building IBM Partner Portal Export..."

# Navigate to project
cd ibm-partner-portal

# Build production version
echo "📦 Building production version..."
npm run build

# Create export directory
echo "📁 Creating export package..."
mkdir -p ../ibm-partner-portal-export
cp -r build ../ibm-partner-portal-export/
cp README.md ../ibm-partner-portal-export/
cp QUICKSTART.md ../ibm-partner-portal-export/
cp FREE_DEPLOYMENT_GUIDE.md ../ibm-partner-portal-export/

# Create viewing instructions
cat > ../ibm-partner-portal-export/VIEW_INSTRUCTIONS.txt << 'EOF'
IBM PARTNER PORTAL - VIEWING INSTRUCTIONS
==========================================

QUICK START:
1. Open Terminal/Command Prompt
2. Navigate to the 'build' folder
3. Run: python3 -m http.server 8000
4. Open browser to: http://localhost:8000

ALTERNATIVE METHODS:
- Use VS Code with Live Server extension
- Deploy to Netlify Drop (https://app.netlify.com/drop)
- Use Node.js 'serve' package: npm install -g serve && serve -s build

For full documentation, see README.md

Questions? Contact: [your-email@company.com]
EOF

# Create zip file
echo "🗜️  Creating zip file..."
cd ..
zip -r ibm-partner-portal-export.zip ibm-partner-portal-export/

echo "✅ Export complete!"
echo "📦 File: ibm-partner-portal-export.zip"
echo "📊 Size: $(du -h ibm-partner-portal-export.zip | cut -f1)"
echo ""
echo "Share this file with your colleagues!"
```

**Make it executable:**
```bash
chmod +x create-export.sh
./create-export.sh
```

**`create-export.bat` (Windows):**
```batch
@echo off
echo Building IBM Partner Portal Export...

cd ibm-partner-portal

echo Building production version...
call npm run build

echo Creating export package...
mkdir ..\ibm-partner-portal-export
xcopy /E /I build ..\ibm-partner-portal-export\build
copy README.md ..\ibm-partner-portal-export\
copy QUICKSTART.md ..\ibm-partner-portal-export\

echo Creating zip file...
cd ..
powershell Compress-Archive -Path ibm-partner-portal-export\* -DestinationPath ibm-partner-portal-export.zip -Force

echo Export complete!
echo File: ibm-partner-portal-export.zip
echo.
echo Share this file with your colleagues!
pause
```

---

## 📝 Include This Email Template

```
Subject: IBM Partner Portal - Demo Package

Hi Team,

I'm sharing the IBM Partner Portal demo for your review.

QUICK VIEW:
1. Unzip the attached file
2. Open Terminal/Command Prompt
3. Navigate to the 'build' folder
4. Run: python3 -m http.server 8000
5. Open: http://localhost:8000

FEATURES:
✅ IBM Carbon Design System styling
✅ 20+ partner news articles
✅ Featured events and videos
✅ Customer success stories
✅ Partner resource links
✅ Search functionality
✅ Responsive design

DOCUMENTATION:
- README.md - Full documentation
- QUICKSTART.md - Quick start guide
- VIEW_INSTRUCTIONS.txt - Viewing instructions

LIVE DEMO (optional):
[If deployed] Visit: https://your-demo-url.com

Questions? Let me know!

Best regards,
[Your Name]
```

---

## 🔧 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules
npm install
npm run build
```

### Zip File Too Large
```bash
# Build without source maps
GENERATE_SOURCEMAP=false npm run build
```

### Colleagues Can't View
- Ensure they unzip the file first
- Check if Python 3 is installed: `python3 --version`
- Try alternative: Node.js serve package
- Or deploy to free hosting for easy access

---

## 💡 Pro Tips

1. **Add Version Number**: Rename zip to include date
   ```bash
   mv ibm-partner-portal-export.zip ibm-partner-portal-v1.0-2026-04-09.zip
   ```

2. **Include Screenshots**: Add screenshots to the zip
   ```bash
   mkdir screenshots
   # Add screenshots
   zip -r export.zip build/ screenshots/ README.md
   ```

3. **Create Demo Video**: Record a quick walkthrough
   - Use Loom, QuickTime, or OBS
   - Include in the package

4. **Add Release Notes**: Document what's included
   ```markdown
   # Release Notes - v1.0
   - Initial release
   - 20 news articles
   - Featured highlights section
   - Full IBM Carbon styling
   ```

---

## 📊 Export Checklist

Before sharing, verify:
- [ ] Build completes successfully
- [ ] All pages load correctly
- [ ] Images and assets display
- [ ] Search functionality works
- [ ] Navigation works properly
- [ ] Responsive design works
- [ ] Documentation included
- [ ] Viewing instructions clear
- [ ] File size reasonable (<10 MB)
- [ ] Tested on local server

---

## 🚀 Next Steps After Sharing

1. **Gather Feedback**: Ask colleagues for input
2. **Track Issues**: Note any bugs or suggestions
3. **Iterate**: Make improvements based on feedback
4. **Deploy**: Move to production hosting when ready

---

**Ready to share your IBM Partner Portal!** 🎉