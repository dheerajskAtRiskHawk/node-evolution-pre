// Run WITH permission model:
//   node --permission --allow-fs-read=. with-permission.mjs
// Without --allow-fs-read=. you get ERR_ACCESS_DENIED.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, 'data.txt');

if (typeof process.permission?.has !== 'function') {
  console.log('Start with: node --permission --allow-fs-read=. with-permission.mjs');
  process.exit(1);
}

try {
  const content = readFileSync(file, 'utf8');
  console.log('With permission + --allow-fs-read=.:', content.trim());
} catch (err) {
  if (err.code === 'ERR_ACCESS_DENIED') {
    console.log('ERR_ACCESS_DENIED:', err.message);
    console.log('permission:', err.permission, 'resource:', err.resource);
  } else throw err;
}
