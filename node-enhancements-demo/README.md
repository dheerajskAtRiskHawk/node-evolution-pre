# Node.js 20 → 24 Enhancements (Beginner-Friendly)

Simple code examples explaining key enhancements between Node 20 and 24.

## Prerequisites

- **Node.js 22+** recommended (some features need Node 22+)
- Check version: `node -v`

## Demos

| # | Topic | What it shows | Run |
|---|-------|---------------|-----|
| 1 | **Module Systems** | CJS vs ESM (import/export) | `cd 1-module-systems && node cjs-style.js` and `node esm-style.mjs` |
| 2 | **Native JSON Import** | `import config from './config.json' with { type: 'json' }` | `cd 2-json-import && node load-json.mjs` |
| 3 | **Package Exports** | One package for both CJS and ESM users | `cd 3-package-exports && node use-esm.mjs` and `node use-cjs.cjs` |
| 4 | **Native WebSocket** | Built-in WebSocket (no `ws` library) | `cd 4-websocket && node client.mjs` |
| 5 | **Networking Options** | maxHeaderSize, requestTimeout, etc. | `cd 5-networking && node test-server.mjs` |

## Quick summary

1. **Module systems** – ESM (import/export) is the modern standard; CJS still works.
2. **JSON import** – Node 22+: Import JSON files directly with `with { type: 'json' }`.
3. **Package exports** – Use `exports` in package.json to serve both CJS and ESM.
4. **WebSocket** – Node 22+: Native WebSocket client (and server in Node 24).
5. **Networking** – HTTP server options: `maxHeaderSize`, `requestTimeout`, `headersTimeout`, `keepAliveTimeout`.

## Version guide

| Feature | Min Node |
|---------|----------|
| ESM improvements | 20 |
| Native JSON import | 22 |
| Native WebSocket client | 22.4 |
| Native WebSocket server | 24 |
