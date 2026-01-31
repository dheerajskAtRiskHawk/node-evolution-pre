/**
 * ESM entry - used when someone does: import pkg from 'my-pkg'
 */
export function greet(name) {
  return `Hello, ${name}! (from ESM)`;
}

export default { greet };
