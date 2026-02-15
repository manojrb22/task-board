import { useMemo } from 'react';

export const useFilteredTasks = (tasks, searchTerm, priorityFilter, sortBy) => {
  return useMemo(() => {
    let filtered = [...tasks];

    // Search by title (case insensitive)
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by priority
    if (priorityFilter !== 'All') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    // Sort by due date
    if (sortBy !== 'none') {
      filtered.sort((a, b) => {
        // Tasks without due date go last
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return sortBy === 'asc' 
          ? a.dueDate - b.dueDate 
          : b.dueDate - a.dueDate;
      });
    }

    return filtered;
  }, [tasks, searchTerm, priorityFilter, sortBy]);
};
