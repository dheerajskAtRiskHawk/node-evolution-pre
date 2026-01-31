/**
 * =============================================================================
 * WHAT IS THIS FILE?
 * =============================================================================
 * This file RUNS both the CJS and ESM examples so you can see them side by side.
 * It's written in ESM (import/export), but it also LOADS the CJS file — so you
 * see how the two styles coexist. (Both were already available in Node 20.)
 *
 * WHAT WE'RE DOING:
 * 1. Load the CJS file (legacy.cjs) using a "require" we create from ESM.
 * 2. Load the ESM file (modern.mjs) using import.
 * 3. Call greet() from each and print the result.
 */

// -----------------------------------------------------------------------------
// createRequire lets us use require() from inside an ESM file.
// Normally in ESM you only use import — but we need to load a .cjs file,
// and the easiest way is to create a require function that works from ESM.
// import.meta.url is the URL of THIS file; createRequire needs it to resolve paths.
// -----------------------------------------------------------------------------
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// -----------------------------------------------------------------------------
// STEP 1: Load the CJS file.
// require('./legacy.cjs') runs legacy.cjs and returns whatever it put in
// module.exports — which is { name, greet }. So cjs.greet is the function.
// -----------------------------------------------------------------------------
const cjs = require('./legacy.cjs');
console.log('CJS:', cjs.greet());

// -----------------------------------------------------------------------------
// STEP 2: Load the ESM file.
// import() is the async way to load an ESM module. It returns a Promise,
// so we await it. We get an object with name and greet (what modern.mjs exported).
// -----------------------------------------------------------------------------
const esm = await import('./modern.mjs');
console.log('ESM:', esm.greet());

// -----------------------------------------------------------------------------
// Summary:
// - CJS = require + module.exports. Has __dirname. (Node's original style.)
// - ESM = import + export. No __dirname — build it from import.meta.url.
// - Both work in Node 20+. The 22–24 "modernization" is import attributes
//   (see demo/import-attributes/) and hybrid packages (see demo/migration/).
// -----------------------------------------------------------------------------
console.log('\nTakeaway: CJS has __dirname; ESM uses import.meta.url + fileURLToPath.');
