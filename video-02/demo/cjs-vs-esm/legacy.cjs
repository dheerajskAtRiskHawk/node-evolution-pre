/**
 * =============================================================================
 * WHAT IS THIS FILE?
 * =============================================================================
 * This is a "CommonJS" (CJS) module — Node's ORIGINAL module system (since the
 * beginning). The file extension .cjs tells Node: "treat this as CommonJS."
 *
 * In CJS you:
 *   - USE other code with  require('something')
 *   - GIVE your code to others with  module.exports = ...
 *
 * Both CJS and ESM have worked in Node for a long time (including Node 20).
 * The 22–24 "modernization" in this video is import attributes and hybrid
 * packages — not "ESM is new." We show CJS vs ESM here so you see the difference.
 */

// -----------------------------------------------------------------------------
// Loading another built-in module. "path" helps with file/folder paths.
// In CJS we always use require('name') to pull in code.
// -----------------------------------------------------------------------------
const path = require('path');

// -----------------------------------------------------------------------------
// Our own variables and function — just normal JavaScript.
// -----------------------------------------------------------------------------
const name = 'legacy-cjs';

function greet() {
  // __dirname is a special variable that ONLY exists in CJS.
  // It's the full path to the FOLDER that contains this file.
  // Example: /Users/you/project/demo/cjs-vs-esm
  return `Hello from ${name} (__dirname: ${__dirname})`;
}

// -----------------------------------------------------------------------------
// EXPORT: we give "name" and "greet" to whoever require()s this file.
// So when another file does:  const stuff = require('./legacy.cjs')
// they get  stuff = { name: 'legacy-cjs', greet: [function] }
// -----------------------------------------------------------------------------
module.exports = { name, greet };
