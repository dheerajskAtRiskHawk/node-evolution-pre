/**
 * =============================================================================
 * WHAT IS THIS FILE?
 * =============================================================================
 * This is the CJS ENTRY for the "hybrid" package. When someone does
 *   const pkg = require('demo-hybrid')   (or require('./hybrid') with
 * the right resolution)
 * Node uses package.json "exports" and sees "require" -> "./index.cjs".
 * So this file gets loaded. We export the same API (name, greet) as the
 * ESM entry so consumers get the same behavior either way.
 *
 * Same idea as index.mjs but with module.exports so CJS code can use it.
 */

const name = 'demo-hybrid';
function greet() {
  return `Hello from ${name} (CJS entry)`;
}
module.exports = { name, greet };
