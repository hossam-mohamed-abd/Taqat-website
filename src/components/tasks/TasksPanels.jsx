import React from 'react';
import RemainingWorkPanel from './RemainingWorkPanel';
import TasksListPanel from './TasksListPanel';

function TasksPanels({
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
  remainingWorks,
  deletingRemainingId,
  onCreateRemaining,
  onEditRemaining,
  onDeleteRemaining,
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        <TasksListPanel
          loading={loading}
          tasks={tasks}
          isReordering={isReordering}
          draggedTaskId={draggedTaskId}
          dragOverTaskId={dragOverTaskId}
          deletingTaskId={deletingTaskId}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragEnd={onDragEnd}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      </div>

      <RemainingWorkPanel
        loading={loading}
        remainingWorks={remainingWorks}
        deletingRemainingId={deletingRemainingId}
        onCreate={onCreateRemaining}
        onEdit={onEditRemaining}
        onDelete={onDeleteRemaining}
      />
    </div>
  );
}

export default TasksPanels;
