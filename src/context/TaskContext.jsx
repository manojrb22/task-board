import { createContext, useReducer, useEffect, useContext } from 'react';
import { taskReducer, initialTaskState } from '../reducers/taskReducer';

const TaskContext = createContext();

const STORAGE_KEY = 'taskBoardData';

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, (initial) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate structure
        if (parsed.tasks && Array.isArray(parsed.tasks) && 
            parsed.activities && Array.isArray(parsed.activities)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Failed to load saved data:', error);
    }
    return initial;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};
