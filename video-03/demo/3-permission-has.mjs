/**
 * =============================================================================
 * WHAT IS THIS FILE?
 * =============================================================================
 * This script shows the RUNTIME API: process.permission.has(scope, reference).
 * You can CHECK whether the process has permission to do something (e.g. read
 * a path) before doing it. Only available when the permission model is ON.
 *
 * Run with permission model and at least one allow, e.g.:
 *   node --permission --allow-fs-read=* demo/3-permission-has.mjs
 *   node --experimental-permission --allow-fs-read=* demo/3-permission-has.mjs
 *
 * This is useful for plugin systems or config-driven code: "Do I have read
 * access to this path?" before trying to read.
 */

import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const demoDir = __dirname;
const demoFile = path.join(__dirname, 'allowed-data.txt');

console.log('--- Step 3: process.permission.has() ---\n');

if (typeof process.permission?.has !== 'function') {
  console.log('Permission model is NOT on. Start Node with --permission (or --experimental-permission).');
  console.log('Example: node --permission --allow-fs-read=* demo/3-permission-has.mjs');
  process.exit(1);
}

// Check fs read for the demo directory and the file
const hasReadDir = process.permission.has('fs.read', demoDir);
const hasReadFile = process.permission.has('fs.read', demoFile);

console.log('process.permission.has("fs.read", demoDir):', hasReadDir);
console.log('process.permission.has("fs.read", demoFile):', hasReadFile);
console.log('\nUse this to check access before reading or writing (e.g. in plugins or config).\n');
