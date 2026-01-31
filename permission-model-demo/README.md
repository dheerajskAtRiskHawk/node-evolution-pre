# Node.js Permission Model — Minimal Explanation

## What is the Permission Model?

The **permission model** is a way to **restrict what your Node.js process can do** (filesystem, child processes, workers, network). When you turn it on, Node **denies everything by default**; you then allow only what you need with flags.

- **Without** permission model: script can read/write any file, spawn processes, use network — normal Node behavior.
- **With** permission model: script is locked down until you grant specific permissions (e.g. `--allow-fs-read=/path`).

## How It Works

1. **Enable it** when starting Node:
   - **Node 22.13+ / 24+:** `node --permission script.mjs`
   - **Node 20–22:** `node --experimental-permission script.mjs`

2. **Grant what you need** with flags:
   - `--allow-fs-read=<path>` — read from filesystem (e.g. `*` or `/tmp`)
   - `--allow-fs-write=<path>` — write to filesystem
   - `--allow-child-process` — spawn child processes
   - `--allow-worker` — create worker threads
   - `--allow-net` — network access

3. **If code tries something not allowed**, Node throws `ERR_ACCESS_DENIED` (with `permission` and `resource` on the error).

4. **Check at runtime** with `process.permission.has(scope, reference)` (e.g. `process.permission.has('fs.read', '/some/path')`).

## Quick Run

```bash
# Normal run — no restrictions
node no-permission.mjs

# With permission model, no fs allow — read will throw ERR_ACCESS_DENIED
node --permission with-permission.mjs

# With permission model + allow read — read works
node --permission --allow-fs-read=. with-permission.mjs

# Check permission at runtime
node --permission --allow-fs-read=. check-has.mjs
```
