import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from '../tasks/TaskCard';

const columnStyles = {
  todo: 'bg-gray-50 border-gray-200',
  doing: 'bg-blue-50 border-blue-200',
  done: 'bg-green-50 border-green-200',
};

const columnTitles = {
  todo: 'To Do',
  doing: 'Doing',
  done: 'Done',
};

const Column = ({ status, tasks, onEdit, onDelete }) => {
  const { setNodeRef } = useDroppable({ id: status });
  const taskIds = tasks.map(t => t.id);

  return (
    <div className={`flex-1 min-w-[300px] rounded-lg border-2 ${columnStyles[status]} p-4`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-700">{columnTitles[status]}</h2>
        <span className="bg-white px-2 py-1 rounded text-sm font-semibold text-gray-600">
          {tasks.length}
        </span>
      </div>
      
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="space-y-3 min-h-[200px]">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No tasks</p>
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
