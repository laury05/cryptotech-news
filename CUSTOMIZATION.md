# CryptoTech News - Configuration & Customization Examples

## 🎨 Customization Guide

This guide shows you how to customize colors, categories, feeds, and more.

---

## 🌈 Change Color Scheme

### Edit: `public/styles.css` (Lines 1-14)

Current dark theme with cyan accents:
```css
:root {
    --primary: #00d4ff;      /* Cyan - main accent */
    --secondary: #0f0f23;    /* Very dark blue */
    --accent: #1a1a3e;       /* Dark purple */
    --text: #e0e0e0;         /* Light gray text */
    --text-dark: #a0a0a0;    /* Darker gray */
    --border: #2a2a4e;       /* Border color */
    --success: #00ff88;      /* Green - buttons */
    --warning: #ffaa00;      /* Orange - alerts */
}
```

### Example: Cyberpunk Purple Theme
```css
:root {
    --primary: #ff00ff;      /* Magenta */
    --secondary: #0a0a0f;    /* Almost black */
    --accent: #1a0a2e;       /* Deep purple */
    --text: #f0f0f0;         /* White */
    --text-dark: #808080;    /* Gray */
    --border: #3d2645;       /* Purple border */
    --success: #00ff9f;      /* Green */
    --warning: #ffff00;      /* Yellow */
}
```

### Example: Ocean Blue Theme
```css
:root {
    --primary: #0099ff;      /* Bright blue */
    --secondary: #001a33;    /* Dark blue */
    --accent: #003366;       /* Ocean blue */
    --text: #e6f2ff;         /* Light blue-white */
    --text-dark: #99ccff;    /* Medium blue */
    --border: #1a4d99;       /* Blue border */
    --success: #00ff99;      /* Green */
    --warning: #ffcc00;      /* Gold */
}
```

### Example: Light Professional Theme
```css
:root {
    --primary: #1e88e5;      /* Professional blue */
    --secondary: #ffffff;    /* White background */
    --accent: #f5f5f5;       /* Light gray */
    --text: #212121;         /* Dark text */
    --text-dark: #616161;    /* Gray text */
    --border: #e0e0e0;       /* Light border */
    --success: #43a047;      /* Green */
    --warning: #fb8c00;      /* Orange */
}
```

---

## 📰 Add New Categories

### Edit: `server.js` (Lines 19-45)

Current categories:
```javascript
const categories = {
  'Crypto & Blockchain': [...feeds...],
  'Blockchain Tech': [...feeds...],
  'AI & Machine Learning': [...feeds...],
  'Technology': [...feeds...],
  'Startup & Innovation': [...feeds...],
  'Stock Market & Finance': [...feeds...],
  'Cybersecurity': [...feeds...],
  'Web3 & DeFi': [...feeds...]
};
```

### Example: Add "Gaming & NFTs"
```javascript
const categories = {
  // ... existing categories ...
  'Gaming & NFTs': [
    'https://www.playtoearn.net/feed',
    'https://www.gameswithbitcoin.com/feed',
    'https://metapress.substack.com/feed',
    'https://nftnow.com/feed'
  ]
};
```

### Example: Add "Breaking News" (Top Priority)
```javascript
const categories = {
  'Breaking News': [
    'https://www.coindesk.com/arc/outboundfeeds/rss/',
    'https://techcrunch.com/feed/',
    'https://www.theverge.com/rss/index.xml'
  ],
  // ... rest of categories ...
};
```

### Example: Add Industry-Specific Categories
```javascript
const categories = {
  'Energy & Sustainability': [
    'https://www.greentechmedia.com/feed',
    'https://energypost.eu/feed/'
  ],
  'Healthcare Tech': [
    'https://www.mobihealthnews.com/feed',
    'https://www.healthcareitmuse.com/feed'
  ],
  'Real Estate Tech': [
    'https://www.protech.com/feed',
    'https://www.bisnow.com/feed'
  ],
  // ... more categories ...
};
```

---

## 🔗 Add More RSS Feeds

### Find RSS Feed URLs

