#!/usr/bin/env node
/**
 * =============================================================================
 * VIDEO 2: MAIN DEMO RUNNER
 * =============================================================================
 * This script runs all four parts of the Video 2 demo in order:
 *
 * 1. CJS vs ESM     — Shows the difference between require/module.exports
 *                     and import/export. Both work in Node 20+; we just
 *                     compare them.
 * 2. Import attrs   — Node 22+ only. Load JSON with import ... with { type: 'json' }.
 * 3. Hybrid (ESM)   — ESM code loading the hybrid package (gets index.mjs).
 * 4. Hybrid (CJS)   — CJS code loading the hybrid package (gets index.cjs).
 *
 * Usage: npm run demo   or   node demo/run.mjs
 * Need Node 22+ for step 2; steps 1, 3, 4 work on Node 20+.
 */

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function run(name, script) {
  console.log('\n' + '='.repeat(60));
  console.log(name);
  console.log('='.repeat(60));
  const r = spawnSync('node', [script], { cwd: __dirname, stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status || 1);
}

run('1. CJS vs ESM', 'cjs-vs-esm/run.mjs');
run('2. Import attributes (JSON) — Node 22+', 'import-attributes/load.mjs');
run('3. Hybrid package (ESM consumer)', 'migration/consume-esm.mjs');
run('4. Hybrid package (CJS consumer)', 'migration/consume-cjs.cjs');

console.log('\n' + '='.repeat(60));
console.log('All demos finished.');
console.log('='.repeat(60) + '\n');
