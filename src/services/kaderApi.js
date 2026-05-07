import Api from '../Config/Api';

const buildAuthConfig = () => ({
  headers: {
    Authorization: localStorage.getItem('token'),
  },
});

export const getKaderList = async () => {
  const { data } = await Api.get('/api/kader');
  return data?.data || [];
};

export const getSubMainName = async (submainId) => {
  const { data } = await Api.get(`/api/tasks/get-name/${submainId}`, buildAuthConfig());
  return data?.data || '';
};

export const createKaderItem = async (payload) => {
  const { data } = await Api.post('/api/kader/add', payload);
  return data;
};

export const updateKaderItem = async (id, payload) => {
  const { data } = await Api.patch(`/api/kader/${id}`, payload);
  return data;
};

export const deleteKaderItem = async (id) => {
  const { data } = await Api.delete(`/api/kader/${id}`);
  return data;
};
