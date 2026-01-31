# Video 1: Node 20–24 Roadmap and What Really Matters

**Duration:** ~15 min  
**Topics:** 24.x LTS "Krypton", version path 20→22→24, changelog tags, high-impact zones, signal vs noise, bridge module scope.

---

## What’s in this folder

| File | Purpose |
|------|--------|
| `script.md` | Full video script with timestamps and talking points. |
| `code/` | Small Node scripts you can run while following the video. |

---

## Prerequisites

- **Node.js** 18+ (20 or 22 or 24 recommended).
- Basic idea of **SemVer** (MAJOR.MINOR.PATCH).
- Familiarity with reading **changelogs** (e.g. [nodejs.org/blog](https://nodejs.org/blog)).

---

## How to run the code

From the project root:

```bash
# Check your Node version and where it sits on 20 → 22 → 24
node video-01/code/version-check.js

# See how changelog tags (SEMVER-MINOR) map to areas (http, module, sqlite, src)
node video-01/code/changelog-tags.js

# Minimal "bridge" that checks runtime for Node 24–relevant features
node video-01/code/bridge-module.js
```

Or from inside `video-01/code/`:

```bash
cd video-01/code
node version-check.js
node changelog-tags.js
node bridge-module.js
```

---

## Script vs code

- **script.md** – Use it to record the video: follow the timestamps and bullet points; keep language simple for beginners.
- **code/** – Use these as on-screen examples: run them, show the output, and point to the comments that explain each part.

---

## Links (for script and description)

- [Node.js release blog](https://nodejs.org/blog)
- [Node 24.13.0 (LTS) release](https://nodejs.org/en/blog/release/v24.13.0)
- [Node 22.0.0 release](https://nodejs.org/en/blog/release/v22.0.0)
- [Node 20.0.0 release](https://nodejs.org/en/blog/release/v20.0.0)
- [Node changelogs (GitHub)](https://github.com/nodejs/node/blob/main/doc/changelogs/)
