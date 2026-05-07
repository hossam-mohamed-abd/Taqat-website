import Api from '../Config/Api';

const buildAuthConfig = () => ({
  headers: {
    Authorization: localStorage.getItem('token'),
  },
});

export const getSubMainName = async (submainId) => {
  const { data } = await Api.get(`/api/tasks/get-name/${submainId}`, buildAuthConfig());
  return data?.data || '';
};

export const getTasksBySubMain = async (submainId) => {
  const { data } = await Api.get(`/api/tasks/getbySubId/${submainId}`, buildAuthConfig());
  return data?.tasks || [];
};

export const getRemainingWorkBySubMain = async (submainId) => {
  const { data } = await Api.get(`/api/remaining-work/submain/${submainId}`, buildAuthConfig());
  return data?.items || [];
};

export const createTask = async (payload) => {
  const { data } = await Api.post('/api/tasks/create-task', payload, buildAuthConfig());
  return data;
};

export const updateTask = async (taskId, payload) => {
  const { data } = await Api.patch(`/api/tasks/${taskId}`, payload, buildAuthConfig());
  return data;
};

export const deleteTask = async (taskId) => {
  const { data } = await Api.delete(`/api/tasks/${taskId}`, buildAuthConfig());
  return data;
};

export const reorderTasks = async (submainId, orderedTaskIds) => {
  const { data } = await Api.patch(
    `/api/tasks/reorder/${submainId}`,
    { orderedTaskIds },
    buildAuthConfig()
  );
  return data;
};

export const addRemainingWork = async (submainId, content) => {
  const { data } = await Api.post(
    '/api/remaining-work/add',
    { submainId, content },
    buildAuthConfig()
  );
  return data;
};

export const updateRemainingWork = async (itemId, content) => {
  const { data } = await Api.patch(
    `/api/remaining-work/${itemId}`,
    { content },
    buildAuthConfig()
  );
  return data;
};

export const deleteRemainingWork = async (itemId) => {
  const { data } = await Api.delete(`/api/remaining-work/${itemId}`, buildAuthConfig());
  return data;
};

export const exportTasksFile = async (submainId) => {
  const { data } = await Api.get(`/api/tasks/export-data/${submainId}`, {
    responseType: 'blob',
  });

  return data;
};
