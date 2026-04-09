# IBM Partner Influence Brief Hub

A curated strategic brief for IBM partner influencers across Automation and Data & AI portfolios. Designed for architects, practice leaders, CTOs, and alliance teams who need to connect IBM priorities with client conversations and activation paths.

## 🎯 Purpose

This is not a news portal—it's a **decision cockpit** that answers:
- **What matters now?** 3 curated monthly priorities
- **Why care?** Impact through architecture, offer, and business lenses
- **What to say?** Role-based talking points
- **What to do next?** Clear activation paths

## 🏗️ Architecture

### One-Page Design
All content accessible without navigation, organized into strategic sections:

1. **Hero**: Monthly context and strategic framing
2. **3 Priorities**: Curated themes connecting IBM direction with partner conversations
3. **Why This Matters**: Architecture, offer, and business impact lenses
4. **Read by Role**: Tailored guidance for 4 partner roles
5. **Strategic Themes**: 2-column view (Automation vs Data & AI)
6. **Events Worth Attention**: 2-3 curated enablement sessions
7. **Signals from the Market**: 2-3 proof points and trends
8. **Activate Now**: 4 pathways to action

### Design Principles
- ✅ **Maximum 3 items** per section (except activation = 4)
- ✅ **Equal balance** between Automation and Data & AI
- ✅ **Strategic language** suitable for C-level conversations
- ✅ **Role-based segmentation** without page duplication
- ✅ **Actionable CTAs** on every card

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
cd ibm-partner-portal
npm install
```

### Development
```bash
npm start
```
Opens at http://localhost:3000

### Production Build
```bash
npm run build
```
Creates optimized build in `build/` directory

### Export for Sharing
```bash
npm run export
```
Creates `ibm-partner-portal-export.zip` for sharing with colleagues

## 📁 Project Structure

```
ibm-partner-portal/
├── src/
│   ├── components/
│   │   ├── HeroSection.js              # Editorial hero with glance panel
│   │   ├── PrioritiesSection.js        # 3 monthly priorities
│   │   ├── WhyMattersSection.js        # 3 impact lenses
│   │   ├── ByRoleSection.js            # 4 role tabs
│   │   ├── StrategicThemesSection.js   # 2-column themes
│   │   ├── EventsAndSignalsSection.js  # Events + market signals
│   │   └── ActivateSection.js          # 4 activation tiles
│   ├── data/
│   │   └── influenceBriefData.json     # All curated content
│   ├── App.js                          # Main application
│   └── App.scss                        # Global styles
├── public/
│   └── index.html
└── package.json
```

## 🎨 Technology Stack

- **React 18**: Modern functional components with hooks
- **IBM Carbon Design System**: Enterprise-grade UI components
- **SCSS**: Styling with Carbon design tokens
- **JSON**: Structured content management

## 📝 Content Management

### Monthly Update Process

1. **Update Monthly Context** (`monthlyContext`)
   - New month and strategic framing
   - Update glance panel

2. **Select 3 Priorities** (`priorities`)
   - Ensure Automation/Data & AI balance
   - Clear "why it matters" for each

3. **Refresh Impact Lenses** (`whyThisMatters`)
   - Architecture, offer, business perspectives

4. **Update Role Guidance** (`byRole`)
   - What to watch, say, do for each role

5. **Review Strategic Themes** (`strategicThemes`)
   - Update if IBM direction changes

6. **Curate Events** (`events`)
   - 2-3 upcoming enablement sessions

7. **Add Market Signals** (`marketSignals`)
   - 2-3 proof points or trends

8. **Update Activation Paths** (`activationPaths`)
   - Ensure links are current

9. **Write Editor Note** (`editorNote`)
   - Explain monthly selection rationale

### Content File
All content is managed in: `src/data/influenceBriefData.json`

## 🎯 Target Audience

### Primary Roles
- **Architects**: Technical depth, integration patterns, governance
- **Practice Leaders**: Service offerings, business models, attach opportunities
- **CTOs**: Strategic direction, enterprise fit, operational impact
- **Alliance Leaders**: Co-sell plays, route-to-market, ecosystem collaboration

### Content Approach
- Strategic, not tactical
- Executive-level language
- Actionable insights
- Clear next steps

## 🌐 Deployment Options

### Option 1: IBM Cloud (Recommended)
See [IBM_CLOUD_DEPLOYMENT.md](./IBM_CLOUD_DEPLOYMENT.md) for detailed instructions.

### Option 2: Free Hosting
See [FREE_DEPLOYMENT_GUIDE.md](./FREE_DEPLOYMENT_GUIDE.md) for Netlify, Vercel, and GitHub Pages options.

### Option 3: Local Sharing
```bash
npm run export
```
Share the generated ZIP file with colleagues.

## 📊 Success Metrics

### Engagement Goals
- Time on page > 3 minutes
- Section scroll depth > 80%
- CTA click-through rate > 15%
- Return visitor rate > 40%

### Content Quality
- Partner feedback score > 4.5/5
- Relevance rating > 90%
- Actionability score > 85%

## 🔄 Transformation History

This portal was transformed from a content-heavy news aggregator into a curated strategic brief. See [INFLUENCE_BRIEF_TRANSFORMATION.md](./INFLUENCE_BRIEF_TRANSFORMATION.md) for complete details.

### Key Changes
- ❌ Removed: 20+ news articles, generic videos, broad resource grids
- ✅ Added: 3 curated priorities, role-based guidance, strategic themes
- 🔄 Changed: Navigation from category-based to decision-based
- 📐 Redesigned: From dense information to clean hierarchy

## 🛠️ Development

### Available Scripts

- `npm start` - Development server with hot reload
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run export` - Create shareable ZIP

