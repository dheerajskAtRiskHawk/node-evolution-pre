/**
 * =============================================================================
 * WHAT IS THIS FILE?
 * =============================================================================
 * This is an "ESM" (ECMAScript Module). Node added ESM support years ago;
 * in Node 20 you could already use import/export. The .mjs extension tells
 * Node: "treat this as ESM." (Or package.json "type": "module" makes .js ESM.)
 *
 * In ESM you:
 *   - USE other code with  import x from '...'
 *   - GIVE your code with  export ...
 *
 * So in Node 20–24 both CJS and ESM work. The 22–24 stuff in this video is
 * import attributes (JSON with { type: 'json' }) and hybrid/conditional exports.
 *
 * ONE DIFFERENCE: In ESM there is NO __dirname. You build it from
 * import.meta.url (the URL of this file). We do that below.
 */

// -----------------------------------------------------------------------------
// Loading built-in modules. In ESM we use import (not require).
// fileURLToPath turns a file:// URL into a normal path string.
// -----------------------------------------------------------------------------
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// -----------------------------------------------------------------------------
// ESM has no __dirname. So we make our own:
// 1. import.meta.url  = the URL of THIS file (e.g. file:///Users/you/.../modern.mjs)
// 2. fileURLToPath() = turn that URL into a path string
// 3. path.dirname()  = get the folder part (drop the filename)
// Result: same idea as __dirname in CJS — the folder containing this file.
// -----------------------------------------------------------------------------
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// -----------------------------------------------------------------------------
// Our own variables and function — normal JavaScript.
// -----------------------------------------------------------------------------
const name = 'modern-esm';

export function greet() {
  return `Hello from ${name} (dir: ${__dirname})`;
}

// -----------------------------------------------------------------------------
// EXPORT: we give "name" to whoever imports this file.
// So when another file does:  import { name, greet } from './modern.mjs'
// they get those two things.
// -----------------------------------------------------------------------------
export { name };