Most news sites have RSS feeds. Look for:
1. `/rss` or `/feed` at end of domain
2. RSS icon (orange rectangle with lines)
3. Search "[site name] rss feed"

### Common Sites with RSS
- TechCrunch: `https://techcrunch.com/feed/`
- Medium: `https://medium.com/feed/topic-name`
- Substack: `[newsletter-url]/feed`
- YouTube: `https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID`

### Example: Add Feeds to Technology Category

In `server.js`:
```javascript
'Technology': [
    'https://techcrunch.com/feed/',
    'https://www.theverge.com/rss/index.xml',
    'https://www.wired.com/feed/rss',
    'https://feeds.arstechnica.com/arstechnica/index',
    'https://gizmodo.com/rss',
    // ADD NEW FEEDS HERE:
    'https://www.slashgear.com/feed',
    'https://feeds.macrumors.com/macrumors/',
    'https://www.gsmarena.com/feeds/'
]
```

---

## ⚙️ Server Configuration

### Edit: `.env` file

#### Change Port
```env
PORT=5000          # Default: 5000
```

To use different port:
```env
PORT=3000          # Use port 3000 instead
PORT=8080          # Use port 8080
PORT=80            # HTTP default (requires admin)
```

#### Change Environment
```env
NODE_ENV=development    # Development mode (detailed logs)
NODE_ENV=production     # Production mode (minimal logs)
```

---

## 🔄 Feed Refresh Settings

### Edit: `server.js` (Line 130)

Current: Updates every 30 minutes
```javascript
setInterval(fetchAllFeeds, 30 * 60 * 1000);
```

### Examples:

**Every 15 minutes** (more frequent updates):
```javascript
setInterval(fetchAllFeeds, 15 * 60 * 1000);
```

**Every hour** (less frequent):
```javascript
setInterval(fetchAllFeeds, 60 * 60 * 1000);
```

**Every 5 minutes** (very frequent):
```javascript
setInterval(fetchAllFeeds, 5 * 60 * 1000);
```

**Disable auto-refresh** (manual only):
```javascript
// Just comment out or delete the line
// setInterval(fetchAllFeeds, 30 * 60 * 1000);
```

---

## 📄 Frontend Customization

### Edit: `public/app.js`

#### Change Articles Per Page
```javascript
const articlesPerPage = 12;    // Currently shows 12 articles
```

Change to:
```javascript
const articlesPerPage = 20;    // Show 20 per page
const articlesPerPage = 6;     // Show 6 per page
```

#### Change Featured Article Count
```javascript
// Display 1 featured article, rest in grid
displayFeaturedArticle(allArticles[0]);
displayArticles(allArticles.slice(1));

// Change to 2 featured articles:
displayFeaturedArticle(allArticles[0]);
displayFeaturedArticle(allArticles[1]);
displayArticles(allArticles.slice(2));
```

#### Customize Search Settings
```javascript
// Currently searches both title and description
`SELECT a.*, c.name as category_name FROM articles a
 JOIN categories c ON a.category_id = c.id
 WHERE a.title LIKE ? OR a.description LIKE ?`

// Change to title only:
WHERE a.title LIKE ?

// Change to include source:
WHERE a.title LIKE ? OR a.description LIKE ? OR a.source LIKE ?
```

---

## 🎨 Header Customization

### Edit: `public/index.html` (Lines 6-30)

#### Change Site Title
```html
<title>CryptoTech News - Crypto, Blockchain & Tech News Aggregator</title>
```

Change to:
```html
<title>BlockNews Pro - Premium Blockchain Updates</title>
```

#### Change Logo Text
```html
<span>CryptoTech News</span>
```

Change to:
```html
<span>BlockNews Pro</span>
```

#### Change Tagline
```html
<p class="tagline">Your Source for Crypto, Blockchain & Tech News</p>
```

Change to:
```html
<p class="tagline">Premium News Aggregation Platform</p>
```

#### Change Logo Icon
Replace the SVG (lines 13-17) with:

