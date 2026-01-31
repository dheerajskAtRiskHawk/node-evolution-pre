# Video 3: Permissions & Security (The Permission Model)

**Duration:** ~15 min  
**Topics:** Native permission model (Node 20+), what’s new in 20→24, four restricted areas (fs, child process, workers, network), flags, ERR_ACCESS_DENIED, `permission.has()`.

---

## Prerequisites

- **Node.js 20+** (22 or 24 recommended).
- Basic idea of running `node script.js` and command-line flags.

---

## What’s New Between Node 20 and 24?

- **Node 20:** Permission model **added** as **experimental**. Turn on with:  
  `node --experimental-permission app.js`
- **Node 22.13 / 24:** Permission model **no longer experimental**. Turn on with:  
  `node --permission app.js`

Same behavior; only the flag name changed. The demo runner uses the right flag for your Node version.

---

## Run the full demo

From the repo root:

```bash
cd video-03
npm run demo
```

Or from inside `video-03`:

```bash
npm run demo
```

This runs three steps: (1) without permission model, (2) with permission model (denied then allowed), (3) `process.permission.has()`.

---

## Project layout

| Path | Purpose |
|------|--------|
| `package.json` | `npm run demo`; Node 20+ engine. |
| `demo/run.mjs` | Runner: uses correct flag for Node 20 vs 24, runs all three demos. |
| `demo/1-without-permission.mjs` | Reads a file **without** the permission model. Shows “normal” behavior. |
| `demo/2-with-permission.mjs` | Reads a file **with** the permission model. Without allow → ERR_ACCESS_DENIED; with `--allow-fs-read` → works. |
| `demo/3-permission-has.mjs` | Uses `process.permission.has('fs.read', path)` to check access. Only works when Node was started with `--permission`. |
| `demo/allowed-data.txt` | Small file that the demos read. |

---

## Run steps by hand

```bash
# 1. Without permission model (everything allowed)
node demo/1-without-permission.mjs

# 2. With permission model (Node 24)
node --permission --allow-fs-read=. demo/2-with-permission.mjs

# 2. With permission model (Node 20–22)
node --experimental-permission --allow-fs-read=. demo/2-with-permission.mjs

# 3. Runtime check (Node 24)
node --permission --allow-fs-read=* demo/3-permission-has.mjs
```

---

## Important

The permission model is **not recommended for production** yet. Use it to learn and to get ready for future production use. It helps **trusted** code avoid mistakes; it does **not** protect against malicious code.

---

## Script

See [script.md](script.md) for the video script with timestamps.
