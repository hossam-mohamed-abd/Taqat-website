import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { successNotification } from '../components/success';
import KaderHeader from '../components/kader/KaderHeader';
import KaderMembersList from '../components/kader/KaderMembersList';
import KaderModal from '../components/kader/KaderModal';
import { DEFAULT_KADER_COLOR, KADER_COLOR_MAP } from '../constants/kaderColors';
import { getContrastTextColor } from '../constants/nameColors';
import {
  createKaderItem,
  deleteKaderItem,
  getKaderList,
  getSubMainName as getSubMainNameApi,
  updateKaderItem,
} from '../services/kaderApi';
import {
  buildKaderPayload,
  filterKaderBySubmainId,
  getKaderStats,
  getStoredKaderDate,
  saveKaderDate,
  toCreateFormData,
  toEditFormData,
} from './kader/utils/kaderPageUtils';

const getColorHex = (nameColor) => KADER_COLOR_MAP[nameColor] || KADER_COLOR_MAP[DEFAULT_KADER_COLOR];

const Kader = () => {
  const { submainId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [mainTitle, setMainTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(() => toCreateFormData());
  const [editId, setEditId] = useState(null);
  const [date, setDate] = useState('');
  const [editingDate, setEditingDate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedDate = getStoredKaderDate();
    setDate(storedDate);
    saveKaderDate(storedDate);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [kaderList, subMainName] = await Promise.all([
        getKaderList(),
        getSubMainNameApi(submainId),
      ]);

      setData(filterKaderBySubmainId(kaderList, submainId));
      setMainTitle(subMainName);
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('حدث خطأ أثناء جلب البيانات');
    }
  }, [submainId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (nameColor) => {
    setFormData((prev) => ({ ...prev, nameColor }));
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setDate(newDate);
    saveKaderDate(newDate);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(toCreateFormData());
    setEditId(null);
  };

  const openModal = (item = null) => {
    setShowModal(true);

    if (item) {
      setFormData(toEditFormData(item, DEFAULT_KADER_COLOR));
      setEditId(item._id);
      return;
    }

    setFormData(toCreateFormData());
    setEditId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = buildKaderPayload(formData, submainId, DEFAULT_KADER_COLOR);
    if (!payload.name && !payload.tasks) {
      toast.error('يجب إدخال الاسم أو المهام على الأقل');
      setIsSubmitting(false);
      return;
    }

    try {
      if (editId) {
        await updateKaderItem(editId, payload);
        successNotification('تم التحديث بنجاح');
      } else {
        await createKaderItem(payload);
        successNotification('تم الإنشاء بنجاح');
      }

      await fetchData();
      closeModal();
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('حدث خطأ أثناء الحفظ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا العنصر؟')) return;

    try {
      await deleteKaderItem(id);
      await fetchData();
      successNotification('تم الحذف بنجاح');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  const stats = useMemo(() => getKaderStats(data, DEFAULT_KADER_COLOR), [data]);
  const previewBadgeColor = useMemo(() => getColorHex(formData.nameColor), [formData.nameColor]);
  const previewBadgeText = useMemo(() => getContrastTextColor(previewBadgeColor), [previewBadgeColor]);

  return (
    <section className="mx-auto min-h-screen w-full max-w-7xl p-3 sm:p-4 md:p-6" dir="rtl" lang="ar">
      <KaderHeader
        mainTitle={mainTitle}
        date={date}
        editingDate={editingDate}
        stats={stats}
        onBack={() => navigate(`/sub-main/details/${submainId}`)}
        onDateChange={handleDateChange}
        onToggleDateEditing={setEditingDate}
      />

      <KaderMembersList
        items={data}
        onOpenModal={() => openModal()}
        onEditItem={(item) => openModal(item)}
        onDeleteItem={handleDelete}
      />

      <KaderModal
        show={showModal}
        editId={editId}
        isSubmitting={isSubmitting}
        formData={formData}
        previewBadgeColor={previewBadgeColor}
        previewBadgeText={previewBadgeText}
        onClose={closeModal}
        onChange={handleChange}
        onColorChange={handleColorChange}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default Kader;
