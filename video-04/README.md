# Video 4: HTTP & Networking Enhancements

**Duration:** ~10–15 min  
**Topics:** Native HTTP proxy (http + fetch), WebSocket client (Node 22+), server options (maxHeaderSize, requestTimeout).

---

## Prerequisites

- **Node.js 22+**
- Basic idea of HTTP and WebSocket.

---

## Run the demo (quick)

```bash
cd video-04
npm run demo
```

Runs 3 short scripts in order; no background servers to manage. Each script runs and exits.

---

## Project layout

| File | Purpose |
|------|--------|
| `demo/run.mjs` | Runs the 3 demos in order. |
| `demo/1-proxy.mjs` | Target + proxy in one script; fetches via proxy and exits. |
| `demo/2-websocket.mjs` | Native WebSocket client → echo server; send, receive, close. |
| `demo/3-server-options.mjs` | HTTP server with maxHeaderSize + requestTimeout; fetches self and exits. |

---

## Run parts by hand

```bash
node demo/1-proxy.mjs
node demo/2-websocket.mjs
node demo/3-server-options.mjs
```

---

See [script.md](script.md) for the video script.
