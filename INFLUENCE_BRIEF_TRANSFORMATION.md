# IBM Partner Influence Brief Hub - Transformation Guide

## Overview

This document describes the transformation of the IBM Partner Portal from a content-heavy news portal into a curated **Partner Influence Brief Hub** designed for strategic partner influencers.

## Transformation Summary

### From: Generic Partner Portal
- **Audience**: General partners
- **Content**: 20+ news articles, broad resource grids, generic videos
- **Navigation**: Category-based (All/Automation/Data & AI)
- **Approach**: Volume-driven content aggregation
- **Design**: Dense information architecture

### To: Partner Influence Brief Hub
- **Audience**: Architects, Practice Leaders, CTOs, Alliance Leaders
- **Content**: 3 curated priorities, strategic themes, actionable insights
- **Navigation**: Decision-based (Priorities/By Role/Themes/Events/Activate)
- **Approach**: Strategic curation and editorial framing
- **Design**: Clean hierarchy with maximum 3 items per section

## Key Design Principles

1. **Curation over Volume**: Maximum 3 items per section
2. **Strategic Framing**: Answer "What matters now? Why care? What to say? What to do?"
3. **Role-Based Segmentation**: Tailored content without page duplication
4. **Equal Balance**: IBM Automation and Data & AI equally represented
5. **Executive Language**: Concise, strategic, decision-oriented copy
6. **One-Page Design**: All content accessible without navigation

## New Architecture

### 1. Hero Section (Editorial Strategic)
**Purpose**: Set monthly context and strategic framing

**Components**:
- Eyebrow: "April priorities for partners"
- Title: "3 conversations to lead now across Automation and Data & AI"
- Strategic intro paragraph
- Impact chips: Build, Differentiate, Sell
- "This month at a glance" panel (featured theme, key event, recommended action)

**File**: `src/components/HeroSection.js`

### 2. Three Priorities This Month
**Purpose**: Curated monthly themes connecting IBM direction with partner conversations

**Structure** (3 items max):
- Theme label (Automation/Data & AI/Both)
- Title
- "Why it matters" explanation
- Best audience tags
- CTA button
- Action tags (Decide/Build/Sell/Differentiate)

**Example Priorities**:
1. Agentic orchestration moves from concept to operating model
2. Responsible AI becomes a design requirement
3. Automation stories need a value narrative

**File**: `src/components/PrioritiesSection.js`

### 3. Why This Matters
**Purpose**: Three practical lenses for understanding impact

**Lenses**:
- **Architecture Impact**: Integration patterns, governance, observability
- **Offer/Practice Impact**: New service lines, attach opportunities
- **Business Impact**: Differentiation, C-level conversations, activation paths

**File**: `src/components/WhyMattersSection.js`

### 4. Read by Role
**Purpose**: Tailored guidance for different partner roles

**Roles** (4 tabs):
- **Architects**: What to watch, say, do
- **Practice Leaders**: What to watch, say, do
- **CTOs**: What to watch, say, do
- **Alliances & Sales Leaders**: What to watch, say, do

**File**: `src/components/ByRoleSection.js`

### 5. Strategic Themes
**Purpose**: Key focus areas across portfolios

**Structure**: 2-column layout
- **Left Column**: 3 Automation themes
- **Right Column**: 3 Data & AI themes

**Each Theme Includes**:
- Title
- IBM POV
- Partner value proposition
- CTA link

**File**: `src/components/StrategicThemesSection.js`

### 6. Events Worth Attention
**Purpose**: Curated sessions for enablement (2-3 events only)

**Event Details**:
- Event name
- Why attend
- Best audience
- Date
- Registration CTA

**File**: `src/components/EventsAndSignalsSection.js`

### 7. Signals from the Market
**Purpose**: Proof points and trends (2-3 items only)

**Signal Types**:
- Adoption trends
- Ecosystem developments
- Convergence insights

**Each Signal**:
- Title
- The signal (data/trend)
- What it means (implication)

**File**: `src/components/EventsAndSignalsSection.js`

### 8. Activate Now
**Purpose**: Four pathways to action

**Activation Tiles** (4 items):
1. **Sales Plays**: Co-sell plays, conversation starters
2. **Technical Enablement**: Architecture briefs, demos
3. **Training**: Learning paths, certifications
4. **Partner Programs**: Co-marketing, funding

**File**: `src/components/ActivateSection.js`

### 9. Editor Note
**Purpose**: Explain monthly selection rationale

**Content**: Brief explanation of why these priorities were chosen and how they connect to market dynamics.

## Data Structure

### Main Data File
**Location**: `src/data/influenceBriefData.json`

**Structure**:
```json
{
  "monthlyContext": { /* Hero content */ },
  "priorities": [ /* 3 priorities */ ],
  "whyThisMatters": { /* 3 lenses */ },
  "byRole": { /* 4 role tabs */ },
  "strategicThemes": {
    "automation": [ /* 3 themes */ ],
    "dataAI": [ /* 3 themes */ ]
  },
  "events": [ /* 2-3 events */ ],
  "marketSignals": [ /* 2-3 signals */ ],
  "activationPaths": [ /* 4 tiles */ ],
  "editorNote": { /* Monthly rationale */ }
}
```

