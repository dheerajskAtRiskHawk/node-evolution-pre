# 5. Networking Enhancements (Node 20-24)

**What changed:** HTTP server has new options for security and reliability.

## Key options

| Option           | What it does                         | Default    |
|------------------|--------------------------------------|------------|
| `maxHeaderSize`  | Max size of request headers (bytes)  | 16384      |
| `requestTimeout` | Max time to receive full request (ms)| 300000     |
| `headersTimeout` | Max time to receive headers (ms)     | 60000      |
| `keepAliveTimeout` | Idle time before closing connection | 5000     |

## Run the demos

```bash
# Start server (runs until Ctrl+C)
node server.mjs

# Quick test (starts server, fetches, exits)
node test-server.mjs
```

## Why?
- **Slow clients**: Close connections that take too long
- **DoS protection**: Reject huge headers or slow attacks
- **Resource control**: Don't hold connections forever
