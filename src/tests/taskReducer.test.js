import { describe, it, expect } from 'vitest';
import { taskReducer, initialTaskState } from '../reducers/taskReducer';

describe('Task Reducer', () => {
  it('should add a new task', () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      priority: 'High',
      dueDate: Date.now(),
      tags: ['test'],
    };

    const newState = taskReducer(initialTaskState, {
      type: 'ADD_TASK',
      payload: taskData,
    });

    expect(newState.tasks).toHaveLength(1);
    expect(newState.tasks[0].title).toBe('Test Task');
    expect(newState.tasks[0].status).toBe('todo');
    expect(newState.tasks[0].id).toBeDefined();
    expect(newState.activities).toHaveLength(1);
    expect(newState.activities[0].action).toBe('created');
  });

  it('should delete a task', () => {
    const stateWithTask = {
      tasks: [{ id: '123', title: 'Task to delete', status: 'todo' }],
      activities: [],
    };

    const newState = taskReducer(stateWithTask, {
      type: 'DELETE_TASK',
      payload: '123',
    });

    expect(newState.tasks).toHaveLength(0);
    expect(newState.activities[0].action).toBe('deleted');
  });
});
