/**
 * =============================================================================
 * WHAT IS THIS FILE?
 * =============================================================================
 * This script runs WITHOUT the permission model. Node does not restrict
 * anything — so reading a file works as usual. We show this first so you
 * see "normal" behavior. Then in step 2 we turn ON the permission model
 * and you'll see how access can be denied.
 *
 * Run: node demo/1-without-permission.mjs
 * No special flags needed.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'allowed-data.txt');

console.log('--- Step 1: Without permission model ---\n');
console.log('Reading file:', filePath);

const content = readFileSync(filePath, 'utf8');
console.log('Content:', content.trim());
console.log('\nNo permission model = no restrictions. Read worked.\n');
