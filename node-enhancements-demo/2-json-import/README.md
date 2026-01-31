# 2. Native JSON Import (Node 22+)

**What changed:** You can now `import` JSON files directly without `fs` or `JSON.parse`.

## Run the demos

```bash
# New way (Node 22+)
node load-json.mjs

# Old way (works in all versions)
node old-way.mjs
```

## Syntax evolution

```javascript
// 1. Manual (always worked)
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// 2. assert (Node 17.1–20.x, deprecated)
import config from './config.json' assert { type: 'json' };

// 3. with (Node 20.10+, current)
import config from './config.json' with { type: 'json' };
```

`assert` was renamed to `with` in the import attributes spec. Both tell Node: "treat this file as JSON."
