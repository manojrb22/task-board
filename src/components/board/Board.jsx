import { useState } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { useTasks } from '../../context/TaskContext';
import { useFilteredTasks } from '../../hooks/useFilteredTasks';
import Header from '../layout/Header';
import Column from './Column';
import SearchFilter from './SearchFilter';
import ActivityLog from '../activity/ActivityLog';
import TaskForm from '../tasks/TaskForm';
import TaskCard from '../tasks/TaskCard';

const Board = () => {
  const { state, dispatch } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('none');

  const filteredTasks = useFilteredTasks(state.tasks, searchTerm, priorityFilter, sortBy);

  const tasksByStatus = {
    todo: filteredTasks.filter(t => t.status === 'todo'),
    doing: filteredTasks.filter(t => t.status === 'doing'),
    done: filteredTasks.filter(t => t.status === 'done'),
  };

  const handleCreateTask = (taskData) => {
    dispatch({ type: 'ADD_TASK', payload: taskData });
    setIsFormOpen(false);
  };

  const handleEditTask = (taskData) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: { id: editingTask.id, updates: taskData },
    });
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: 'DELETE_TASK', payload: taskId });
    }
  };

  const handleResetBoard = () => {
    if (window.confirm('Are you sure you want to reset the board? This will delete all tasks.')) {
      dispatch({ type: 'RESET_BOARD' });
    }
  };

  const openEditForm = (task) => {
    setEditingTask(task);
  };

  const handleDragStart = (event) => {
    const task = state.tasks.find(t => t.id === event.active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const task = state.tasks.find(t => t.id === taskId);
    if (task && task.status !== newStatus) {
      dispatch({ type: 'MOVE_TASK', payload: { taskId, newStatus } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Task Board</h2>
          <div className="flex gap-3">
            <button
              onClick={handleResetBoard}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
            >
              Reset Board
            </button>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              + New Task
            </button>
          </div>
        </div>

        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <div className="flex gap-4 overflow-x-auto pb-4">
                <Column
                  status="todo"
                  tasks={tasksByStatus.todo}
                  onEdit={openEditForm}
                  onDelete={handleDeleteTask}
                />
                <Column
                  status="doing"
                  tasks={tasksByStatus.doing}
                  onEdit={openEditForm}
                  onDelete={handleDeleteTask}
                />
                <Column
                  status="done"
                  tasks={tasksByStatus.done}
                  onEdit={openEditForm}
                  onDelete={handleDeleteTask}
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <ActivityLog activities={state.activities} />
            </div>
          </div>
          <DragOverlay>
            {activeTask ? (
              <div className="opacity-50">
                <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {isFormOpen && (
        <TaskForm
          onSubmit={handleCreateTask}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={handleEditTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default Board;
