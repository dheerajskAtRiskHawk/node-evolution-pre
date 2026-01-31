#!/usr/bin/env node
/**
 * WebSocket demo: native client (Node 22+) → echo server. Run: node demo/2-websocket.mjs
 */
const ws = new WebSocket('wss://echo.websocket.org');

ws.addEventListener('open', () => {
  ws.send('Hello Video 4');
  console.log('WebSocket: sent');
});
ws.addEventListener('message', (e) => {
  console.log('WebSocket: received', e.data);
  ws.close();
});
ws.addEventListener('close', () => console.log('WebSocket: closed'));
ws.addEventListener('error', (e) => { console.error(e); process.exit(1); });
