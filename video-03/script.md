# Video 3: Permissions & Security (The Permission Model)

**Duration:** ~15 min  
**Prereqs:** Basic use of Node.js `fs`; idea of “running a script” and “command-line flags.”

---

## [0:00] Intro

This video is about Node’s **Permission Model**. We’ll explain **what it is**, **what changed between Node 20 and 24**, and **how it works** step by step. Every explanation is tied to the code: we run the same demo you have in the repo (Step 1 → Step 2a → Step 2b → Step 3) and say exactly what you’re seeing. Run it yourself with: `cd video-03 && npm run demo`.

---

## [0:30] What is the Permission Model?

**Definition:** The Permission Model is a **native** way in Node.js to **restrict** what your process can do. When you turn it on, Node itself blocks access to things you didn’t explicitly allow — for example reading or writing files, spawning child processes, creating workers, or using the network.

**Why it exists:** Before Node 20, if you wanted to restrict what a script could do, you had to do it in “userland” (your own code or libraries). That’s harder to get right and easier to bypass by mistake. The Permission Model moves that into the **runtime**: you turn it on with a **flag** when you start Node, and Node enforces the rules. So it’s not your code deciding — it’s Node.

**Important limits:**  
- It’s a “seat belt” for **trusted** code (e.g. your own app). It helps avoid accidents (e.g. writing to the wrong folder). It does **not** protect against malicious code.  
- It’s **still not recommended for production**. Use it to learn and to get ready for when it becomes production-ready.

---

## [1:30] What has changed (Node 20 → 24)?

- **Node 20:** The Permission Model was **added** as an **experimental** feature. You turn it on with:  
  `node --experimental-permission app.js`
- **Node 22.13 / 23.5 / 24:** The feature is **no longer experimental**. You turn it on with:  
  `node --permission app.js`  
  Same behavior; only the **flag name** changed (shorter, stable).

So: **Node 20–22.12** → use `--experimental-permission`. **Node 22.13+, 24+** → use `--permission`. In the demo, the runner (`demo/run.mjs`) detects your Node version and uses the correct flag so you don’t have to remember.

---

## [2:30] What can be restricted? (The four areas)

When the permission model is **on**, Node can restrict:

1. **File system (fs)** — Read and/or write. You allow specific paths (or `*` for all).
2. **Child processes** — Spawning other programs (`child_process`). Allowed with `--allow-child-process`.
3. **Workers** — Creating worker threads. Allowed with `--allow-worker`.
4. **Network** — Using the network (HTTP, TCP, etc.). Allowed with `--allow-net`.

**By default, all of these are blocked** when you use `--permission` (or `--experimental-permission`). You then **allow** only what you need with flags like `--allow-fs-read`, `--allow-fs-write`, `--allow-child-process`, `--allow-worker`, `--allow-net`.

---

## [3:30] How it works (high level)

1. You start Node with the permission flag: `--permission` (or `--experimental-permission` on Node 20).
2. That **turns on** the model: from then on, Node blocks file system, child process, worker, and network access unless you allowed it.
3. You **allow** only what you need, e.g. `--allow-fs-read=.` (read from current directory) or `--allow-fs-read=*` (read from anywhere).
4. If your code tries to do something not allowed (e.g. read a file outside the allowed path), Node throws **ERR_ACCESS_DENIED**. You can catch that error and see **what** was denied (permission type and resource path).

The demo shows this in four steps. We’ll go through each step and point to the exact code and output.

---

## [4:00] Step 1: Without the permission model (demo/1-without-permission.mjs)

**What we run:**  
`node demo/1-without-permission.mjs`  
(No permission flag.)

**What the code does:**  
The script reads a file (`allowed-data.txt`) with `readFileSync`. There are no restrictions, so the read always works.

**What you see:**  
- Output: “Reading file: …” and the file content.  
- Message: “No permission model = no restrictions. Read worked.”

**Takeaway:**  
Without the permission model, Node does not restrict anything. This is “normal” behavior. We use Step 1 as a baseline so that in Step 2 you can see the difference when the model is on.

---

## [5:00] Step 2a: With the permission model, but NO allow (ERR_ACCESS_DENIED)

**What we run:**  
`node --permission demo/2-with-permission.mjs`  
(Permission on, but **no** `--allow-fs-read`.)

**What the code does:**  
The same idea as Step 1: the script tries to read `allowed-data.txt`. But this time Node was started with `--permission`, so **all** file system access is blocked by default. Reading a file is not allowed, so Node throws **ERR_ACCESS_DENIED**.

**What you see:**  
- Output: “Permission model is ON. Trying to read file: …”  
- Then an error: `ERR_ACCESS_DENIED: Access to this API has been restricted. Use --allow-fs-read to manage permissions.`  
- The error object has:  
  - **code:** `'ERR_ACCESS_DENIED'`  
  - **permission:** `'FileSystemRead'`  
  - **resource:** the full path of the file that was blocked  

**Takeaway:**  
When the model is on and you don’t allow file system read, **any** read throws. That’s how you get a clear “denied” and how you **debug**: look at `error.code`, `error.permission`, and `error.resource` to see what was blocked and where. The code in `2-with-permission.mjs` catches this error and prints those fields.

---

## [6:30] Step 2b: With the permission model AND --allow-fs-read

**What we run:**  
`node --permission --allow-fs-read=. demo/2-with-permission.mjs`  
(Permission on **and** read allowed for the current directory.)

**What the code does:**  
Same script as Step 2a: it reads `allowed-data.txt`. But now we passed `--allow-fs-read=.`. The `.` means “current directory.” So Node allows read access to the current directory (and its contents). The file lives there, so the read is allowed and succeeds.

