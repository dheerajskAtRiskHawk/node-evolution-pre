// Run: node no-permission.mjs
// No permission model → no restrictions; read works as usual.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, 'data.txt');

console.log('Without permission model:');
const content = readFileSync(file, 'utf8');
console.log('Read OK:', content.trim());
