import { DEFAULT_NAME_COLOR } from '../../../constants/nameColors';

export const getTodayDate = () => new Date().toISOString().split('T')[0];

export const getSavedDateStorageKey = (submainId) => `savedDate_${submainId}`;

export const getInitialSavedDate = (submainId) => {
  return localStorage.getItem(getSavedDateStorageKey(submainId)) || getTodayDate();
};

export const createDefaultTaskForm = (submainId, date = getTodayDate()) => ({
  submainId,
  username: '',
  usernameColor: DEFAULT_NAME_COLOR,
  date,
  tasks: '',
  notes: '',
});

export const mapTaskToForm = (task, submainId, fallbackDate = getTodayDate()) => ({
  submainId: task.submainId?._id || submainId,
  username: task.username || '',
  usernameColor: task.usernameColor || DEFAULT_NAME_COLOR,
  date: task.date ? task.date.split('T')[0] : fallbackDate,
  tasks: task.tasks || '',
  notes: task.notes || '',
});

export const buildTaskPayload = (taskForm, submainId) => ({
  submainId,
  username: taskForm.username?.trim() || '',
  usernameColor: taskForm.usernameColor || DEFAULT_NAME_COLOR,
  date: taskForm.date || '',
  tasks: taskForm.tasks?.trim() || '',
  notes: taskForm.notes?.trim() || '',
});
