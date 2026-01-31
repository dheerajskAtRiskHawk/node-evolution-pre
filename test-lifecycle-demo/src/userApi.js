/**
 * Fetches user data from JSONPlaceholder API (https://jsonplaceholder.typicode.com/users).
 * Demonstrates testing async functions that call a real HTTP API.
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetches all users from JSONPlaceholder.
 * @returns {Promise<object[]>} Array of user objects.
 */
export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error(`fetchUsers failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetches a single user by id from JSONPlaceholder.
 * @param {number} id User id (1–10 exist in the fake API).
 * @returns {Promise<object|null>} User object or null if not found (e.g. 404).
 */
export async function fetchUserById(id) {
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId < 1) {
    return null;
  }
  const response = await fetch(`${BASE_URL}/users/${numId}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`fetchUserById failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
