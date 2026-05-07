import { DEFAULT_KADER_COLOR } from '../../../constants/kaderColors';

const KADER_DATE_STORAGE_KEY = 'kaderDate';

export const getTodayDate = () => new Date().toISOString().split('T')[0];

export const getStoredKaderDate = () => {
  return localStorage.getItem(KADER_DATE_STORAGE_KEY) || getTodayDate();
};

export const saveKaderDate = (date) => {
  localStorage.setItem(KADER_DATE_STORAGE_KEY, date);
};

export const toCreateFormData = () => ({
  name: '',
  tasks: '',
  nameColor: DEFAULT_KADER_COLOR,
});

export const toEditFormData = (item, fallbackColor = DEFAULT_KADER_COLOR) => ({
  name: item.name || '',
  tasks: item.tasks || '',
  nameColor: item.nameColor || fallbackColor,
});

export const getKaderSubmainId = (item) => {
  return typeof item.submainId === 'string' ? item.submainId : item.submainId?._id;
};

export const filterKaderBySubmainId = (kaderList, submainId) => {
  return kaderList.filter((item) => getKaderSubmainId(item) === submainId);
};

export const buildKaderPayload = (formData, submainId, fallbackColor = DEFAULT_KADER_COLOR) => {
  return {
    submainId,
    name: formData.name.trim(),
    tasks: formData.tasks.trim(),
    nameColor: formData.nameColor || fallbackColor,
  };
};

export const getKaderStats = (items, fallbackColor = DEFAULT_KADER_COLOR) => {
  const total = items.length;
  const withTasks = items.filter((item) => Boolean(item.tasks?.trim())).length;
  const withCustomColor = items.filter(
    (item) => item.nameColor && item.nameColor !== fallbackColor
  ).length;

  return { total, withTasks, withCustomColor };
};


