/**
 * CJS consumer - uses index.cjs
 * (With npm: require('my-pkg') - exports field picks index.cjs)
 */
const { greet } = require('./my-pkg/index.cjs');
console.log(greet('Bob'));
