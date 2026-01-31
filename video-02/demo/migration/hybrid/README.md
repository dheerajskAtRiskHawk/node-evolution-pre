# Hybrid package (conditional exports)

This folder is a minimal "hybrid" package: one package that can be loaded both as ESM and as CJS.

**package.json "exports":**

```json
"exports": {
  ".": {
    "import": "./index.mjs",
    "require": "./index.cjs"
  }
}
```

- When code uses **import**, Node loads `index.mjs` (ESM).
- When code uses **require**, Node loads `index.cjs` (CJS).

So the same package works for both styles. This has been supported in Node for a long time (Node 12+); it's not a Node 22–24 feature. We use it in Video 2 to show migration: one package, two entry points.
