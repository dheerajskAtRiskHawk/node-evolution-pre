#!/usr/bin/env node
/**
 * Video 1: Version Check
 * ---------------------
 * Shows your current Node version and where it sits on the 20 → 22 → 24 path.
 * Run: node version-check.js
 */

// process.version is a string like "v24.13.0"
const current = process.version;

// Parse major version (first number after "v")
const major = parseInt(current.slice(1).split('.')[0], 10);

console.log('--- Node version check (20 → 22 → 24 path) ---\n');
console.log('Your Node version:', current);
console.log('Major version:', major);
console.log('');

// Simple check: which "step" are we on?
if (major >= 24) {
  console.log('You are on Node 24+ (Krypton LTS).');
} else if (major >= 22) {
  console.log('You are on Node 22.x. Consider upgrading to 24 for LTS.');
} else if (major >= 20) {
  console.log('You are on Node 20.x. Good LTS base; 22/24 add features.');
} else {
  console.log('You are below Node 20. Upgrade for security and features.');
}

console.log('\nOfficial docs: https://nodejs.org/docs/' + current.slice(1) + '/api/');
console.log('Release blog:  https://nodejs.org/blog\n');
