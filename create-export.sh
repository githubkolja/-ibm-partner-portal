#!/bin/bash

echo "🚀 Building IBM Partner Portal Export Package..."
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

# Build production version
echo "📦 Step 1/4: Building production version..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi

echo "✅ Build complete!"
echo ""

# Create export directory
echo "📁 Step 2/4: Creating export package..."
rm -rf ../ibm-partner-portal-export
mkdir -p ../ibm-partner-portal-export
cp -r build ../ibm-partner-portal-export/
cp README.md ../ibm-partner-portal-export/ 2>/dev/null || true
cp QUICKSTART.md ../ibm-partner-portal-export/ 2>/dev/null || true
cp FREE_DEPLOYMENT_GUIDE.md ../ibm-partner-portal-export/ 2>/dev/null || true
cp EXPORT_GUIDE.md ../ibm-partner-portal-export/ 2>/dev/null || true

# Create viewing instructions
cat > ../ibm-partner-portal-export/VIEW_INSTRUCTIONS.txt << 'EOF'
═══════════════════════════════════════════════════════════
  IBM PARTNER PORTAL - VIEWING INSTRUCTIONS
═══════════════════════════════════════════════════════════

🚀 QUICK START (Recommended):

1. Open Terminal or Command Prompt
2. Navigate to the 'build' folder:
   cd build

3. Start a local server:
   
   Option A - Python (pre-installed on Mac/Linux):
   python3 -m http.server 8000
   
   Option B - Node.js:
   npx serve -s . -p 8000

4. Open your browser to:
   http://localhost:8000

═══════════════════════════════════════════════════════════

📱 ALTERNATIVE VIEWING METHODS:

VS Code:
1. Open the 'build' folder in VS Code
2. Install "Live Server" extension
3. Right-click index.html → "Open with Live Server"

Netlify Drop (Instant Online):
1. Visit: https://app.netlify.com/drop
2. Drag and drop the 'build' folder
3. Get instant live URL to share

═══════════════════════════════════════════════════════════

📚 DOCUMENTATION:

- README.md - Complete documentation
- QUICKSTART.md - Quick start guide
- FREE_DEPLOYMENT_GUIDE.md - Free hosting options
- EXPORT_GUIDE.md - Detailed export instructions

═══════════════════════════════════════════════════════════

✨ FEATURES INCLUDED:

✅ IBM Carbon Design System styling
✅ 20+ partner news articles covering all IBM brands
✅ Featured events and videos
✅ Customer success stories with metrics
✅ Partner resource links (60+ resources)
✅ Real-time search functionality
✅ Responsive design (mobile, tablet, desktop)
✅ Stats dashboard
✅ Upcoming events calendar

═══════════════════════════════════════════════════════════

❓ TROUBLESHOOTING:

Can't start server?
- Ensure Python 3 is installed: python3 --version
- Or install Node.js from: https://nodejs.org

Site not loading?
- Make sure you're in the 'build' folder
- Check if port 8000 is already in use
- Try a different port: python3 -m http.server 3000

Need help?
- Check EXPORT_GUIDE.md for detailed instructions
- See README.md for full documentation

═══════════════════════════════════════════════════════════

Built with ❤️ using IBM Carbon Design System
EOF

echo "✅ Export package created!"
echo ""

# Create zip file
echo "🗜️  Step 3/4: Creating zip file..."
cd ..
DATE=$(date +%Y-%m-%d)
ZIP_NAME="ibm-partner-portal-export-${DATE}.zip"

# Remove old zip if exists
rm -f "$ZIP_NAME"

# Create new zip
zip -r "$ZIP_NAME" ibm-partner-portal-export/ -x "*.DS_Store" > /dev/null

if [ $? -eq 0 ]; then
    echo "✅ Zip file created!"
    echo ""
    
    # Get file size
    SIZE=$(du -h "$ZIP_NAME" | cut -f1)
    
    echo "📊 Step 4/4: Export Summary"
    echo "═══════════════════════════════════════════════════════════"
    echo "✅ Export Complete!"
    echo ""
    echo "📦 File: $ZIP_NAME"
    echo "📊 Size: $SIZE"
    echo "📍 Location: $(pwd)/$ZIP_NAME"
    echo ""
    echo "═══════════════════════════════════════════════════════════"
    echo ""
    echo "🎉 Ready to share with your colleagues!"
    echo ""
    echo "📧 Sharing Options:"
    echo "   • Email the zip file (if under 10MB)"
    echo "   • Upload to Google Drive / OneDrive / Dropbox"
    echo "   • Share via company file server"
    echo "   • Deploy to free hosting (see FREE_DEPLOYMENT_GUIDE.md)"
    echo ""
    echo "📝 Don't forget to include VIEW_INSTRUCTIONS.txt!"
    echo ""
else
    echo "❌ Failed to create zip file"
    exit 1
fi

# Made with Bob
