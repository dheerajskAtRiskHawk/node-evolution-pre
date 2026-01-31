#!/usr/bin/env node
/**
 * Entry point: run the task service with a few sample tasks.
 * Usage: npm start  or  node index.js
 */
import { TaskService } from './src/taskService.js';

const service = new TaskService();

service.add('Learn Node.js test runner');
service.add('Use AAA pattern in tests');
service.add('Apply lifecycle hooks');

console.log('Tasks:', service.list().map((t) => ({ id: t.id, title: t.title, completed: t.completed })));
service.complete(1);
console.log('After completing task 1:', service.getById(1));
console.log('Done.');
process.exit(0);
