/**
 * NETWORKING ENHANCEMENTS - Node 20-24
 * 
 * New options for http.createServer() to control timeouts and limits.
 * Protects against slow/clients and DoS attacks.
 */

import http from 'node:http';

const server = http.createServer(
  {
    // Max size of HTTP headers (bytes). Default: 16KB. Reject huge headers.
    maxHeaderSize: 16384,

    // Time to receive complete request. Default: 300000 (5 min).
    // Shorter = faster fail for slow clients.
    requestTimeout: 5000,

    // Time to receive headers only. Reject if headers take too long.
    headersTimeout: 3000,

    // Keep-alive: how long to wait for next request on same connection.
    keepAliveTimeout: 5000,
  },
  (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  }
);

const PORT = 8888;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Options: maxHeaderSize, requestTimeout, headersTimeout, keepAliveTimeout');
});
