/**
 * =============================================================================
 * WHAT IS THIS FILE?
 * =============================================================================
 * This script is meant to run WITH the permission model ON. You must start
 * Node with one of these flags:
 *
 *   Node 24 (or 22.13+):  node --permission --allow-fs-read=. demo/2-with-permission.mjs
 *   Node 20–22:           node --experimental-permission --allow-fs-read=. demo/2-with-permission.mjs
 *
 * If you run it with --permission (or --experimental-permission) but WITHOUT
 * --allow-fs-read, Node will throw ERR_ACCESS_DENIED when we try to read.
 * That's the "blocked" behavior. With --allow-fs-read=. we allow read access
 * to the current directory, so the read works.
 *
 * This is what's NEW in Node 20→24: a native way to restrict file system
 * (and other) access. Node 20 added it (experimental); Node 24 uses the
 * stable flag name --permission.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'allowed-data.txt');

console.log('--- Step 2: With permission model ---\n');

// When permission model is ON, process.permission exists.
const permissionOn = typeof process.permission?.has === 'function';
if (!permissionOn) {
  console.log('Permission model is NOT on. Start Node with --permission (or --experimental-permission) and --allow-fs-read=.');
  console.log('Example: node --permission --allow-fs-read=. demo/2-with-permission.mjs');
  process.exit(1);
}

console.log('Permission model is ON. Trying to read file:', filePath);

try {
  const content = readFileSync(filePath, 'utf8');
  console.log('Content:', content.trim());
  console.log('\nRead worked because we started Node with --allow-fs-read=.\n');
} catch (err) {
  if (err.code === 'ERR_ACCESS_DENIED') {
    console.log('ERR_ACCESS_DENIED:', err.message);
    console.log('permission:', err.permission);
    console.log('resource:', err.resource);
    console.log('\nStart Node with --allow-fs-read=. to allow read access to this directory.');
  } else {
    throw err;
  }
  process.exit(1);
}