**Bitcoin Symbol**:
```html
<svg viewBox="0 0 40 40" width="40" height="40">
    <text x="20" y="28" text-anchor="middle" font-size="32" fill="#00d4ff">₿</text>
</svg>
```

**Simple Dot**:
```html
<svg viewBox="0 0 40 40" width="40" height="40">
    <circle cx="20" cy="20" r="8" fill="#00d4ff"/>
</svg>
```

**News Icon**:
```html
<svg viewBox="0 0 40 40" width="40" height="40">
    <rect x="6" y="6" width="28" height="28" fill="none" stroke="#00d4ff" stroke-width="2" rx="2"/>
    <line x1="10" y1="12" x2="30" y2="12" stroke="#00d4ff" stroke-width="2"/>
    <line x1="10" y1="18" x2="30" y2="18" stroke="#00d4ff" stroke-width="1"/>
    <line x1="10" y1="24" x2="26" y2="24" stroke="#00d4ff" stroke-width="1"/>
</svg>
```

---

## 📱 Layout Customization

### Edit: `public/styles.css`

#### Grid Columns
```css
.articles-grid {
    /* Current: 3 columns on large screens */
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}
```

Change to:
```css
/* 4 columns (more articles visible) */
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

/* 2 columns (larger cards) */
grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));

/* Single column (narrow display) */
grid-template-columns: 1fr;
```

#### Featured Article Layout
```css
.featured-article {
    /* Current: side-by-side on desktop */
    grid-template-columns: 1fr 1fr;
}
```

Change to:
```css
/* Image on top, text below */
grid-template-columns: 1fr;

/* Image larger */
grid-template-columns: 2fr 1fr;
```

---

## 🔒 Performance Tuning

### Limit Articles Stored

Edit `server.js`, modify fetch function (line 100):
```javascript
// Current: stores 20 articles per feed
feed.items.slice(0, 20).forEach(item => {

// Change to store more:
feed.items.slice(0, 50).forEach(item => {

// Or fewer (faster startup):
feed.items.slice(0, 10).forEach(item => {
```

### Database Cleanup

Add to `server.js` to delete old articles (over 30 days):
```javascript
function cleanupOldArticles() {
  db.run(`
    DELETE FROM articles 
    WHERE pub_date < date('now', '-30 days')
  `);
}

// Run cleanup on startup
cleanupOldArticles();

// Run daily
setInterval(cleanupOldArticles, 24 * 60 * 60 * 1000);
```

---

## 🌐 Multi-Language Support

### Add Language Option

In `public/index.html`, add language selector:
```html
<select id="languageSelect" class="language-select">
    <option value="en">English</option>
    <option value="es">Español</option>
    <option value="fr">Français</option>
    <option value="de">Deutsch</option>
</select>
```

In `public/app.js`, add translation:
```javascript
const translations = {
    'en': {
        'read_more': 'Read More',
        'load_more': 'Load More Articles',
        'search': 'Search news...'
    },
    'es': {
        'read_more': 'Leer Más',
        'load_more': 'Cargar Más Artículos',
        'search': 'Buscar noticias...'
    }
};
```

---

## 📊 Analytics Integration

### Add Google Analytics

In `public/index.html`, add before closing `</body>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔐 API Rate Limiting

Add to `server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply to all requests
app.use(limiter);
```

---

## 🎯 Example: Complete Minimal Customization

Want just the essentials? Here's a quick setup:

### 1. Change color to your brand color in `styles.css`:
```css
--primary: #your-color-here;
```

### 2. Add your company logo in `index.html`:
```html
<span>Your Company News</span>
```

### 3. Add relevant RSS feeds in `server.js`:
```javascript
'Your Category': [
    'https://your-feed-1.com/rss',
    'https://your-feed-2.com/rss'
]
```

### 4. Start server:
```bash
npm start
```

Done! 🎉

---

## 📚 Further Reading

- **server.js**: Detailed comments on RSS parsing and database operations
- **public/app.js**: Comments on frontend functionality
- **public/styles.css**: CSS variable documentation at top
- **README.md**: Complete feature list and API documentation

---

**Happy customizing! 🚀**
