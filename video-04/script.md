# Video 4: HTTP & Networking Enhancements

**Duration:** ~10–15 min  
**Prereqs:** Basic Node.js HTTP; idea of WebSocket and proxy.

---

## [0:00] Intro

We cover **what’s new** (Node 20→24), **how it works**, and run 3 short demos. Run: `cd video-04 && npm run demo`.

---

## [0:30] What’s new (Node 20 → 24)?

- **Node 22:** **WebSocket enabled by default** — global `WebSocket` client.
- **Node 22.3+:** **fetch respects proxy** — `HTTP_PROXY`, `NO_PROXY`.
- **Server options:** **maxHeaderSize**, **requestTimeout** on `http.createServer`.

All native: `http` + `fetch` + `WebSocket` + server options. No heavy libs.

---

## [1:30] Demo 1: Proxy (demo/1-proxy.mjs)

**Run:** `node demo/1-proxy.mjs` — one script, runs and exits.  
**Code:** Target server (3001) + proxy server (3000) in one process. Proxy uses **fetch** to forward to target. Script then fetches the proxy and logs.  
**See:** “Proxy demo — Status: 200 | Body: Hello from target (via proxy).”  
**Takeaway:** Proxy = `http` + **fetch**. No Express. Node 22.3+ fetch also respects `HTTP_PROXY`.

---

## [4:00] Demo 2: WebSocket (demo/2-websocket.mjs)

**Run:** `node demo/2-websocket.mjs` — uses public echo, no server to start.  
**Code:** `new WebSocket('wss://echo.websocket.org')` + `addEventListener` (open → send; message → log and close).  
**See:** “WebSocket: sent”, “WebSocket: received …”, “WebSocket: closed.”  
**Takeaway:** Node 22+ native WebSocket client. Use `addEventListener` (Web API).

---

## [6:00] Demo 3: Server options (demo/3-server-options.mjs)

**Run:** `node demo/3-server-options.mjs` — server + fetch self, then exits.  
**Code:** `http.createServer({ maxHeaderSize: 16384, requestTimeout: 5000 }, handler)`. Listen, fetch self, log, close.  
**See:** “Server-options demo — Status: 200 | Body: OK.”  
**Takeaway:** Tune header limits and connection timeouts per server.

---

## [7:30] Runner (demo/run.mjs)

`npm run demo` runs: 1-proxy.mjs → 2-websocket.mjs → 3-server-options.mjs. No spawn, no wait. Each demo is self-contained and quick.

---

## [8:00] Recap

1. **New 20→24:** WebSocket client (Node 22), fetch proxy (22.3+), server options.  
2. **Proxy:** One script = target + proxy + fetch; `http` + `fetch`.  
3. **WebSocket:** One script = connect, send, receive, close.  
4. **Server options:** One script = server with options, fetch self, exit.

Run: `cd video-04 && npm run demo`.
