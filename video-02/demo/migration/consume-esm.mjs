/**
 * =============================================================================
 * WHAT IS THIS FILE?
 * =============================================================================
 * This file is an "ESM consumer" — it uses import() to load the "hybrid"
 * package. A "hybrid" package is one that can be loaded BOTH ways:
 *   - When you use import (ESM), you get the ESM version (index.mjs).
 *   - When you use require (CJS), you get the CJS version (index.cjs).
 *
 * That way the same package works for people using ESM and people using CJS.
 * The hybrid/package.json "exports" field tells Node which file to use for
 * each. This pattern has worked in Node for a while (Node 12+); we use it
 * here to show migration: one package, two entry points.
 *
 * Here we import from ./hybrid/index.mjs directly. In a real published
 * package you'd do: import pkg from 'package-name' and Node would use
 * package.json "exports" to pick index.mjs.
 */

import pkg from './hybrid/index.mjs';

console.log('ESM consumer:', pkg.greet());
console.log('Takeaway: "import" uses the ESM entry (index.mjs).');
