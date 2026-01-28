const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');
const RSSParser = require('rss-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const os = require('os');

const app = express();
const parser = new RSSParser();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database path - use persistent directory on Render
const dbDir = process.env.NODE_ENV === 'production' ? '/tmp' : __dirname;
const dbPath = path.join(dbDir, 'news.db');

// Ensure directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

console.log('Using database path:', dbPath);

// Database initialization
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database error:', err);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
  initializeDatabase();
});

// Categories and RSS feeds
const categories = {
  'Crypto & Blockchain': [
    'https://www.coindesk.com/arc/outboundfeeds/rss/',
    'https://cointelegraph.com/rss',
    'https://cryptoslate.com/feed/',
    'https://bitcoinmagazine.com/.rss/full/',
    'https://cryptonews.com/news/feed/'
  ],
  'Blockchain Tech': [
    'https://consensys.net/blog/feed/',
    'https://blog.ethereum.org/feed.xml',
    'https://blog.coinbase.com/feed',
    'https://www.binance.com/en/blog/rss'
  ],
  'AI & Machine Learning': [
    'https://www.technologyreview.com/feed/',
    'https://venturebeat.com/category/ai/feed/',
    'https://openai.com/blog/rss/',
    'https://ai.googleblog.com/feeds/posts/default'
  ],
  'Technology': [
    'https://techcrunch.com/feed/',
    'https://www.theverge.com/rss/index.xml',
    'https://www.wired.com/feed/rss',
    'https://feeds.arstechnica.com/arstechnica/index',
    'https://gizmodo.com/rss'
  ],
  'Startup & Innovation': [
    'https://news.ycombinator.com/rss',
    'https://www.producthunt.com/feed',
    'https://techstartups.com/feed/'
  ],
  'Stock Market & Finance': [
    'https://www.cnbc.com/id/100003114/device/rss/rss.html',
    'https://www.ft.com/?format=rss',
    'https://feeds.content.dowjones.io/public/rss/mw_realtimeheadlines',
    'https://www.investopedia.com/feedbuilder/feed/getfeed?feedName=rss_articles',
    'https://finance.yahoo.com/news/rssindex'
  ],
  'Cybersecurity': [
    'https://krebsonsecurity.com/feed/',
    'https://feeds.feedburner.com/TheHackersNews'
  ],
  'Web3 & DeFi': [
    'https://messari.io/rss'
  ]
};

// Initialize database
function initializeDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Error creating categories table:', err);
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        link TEXT UNIQUE NOT NULL,
        image_url TEXT,
        pub_date DATETIME,
        source TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(category_id) REFERENCES categories(id)
      )
    `, (err) => {
      if (err) console.error('Error creating articles table:', err);
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS rss_feeds (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        url TEXT NOT NULL,
        last_updated DATETIME,
        FOREIGN KEY(category_id) REFERENCES categories(id)
      )
    `, (err) => {
      if (err) console.error('Error creating rss_feeds table:', err);
    });

    // Insert categories
    Object.keys(categories).forEach(categoryName => {
      db.run('INSERT OR IGNORE INTO categories (name) VALUES (?)', [categoryName], (err) => {
        if (err && err.code !== 'SQLITE_CONSTRAINT') console.error('Error inserting category:', err);
      });
    });

    // Schedule feed fetch after tables are created
    setTimeout(() => {
      console.log('Database initialized successfully');
      fetchAllFeeds();
    }, 500);
  });
}

// Fetch all feeds
async function fetchAllFeeds() {
  db.all('SELECT id, name FROM categories', async (err, categories) => {
    if (err) console.error(err);
    
    for (const cat of categories) {
      const feeds = global.categories[cat.name];
      if (feeds) {
        for (const feedUrl of feeds) {
          await fetchAndStoreFeed(cat.id, feedUrl, cat.name);
        }
      }
    }
  });
}

// Fetch and store individual feed
async function fetchAndStoreFeed(categoryId, feedUrl, categoryName) {
  try {
    const feed = await parser.parseURL(feedUrl);
    
    if (feed.items && feed.items.length > 0) {
      feed.items.slice(0, 20).forEach(item => {
        const imageUrl = item.enclosure?.url || item.image?.url || item['media:content']?.['url'] || '';
        
        db.run(
          `INSERT OR IGNORE INTO articles 
           (category_id, title, description, link, image_url, pub_date, source) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [categoryId, item.title, item.content || item.summary, item.link, imageUrl, item.pubDate, feedUrl]
        );
      });
      
      db.run('UPDATE rss_feeds SET last_updated = CURRENT_TIMESTAMP WHERE url = ?', [feedUrl]);
    }
  } catch (error) {
    console.error(`Error fetching feed ${feedUrl}:`, error.message);
  }
}

// Routes

// Get all categories
app.get('/api/categories', (req, res) => {
  db.all('SELECT * FROM categories ORDER BY name', (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// Get articles by category
app.get('/api/articles/category/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const limit = req.query.limit || 20;
  
  db.all(
    `SELECT * FROM articles WHERE category_id = ? 
     ORDER BY pub_date DESC LIMIT ?`,
    [categoryId, limit],
    (err, rows) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(rows);
    }
  );
});

// Get all articles (for homepage)
app.get('/api/articles', (req, res) => {
  const limit = req.query.limit || 50;
  
  db.all(
    `SELECT a.*, c.name as category_name FROM articles a
     LEFT JOIN categories c ON a.category_id = c.id
     ORDER BY a.pub_date DESC LIMIT ?`,
    [limit],
    (err, rows) => {
      if (err) {
        console.error('Error fetching articles:', err);
        return res.status(500).json({ error: err.message, rows: [] });
      }
      if (!rows || rows.length === 0) {
        console.warn('No articles found in database');
        return res.json([]);
      }
      res.json(rows);
    }
  );
});

// Search articles
app.get('/api/search', (req, res) => {
  const query = req.query.q;
  
  db.all(
    `SELECT a.*, c.name as category_name FROM articles a
     JOIN categories c ON a.category_id = c.id
     WHERE a.title LIKE ? OR a.description LIKE ?
     ORDER BY a.pub_date DESC LIMIT 50`,
    [`%${query}%`, `%${query}%`],
    (err, rows) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(rows);
    }
  );
});

// Store categories globally
global.categories = categories;

// Refresh feeds every 30 minutes
setInterval(fetchAllFeeds, 30 * 60 * 1000);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CryptoTech News server running on http://localhost:${PORT}`);
});
