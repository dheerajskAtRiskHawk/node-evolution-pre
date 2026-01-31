# OpenAPI 3.1.1 Demo

Concise guide to OpenAPI 3.1.1 and migrating from 3.0.

## Files

| File | Description |
|------|-------------|
| `openapi-3.0-example.yaml` | 3.0 spec showing limitations (nullable, exclusiveMinimum, callbacks, format:binary) |
| `openapi-3.1.1-example.yaml` | Same API in 3.1.1 with all improvements |

**Run Swagger UI locally:**
```bash
npm install && npm start
```
Then open:
- [http://localhost:3000/3.1](http://localhost:3000/3.1) — OpenAPI 3.1.1
- [http://localhost:3000/3.0](http://localhost:3000/3.0) — OpenAPI 3.0

**Validate** (with [Redocly CLI](https://redocly.com/docs/cli/)):
```bash
npx @redocly/cli lint openapi-3.1.1-example.yaml
```

---

## 1. Introduction to OpenAPI 3.1.1

**What it is:** OpenAPI 3.1.1 (Oct 2024) is the latest patch in the 3.1 family. It’s 3.1.0 with clarifications and wording fixes—**no structural changes**.

**Why it matters for API designers & tooling:**
- Spec is clearer and more precise
- Fewer undefined or implementation-specific behaviors
- Better validation and tooling behavior

**Compatibility:** Everything from OpenAPI 3.0 still works: `paths`, `components`, `requestBody`, `security`, etc. The main changes are in schemas and some new features.

---

## 2. Schema Limitations in 3.0

| Limitation | Why it hurt |
|------------|-------------|
| **Custom schema subset** | Based on JSON Schema Draft 05; not aligned with modern JSON Schema |
| **`nullable: true`** | OpenAPI-specific; JSON Schema uses `type: ["string","null"]` |
| **`exclusiveMinimum` / `exclusiveMaximum`** | Boolean modifiers instead of numeric values; inconsistent with JSON Schema |
| **`example` (singular)** | One example per field; no built-in multi-example support |
| **`format: binary`** | Non-standard; unclear for validation and tooling |
| **Callbacks for webhooks** | Webhook flows modeled via callbacks; awkward for event-driven APIs |
| **`$ref`** | Limited in places; some rules around where refs can appear |

---

## 3. 3.1.1 Upgrades (Core Focus)

### Full JSON Schema Alignment

3.1.x aligns with **JSON Schema Draft 2020-12**:
- Standard keywords like `if/then/else`, tuple validation, etc.
- No OpenAPI-only schema extensions where standard JSON Schema works

### `$schema` & Dialects

You can declare the dialect explicitly:

```yaml
schema:
  $schema: https://spec.openapis.org/oas/3.1/dialect/base
  type: object
  properties:
    id: { type: integer }
```

Default dialect: `https://spec.openapis.org/oas/3.1/dialect/base`.

### Webhooks

First-class `webhooks` (replacing callback hacks):

```yaml
webhooks:
  orderShipped:
    post:
      summary: Called when order ships
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ShipmentEvent'
```

### Cleaner `$ref`

- Better reference resolution behavior
- Same `$ref` syntax, but clearer and more predictable

### Examples & Validation

- Use `examples` (array) instead of `example` (singular) for multiple examples
- Better validation semantics and clearer spec wording

---

## 4. Other Schema & Validation Changes

| Change | 3.0 | 3.1.1 |
|--------|-----|-------|
| **exclusiveMinimum / exclusiveMaximum** | `minimum: 7` + `exclusiveMinimum: true` | `exclusiveMinimum: 7` (direct value) |
| **examples** | `example: fedora` | `examples: [fedora, ubuntu]` |
| **File uploads** | `format: binary`, `format: base64` | `contentEncoding`, `contentMediaType` or empty schema for raw binary |

**File upload examples in 3.1.1:**

```yaml
# Raw binary (application/octet-stream)
application/octet-stream:
  schema: {}

# Base64-encoded
image/png:
  schema:
    type: string
    contentEncoding: base64

# Multipart file
multipart/form-data:
  schema:
    type: object
    properties:
      file:
        type: string
        contentMediaType: application/octet-stream
```

---

## 5. Tooling & Ecosystem

- **Swagger Editor / UI**: Support for OpenAPI 3.1.x
- **Validators**: Redocly, Spectral, etc.
- **Codegen**: OpenAPI Generator, swagger-codegen, etc.
- **Docs**: Redoc, Stoplight, etc.
- **Mocks**: Prism, WireMock, etc.

3.1.x improves: validation accuracy, docs quality, and consistency across tools.

---

## 6. Migration from 3.0 to 3.1.1

### Checklist

1. **Version**
   - `openapi: 3.0.3` → `openapi: 3.1.1`

2. **Schemas**
   - `nullable: true` → `type: ["string", "null"]`
   - `exclusiveMinimum: true` + `minimum: N` → `exclusiveMinimum: N`
   - `exclusiveMaximum: true` + `maximum: N` → `exclusiveMaximum: N`
   - `example: x` → `examples: [x]`

3. **File uploads**
   - `format: binary` for octet-stream → `schema: {}`
   - `format: base64` → `contentEncoding: base64`
   - Multipart files → `contentMediaType` for file parts

4. **Optional**
   - Add `$schema` where you want dialect clarity
   - Move webhook-style flows from callbacks to `webhooks`

### What Stays the Same

- `paths`, `components`, `requestBody`, `security`
- Operation structure
- Parameter definitions
- Response structure
- Most schemas that avoid the keywords above

---

## 7. Summary & Takeaways

| Area | Main benefit |
|------|--------------|
| **JSON Schema alignment** | Standard, modern validation; better tooling |
| **Webhooks** | Native support for event-driven APIs |
| **`$schema` & dialects** | Clear, explicit schema handling |
| **`nullable` → `type` arrays** | Standard JSON Schema semantics |
| **`exclusiveMin/Max`** | Simpler, numeric-only semantics |
| **`examples`** | Built-in multi-example support |
| **File uploads** | `contentEncoding` / `contentMediaType` for clearer semantics |

**Bottom line:** 3.1.1 improves clarity, aligns with JSON Schema, and gives first-class webhooks, with small schema changes required during migration.
