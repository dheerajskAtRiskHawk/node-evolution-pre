#!/usr/bin/env node
/**
 * Video 1: Changelog Tags → Curriculum Priorities
 * ------------------------------------------------
 * Maps SEMVER-MINOR style changelog tags to areas we care about:
 * http, module, sqlite, src.
 * This is a *demo* list; real tags come from official Node changelogs.
 * Run: node changelog-tags.js
 */

// Example entries: how official changelogs often look.
// Format: { tag: "SEMVER-MINOR", area: "http" | "module" | "sqlite" | "src", description }
const DEMO_ENTRIES = [
  { tag: 'SEMVER-MINOR', area: 'http', description: 'Agent.agentKeepAliveTimeoutBuffer option' },
  { tag: 'SEMVER-MINOR', area: 'module', description: 'require() of synchronous ESM graphs' },
  { tag: 'SEMVER-MINOR', area: 'module', description: 'node --run <script-in-package-json>' },
  { tag: 'SEMVER-MINOR', area: 'src', description: 'Preload function for Environment' },
  // sqlite appears in Node 24; example for curriculum mapping
  { tag: 'SEMVER-MINOR', area: 'sqlite', description: 'Built-in node:sqlite (Node 24)' },
];

console.log('--- Changelog tags → curriculum priorities ---\n');
console.log('Tag            | Area   | Description');
console.log('---------------|--------|----------------------------------------');

for (const entry of DEMO_ENTRIES) {
  const tag = entry.tag.padEnd(14);
  const area = (entry.area || '-').padEnd(6);
  console.log(`${tag} | ${area} | ${entry.description}`);
}

console.log('\nAreas:');
console.log('  http   – HTTP client/server, fetch, agents');
console.log('  module – ESM, require, loaders');
console.log('  sqlite – Built-in SQLite (Node 24)');
console.log('  src    – C++/native (only if you use native addons)\n');
console.log('Real changelogs: https://github.com/nodejs/node/blob/main/doc/changelogs/\n');
