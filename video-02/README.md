# Video 2: Module Systems & Import Modernization

**Duration:** ~15 min  
**Topics:** CJS vs ESM (both work in Node 20+), import attributes (Node 22+ only), hybrid packages / conditional exports (Node 12+), ESM-first best practices.

---

## Prerequisites

- **Node.js 22+** (needed for import attributes `with { type: 'json' }`).
- Understanding of `require` vs `import` and `package.json` (`type`, `exports`).

---

## Run the full demo

From the repo root:

```bash
cd video-02
npm run demo
```

Or from inside `video-02`:

```bash
npm run demo
```

This runs all three parts in order: **CJS vs ESM** → **Import attributes** → **Hybrid package (migration)**.

---

## Project layout (80/20)

| Path | Purpose |
|------|--------|
| `package.json` | ESM-first (`"type": "module"`), `npm run demo` entry. |
| `demo/run.mjs` | Runner: runs each demo and prints what it’s showing. |
| `demo/cjs-vs-esm/` | CJS vs ESM: `legacy.cjs`, `modern.mjs`, comparison. Works on Node 20+. |
| `demo/import-attributes/` | Load JSON with `import ... with { type: 'json' }`. **Node 22+ only.** |
| `demo/migration/` | Hybrid package (conditional exports). Works on Node 20+; pattern supported since Node 12+. |

---

## Run individual parts

```bash
# CJS vs ESM only
node demo/cjs-vs-esm/run.mjs

# Import attributes only (Node 22+)
node demo/import-attributes/load.mjs

# Migration: hybrid package consumed by ESM then CJS
node demo/migration/consume-esm.mjs
node demo/migration/consume-cjs.cjs
```

---

## Script

See [script.md](script.md) for the video script with timestamps and talking points.
