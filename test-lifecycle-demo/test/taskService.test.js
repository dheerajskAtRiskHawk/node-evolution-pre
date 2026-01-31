/**
 * TaskService tests: AAA pattern + full lifecycle hooks.
 * - before()   = before all (once per describe)
 * - after()    = after all (once per describe)
 * - beforeEach() = before each test (fresh service)
 * - afterEach()  = after each test
 */
import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { TaskService } from '../src/taskService.js';

describe('TaskService', () => {
  let service;
  let createdCount;

  before(() => {
    createdCount = 0;
    console.log('  [before]   suite started (once)');
  });

  after(() => {
    console.log('  [after]    suite finished (once)');
  });

  beforeEach(() => {
    service = new TaskService();
    createdCount += 1;
    console.log('  [beforeEach] fresh service (test #' + createdCount + ')');
  });

  afterEach(() => {
    console.log('  [afterEach]  test finished');
  });

  it('add() returns task with id, title, completed false', () => {
    // Arrange
    const title = 'My first task';

    // Act
    const task = service.add(title);

    // Assert
    assert.strictEqual(typeof task.id, 'number');
    assert.strictEqual(task.title, title);
    assert.strictEqual(task.completed, false);
    assert.ok(task.createdAt);
  });

  it('list() returns all added tasks', () => {
    // Arrange
    service.add('Task A');
    service.add('Task B');

    // Act
    const list = service.list();

    // Assert
    assert.strictEqual(list.length, 2);
    assert.strictEqual(list[0].title, 'Task A');
    assert.strictEqual(list[1].title, 'Task B');
  });

  it('getById() returns task when found', () => {
    // Arrange
    const added = service.add('Find me');

    // Act
    const found = service.getById(added.id);

    // Assert
    assert.strictEqual(found.id, added.id);
    assert.strictEqual(found.title, 'Find me');
  });

  it('getById() returns null when not found', () => {
    // Arrange
    service.add('Only one');

    // Act
    const found = service.getById(999);

    // Assert
    assert.strictEqual(found, null);
  });

  it('complete() marks task completed and returns it', () => {
    // Arrange
    const added = service.add('To complete');

    // Act
    const updated = service.complete(added.id);

    // Assert
    assert.strictEqual(updated.completed, true);
    assert.strictEqual(service.getById(added.id).completed, true);
  });

  it('complete() returns null for invalid id', () => {
    // Arrange — no tasks

    // Act
    const result = service.complete(99);

    // Assert
    assert.strictEqual(result, null);
  });

  it('add() throws when title is empty', () => {
    // Arrange — service from beforeEach

    // Act & Assert
    assert.throws(() => service.add(''), { message: /Title is required/ });
    assert.throws(() => service.add('   '), { message: /Title is required/ });
  });

  it('add() trims title', () => {
    // Arrange
    const raw = '  trimmed  ';

    // Act
    const task = service.add(raw);

    // Assert
    assert.strictEqual(task.title, 'trimmed');
  });
});

describe('TaskService (lifecycle: shared state)', () => {
  let service;

  before(() => {
    service = new TaskService();
    service.add('Shared task from before()');
    console.log('  [before]   shared service with one task');
  });

  after(() => {
    console.log('  [after]    shared suite done');
  });

  beforeEach(() => {
    service.add('Added in beforeEach');
    console.log('  [beforeEach] added one task');
  });

  afterEach(() => {
    console.log('  [afterEach]  after test');
  });

  it('list() includes task from before() and beforeEach()', () => {
    // Arrange — before() added 1, beforeEach() added 1

    // Act
    const list = service.list();

    // Assert
    assert.ok(list.length >= 2);
    assert.ok(list.some((t) => t.title === 'Shared task from before()'));
    assert.ok(list.some((t) => t.title === 'Added in beforeEach'));
  });
});
