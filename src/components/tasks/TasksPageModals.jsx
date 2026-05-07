import React from 'react';
import DateModal from './DateModal';
import RemainingWorkModal from './RemainingWorkModal';
import TaskModal from './TaskModal';

function TasksPageModals({
  showTaskModal,
  isEditingTask,
  taskForm,
  isTaskSubmitting,
  onCloseTaskModal,
  onTaskFormChange,
  onTaskColorChange,
  onSubmitTask,
  showRemainingModal,
  editingRemainingId,
  remainingContent,
  isRemainingSubmitting,
  onCloseRemainingModal,
  onRemainingContentChange,
  onSubmitRemaining,
  showDateModal,
  savedDate,
  onCloseDateModal,
  onDateChange,
  onSaveDate,
}) {
  return (
    <>
      <TaskModal
        show={showTaskModal}
        isEditingTask={isEditingTask}
        taskForm={taskForm}
        isTaskSubmitting={isTaskSubmitting}
        onClose={onCloseTaskModal}
        onChange={onTaskFormChange}
        onColorChange={onTaskColorChange}
        onSubmit={onSubmitTask}
      />

      <RemainingWorkModal
        show={showRemainingModal}
        editingRemainingId={editingRemainingId}
        remainingContent={remainingContent}
        isRemainingSubmitting={isRemainingSubmitting}
        onClose={onCloseRemainingModal}
        onChange={onRemainingContentChange}
        onSubmit={onSubmitRemaining}
      />

      <DateModal
        show={showDateModal}
        date={savedDate}
        onClose={onCloseDateModal}
        onDateChange={onDateChange}
        onSave={onSaveDate}
      />
    </>
  );
}

export default TasksPageModals;
