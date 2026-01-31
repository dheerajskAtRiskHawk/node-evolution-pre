/**
 * COMMONJS (CJS) - The old way (Node 20 and before, still works in 24)
 * 
 * Uses: require() and module.exports
 * File extension: .js (or .cjs to force CJS)
 */

const { add } = require('./utils.cjs');

const result = add(2, 3);
console.log('CJS result:', result);
