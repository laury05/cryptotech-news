# CryptoTech News - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
Open PowerShell or Command Prompt and navigate to the project folder:
```powershell
cd "C:\xampp\htdocs\CryptoTech News"
npm install
```

### Step 2: Start the Server
```powershell
npm start
```

You should see: `CryptoTech News server running on http://localhost:5000`

### Step 3: Open in Browser
Go to `http://localhost:5000` in your web browser

---

## 📋 What You Get

✅ **Homepage** - View latest news from all categories
✅ **Category Navigation** - Filter news by crypto, tech, finance, etc.
✅ **Search** - Find articles by keyword
✅ **Mobile Responsive** - Works perfectly on all devices
✅ **Auto-Updating** - Fetches fresh news every 30 minutes
✅ **SQLite Database** - Stores articles for fast retrieval

---

## 🎨 Categories Included

- **Crypto & Blockchain** - CoinDesk, CoinTelegraph, CryptoSlate, Bitcoin Magazine
- **Blockchain Tech** - Consensys, Ethereum, Coinbase, Binance
- **AI & Machine Learning** - MIT Tech Review, VentureBeat, OpenAI, Google AI
- **Technology** - TechCrunch, The Verge, Wired, Ars Technica
- **Startup & Innovation** - Y Combinator, Product Hunt, TechStartups
- **Stock Market & Finance** - CNBC, Bloomberg, Financial Times, Reuters
- **Cybersecurity** - Krebs on Security, The Hacker News
- **Web3 & DeFi** - Messari and more

---

## 🔧 Development

For automatic reload when you make changes:
```powershell
npm run dev
```

---

## 📁 Project Structure

```
CryptoTech News/
├── server.js           ← Backend API (Node.js/Express)
├── package.json        ← Dependencies list
├── .env                ← Configuration
├── news.db             ← SQLite database (auto-created)
└── public/
    ├── index.html      ← Main page
    ├── styles.css      ← Beautiful design
    └── app.js          ← Frontend logic
```

---

## 💡 Tips & Tricks

### Change Port
Edit `.env` file and change `PORT=5000` to any other port number

### Add More RSS Feeds
Edit the `categories` object in `server.js` to add more feed URLs

### Customize Colors
Edit the CSS variables at the top of `public/styles.css`:
- `--primary` - Main accent color (cyan)
- `--secondary` - Background color
- `--text` - Text color

### Reset Database
Delete `news.db` file and restart - it will auto-recreate with fresh data

---

## 🌐 Accessing from Other Computers

Once running, you can access from other machines on your network:
```
http://YOUR_COMPUTER_IP:5000
```

Find your IP with:
```powershell
ipconfig
```
Look for "IPv4 Address" value

---

## ⚡ Performance

- **First Load**: 5-10 seconds (fetches from all RSS feeds)
- **Subsequent Loads**: <1 second (uses database cache)
- **Auto-Refresh**: Every 30 minutes for fresh content
- **Search**: Real-time results from indexed database

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000 already in use | Change PORT in .env file |
| Slow initial load | Initial fetch aggregates 50+ feeds (normal) |
| No articles showing | Check internet connection, wait for initial fetch |
| Images not loading | Some feeds don't include images (uses emoji fallback) |
| Database error | Delete news.db and restart server |

---

## 🎯 Next Steps

1. ✅ Install and run the app
2. ✅ Browse different categories
3. ✅ Try searching for keywords
4. ✅ Customize colors and categories to your preference
5. ✅ Share with others on your network!

---

## 📝 Notes

- RSS feeds are fetched every 30 minutes automatically
- Articles are stored in SQLite for fast access
- The site includes 50+ premium news sources
- All news links open in new tabs
- Mobile-friendly design works on phones, tablets, and desktops

---

**Happy news reading! 📰🚀**
