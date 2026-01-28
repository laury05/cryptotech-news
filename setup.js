#!/usr/bin/env node

/**
 * CryptoTech News - Setup & Management Helper
 * Run: node setup.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🚀 CryptoTech News - Setup Assistant\n');

const tasks = [
    {
        name: 'Check Node.js',
        run: () => {
            try {
                const version = execSync('node --version').toString().trim();
                console.log(`✅ Node.js ${version} installed`);
                return true;
            } catch (e) {
                console.log('❌ Node.js not found. Install from https://nodejs.org/');
                return false;
            }
        }
    },
    {
        name: 'Check npm',
        run: () => {
            try {
                const version = execSync('npm --version').toString().trim();
                console.log(`✅ npm ${version} installed`);
                return true;
            } catch (e) {
                console.log('❌ npm not found');
                return false;
            }
        }
    },
    {
        name: 'Check package.json',
        run: () => {
            if (fs.existsSync('package.json')) {
                console.log('✅ package.json exists');
                return true;
            } else {
                console.log('❌ package.json not found');
                return false;
            }
        }
    },
    {
        name: 'Check node_modules',
        run: () => {
            if (fs.existsSync('node_modules')) {
                console.log('✅ Dependencies already installed');
                return true;
            } else {
                console.log('⚠️  Dependencies not installed. Run: npm install');
                return false;
            }
        }
    },
    {
        name: 'Check database',
        run: () => {
            if (fs.existsSync('news.db')) {
                const stats = fs.statSync('news.db');
                const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
                console.log(`✅ Database exists (${sizeMB} MB)`);
                return true;
            } else {
                console.log('ℹ️  Database will be created on first run');
                return true;
            }
        }
    },
    {
        name: 'Check .env file',
        run: () => {
            if (fs.existsSync('.env')) {
                console.log('✅ .env configuration file exists');
                return true;
            } else {
                console.log('⚠️  .env file not found');
                return false;
            }
        }
    }
];

console.log('Running system checks...\n');
const results = tasks.map(task => {
    process.stdout.write(`${task.name}... `);
    return task.run();
});

console.log('\n' + '='.repeat(50));

if (results.every(r => r)) {
    console.log('\n✅ All checks passed! Ready to start.\n');
    console.log('Run: npm start\n');
} else {
    console.log('\n⚠️  Some checks failed. See messages above.\n');
    console.log('Typical setup:');
    console.log('1. npm install');
    console.log('2. npm start\n');
}

console.log('Additional commands:');
console.log('  npm start       - Start the server');
console.log('  npm run dev     - Start with auto-reload');
console.log('  node setup.js   - Run this setup check\n');
