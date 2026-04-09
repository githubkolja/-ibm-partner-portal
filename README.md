# IBM Partner Portal - Automation & Data AI

A modern, IBM Carbon Design System-styled portal website showcasing partner news and resources for IBM's Automation and Data & AI products.

## 🚀 Features

- **IBM Carbon Design System**: Professional IBM-styled UI with the g100 (dark) theme
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop
- **Partner News Feed**: Dynamic news cards with filtering and pagination
- **Categorized Partner Links**: Organized resources by product categories (watsonx, Cloud Pak, etc.)
- **Search Functionality**: Real-time search across news articles and partner resources
- **Category Navigation**: Filter content by Automation or Data & AI categories
- **Interactive Components**: Accordion-based partner sections with structured lists

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **IBM Carbon Components React**: Official IBM design system components
- **IBM Carbon Icons**: Comprehensive icon library
- **SCSS**: Styling with Carbon design tokens
- **JSON Data**: Easy-to-update content management

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## 🏃 Getting Started

### Installation

1. Navigate to the project directory:
```bash
cd ibm-partner-portal
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm start
```

The application will open in your browser at [http://localhost:3000](http://localhost:3000)

### Building for Production

Create an optimized production build:
```bash
npm run build
```

The build files will be in the `build/` directory.

## 📁 Project Structure

```
ibm-partner-portal/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/         # React components
│   │   ├── SearchBar.js    # Search functionality
│   │   ├── NewsSection.js  # News feed component
│   │   └── PartnersSection.js  # Partner links component
│   ├── data/              # JSON data files
│   │   ├── newsData.json  # Partner news articles
│   │   └── partnersData.json  # Partner resources
│   ├── App.js             # Main application component
│   ├── App.scss           # Application styles
│   ├── index.js           # React entry point
│   └── index.scss         # Global styles
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 📝 Content Management

### Updating News Articles

Edit `src/data/newsData.json` to add or modify news articles:

```json
{
  "id": 1,
  "title": "Article Title",
  "category": "Automation" or "Data & AI",
  "date": "YYYY-MM-DD",
  "summary": "Article summary text",
  "link": "https://example.com",
  "tags": ["tag1", "tag2"]
}
```

### Updating Partner Links

Edit `src/data/partnersData.json` to add or modify partner resources:

```json
{
  "id": 1,
  "category": "Category Name",
  "partners": [
    {
      "name": "Partner Name",
      "description": "Description text",
      "url": "https://example.com",
      "type": "Product|Solution|Service|Technology Partner|Resource"
    }
  ]
}
```

## 🎨 Customization

### Themes

The portal uses IBM Carbon's g100 (dark) theme by default. To change the theme, modify the `Theme` component in `src/App.js`:

```jsx
<Theme theme="white">  // Options: white, g10, g90, g100
```

### Colors and Styling

All styling uses IBM Carbon design tokens. Modify SCSS files to customize:
- `src/App.scss` - Main application styles
- `src/components/*.scss` - Component-specific styles

### Navigation Categories

Update the navigation categories in `src/App.js`:

```jsx
<HeaderMenuItem>Category Name</HeaderMenuItem>
```

## 🔍 Key Components

### SearchBar
- Real-time search functionality
- Filters both news and partner resources
- Clear button to reset search

### NewsSection
- Displays news articles in a card grid
- Category and search filtering
- Load more pagination
- Responsive grid layout

### PartnersSection
- Accordion-based organization
- Structured list display
- Category icons and tags
- External link handling

## 📱 Responsive Breakpoints

- **Small (sm)**: < 672px (Mobile)
- **Medium (md)**: 672px - 1056px (Tablet)
- **Large (lg)**: 1056px - 1312px (Desktop)
- **Extra Large (xlg)**: > 1312px (Large Desktop)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📚 IBM Product Categories

### Automation Products
- IBM Cloud Pak for Business Automation
- IBM Robotic Process Automation (RPA)
- IBM Process Mining
- IBM Automation Decision Services

### Data & AI Products
- watsonx.ai (AI development platform)
- watsonx.data (data lakehouse)
- watsonx.governance (AI governance)
- IBM Cloud Pak for Data
- IBM Watson Studio
- IBM DataStage

## 🤝 Contributing

To add new features or content:

1. Update the relevant JSON data files
2. Modify components as needed
3. Test responsiveness across breakpoints
4. Ensure IBM Carbon design guidelines are followed

## 📄 License

This project is created for demonstration purposes using IBM Carbon Design System.

## 🔗 Useful Links

- [IBM Carbon Design System](https://carbondesignsystem.com/)
- [IBM Carbon Components React](https://react.carbondesignsystem.com/)
- [IBM watsonx](https://www.ibm.com/watsonx)
- [IBM Automation](https://www.ibm.com/automation)

## 💡 Tips

- Use the search bar to quickly find specific products or news
- Click on category tags to filter content
- All external links open in new tabs
- The portal is optimized for both light and dark system preferences

## 🐛 Troubleshooting

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
npm run build
```
Check console for specific error messages.

### Styling Issues
Ensure all SCSS files are properly importing Carbon tokens:
```scss
@use '@carbon/react/scss/spacing' as *;
@use '@carbon/react/scss/theme' as *;
```

---

Built with ❤️ using IBM Carbon Design System
