export const sortByOrder = (list = []) => {
  const sorted = [...list].sort((a, b) => {
    const aOrder = Number.isFinite(Number(a.order)) ? Number(a.order) : Number.MAX_SAFE_INTEGER;
    const bOrder = Number.isFinite(Number(b.order)) ? Number(b.order) : Number.MAX_SAFE_INTEGER;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    const aCreated = new Date(a.createdAt || 0).getTime();
    const bCreated = new Date(b.createdAt || 0).getTime();
    return aCreated - bCreated;
  });

  return sorted.map((item, index) => ({
    ...item,
    order: Number.isFinite(Number(item.order)) && Number(item.order) > 0 ? Number(item.order) : index + 1,
  }));
};

export const moveTask = (list, fromIndex, toIndex) => {
  const next = [...list];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);

  return next.map((task, index) => ({
    ...task,
    order: index + 1,
  }));
};

export const formatArabicDate = (value) => {
  if (!value) return '-';

  try {
    return new Date(value).toLocaleDateString('ar-EG');
  } catch (_error) {
    return '-';
  }
};
