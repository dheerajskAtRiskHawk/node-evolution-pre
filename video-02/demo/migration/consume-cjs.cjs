/**
 * =============================================================================
 * WHAT IS THIS FILE?
 * =============================================================================
 * This file is a "CJS consumer" — it uses require() to load the "hybrid"
 * package. The hybrid package has two entries: index.mjs (for ESM) and
 * index.cjs (for CJS). When you require() a package, Node uses the CJS
 * entry so you get a plain object with the exported stuff.
 *
 * Here we require('./hybrid/index.cjs') directly so the demo runs without
 * relying on directory resolution. In a real published package you'd do:
 * const pkg = require('package-name') and the package's package.json
 * "exports" would point require to index.cjs.
 *
 * This pattern (conditional exports: import -> .mjs, require -> .cjs) is
 * how you publish one package that works for both ESM and CJS. It's been
 * supported in Node for a long time; we show it here as a migration pattern.
 */

const pkg = require('./hybrid/index.cjs');

console.log('CJS consumer:', pkg.greet());
console.log('Takeaway: "require" uses the CJS entry (index.cjs).');
