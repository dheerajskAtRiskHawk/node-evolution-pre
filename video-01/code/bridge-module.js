#!/usr/bin/env node
/**
 * Video 1: Bridge Module (minimal demo)
 * -------------------------------------
 * A "bridge" checks the Node runtime and uses features that are stable
 * in your target version (here: Node 24). The rest of the app can assume
 * those features exist.
 * Run: node bridge-module.js
 */

// --- 1) Minimum version we target (e.g. Node 24 LTS) ---
const MIN_MAJOR = 24;
const currentMajor = parseInt(process.version.slice(1).split('.')[0], 10);

function isNode24OrNewer() {
  return currentMajor >= MIN_MAJOR;
}

// --- 2) Optional: use native fetch only when available and stable ---
function hasNativeFetch() {
  return typeof globalThis.fetch === 'function';
}

// --- 3) Optional: check if built-in sqlite exists (Node 24+) ---
function hasBuiltinSqlite() {
  try {
    require('node:sqlite');
    return true;
  } catch {
    return false;
  }
}

// --- 4) Bridge API: one place for "what can we use?" ---
const bridge = {
  nodeVersion: process.version,
  targetMet: isNode24OrNewer(),
  nativeFetch: hasNativeFetch(),
  builtinSqlite: hasBuiltinSqlite(),
};

// --- 5) Demo output ---
console.log('--- Bridge module (runtime check for v24) ---\n');
console.log('Node version:    ', bridge.nodeVersion);
console.log('Target (24+):    ', bridge.targetMet ? 'Yes' : 'No');
console.log('Native fetch:    ', bridge.nativeFetch ? 'Yes' : 'No');
console.log('Built-in SQLite: ', bridge.builtinSqlite ? 'Yes' : 'No');
console.log('');

if (bridge.targetMet && bridge.nativeFetch) {
  console.log('You can use global fetch() and node:sqlite (if listed above) in your app.');
} else {
  console.log('Upgrade to Node 24+ for native fetch and built-in SQLite.');
}

console.log('\nUse "bridge" in your code to decide which APIs to use.\n');
