# 1. Module System Enhancements (Node 20 → 24)

**What changed:** Node.js now fully supports both CommonJS (old) and ESM (new) side by side.

## Run the demos

```bash
# Run CommonJS version
node cjs-style.js

# Run ESM version
node esm-style.mjs
```

## Quick comparison

| Feature    | CommonJS (CJS)  | ESM (Modern)     |
|-----------|-----------------|------------------|
| Import    | `require()`     | `import`         |
| Export    | `module.exports`| `export`         |
| Extension | `.cjs` or `.js` | `.mjs` or `.js`  |
| Async load| No (sync)       | Yes (async)      |
