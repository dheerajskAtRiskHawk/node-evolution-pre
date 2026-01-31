#!/usr/bin/env node
/**
 * Proxy demo: target server + proxy server + fetch, all in one script.
 * Run: node demo/1-proxy.mjs
 */
import http from 'node:http';

const target = http.createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from target (via proxy).\n');
});

const TARGET_PORT = 18081;
const PROXY_PORT = 18080;

const proxy = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${TARGET_PORT}`);
  const response = await fetch(url, { method: req.method, headers: req.headers });
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
});

target.listen(TARGET_PORT, () => {
  proxy.listen(PROXY_PORT, async () => {
    const res = await fetch(`http://localhost:${PROXY_PORT}`);
    const body = await res.text();
    console.log('Proxy demo — Status:', res.status, '| Body:', body.trim());
    target.close(() => proxy.close(() => process.exit(0)));
  });
});
