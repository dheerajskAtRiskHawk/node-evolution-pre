/**
 * ESM consumer - uses index.mjs
 * (With npm: import { greet } from 'my-pkg' - exports field picks index.mjs)
 */
import { greet } from './my-pkg/index.mjs';
console.log(greet('Alice'));
