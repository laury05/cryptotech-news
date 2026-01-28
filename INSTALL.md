# CryptoTech News Installation Guide

## ✅ What You Have

A complete, production-ready news aggregation platform with:
- ✨ 8 categories (Crypto, Blockchain, Tech, AI, Startups, Finance, Security, Web3)
- 📰 50+ premium RSS feed sources
- 🗄️ SQLite database for article storage
- 🌐 Beautiful, mobile-responsive interface
- 🔄 Auto-updating feeds every 30 minutes
- 🔍 Full-text search functionality

---

## 📋 Pre-Installation Checklist

Before you begin, make sure you have:

- [ ] Windows computer with PowerShell or Command Prompt
- [ ] Node.js 14+ (Download from https://nodejs.org/)
- [ ] npm (comes with Node.js)
- [ ] Internet connection (to fetch news feeds)
- [ ] Text editor (VS Code recommended)

---

## 🚀 Installation Steps

### Step 1: Verify Node.js Installation

Open PowerShell or Command Prompt and run:

```powershell
node --version
npm --version
```

You should see version numbers like `v16.0.0` and `8.0.0`

**If not installed**, download from: https://nodejs.org/

### Step 2: Navigate to Project Directory

```powershell
cd "C:\xampp\htdocs\CryptoTech News"
```

### Step 3: Install Dependencies

```powershell
npm install
```

This will:
- Read package.json
- Download and install 8 required packages
- Create node_modules folder
- Create package-lock.json for consistency
- **Takes 2-5 minutes** depending on internet speed

**What gets installed:**
```
✓ express (web framework)
✓ sqlite3 (database)
✓ rss-parser (feed parser)
✓ cors (cross-origin support)
✓ body-parser (request parsing)
✓ dotenv (configuration)
✓ nodemon (optional, for development)
```

### Step 4: Start the Server

```powershell
npm start
```

You should see:
```
Connected to SQLite database
Database initialized
CryptoTech News server running on http://localhost:5000
```

**What happens on first run:**
1. Creates news.db file
2. Sets up 3 database tables
3. Inserts 8 categories
4. Fetches from all 50+ RSS feeds (5-10 seconds)
5. Stores articles in database
6. Ready to serve requests

### Step 5: Open in Browser

Visit: **http://localhost:5000**

You should see:
- CryptoTech News header
- Featured article
- Grid of article cards
- Category navigation bar

---

## ✨ Features to Try

1. **Browse All News**: Homepage shows latest articles
2. **Filter by Category**: Click category buttons to filter
3. **Search**: Use the search box to find specific topics
4. **Read Articles**: Click "Read More" to visit original source
5. **Load More**: Click button to load additional articles
6. **Mobile**: Resize browser or open on phone (fully responsive)

---

## 🛠️ Development Mode

For automatic server restart when you edit files:

```powershell
npm run dev
```

This uses `nodemon` to watch for changes and auto-reload.

---

## 📁 File Structure

```
CryptoTech News/
│
├─ package.json              ← Dependencies list
├─ server.js                 ← Backend (Express + RSS parsing)
├─ setup.js                  ← Setup verification
├─ .env                      ← Configuration (PORT=5000)
│
├─ public/                   ← Frontend files
│  ├─ index.html            ← Main page
│  ├─ styles.css            ← Beautiful design
│  └─ app.js                ← Client-side logic
│
├─ news.db                   ← SQLite database (created on first run)
├─ node_modules/            ← Installed packages (created by npm)
│
├─ README.md                 ← Full documentation
├─ QUICKSTART.md             ← Quick start guide
└─ PROJECT_OVERVIEW.md       ← Project details
```

---

## ⚙️ Configuration

### Change Port

Edit `.env` file:
```
PORT=5000
```

Change `5000` to any available port (e.g., `3000`, `8080`)

### Change Refresh Interval

In `server.js`, line 130, change milliseconds:
```javascript
// Refresh every 30 minutes (default)
setInterval(fetchAllFeeds, 30 * 60 * 1000);

// Or change to every 1 hour:
setInterval(fetchAllFeeds, 60 * 60 * 1000);
```

### Add More RSS Feeds

In `server.js`, update the `categories` object (around line 19):
```javascript
'Technology': [
    'https://techcrunch.com/feed/',
    'https://www.theverge.com/rss/index.xml',
    'https://www.wired.com/feed/rss',
    // ADD MORE HERE:
    'https://new-feed-url-here.com/rss'
]
```

---

## 🔧 Common Issues & Solutions

### ❌ "npm is not recognized"
**Solution**: Restart PowerShell/Command Prompt, or reinstall Node.js

### ❌ "Port 5000 already in use"
**Solution**: 
- Edit `.env` and change PORT to 3000 or 8080
- Or kill the process using the port

### ❌ "Module not found" error
**Solution**: Run `npm install` again

### ❌ "Database error" on startup
**Solution**: Delete `news.db` file and restart server

### ❌ No articles showing
**Solution**: 
- Wait for initial RSS feed fetch (5-10 seconds)
- Check internet connection
- Check browser console for errors (F12)

### ❌ Images not loading
**Solution**: Some RSS feeds don't include images - fallback emoji is used

---

## ✅ Verification Checklist

After installation, verify:

- [ ] Server starts without errors
- [ ] Can access http://localhost:5000
- [ ] Homepage loads with featured article
- [ ] Can see article grid below featured
- [ ] Category buttons work when clicked
- [ ] Search box accepts text input
- [ ] "Load More" button appears when applicable
- [ ] Articles open in new tab when clicked
- [ ] Mobile view works (resize browser to test)

---

## 📊 Database Information

### Automatic Setup
- **Created**: First time server runs
- **Location**: `C:\xampp\htdocs\CryptoTech News\news.db`
- **Type**: SQLite3 (single file, no server needed)
- **Size**: ~5MB (grows as more articles are stored)

### Tables
1. **categories** - 8 news categories
2. **articles** - News articles from RSS feeds
3. **rss_feeds** - RSS feed URLs and metadata

### Automatic Cleanup
- Articles older than 7 days are available (not deleted)
- Database is indexed for fast searches
- Duplicate articles are prevented

---

## 🌐 Access from Other Computers

Once running, you can access from other machines:

1. Find your computer's IP:
```powershell
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

2. Share link: `http://192.168.1.100:5000`

3. Other users can visit that URL on the same network

---

## 🚀 Next Steps After Installation

1. **Explore Categories**: Click through different categories
2. **Test Search**: Search for "Bitcoin", "AI", "Tech"
3. **Try Mobile**: View on phone or resize browser
4. **Bookmark**: Add to browser bookmarks
5. **Customize**: Edit colors, add feeds, change settings
6. **Deploy**: Set up on a web server for 24/7 access

---

## 📖 Documentation

For more information, read:

- **README.md** - Complete feature documentation
- **QUICKSTART.md** - Quick reference guide
- **PROJECT_OVERVIEW.md** - Architecture and design details

---

## 🆘 Getting Help

### Check Server Console
When server is running, console shows:
- Feed fetch status
- Database operations
- Errors or warnings

### View Browser Console
Press F12 in browser, click "Console" tab to see:
- Frontend errors
- API response status
- Loading information

### Test API Endpoints
Try these URLs directly in browser:
```
http://localhost:5000/api/categories
http://localhost:5000/api/articles
http://localhost:5000/api/articles/category/1
http://localhost:5000/api/search?q=bitcoin
```

---

## 🎯 Project Complete!

You now have a professional, full-featured news aggregation platform:

✅ **Backend**: Node.js REST API with SQLite
✅ **Frontend**: Modern responsive design
✅ **Content**: 50+ RSS feeds across 8 categories
✅ **Features**: Search, categories, auto-updates
✅ **Mobile**: Fully responsive (phone/tablet/desktop)
✅ **Performance**: Fast, database-backed
✅ **Documentation**: Complete guides and examples

---

## 📞 Support

All code is commented and self-documenting. Key files:

| File | Purpose |
|------|---------|
| server.js | Backend API - read comments for details |
| public/app.js | Frontend logic - read comments for flow |
| public/styles.css | Design system - variables at top |
| README.md | Complete feature documentation |

---

**Congratulations! Your CryptoTech News platform is ready to use! 🎉**

Start with: `npm start`
Visit: `http://localhost:5000`
Enjoy! 🚀

---

*Last Updated: January 2024*
*Version: 1.0.0*
*Status: Production Ready*
