/**
 * =============================================================================
 * WHAT IS THIS FILE?
 * =============================================================================
 * This demo shows "import attributes" — a feature that arrived in NODE 22.
 * In Node 20 you could not do this; you had to use fs.readFile + JSON.parse
 * or createRequire to load JSON. In Node 22+ you can load JSON directly with:
 *
 *   import data from './file.json' with { type: 'json' };
 *
 * The "with { type: 'json' }" part tells Node: "this file is JSON, load it
 * as data." That's the 22–24 "import modernization" — secure, native, no extra
 * code. Use it for config files, translation files (i18n), or any JSON data.
 *
 * You need Node 22 or newer to run this file.
 */

// -----------------------------------------------------------------------------
// Load JSON files directly. No fs.readFile, no JSON.parse.
// "with { type: 'json' }" is the import attribute (Node 22+).
// -----------------------------------------------------------------------------
import config from './config.json' with { type: 'json' };
import i18n from './i18n.json' with { type: 'json' };

console.log('Config (import attributes):', config);
console.log('i18n en:', i18n.en);
console.log('i18n es:', i18n.es);

// -----------------------------------------------------------------------------
// Takeaway: This syntax only works in Node 22+. In Node 20 you'd use
// createRequire or readFile + JSON.parse.
// -----------------------------------------------------------------------------
console.log('\nTakeaway: Native JSON import with { type: "json" } in Node 22+.');
