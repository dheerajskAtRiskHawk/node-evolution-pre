/**
 * NATIVE JSON IMPORT - Node 22+
 * 
 * Evolution: fs.readFileSync → assert { type: 'json' } (Node 17.1, deprecated)
 *          → with { type: 'json' } (Node 20.10+, current)
 * 
 * No fs, no JSON.parse - just import!
 */

import config from './config.json' with { type: 'json' };

console.log('App:', config.appName);
console.log('Version:', config.version);
console.log('Debug:', config.debug);
