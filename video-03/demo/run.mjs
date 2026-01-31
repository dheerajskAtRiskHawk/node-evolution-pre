#!/usr/bin/env node
/**
 * =============================================================================
 * VIDEO 3: MAIN DEMO RUNNER
 * =============================================================================
 * This script runs all three permission demos in order:
 *
 * 1. Without permission model — normal read (no flags).
 * 2. With permission model — read with --permission and --allow-fs-read=.
 * 3. process.permission.has() — runtime check (with --permission and --allow-fs-read=*).
 *
 * We use the RIGHT FLAG for your Node version:
 * - Node 20, 21, or 22.0–22.12: --experimental-permission (experimental in Node 20).
 * - Node 22.13+, 23.5+, 24+: --permission (stable flag; NEW in 22.13/24).
 *
 * Usage: npm run demo   or   node demo/run.mjs
 */

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Node 20: experimental. Node 22.13+, 23.5+, 24: stable flag.
const [major, minor] = process.version.slice(1).split('.').map(Number);
const useStableFlag = (major >= 24) || (major === 23 && minor >= 5) || (major === 22 && minor >= 13);
const permissionFlag = useStableFlag ? '--permission' : '--experimental-permission';

console.log('Node', process.version, '→ using', permissionFlag);
console.log('(Node 20 added the model; Node 22.13/24 use the stable --permission flag.)\n');

function run(name, args, opts = {}) {
  console.log('='.repeat(60));
  console.log(name);
  console.log('='.repeat(60));
  const r = spawnSync('node', args, { cwd: __dirname, stdio: 'inherit', ...opts });
  if (r.status !== 0 && !opts.allowFail) process.exit(r.status || 1);
  return r.status;
}

// 1. Without permission model
run('1. Without permission model', ['1-without-permission.mjs']);

// 2a. With permission model but NO allow → ERR_ACCESS_DENIED (we expect this to fail)
console.log('\n(Next: running with permission but NO --allow-fs-read → you should see ERR_ACCESS_DENIED.)\n');
run('2a. With permission, NO allow (ERR_ACCESS_DENIED)', [permissionFlag, '2-with-permission.mjs'], { allowFail: true });

// 2b. With permission model AND allow read for current dir → works
run('2b. With permission AND --allow-fs-read=.', [permissionFlag, '--allow-fs-read=.', '2-with-permission.mjs']);

// 3. permission.has() (allow read for all so has() can see it)
run('3. process.permission.has()', [permissionFlag, '--allow-fs-read=*', '3-permission-has.mjs']);

console.log('='.repeat(60));
console.log('All demos finished.');
console.log('='.repeat(60) + '\n');
