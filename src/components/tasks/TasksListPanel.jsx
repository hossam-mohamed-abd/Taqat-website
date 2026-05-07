import React from 'react';
import { ListChecks } from 'lucide-react';
import TaskCard from './TaskCard';

function TasksListPanel({
  loading,
  tasks,
  isReordering,
  draggedTaskId,
  dragOverTaskId,
  deletingTaskId,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onEditTask,
  onDeleteTask,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm dark:border-indigo-900/30 dark:bg-[#0e0e1e]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-indigo-100 bg-indigo-50/60 px-5 py-3.5 dark:border-indigo-900/30 dark:bg-indigo-950/20">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/60 dark:text-indigo-400">
            <ListChecks size={16} />
          </span>
          <h2 className="text-base font-black text-indigo-900 dark:text-indigo-100">قائمة الفقرات</h2>
          {tasks.length > 0 && !loading && (
            <span className="rounded-full border border-indigo-200 bg-indigo-100 px-2 py-0.5 text-[11px] font-bold text-indigo-600 dark:border-indigo-800/50 dark:bg-indigo-900/50 dark:text-indigo-400">
              {tasks.length}
            </span>
          )}
        </div>
        {isReordering && (
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-500">
            جاري حفظ الترتيب...
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="h-24 animate-pulse rounded-2xl border border-indigo-100 bg-indigo-50 dark:border-indigo-900/30 dark:bg-indigo-950/20"
              />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 py-12 dark:border-indigo-900/40">
            <ListChecks size={36} className="mb-3 text-indigo-500 dark:text-indigo-700" />
            <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-500">لا توجد فقرات بعد</p>
            <p className="mt-1 text-xs text-indigo-500 dark:text-indigo-600">أضف فقرة جديدة للبدء في تتبع المهام</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                canDrag={!isReordering && tasks.length > 1}
                isDragging={draggedTaskId === task._id}
                isDropTarget={dragOverTaskId === task._id && draggedTaskId !== task._id}
                isDeleting={deletingTaskId === task._id}
                onDragStart={(event) => onDragStart(event, task._id)}
                onDragOver={(event) => onDragOver(event, task._id)}
                onDrop={(event) => onDrop(event, task._id)}
                onDragEnd={onDragEnd}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TasksListPanel;
