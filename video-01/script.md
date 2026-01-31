# Video 1: Node 20–24 Roadmap and What Really Matters

**Estimated duration:** ~15 minutes  
**Audience:** Beginners new to Node.js; familiar with SemVer and basic changelog reading.

---

## [0:00] Intro

Hi! This is Video 1 of the Node Evolution series. We’ll walk the path from Node 20 to 24, see where v24 “Krypton” fits in the LTS line, and focus on what actually matters for your app code—without getting lost in engine internals.

---

## [0:30] Quick recap: SemVer and LTS

- **SemVer** = Semantic Versioning: `MAJOR.MINOR.PATCH` (e.g. 24.13.0).
  - **MAJOR** = breaking changes.
  - **MINOR** = new features, backward compatible.
  - **PATCH** = bug/security fixes.
- **LTS** = Long-Term Support. These versions get maintenance and security updates for a long time, so they’re safe for production.
- Node 24’s codename is **“Krypton”**. It became LTS in late 2025 and is supported through April 2028.

---

## [1:30] The path: 20 → 22 → 24

We’ll use the **official Node.js release blog** to see how versions progressed.

- **Node 20** (Apr 2023): Stable test runner, permission model (experimental), HTTP behavior fixes, V8 11.3.
- **Node 22** (Apr 2024): WebSocket by default, `node --run`, `fs.glob` / `globSync`, require() of ESM graphs, watch mode stable, test runner improvements.
- **Node 24 “Krypton”** (LTS Oct 2025): V8 13.6, npm 11, built-in SQLite, native `fetch` stable, permissions simplified to `--permission`, Undici 7.

**Takeaway:** Each step adds features and some behavior changes. Official changelogs are the source of truth: [nodejs.org/blog](https://nodejs.org/blog).

---

## [3:30] Changelog tags and what to care about

In the official changelogs you’ll see tags like:

- **SEMVER-MAJOR** – Breaking change; may require code or dependency updates.
- **SEMVER-MINOR** – New feature; safe to adopt, backward compatible.
- **SEMVER-PATCH** – Bug or security fix.

For **learning and planning**, focus on MINOR (and MAJOR when upgrading):

- **http** – Server/client behavior, fetch, agents.
- **module** – ESM vs CommonJS, loaders, `require`/`import`.
- **sqlite** – Built-in SQLite in Node 24.
- **src** – “src” often means C++/native; only matters if you write native addons or care about internals.

**Takeaway:** Map changelog tags to *areas* (http, module, sqlite, src). That tells you “what kind of thing changed” without reading every line.

---

## [5:30] High-impact zones (20 → 24)

Bird’s-eye view of what affects app code:

1. **Testing** – Built-in test runner (stable since Node 20), improved in 22 and 24. You can run tests with `node --test` without extra frameworks.
2. **Permissions** – Experimental in 20 (`--experimental-permission`), simplified in 24 to `--permission`. Controls file system, spawn, etc.
3. **HTTP** – Native `fetch`, HTTP/1.1 behavior fixes, agent options. Less need for `axios` or `node-fetch` in new code.
4. **SQLite** – Built-in `node:sqlite` in 24. Good for local DBs without installing a separate driver.
5. **Tooling** – `node --run`, watch mode stable, npm 11. Better DX out of the box.

---

## [7:30] Signal vs noise: what matters for *your* code

- **Signal (matters for app code):**
  - New stable APIs: test runner, fetch, sqlite, permissions.
  - HTTP/server behavior (e.g. connection handling, body rules).
  - Module system: ESM, `require(esm)`, loaders.
  - Deprecations and removals (e.g. old `util.*` helpers, crypto constructors).
- **Noise (often skip at first):**
  - Deep V8 internals (e.g. Maglev, SparkPlug) unless you care about raw performance or native addons.
  - Build/embedder details (e.g. NODE_MODULE_VERSION, ABI) unless you maintain native modules.
  - Long lists of dependency bumps (simdutf, nghttp2, etc.) unless you hit a specific bug.

**Takeaway:** If it changes how you call Node APIs or how the runtime behaves from JavaScript, it’s signal. If it’s “under the hood” and you don’t touch C++ or the engine, it’s often noise for day-to-day coding.

---

## [9:30] The “Bridge Module” idea

Think of a **bridge module** as a small layer in your app that:

- Detects or assumes a **minimum Node version** (e.g. 24).
- Uses **runtime behavior** that’s stable in that version (e.g. native fetch, test runner, sqlite).
- Hides version checks and fallbacks in one place so the rest of the app stays simple.

**Scope for v24:**

- Rely on native `fetch`, built-in test runner, and optional `node:sqlite`.
- Use `--permission` when you need a sandbox.
- Avoid deprecated APIs (e.g. old `util.is*`, legacy crypto).

We’ll see a minimal code example in the repo: a tiny module that checks the Node version and optionally uses v24-only features.

---

## [11:00] 24.x LTS “Krypton” snapshot

- **Position:** Current LTS; follows 22 LTS. Good default for new production apps.
- **Stability:** LTS means predictable, security-focused updates until April 2028.
- **Notable in 24:** V8 13.6, npm 11, OpenSSL 3.5, Undici 7, native fetch stable, built-in SQLite, simplified permissions. Some breaking changes (e.g. Buffer, symlink APIs, AsyncLocalStorage default) — check the release notes when upgrading from 20/22.

---

## [12:30] How to use this in practice

1. **Read release posts** for 20, 22, and 24 on [nodejs.org/blog](https://nodejs.org/blog).
2. **Search changelogs** by tag (SEMVER-MINOR, SEMVER-MAJOR) and area (http, module, sqlite, src).
3. **Upgrade in steps:** 20 → 22 → 24, run tests, then enable new features (fetch, sqlite, test runner) where they simplify your code.
4. **Keep a “bridge”** in mind: one place that encodes “we target Node 24” and uses its stable APIs.

---

## [14:00] Wrap-up

You now have:

- A clear path **20 → 22 → 24** using official docs.
- A way to map **changelog tags** (SEMVER-MINOR, etc.) to **priorities** (http, module, sqlite, src).
- A **signal vs noise** filter so you focus on app-code impact.
- A **bridge module** idea for adopting v24 features without clutter.

In the repo you’ll find small scripts: checking your Node version, simulating changelog tags, and a minimal bridge for v24. Run them, read the comments, and use them as a base for your own projects.

Thanks for watching; see you in the next video.