### Code Style
- Functional React components
- IBM Carbon design patterns
- SCSS with Carbon mixins
- JSON for content management

## 📚 Documentation

- [Transformation Guide](./INFLUENCE_BRIEF_TRANSFORMATION.md) - Complete transformation details
- [IBM Cloud Deployment](./IBM_CLOUD_DEPLOYMENT.md) - Deploy to IBM Cloud
- [Free Deployment Guide](./FREE_DEPLOYMENT_GUIDE.md) - Free hosting options
- [Quick Start](./QUICKSTART.md) - Get started quickly

## 🤝 Contributing

### Content Updates
1. Edit `src/data/influenceBriefData.json`
2. Follow content guidelines (max 3 items per section)
3. Ensure Automation/Data & AI balance
4. Test locally before deploying

### Code Changes
1. Follow IBM Carbon design patterns
2. Maintain responsive design
3. Test across breakpoints
4. Update documentation

## 📄 License

© 2026 IBM Corporation. All rights reserved.

## 🔗 Links

- **Repository**: https://github.com/githubkolja/-ibm-partner-portal
- **IBM Carbon Design**: https://carbondesignsystem.com/
- **IBM Partner Plus**: https://www.ibm.com/partnerplus

## 💡 Key Features

### Strategic Curation
- Maximum 3 items per section
- Monthly refresh cycle
- Editorial selection rationale

### Role-Based Content
- 4 distinct role perspectives
- Tailored "watch, say, do" guidance
- No page duplication

### Equal Portfolio Balance
- IBM Automation themes
- IBM Data & AI themes
- Cross-portfolio priorities

### Actionable Design
- Clear CTAs on every card
- 4 activation pathways
- Direct links to resources

## 🎓 Best Practices

### For Content Editors
1. Keep language strategic and concise
2. Focus on "why it matters" not "what it is"
3. Ensure every item has a clear CTA
4. Balance Automation and Data & AI equally
5. Update monthly, not ad-hoc

### For Developers
1. Use Carbon components consistently
2. Maintain responsive design patterns
3. Keep data structure clean
4. Test across all breakpoints
5. Document any changes

## 📞 Support

### Questions?
- **Technical Issues**: Check GitHub repository issues
- **Content Questions**: Contact partner enablement team
- **Design Feedback**: Submit via feedback form

---

**Version**: 2.0 (Influence Brief Hub)  
**Last Updated**: April 2026  
**Made with**: React, IBM Carbon Design System, and Bob

🚀 **Ready to transform partner conversations with strategic insights!**
