import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successNotification } from '../components/success';
import TasksHeader from '../components/tasks/TasksHeader';
import TasksPageModals from '../components/tasks/TasksPageModals';
import TasksPanels from '../components/tasks/TasksPanels';
import { moveTask, sortByOrder } from '../components/tasks/taskUtils';
import {
  buildTaskPayload,
  createDefaultTaskForm,
  getInitialSavedDate,
  getSavedDateStorageKey,
  getTodayDate,
  mapTaskToForm,
} from './tasks/utils/taskPageUtils';
import {
  addRemainingWork,
  createTask as createTaskApi,
  deleteRemainingWork as deleteRemainingWorkApi,
  deleteTask as deleteTaskApi,
  exportTasksFile,
  getRemainingWorkBySubMain,
  getSubMainName,
  getTasksBySubMain,
  reorderTasks as reorderTasksApi,
  updateRemainingWork as updateRemainingWorkApi,
  updateTask as updateTaskApi,
} from '../services/tasksApi';

function Tasks() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mainTitle, setMainTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [remainingWorks, setRemainingWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReordering, setIsReordering] = useState(false);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [isTaskSubmitting, setIsTaskSubmitting] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const [showRemainingModal, setShowRemainingModal] = useState(false);
  const [editingRemainingId, setEditingRemainingId] = useState(null);
  const [remainingContent, setRemainingContent] = useState('');
  const [isRemainingSubmitting, setIsRemainingSubmitting] = useState(false);
  const [deletingRemainingId, setDeletingRemainingId] = useState(null);

  const [showDateModal, setShowDateModal] = useState(false);
  const [savedDate, setSavedDate] = useState('');

  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverTaskId, setDragOverTaskId] = useState(null);

  const [taskForm, setTaskForm] = useState(() => createDefaultTaskForm(id));

  useEffect(() => {
    const initialDate = getInitialSavedDate(id);
    setSavedDate(initialDate);
    setTaskForm(createDefaultTaskForm(id, initialDate));
  }, [id]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const [subMainName, taskItems] = await Promise.all([
        getSubMainName(id),
        getTasksBySubMain(id),
      ]);

      setMainTitle(subMainName);
      setTasks(sortByOrder(taskItems));
    } catch (err) {
      console.error(err);
      setMainTitle('');
      setTasks([]);
      toast.error('حدث خطأ أثناء جلب بيانات الفقرات');
    }

    try {
      const remainingItems = await getRemainingWorkBySubMain(id);
      setRemainingWorks(sortByOrder(remainingItems));
    } catch (err) {
      console.error(err);
      setRemainingWorks([]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openCreateTaskModal = () => {
    setShowTaskModal(true);
    setIsEditingTask(false);
    setEditTaskId(null);
    setTaskForm(createDefaultTaskForm(id, savedDate || getTodayDate()));
  };

  const openEditTaskModal = (task) => {
    setShowTaskModal(true);
    setIsEditingTask(true);
    setEditTaskId(task._id);
    setTaskForm(mapTaskToForm(task, id, savedDate || getTodayDate()));
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setIsEditingTask(false);
    setEditTaskId(null);
    setTaskForm(createDefaultTaskForm(id, savedDate || getTodayDate()));
  };

  const onTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({ ...prev, [name]: value }));
  };

  const onTaskColorChange = (usernameColor) => {
    setTaskForm((prev) => ({ ...prev, usernameColor }));
  };

  const submitTask = async (e) => {
    e.preventDefault();
    setIsTaskSubmitting(true);

    const payload = buildTaskPayload(taskForm, id);

    try {
      if (isEditingTask) {
        await updateTaskApi(editTaskId, payload);
        successNotification('تم تحديث الفقرة بنجاح');
      } else {
        await createTaskApi(payload);
        successNotification('تم إضافة الفقرة بنجاح');
      }

      await fetchData();
      closeTaskModal();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'حدث خطأ أثناء حفظ الفقرة');
    } finally {
      setIsTaskSubmitting(false);
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الفقرة؟')) return;

    setDeletingTaskId(taskId);
    try {
      await deleteTaskApi(taskId);
      await fetchData();
      successNotification('تم حذف الفقرة بنجاح');
    } catch (error) {
      console.error(error);
      toast.error('فشل في حذف الفقرة');
    } finally {
      setDeletingTaskId(null);
    }
  };

  const openCreateRemainingModal = () => {
    setShowRemainingModal(true);
    setEditingRemainingId(null);
    setRemainingContent('');
  };

  const openEditRemainingModal = (item) => {
    setShowRemainingModal(true);
    setEditingRemainingId(item._id);
    setRemainingContent(item.content || '');
  };

  const closeRemainingModal = () => {
    setShowRemainingModal(false);
    setEditingRemainingId(null);
    setRemainingContent('');
  };

  const submitRemainingWork = async (e) => {
    e.preventDefault();
    if (!remainingContent.trim()) {
      toast.error('يرجى إدخال العمل المتبقي');
      return;
    }

    setIsRemainingSubmitting(true);

    try {
      if (editingRemainingId) {
        await updateRemainingWorkApi(editingRemainingId, remainingContent.trim());
        successNotification('تم تحديث العمل المتبقي');
      } else {
        await addRemainingWork(id, remainingContent.trim());
        successNotification('تم إضافة العمل المتبقي');
      }

      await fetchData();
      closeRemainingModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء حفظ العمل المتبقي');
    } finally {
      setIsRemainingSubmitting(false);
    }
  };

  const deleteRemainingWork = async (itemId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا العنصر؟')) return;

    setDeletingRemainingId(itemId);
    try {
      await deleteRemainingWorkApi(itemId);
      await fetchData();
      successNotification('تم حذف العمل المتبقي');
    } catch (error) {
      console.error(error);
      toast.error('فشل حذف العمل المتبقي');
    } finally {
      setDeletingRemainingId(null);
    }
  };

  const downloadTasks = async () => {
    try {
      const blob = await exportTasksFile(id);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `tasks_${id}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);

      successNotification('تم تنزيل الفقرات بنجاح');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('فشل في تصدير الفقرات');
    }
  };

  const saveDate = (newDate) => {
    localStorage.setItem(getSavedDateStorageKey(id), newDate);
    setSavedDate(newDate);
    setShowDateModal(false);
    successNotification('تم حفظ التاريخ بنجاح');
  };

  const handleDragStart = (event, taskId) => {
    if (loading || isReordering || tasks.length < 2) {
      return;
    }

    setDraggedTaskId(taskId);
    setDragOverTaskId(taskId);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (event, taskId) => {
    if (!draggedTaskId || draggedTaskId === taskId) {
      return;
    }

    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    if (dragOverTaskId !== taskId) {
      setDragOverTaskId(taskId);
    }
  };

  const resetDragState = () => {
    setDraggedTaskId(null);
    setDragOverTaskId(null);
  };

  const handleDrop = async (event, targetTaskId) => {
    event.preventDefault();

    if (!draggedTaskId || draggedTaskId === targetTaskId) {
      resetDragState();
      return;
    }

    const oldIndex = tasks.findIndex((task) => task._id === draggedTaskId);
    const newIndex = tasks.findIndex((task) => task._id === targetTaskId);

    if (oldIndex < 0 || newIndex < 0) {
      resetDragState();
      return;
    }

    const previousTasks = tasks;
    const reorderedTasks = moveTask(tasks, oldIndex, newIndex);
    setTasks(reorderedTasks);
    resetDragState();
    setIsReordering(true);

    try {
      const res = await reorderTasksApi(
        id,
        reorderedTasks.map((task) => task._id)
      );

      setTasks(sortByOrder(res?.tasks || reorderedTasks));
      successNotification('تم حفظ ترتيب الفقرات');
    } catch (error) {
      console.error(error);
      setTasks(previousTasks);
      toast.error('فشل في حفظ الترتيب');
    } finally {
      setIsReordering(false);
    }
  };

  return (
    <section dir="rtl" lang="ar" className="mx-auto min-h-screen w-full max-w-7xl p-3 sm:p-4">
      <TasksHeader
        mainTitle={mainTitle}
        savedDate={savedDate}
        onBack={() => navigate(`/sub-main/details/${id}`)}
        onOpenDateModal={() => setShowDateModal(true)}
        onOpenCreateTask={openCreateTaskModal}
        onDownload={downloadTasks}
      />

      <TasksPanels
        loading={loading}
        tasks={tasks}
        isReordering={isReordering}
        draggedTaskId={draggedTaskId}
        dragOverTaskId={dragOverTaskId}
        deletingTaskId={deletingTaskId}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={resetDragState}
        onEditTask={openEditTaskModal}
        onDeleteTask={deleteTask}
        remainingWorks={remainingWorks}
        deletingRemainingId={deletingRemainingId}
        onCreateRemaining={openCreateRemainingModal}
        onEditRemaining={openEditRemainingModal}
        onDeleteRemaining={deleteRemainingWork}
      />

      <TasksPageModals
        showTaskModal={showTaskModal}
        isEditingTask={isEditingTask}
        taskForm={taskForm}
        isTaskSubmitting={isTaskSubmitting}
        onCloseTaskModal={closeTaskModal}
        onTaskFormChange={onTaskFormChange}
        onTaskColorChange={onTaskColorChange}
        onSubmitTask={submitTask}
        showRemainingModal={showRemainingModal}
        editingRemainingId={editingRemainingId}
        remainingContent={remainingContent}
        isRemainingSubmitting={isRemainingSubmitting}
        onCloseRemainingModal={closeRemainingModal}
        onRemainingContentChange={setRemainingContent}
        onSubmitRemaining={submitRemainingWork}
        showDateModal={showDateModal}
        savedDate={savedDate}
        onCloseDateModal={() => setShowDateModal(false)}
        onDateChange={setSavedDate}
        onSaveDate={() => saveDate(savedDate)}
      />
    </section>
  );
}

export default Tasks;
