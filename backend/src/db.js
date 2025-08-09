const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

// Ensure the data directory exists.  In production the database
// location can be overridden via the DATABASE_FILE environment
// variable.
const dataDir = path.resolve(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = process.env.DATABASE_FILE || path.join(dataDir, 'database.sqlite');
const db = new Database(dbPath);

module.exports = db;