# Test Lifecycle Demo

A small **task service** (add, list, get by id, complete) with a full project: entry file, source module, and tests using **AAA pattern** and **all lifecycle hooks**.

## Run the app

```bash
cd test-lifecycle-demo
npm start
```

Runs `index.js`: creates a TaskService, adds sample tasks, completes one, prints output.

## Run tests

```bash
npm test
```

Uses Node’s built-in test runner (`node --test`). ESM throughout (`"type": "module"`). Node 24+.

## Project layout

| Path | Purpose |
|------|--------|
| `index.js` | Entry: runs the task service with sample tasks. |
| `src/taskService.js` | TaskService: add, list, getById, complete (in-memory). |
| `src/userApi.js` | Async API: fetchUsers, fetchUserById (JSONPlaceholder users API). |
| `test/taskService.test.js` | Tests for TaskService (AAA + lifecycle hooks). |
| `test/userApi.test.js` | Tests for userApi (async/await + AAA + lifecycle hooks; requires network). |

## AAA pattern (Arrange–Act–Assert)

Each test is structured as:

1. **Arrange** — Set up data and preconditions.
2. **Act** — Call the code under test.
3. **Assert** — Check the result.

Example:

```js
it('add() returns task with id, title, completed false', () => {
  // Arrange
  const title = 'My first task';

  // Act
  const task = service.add(title);

  // Assert
  assert.strictEqual(typeof task.id, 'number');
  assert.strictEqual(task.title, title);
  assert.strictEqual(task.completed, false);
});
```

## Lifecycle hooks

| Hook | When it runs |
|------|------------------|
| **before()** | Once **before all** tests in the `describe`. |
| **after()** | Once **after all** tests in the `describe`. |
| **beforeEach()** | **Before each** test (e.g. fresh `TaskService`). |
| **afterEach()** | **After each** test. |

**Order:** `before` → (for each test: `beforeEach` → test → `afterEach`) → `after`.

## Best practices used

- **One logical assertion per test** where it makes sense (some tests check multiple properties of one result).
- **Descriptive test names** that state expected behaviour.
- **Fresh service in beforeEach** in the first suite so tests don’t share state.
- **Second suite** shows shared state from `before()` plus `beforeEach()`.
- **ESM** — `"type": "module"`; `import`/`export`; `.js` extension in imports.

Requires **Node.js 24+**.
