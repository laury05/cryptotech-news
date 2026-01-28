// API Configuration
const API_BASE = 'http://localhost:5000/api';

// State
let allArticles = [];
let currentCategory = 'all';
let displayedCount = 0;
const articlesPerPage = 12;
let searchMode = false;

// DOM Elements
const categoryNav = document.getElementById('categoryNav');
const articlesContainer = document.getElementById('articlesContainer');
const featuredSection = document.getElementById('featuredSection');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loadingSpinner');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadArticles();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    loadMoreBtn.addEventListener('click', () => loadMoreArticles());
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

// Load Categories
async function loadCategories() {
    try {
        console.log('Loading categories from:', API_BASE);
        const response = await fetch(`${API_BASE}/categories`);
        
        if (!response.ok) {
            console.error('Categories fetch error:', response.status);
            return;
        }
        
        const categories = await response.json();
        console.log('Categories loaded:', categories.length);
        
        if (!Array.isArray(categories) || categories.length === 0) {
            console.warn('No categories received');
            return;
        }
        
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'nav-btn';
            btn.textContent = cat.name;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = cat.id;
                searchMode = false;
                displayedCount = 0;
                loadArticles(cat.id);
            });
            categoryNav.appendChild(btn);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Load Articles
async function loadArticles(categoryId = null) {
    showSpinner(true);
    try {
        let url = `${API_BASE}/articles`;
        if (categoryId) {
            url = `${API_BASE}/articles/category/${categoryId}`;
        }
        
        console.log('Loading articles from:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        allArticles = await response.json();
        console.log('Articles loaded:', allArticles.length);
        displayedCount = 0;
        
        articlesContainer.innerHTML = '';
        
        // Show featured article
        if (allArticles.length > 0) {
            displayFeaturedArticle(allArticles[0]);
            displayArticles(allArticles.slice(1));
        } else {
            articlesContainer.innerHTML = '<div class="no-results"><h2>No articles available yet</h2><p>RSS feeds are being fetched. Please refresh in a few moments.</p></div>';
        }
        
        updateLoadMoreButton();
    } catch (error) {
        console.error('Error loading articles:', error);
        articlesContainer.innerHTML = '<div class="no-results"><h2>Error loading articles</h2><p>' + error.message + '</p></div>';
    } finally {
        showSpinner(false);
    }
}

// Display Featured Article
function displayFeaturedArticle(article) {
    const imageUrl = article.image_url && article.image_url.trim() 
        ? article.image_url 
        : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="48" fill="%23999" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
    
    const date = formatDate(article.pub_date);
    
    const html = `
        <article class="featured-article">
            <img src="${imageUrl}" alt="${article.title}" class="featured-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23333%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E'">
            <div class="featured-content">
                <h1>${sanitizeHtml(article.title)}</h1>
                <div class="featured-meta">
                    <span>📅 ${date}</span>
                    <span>📌 ${article.category_name || 'Tech'}</span>
                </div>
                <p>${sanitizeHtml(article.description ? article.description.substring(0, 250) + '...' : 'Read the full story on the source.')}</p>
                <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="featured-link">Read Full Article →</a>
            </div>
        </article>
    `;
    
    featuredSection.innerHTML = html;
}

// Display Articles
function displayArticles(articles) {
    articles.slice(displayedCount, displayedCount + articlesPerPage).forEach((article, index) => {
        const imageUrl = article.image_url && article.image_url.trim()
            ? article.image_url
            : null;
        
        const date = formatDate(article.pub_date);
        const categoryName = article.category_name || 'Tech';
        
        const card = document.createElement('article');
        card.className = 'article-card';
        card.style.animationDelay = `${index * 50}ms`;
        card.style.cursor = 'pointer';
        
        const imageHtml = imageUrl 
            ? `<img src="${imageUrl}" alt="${article.title}" class="article-image" onerror="this.parentElement.innerHTML='<div class=\\'article-image no-image\\'>📰</div>'">`
            : `<div class="article-image no-image">📰</div>`;
        
        card.innerHTML = `
            ${imageHtml}
            <div class="article-content">
                <span class="article-category">${sanitizeHtml(categoryName)}</span>
                <h3 class="article-title">${sanitizeHtml(article.title)}</h3>
                <p class="article-description">${sanitizeHtml(article.description ? article.description.substring(0, 150) : 'Click to read the full story.')}</p>
                <div class="article-footer">
                    <span class="article-date">📅 ${date}</span>
                    <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="article-link">Read More</a>
                </div>
            </div>
        `;
        
        // Make entire card clickable
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on the link directly
            if (e.target.tagName !== 'A') {
                window.open(article.link, '_blank');
            }
        });
        
        articlesContainer.appendChild(card);
    });
    
    displayedCount += articlesPerPage;
}

// Load More Articles
function loadMoreArticles() {
    if (displayedCount < allArticles.length) {
        displayArticles(allArticles);
        updateLoadMoreButton();
    }
}

// Update Load More Button
function updateLoadMoreButton() {
    if (displayedCount >= allArticles.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
        loadMoreBtn.textContent = `Load More Articles (${Math.min(articlesPerPage, allArticles.length - displayedCount)} more)`;
    }
}

// Search Articles
async function performSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        alert('Please enter a search term');
        return;
    }
    
    showSpinner(true);
    try {
        const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
        allArticles = await response.json();
        displayedCount = 0;
        searchMode = true;
        
        articlesContainer.innerHTML = '';
        featuredSection.innerHTML = `<h2 style="color: var(--primary); margin-bottom: 20px;">Search Results for "${sanitizeHtml(query)}"</h2>`;
        
        if (allArticles.length === 0) {
            articlesContainer.innerHTML = `
                <div class="no-results">
                    <h2>No results found</h2>
                    <p>Try different keywords or browse by category</p>
                </div>
            `;
        } else {
            displayArticles(allArticles);
        }
        
        updateLoadMoreButton();
    } catch (error) {
        console.error('Error searching articles:', error);
        articlesContainer.innerHTML = '<div class="no-results"><h2>Search error</h2></div>';
    } finally {
        showSpinner(false);
    }
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return 'Recently';
    
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Sanitize HTML
function sanitizeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    let sanitized = div.innerHTML;
    
    // Remove HTML tags and decode entities
    sanitized = sanitized
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');
    
    return sanitized.substring(0, 500);
}

// Show/Hide Spinner
function showSpinner(show) {
    if (show) {
        loadingSpinner.classList.add('active');
    } else {
        loadingSpinner.classList.remove('active');
    }
}

// Category button click handler
document.addEventListener('click', (e) => {
    if (e.target.matches('.nav-btn')) {
        const buttons = document.querySelectorAll('.nav-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        if (e.target.textContent === 'All News') {
            currentCategory = 'all';
            searchMode = false;
            displayedCount = 0;
            loadArticles();
        }
    }
});
