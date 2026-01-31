# Import attributes (Node 22+)

This folder shows **import attributes** — loading JSON with:

```js
import data from './file.json' with { type: 'json' };
```

- **config.json** — Example config (app name, version). Loaded in `load.mjs`.
- **i18n.json** — Example translation data (en/es). Loaded in `load.mjs`.

This syntax works only in **Node 22+**. In Node 20 you’d use `fs.readFile` + `JSON.parse` or `createRequire` to load JSON. So this is the 22–24 “import modernization” in this video.
