/**
 * In-memory task service: add, list, get by id, complete.
 * Used by index.js (entry) and by tests.
 */
class TaskService {
  constructor() {
    this._tasks = [];
    this._nextId = 1;
  }

  add(title) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Title is required');
    }
    const task = {
      id: this._nextId++,
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this._tasks.push(task);
    return task;
  }

  list() {
    return [...this._tasks];
  }

  getById(id) {
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId < 1) return null;
    return this._tasks.find((t) => t.id === numId) || null;
  }

  complete(id) {
    const task = this.getById(id);
    if (!task) return null;
    task.completed = true;
    return task;
  }
}

export { TaskService };
