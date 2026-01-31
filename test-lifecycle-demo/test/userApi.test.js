/**
 * Tests for userApi: fetchUsers and fetchUserById (JSONPlaceholder API).
 * Uses async/await, AAA pattern, and lifecycle hooks.
 * Requires network access.
 */
import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { fetchUsers, fetchUserById } from '../src/userApi.js';

describe('userApi (JSONPlaceholder users)', () => {
  before(() => {
    console.log('  [before]   userApi suite started');
  });

  after(() => {
    console.log('  [after]    userApi suite finished');
  });

  beforeEach(() => {
    console.log('  [beforeEach] next test');
  });

  afterEach(() => {
    console.log('  [afterEach]  test done');
  });

  it('fetchUsers() returns an array of users', async () => {
    // Arrange — no local state

    // Act
    const users = await fetchUsers();

    // Assert
    assert.ok(Array.isArray(users));
    assert.ok(users.length >= 1);
    assert.strictEqual(typeof users[0].id, 'number');
    assert.strictEqual(typeof users[0].name, 'string');
    assert.strictEqual(typeof users[0].email, 'string');
  });

  it('fetchUserById(1) returns one user with expected fields', async () => {
    // Arrange
    const id = 1;

    // Act
    const user = await fetchUserById(id);

    // Assert
    assert.ok(user !== null);
    assert.strictEqual(user.id, 1);
    assert.strictEqual(typeof user.name, 'string');
    assert.strictEqual(typeof user.email, 'string');
    assert.ok(user.email.includes('@'));
  });

  it('fetchUserById(9999) returns null when user does not exist', async () => {
    // Arrange
    const id = 9999;

    // Act
    const user = await fetchUserById(id);

    // Assert
    assert.strictEqual(user, null);
  });

  it('fetchUserById(-1) returns null for invalid id', async () => {
    // Arrange
    const id = -1;

    // Act
    const user = await fetchUserById(id);

    // Assert
    assert.strictEqual(user, null);
  });

  it('fetchUsers() first user has id, name, username, email', async () => {
    // Arrange — none

    // Act
    const users = await fetchUsers();

    // Assert
    const first = users[0];
    assert.ok(first.id);
    assert.ok(first.name);
    assert.ok(first.username);
    assert.ok(first.email);
  });
});
