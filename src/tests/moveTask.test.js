import { describe, it, expect } from 'vitest';
import { taskReducer } from '../reducers/taskReducer';

describe('Task Move (Drag & Drop)', () => {
  it('should move task to different status', () => {
    const initialState = {
      tasks: [
        { id: 'task1', title: 'My Task', status: 'todo' },
      ],
      activities: [],
    };

    const newState = taskReducer(initialState, {
      type: 'MOVE_TASK',
      payload: { taskId: 'task1', newStatus: 'done' },
    });

    expect(newState.tasks[0].status).toBe('done');
    expect(newState.activities[0].action).toBe('moved');
    expect(newState.activities[0].details).toBe('to done');
  });

  it('should not mutate original state', () => {
    const initialState = {
      tasks: [{ id: 'task1', title: 'Task', status: 'todo' }],
      activities: [],
    };

    const newState = taskReducer(initialState, {
      type: 'MOVE_TASK',
      payload: { taskId: 'task1', newStatus: 'doing' },
    });

    expect(initialState.tasks[0].status).toBe('todo');
    expect(newState.tasks[0].status).toBe('doing');
    expect(newState.tasks).not.toBe(initialState.tasks);
  });
});
