const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_PATH = path.join(__dirname, '../../../data/items.json');

let cachedStats = null;
let lastModified = null;

function calculateStatsFromFile() {
  fs.readFile(DATA_PATH, 'utf-8', (err, raw) => {
    if (err) {
      console.error('Error reading data file:', err);
      return;
    }

    try {
      const items = JSON.parse(raw);
      cachedStats = {
        total: items.length,
        averagePrice:
          items.reduce((acc, cur) => acc + cur.price, 0) / items.length,
      };
    } catch (parseErr) {
      console.error('Error parsing data file:', parseErr);
    }
  });
}

calculateStatsFromFile();

fs.watchFile(DATA_PATH, { interval: 1000 }, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    calculateStatsFromFile();
  }
});

// GET /api/stats
router.get('/', (req, res, next) => {
  if (!cachedStats) {
    return res.status(503).json({ message: 'Stats not available yet' });
  }
  res.json(cachedStats);
});

module.exports = router;
