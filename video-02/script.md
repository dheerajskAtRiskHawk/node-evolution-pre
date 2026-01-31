# Video 2: Module Systems & Import Modernization

**Duration:** ~15 min  
**Prereqs:** require vs import; package.json `type` and `exports`; basic module resolution.

---

## [0:00] Intro

Quick tour of Node’s module story: CJS → ESM coexistence, import attributes in v22, and how to migrate without breaking legacy. We’ll focus on the 20% that gives 80% of the value.

---

## [1:00] CJS vs ESM — The 20% That Matters

**Syntax:** `require()` / `module.exports` vs `import` / `export`.

**Caching:** Both cache by specifier; ESM is cached per URL (so `import x from './a.js'` is a single module instance).

**No `__dirname` in ESM.** Use:

```js
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
```

**Circular deps:** CJS can give half-loaded modules; ESM binds before execution so you get `undefined` for not-yet-initialized bindings. Prefer clear dependency direction.

**Demo:** Run the project’s CJS vs ESM demo — one CJS file, one ESM file, runner shows both.

---

## [4:30] Import Attributes (Node 22+)

New syntax: `import data from './file.json' with { type: 'json' };` — secure, native, no `assert`. Use for JSON config, i18n, fixtures.

**Why:** Type-safe loading; no `fs.readFile` + `JSON.parse`; same syntax for JSON as for JS.

**Demo:** Run the import-attributes demo — load JSON with `with { type: 'json' }`.

---

## [7:00] Interop & Migration — Dual Package and Conditionals

**Dual package hazard:** Same package published as both ESM and CJS can lead to two copies of state (e.g. singletons). Mitigate with conditional exports: one entry for `import`, one for `require`.

**Conditional exports** in `package.json`:

```json
"exports": {
  ".": {
    "import": "./index.mjs",
    "require": "./index.cjs"
  }
}
```

**Named vs default:** CJS `module.exports = x` → ESM default import; `module.exports = { a, b }` → named imports. When migrating, keep one default or named style consistent.

**Demo:** Run the migration demo — hybrid package with `import`/`require` entries; ESM and CJS consumers.

---

## [10:30] Modern Best Practices (80/20)

1. **ESM-first:** Prefer `"type": "module"` and `.mjs` for new code; use `.cjs` only where you need CJS.
2. **Conditional exports:** Always define `exports` for the root so both ESM and CJS get the right file.
3. **Import attributes:** Use `with { type: 'json' }` for JSON in Node 22+ instead of `createRequire` or readFile.
4. **Migration:** Assess → add `exports` + ESM entry → switch consumers gradually; avoid mixing default and named in confusing ways.

---

## [13:00] Run the Project

From repo root:

```bash
cd video-02 && npm run demo
```

This runs: (1) CJS vs ESM comparison, (2) Import attributes (JSON), (3) Hybrid package consumed by ESM and CJS. Use the code as the single source of truth; script only highlights the ideas.

---

## [14:30] Wrap-up

You saw: CJS vs ESM essentials, import attributes for JSON, conditional exports for dual ESM/CJS, and ESM-first + hybrid strategy. Next video: deeper dives (e.g. loaders, testing).
