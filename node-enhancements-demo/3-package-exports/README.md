# 3. Package Exports - Dual CJS & ESM Support

**What changed:** One package can serve both `import` (ESM) and `require` (CJS) users.

## The magic: package.json "exports"

```json
{
  "exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.cjs"
    }
  }
}
```

- `import` users get `index.mjs`
- `require` users get `index.cjs`

When published to npm, consumers do `import pkg from 'my-pkg'` and Node picks the right file automatically!

## Run the demos

```bash
# ESM consumer (uses index.mjs)
node use-esm.mjs

# CJS consumer (uses index.cjs)
node use-cjs.cjs
```

## Why? 
So your npm package works for everyone - old CJS projects and new ESM projects!
