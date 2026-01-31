#!/usr/bin/env node
/**
 * Server-options demo: maxHeaderSize + requestTimeout, then fetch self. Run: node demo/3-server-options.mjs
 */
import http from 'node:http';

const server = http.createServer(
  { maxHeaderSize: 16384, requestTimeout: 5000 },
  (_req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK\n');
  }
);

const PORT = 18082;
server.listen(PORT, async () => {
  const res = await fetch(`http://localhost:${PORT}`);
  console.log('Server-options demo — Status:', res.status, '| Body:', (await res.text()).trim());
  server.close();
});