## Navigation Changes

### Old Navigation
- All
- Automation
- Data & AI

### New Navigation
- **Priorities**: Jump to monthly priorities
- **By Role**: Jump to role-based content
- **Themes**: Jump to strategic themes
- **Events**: Jump to events section
- **Activate**: Jump to activation paths

## Component Inventory

### New Components Created
1. `HeroSection.js` + `.scss` - Editorial hero with glance panel
2. `PrioritiesSection.js` + `.scss` - 3 monthly priorities
3. `WhyMattersSection.js` + `.scss` - 3 impact lenses
4. `ByRoleSection.js` + `.scss` - 4 role tabs
5. `StrategicThemesSection.js` + `.scss` - 2-column themes
6. `EventsAndSignalsSection.js` + `.scss` - Events + market signals
7. `ActivateSection.js` + `.scss` - 4 activation tiles

### Deprecated Components
- `FeaturedHighlights.js` - Replaced by curated sections
- `NewsSection.js` - Replaced by PrioritiesSection
- `PartnersSection.js` - Replaced by ActivateSection
- `SearchBar.js` - Removed (not needed in curated approach)

## Content Guidelines

### Writing Style
- **Strategic**: Focus on business impact, not features
- **Concise**: Maximum 2-3 sentences per explanation
- **Executive-level**: Suitable for C-suite conversations
- **Action-oriented**: Clear next steps

### Content Curation Rules
1. **Maximum 3 items** per section (except activation = 4)
2. **Equal representation** of Automation and Data & AI
3. **Role relevance** clearly indicated
4. **Actionable CTAs** on every card
5. **Monthly refresh** of all content

### Audience Targeting
- **Architects**: Technical depth, integration patterns
- **Practice Leaders**: Service offerings, business models
- **CTOs**: Strategic direction, enterprise fit
- **Alliances**: Co-sell, route-to-market

## Monthly Update Process

### Content Refresh Checklist
1. Update `monthlyContext` with new month and themes
2. Select 3 new priorities (ensure Automation/Data & AI balance)
3. Update "Why This Matters" lenses
4. Refresh role-based guidance
5. Update strategic themes if IBM direction changes
6. Curate 2-3 upcoming events
7. Add 2-3 new market signals
8. Update editor note with rationale
9. Review all CTAs and links

### Update Frequency
- **Monthly**: Full content refresh
- **Weekly**: Event updates, market signals
- **As needed**: Breaking news, urgent priorities

## Technical Implementation

### Technology Stack
- **React 18**: Functional components with hooks
- **IBM Carbon Design System**: Components and design tokens
- **SCSS**: Styling with Carbon mixins
- **JSON**: Data management

### Key Features
- **Smooth scrolling**: Navigation jumps to sections
- **Responsive design**: Mobile-first with Carbon breakpoints
- **Accessibility**: ARIA labels, keyboard navigation
- **Performance**: Optimized component rendering

### Build Commands
```bash
npm start          # Development server
npm run build      # Production build
npm run export     # Export for sharing
```

## Design Tokens

### Color Palette
- **Primary**: IBM Blue (#0f62fe)
- **Automation**: Purple accent
- **Data & AI**: Cyan accent
- **Background**: g100 theme (dark)

### Spacing
- Section padding: `$spacing-10` (desktop), `$spacing-08` (mobile)
- Card gaps: `$spacing-06`
- Content max-width: 1584px

### Typography
- **Headings**: IBM Plex Sans
- **Body**: IBM Plex Sans
- **Scale**: Carbon type scale

## Success Metrics

### Engagement Goals
- Time on page > 3 minutes
- Section scroll depth > 80%
- CTA click-through rate > 15%
- Return visitor rate > 40%

### Content Quality
- Partner feedback score > 4.5/5
- Relevance rating > 90%
- Actionability score > 85%

## Future Enhancements

### Phase 2 Considerations
1. **Personalization**: Role-based default view
2. **Bookmarking**: Save priorities for later
3. **Sharing**: Export individual sections
4. **Analytics**: Track engagement by role
5. **Notifications**: Alert on new priorities
6. **Search**: Focused search within curated content
7. **Archive**: Access previous months' briefs

## Maintenance

### Regular Tasks
- **Monthly**: Content refresh
- **Quarterly**: Design review
- **Annually**: Strategy alignment

### Content Ownership
- **IBM Product Marketing**: Priority selection
- **Partner Enablement**: Role-based content
- **Technical Marketing**: Architecture guidance
- **Alliance Team**: Activation paths

## Support

### Questions?
- Technical issues: Check GitHub repository
- Content questions: Contact partner enablement team
- Design feedback: Submit via feedback form

---

**Last Updated**: April 2026  
**Version**: 2.0 (Influence Brief Hub)  
**Repository**: https://github.com/githubkolja/-ibm-partner-portal

Made with Bob - Partner Influence Brief Hub Edition