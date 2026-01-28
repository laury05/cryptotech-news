# CryptoTech News - RSS Feed Aggregator

A modern, mobile-responsive news aggregator for Crypto, Blockchain, Technology, and Stock Market news. Built with Node.js, Express, SQLite, and vanilla JavaScript.

## Features

✨ **Comprehensive News Aggregation**
- 8+ categories covering crypto, blockchain, tech, AI, and finance
- Pulls from 50+ RSS feeds daily
- Featured article on homepage
- Category-based browsing

🎨 **Modern Tech Design**
- Dark theme with vibrant accents
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Real-time search functionality
- Infinite scroll with load more button

🗄️ **Robust Backend**
- SQLite database for article storage
- RSS feed parsing with error handling
- Auto-refresh feeds every 30 minutes
- RESTful API

📱 **Mobile Optimized**
- Touch-friendly navigation
- Fast loading times
- Responsive grid layouts
- Optimized images

## Installation

### Prerequisites
- Node.js 14+ installed
- npm or yarn

### Setup Steps

1. **Navigate to project directory**
```bash
cd "c:\xampp\htdocs\CryptoTech News"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```
The server will run on `http://localhost:5000`

**For development with auto-reload:**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5000` in your web browser

## Categories

The platform includes the following news categories:

- **Crypto & Blockchain** - General cryptocurrency news
- **Blockchain Tech** - Technical blockchain updates
- **AI & Machine Learning** - AI news and developments
- **Technology** - General tech news
- **Startup & Innovation** - Startup and innovation stories
- **Stock Market & Finance** - Financial markets and trading
- **Cybersecurity** - Security news and updates
- **Web3 & DeFi** - Decentralized finance news

## RSS Feed Sources

The site aggregates from 50+ premium sources including:
- CoinDesk, CoinTelegraph, CryptoSlate
- TechCrunch, The Verge, Wired
- CNBC, Bloomberg, Reuters
- MIT Technology Review, OpenAI, Google AI
- Y Combinator, Product Hunt
- And many more...

## API Endpoints

### Get All Categories
```
GET /api/categories
```
Returns list of all news categories

### Get Articles by Category
```
GET /api/articles/category/:categoryId
```
Returns articles for a specific category
- Optional query parameter: `limit=20`

### Get All Articles
```
GET /api/articles
```
Returns latest articles across all categories
- Optional query parameter: `limit=50`

### Search Articles
```
GET /api/search?q=keyword
```
Returns articles matching the search query

## Database Schema

### Categories Table
- `id` - Primary key
- `name` - Category name
- `created_at` - Timestamp

### Articles Table
- `id` - Primary key
- `category_id` - Foreign key to categories
- `title` - Article title
- `description` - Article summary
- `link` - Original article URL
- `image_url` - Article thumbnail
- `pub_date` - Publication date
- `source` - RSS feed source
- `created_at` - Added timestamp

### RSS Feeds Table
- `id` - Primary key
- `category_id` - Foreign key to categories
- `url` - RSS feed URL
- `last_updated` - Last successful fetch

## File Structure

```
CryptoTech News/
├── server.js              # Express server & API
├── package.json           # Dependencies
├── .env                   # Environment variables
├── news.db               # SQLite database (auto-created)
├── public/
│   ├── index.html        # Main HTML page
│   ├── styles.css        # Responsive styles
│   └── app.js            # Client-side JavaScript
└── README.md             # This file
```

## Features Explained

### Real-Time News Feed
- Automatically fetches feeds every 30 minutes
- Shows article title, image, summary, and source
- Direct links to original articles

### Search Functionality
- Full-text search across all articles
- Search in title and description
- Real-time results

### Category Navigation
- Sticky navigation bar
- Browse by category
- "All News" shows latest across all categories

### Featured Article
- Prominent display of latest/trending article
- Large image and full summary
- Desktop-first design with responsive fallback

### Load More
- Pagination with 12 articles per load
- Click to load additional articles
- Shows remaining count

## Customization

### Add New Categories
Edit the `categories` object in `server.js`:
```javascript
const categories = {
  'Your Category': [
    'https://example-rss-feed-1.com/rss',
    'https://example-rss-feed-2.com/rss'
  ]
};
```

### Change Colors
Edit CSS variables in `public/styles.css`:
```css
:root {
    --primary: #00d4ff;        /* Cyan accent */
    --secondary: #0f0f23;      /* Dark background */
    --accent: #1a1a3e;         /* Lighter dark */
    --text: #e0e0e0;           /* Light text */
    /* ... more variables ... */
}
```

### Adjust Feed Refresh
In `server.js`, change the interval:
```javascript
// Refresh every 30 minutes (default)
setInterval(fetchAllFeeds, 30 * 60 * 1000);
```

## Troubleshooting

### Port Already in Use
Change the PORT in `.env` file or run:
```bash
npm start -- --port 3000
```

### Database Errors
Delete `news.db` and restart the server to reinitialize

### RSS Feed Not Updating
- Check internet connection
- Verify feed URLs are still valid
- Check server console for errors

### Images Not Loading
- Some feeds may not include images
- Fallback to emoji icon (📰) is used
- Verify CORS settings if fetching external images

## Performance Tips

- The database stores articles efficiently
- Initial load aggregates 50+ feeds
- Subsequent requests use cached data
- Auto-refresh every 30 minutes keeps content fresh

## License

MIT License - Feel free to use and modify

## Support

For issues or suggestions, check the code comments or review the API endpoints documentation above.

---

**CryptoTech News** - Your Source for Crypto, Blockchain & Tech News
