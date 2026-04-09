# Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd ibm-partner-portal
npm install
```

### 2. Start Development Server
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

### 3. Explore the Portal

**Navigation:**
- Click "All", "Automation", or "Data & AI" in the header to filter content
- Use the search bar to find specific news or resources
- Scroll through partner news cards
- Expand accordion sections to view partner links

## Key Features to Try

✅ **Search Functionality**: Type keywords like "watsonx", "RPA", or "automation"  
✅ **Category Filtering**: Switch between All, Automation, and Data & AI  
✅ **News Cards**: Click "Read more" to visit external links  
✅ **Partner Resources**: Expand categories to see organized partner links  
✅ **Responsive Design**: Resize your browser to see mobile/tablet layouts  

## Updating Content

### Add News Article
Edit `src/data/newsData.json`:
```json
{
  "id": 11,
  "title": "Your News Title",
  "category": "Automation",
  "date": "2026-04-09",
  "summary": "Brief description...",
  "link": "https://example.com",
  "tags": ["tag1", "tag2"]
}
```

### Add Partner Link
Edit `src/data/partnersData.json`:
```json
{
  "name": "New Partner",
  "description": "What they offer",
  "url": "https://partner.com",
  "type": "Product"
}
```

## Build for Production
```bash
npm run build
```

Output will be in the `build/` directory, ready to deploy!

## Need Help?
See the full [README.md](README.md) for detailed documentation.