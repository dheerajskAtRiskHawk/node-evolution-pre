#!/usr/bin/env node
/**
 * Video 4 runner: runs 3 demos in order. Usage: npm run demo  or  node demo/run.mjs
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function run(name, file) {
  console.log('\n' + '='.repeat(50) + '\n' + name + '\n' + '='.repeat(50));
  const r = spawnSync('node', [file], { cwd: __dirname, stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status || 1);
}

run('1. Proxy (http + fetch)', '1-proxy.mjs');
run('2. WebSocket (native client)', '2-websocket.mjs');
run('3. Server options (maxHeaderSize, requestTimeout)', '3-server-options.mjs');
console.log('\n' + '='.repeat(50) + '\nDone.\n' + '='.repeat(50) + '\n');
