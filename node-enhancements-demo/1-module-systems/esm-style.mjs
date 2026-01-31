/**
 * ESM (ECMAScript Modules) - The modern way (Node 20-24)
 * 
 * Uses: import and export
 * File extension: .mjs OR use "type": "module" in package.json
 */

import { add } from './utils.mjs';

const result = add(2, 3);
console.log('ESM result:', result);
