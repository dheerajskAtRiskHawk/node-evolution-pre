/**
 * =============================================================================
 * WHAT IS THIS FILE?
 * =============================================================================
 * This is the ESM ENTRY for the "hybrid" package. When someone does
 *   import pkg from 'demo-hybrid'   (or from ./hybrid in this demo)
 * Node uses package.json "exports" and sees "import" -> "./index.mjs".
 * So this file gets loaded. We export the same API (name, greet) as the
 * CJS entry so consumers get the same behavior either way.
 *
 * Why two files? So the same package works for both ESM users (import)
 * and CJS users (require). No Node 22–24 requirement here — conditional
 * exports have worked in Node for a long time.
 */

const name = 'demo-hybrid';
function greet() {
  return `Hello from ${name} (ESM entry)`;
}
export default { name, greet };
export { name, greet };
