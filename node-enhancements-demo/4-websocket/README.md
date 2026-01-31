# 4. Native WebSocket (Node 22+)

**What changed:** WebSocket is now built into Node.js - no `ws` or `socket.io` needed!

## Run the demo

```bash
node client.mjs
```

This connects to a public echo server and sends a message.

## API (same as browser!)

```javascript
const ws = new WebSocket('wss://example.com');

ws.onopen = () => ws.send('Hello');
ws.onmessage = (e) => console.log(e.data);
ws.onclose = () => console.log('Closed');
```

## Node version

- **Node 22.4+**: WebSocket client is stable
- **Node 24**: WebSocket server also available
