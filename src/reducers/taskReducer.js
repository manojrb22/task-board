import { v4 as uuidv4 } from 'uuid';

const createActivity = (action, taskTitle, details = '') => ({
  id: uuidv4(),
  action,
  taskTitle,
  details,
  timestamp: Date.now(),
});

export const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask = {
        id: uuidv4(),
        ...action.payload,
        status: 'todo',
        createdAt: Date.now(),
      };
      return {
        tasks: [...state.tasks, newTask],
        activities: [
          createActivity('created', newTask.title),
          ...state.activities,
        ],
      };
    }

    case 'EDIT_TASK': {
      const updatedTasks = state.tasks.map(task =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updates }
          : task
      );
      const editedTask = updatedTasks.find(t => t.id === action.payload.id);
      return {
        tasks: updatedTasks,
        activities: [
          createActivity('edited', editedTask.title),
          ...state.activities,
        ],
      };
    }

    case 'DELETE_TASK': {
      const taskToDelete = state.tasks.find(t => t.id === action.payload);
      return {
        tasks: state.tasks.filter(task => task.id !== action.payload),
        activities: [
          createActivity('deleted', taskToDelete.title),
          ...state.activities,
        ],
      };
    }

    case 'MOVE_TASK': {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      const updatedTasks = state.tasks.map(t =>
        t.id === taskId ? { ...t, status: newStatus } : t
      );
      return {
        tasks: updatedTasks,
        activities: [
          createActivity('moved', task.title, `to ${newStatus}`),
          ...state.activities,
        ],
      };
    }

    case 'RESET_BOARD':
      return {
        tasks: [],
        activities: [
          createActivity('reset', 'Board', 'All tasks cleared'),
          ...state.activities,
        ],
      };

    case 'INITIALIZE':
      return action.payload;

    default:
      return state;
  }
};

export const initialTaskState = {
  tasks: [],
  activities: [],
};