**What you see:**  
- Output: “Permission model is ON. Trying to read file: …”  
- Then the file content and: “Read worked because we started Node with --allow-fs-read=.”

**Takeaway:**  
The permission model **blocks by default** and **allows only what you list**. So you run with `--permission` plus one or more `--allow-*` flags. Here we only allowed read for `.`, so the script can read files in the demo directory and nothing else.

---

## [7:30] How the flags work (--permission and --allow-fs-read)

- **`--permission`** (or `--experimental-permission` on Node 20):  
  Turns **on** the permission model. After that, file system, child process, workers, and network are all restricted until you allow them.

- **`--allow-fs-read=<path>`**:  
  Allows **read** access to the given path. Examples:  
  - `--allow-fs-read=.` — current directory.  
  - `--allow-fs-read=/tmp` — directory `/tmp`.  
  - `--allow-fs-read=*` — all reads (everywhere).  

- **`--allow-fs-write=<path>`**:  
  Same idea for **write** access.

You can pass multiple paths, e.g. `--allow-fs-read=/tmp --allow-fs-read=./data`. The demo uses `.` for the current directory so the script can read `allowed-data.txt` in the same folder.

---

## [8:30] Step 3: process.permission.has() (demo/3-permission-has.mjs)

**What we run:**  
`node --permission --allow-fs-read=* demo/3-permission-has.mjs`  
(Permission on, and we allow read everywhere so that `permission.has()` can return true for the paths we check.)

**What the code does:**  
When the permission model is **on**, Node adds `process.permission.has(scope, reference)`. You can **check** before doing something: “Do I have permission to read this path?”  
- Example: `process.permission.has('fs.read', '/some/path')` → `true` or `false`.  
The script checks `fs.read` for the demo directory and for the file path, then prints the result.

**What you see:**  
- Output: `process.permission.has("fs.read", demoDir): true` and the same for the file.  
- Message: “Use this to check access before reading or writing (e.g. in plugins or config).”

**Takeaway:**  
You don’t have to try and catch ERR_ACCESS_DENIED every time. You can **ask first** with `permission.has()`. Useful for plugin systems or config-driven code: “Do I have read access to this path?” before calling `readFile`. This API exists **only when** Node was started with the permission flag; otherwise `process.permission` is undefined.

---

## [9:30] Debugging ERR_ACCESS_DENIED

When the permission model blocks something, Node throws an error. Your code can catch it and use:

- **`error.code`** — `'ERR_ACCESS_DENIED'` so you know it’s a permission denial.
- **`error.permission`** — e.g. `'FileSystemRead'` or `'FileSystemWrite'` (what kind of access was denied).
- **`error.resource`** — the path or resource that was blocked (e.g. the file path).

So you can log: “Permission denied: [permission] for [resource].” That’s the main **debugging** idea: know what was denied and where. The script `2-with-permission.mjs` does exactly that in the `catch` block when it gets ERR_ACCESS_DENIED.

---

## [10:30] Implementation pattern: allow only what you need

A simple pattern that matches the demo:

1. Start Node with `--permission` (or `--experimental-permission` on Node 20).
2. Add **only** the allow flags you need, e.g. `--allow-fs-read=./data` if the app should only read from `./data`.
3. If the code tries to read or write somewhere not allowed, Node throws **ERR_ACCESS_DENIED**. Catch it and handle it (log, show a message, or exit).

That’s “allow only what you need”; everything else is denied. The demo shows this: Step 2a = no allow → denied; Step 2b = allow `.` → read works.

---

## [11:30] How the runner picks the right flag (demo/run.mjs)

When you run `npm run demo`, it runs `demo/run.mjs`. That script:

1. Reads `process.version` (e.g. `v22.19.0`).
2. Decides which flag to use:  
   - Node 22.13+, 23.5+, 24+ → `--permission`  
   - Node 20, 21, 22.0–22.12 → `--experimental-permission`
3. Runs the four steps in order:  
   - Step 1: no flag.  
   - Step 2a: permission flag only (expect ERR_ACCESS_DENIED).  
   - Step 2b: permission flag + `--allow-fs-read=.`.  
   - Step 3: permission flag + `--allow-fs-read=*` and then `3-permission-has.mjs`.

So the script is **aligned** with the code: every step in the script corresponds to one run in the demo, and the explanations match what you see on screen.

---

## [12:30] Wrap-up (step by step)

1. **What is the permission model?**  
   A native way in Node to restrict what the process can do (fs, child process, workers, network). You turn it on with a flag; Node blocks everything you didn’t allow.

2. **What changed (Node 20 → 24)?**  
   Node 20 added it as experimental (`--experimental-permission`). Node 22.13/24 use the stable flag (`--permission`). Same behavior, different flag name.

3. **How it works:**  
   Turn on with `--permission` (or `--experimental-permission`). Allow only what you need with `--allow-fs-read`, `--allow-fs-write`, etc. Anything not allowed → **ERR_ACCESS_DENIED** (with `code`, `permission`, `resource`). Use **`process.permission.has(scope, reference)`** to check access at runtime when the model is on.

4. **Demo alignment:**  
   Step 1 = without model (read works). Step 2a = with model, no allow (ERR_ACCESS_DENIED). Step 2b = with model + `--allow-fs-read=.` (read works). Step 3 = `permission.has()` to check before doing something.

5. **Reminder:**  
   Still not for production; use it to learn and to prepare for future production use.

Run it yourself: `cd video-03 && npm run demo`.
