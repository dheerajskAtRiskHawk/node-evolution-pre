/**
 * CJS entry - used when someone does: const pkg = require('my-pkg')
 */
function greet(name) {
  return `Hello, ${name}! (from CJS)`;
}

module.exports = { greet };
