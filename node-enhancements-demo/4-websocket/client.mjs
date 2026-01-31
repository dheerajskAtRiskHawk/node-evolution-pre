/**
 * NATIVE WEBSOCKET - Node 22+ (stable in 22.4+)
 * 
 * OLD way: npm install ws (external library)
 * NEW way: Built-in! No dependencies.
 * 
 * Same API as browser WebSocket.
 */

const ws = new WebSocket('wss://echo.websocket.org');

ws.onopen = () => {
  console.log('Connected!');
  ws.send('Hello from Node.js');
};

ws.onmessage = (event) => {
  console.log('Echo received:', event.data);
  ws.close();
};

ws.onclose = () => {
  console.log('Connection closed');
};

ws.onerror = (err) => {
  console.error('Error:', err.message);
};
