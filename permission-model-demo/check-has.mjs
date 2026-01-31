// Run: node --permission --allow-fs-read=. check-has.mjs
// Shows how to CHECK permission at runtime with process.permission.has().

import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, 'data.txt');

if (typeof process.permission?.has !== 'function') {
  console.log('Start with: node --permission --allow-fs-read=. check-has.mjs');
  process.exit(1);
}

const canRead = process.permission.has('fs.read', file);
console.log('process.permission.has("fs.read", file):', canRead);
// Use this before reading in plugins or config-driven code.
