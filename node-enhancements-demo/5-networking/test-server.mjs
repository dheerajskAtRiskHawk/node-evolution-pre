/**
 * Quick test - fetch from our server then exit
 */
import http from 'node:http';

const server = http.createServer(
  {
    maxHeaderSize: 16384,
    requestTimeout: 5000,
  },
  (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK\n');
  }
);

const PORT = 9999;
server.listen(PORT, async () => {
  const res = await fetch(`http://localhost:${PORT}`);
  const body = await res.text();
  console.log('Status:', res.status, '| Body:', body.trim());
  server.close();
});
