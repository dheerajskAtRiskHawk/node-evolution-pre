/**
 * OLD WAY (Node 20 and before) - Loading JSON without native import
 * 
 * Option 1: fs.readFileSync + JSON.parse (works everywhere)
 * Option 2: import ... assert { type: 'json' } (Node 17.1–20.x, now deprecated)
 *           → Replaced by "with" in Node 20.10+ / 21+
 */

import fs from 'node:fs';

// Option 1: Manual read + parse (always worked)
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// Option 2 (Node 17.1–20.x, deprecated): import config from './config.json' assert { type: 'json' };

console.log('App:', config.appName);
console.log('Version:', config.version);
