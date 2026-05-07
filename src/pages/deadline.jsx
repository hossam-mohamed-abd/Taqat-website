/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FiClock, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import Api from "../Config/Api";

const Deadline = () => {
  const { submainId } = useParams();
  const [data, setData] = useState([]);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [dateForm, setDateForm] = useState({ date: "" });
  const [notesForm, setNotesForm] = useState({ notes: "" });
  const [editId, setEditId] = useState(null);
  const [todayDate, setTodayDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [noteRefs, setNoteRefs] = useState({});

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setTodayDate(formattedDate);
    setDateForm({ date: formattedDate });
    fetchData();
  }, [submainId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await Api.get(`/api/deadline?submainId=${submainId}`);
      const responseData = res.data?.data || [];

      const filteredData = responseData.filter(
        (item) => item.submainId === submainId
      );

      setData(filteredData);

      const savedDate = filteredData.find((item) => item.date);
      if (savedDate) {
        setDateForm({ date: savedDate.date });
        setTodayDate(savedDate.date);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const notes = Object.values(noteRefs).filter(Boolean);
    if (!notes.length) return;

    gsap.fromTo(
      notes,
      { y: 18, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.07, duration: 0.35, ease: "power2.out" }
    );
  }, [data, noteRefs]);


  const handleDateChange = (e) => {
    setDateForm({ date: e.target.value });
  };

  const handleNotesChange = (e) => {
    setNotesForm({ notes: e.target.value });
  };

  const handleDateSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await Api.patch(`/api/deadline/${editId}`, {
          ...dateForm,
        });
      } else {
        await Api.post("/api/deadline/add", {
          ...dateForm,
          submainId,
        });
      }
      setTodayDate(dateForm.date);
      setEditId(null);
      closeDateModal();
      await fetchData();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleNotesSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await Api.patch(`/api/deadline/${editId}`, {
          ...notesForm,
        });
      } else {
        await Api.post("/api/deadline/add", {
          ...notesForm,
          submainId,
        });
      }
      setEditId(null);
      closeNotesModal();
      await fetchData();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleDelete = async (id) => {
    const target = noteRefs[id];
    const deleteRequest = async () => {
      try {
        await Api.delete(`/api/deadline/${id}`);
        await fetchData();
      } catch (err) {
        console.error("Delete error:", err);
      }
    };

    if (target) {
      gsap.to(target, {
        opacity: 0,
        y: -12,
        scale: 0.92,
        duration: 0.22,
        onComplete: deleteRequest,
      });
      return;
    }

    await deleteRequest();
  };

  const openDateModal = (item = null) => {
    setShowDateModal(true);
    if (item) {
      setDateForm({ date: item.date });
      setEditId(item._id);
    } else {
      setDateForm({ date: todayDate });
      setEditId(null);
    }
  };

  const openNotesModal = (item = null) => {
    setShowNotesModal(true);
    if (item) {
      setNotesForm({ notes: item.notes });
      setEditId(item._id);
    } else {
      setNotesForm({ notes: "" });
      setEditId(null);
    }
  };

  const closeDateModal = () => {
    setShowDateModal(false);
    setEditId(null);
  };

  const closeNotesModal = () => {
    setShowNotesModal(false);
    setEditId(null);
  };

  const dateData = data?.find((item) => item?.date) || null;
  const notesData = data?.filter((item) => item?.notes) || [];

  const deadlineDate = todayDate ? new Date(todayDate) : null;
  const currentDate = new Date();
  const timeDiff = deadlineDate
    ? Math.ceil((deadlineDate.setHours(0, 0, 0, 0) - currentDate.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24))
    : 0;

  const countLabel = timeDiff > 0 ? "متبقي" : timeDiff === 0 ? "اليوم" : "منتهي منذ";
  const countValue = timeDiff > 0 ? timeDiff : Math.abs(timeDiff);

  if (loading) {
    return <div className="p-6 text-center text-slate-600 dark:text-slate-200">جاري التحميل...</div>;
  }

  return (
    <section className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-8 pt-8 sm:px-6" dir="rtl">
      <div className="mb-8 grid gap-5 lg:grid-cols-2">
        <div className="glass-card relative overflow-hidden rounded-3xl border border-slate-200/70 p-6 text-slate-900 dark:border-white/10 dark:text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/25 via-red-500/10 to-amber-400/15" />
          <div className="relative z-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-slate-100">
              <FiClock />
              بطاقة الموعد
            </div>
            <h2 className="text-2xl font-black">المهلة الزمنية</h2>
            <p className="mt-1 text-slate-700 dark:text-slate-200">{todayDate}</p>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-6xl font-black leading-none text-amber-300">{countValue}</span>
              <div className="pb-2">
                <p className="text-sm text-slate-700 dark:text-slate-100">{countLabel}</p>
                <p className="text-xs text-slate-500 dark:text-slate-300">يوم</p>
              </div>
            </div>

            <button
              className="pill-btn mt-6 inline-flex items-center gap-2 px-4 py-2"
              onClick={() => openDateModal(dateData)}
              type="button"
            >
              <FiEdit2 />
              تعديل التاريخ
            </button>
          </div>
        </div>

        <div className="glass-card rounded-3xl border border-slate-200/70 p-6 text-slate-900 dark:border-white/10 dark:text-white">
          <h3 className="text-xl font-black">ملاحظات التنفيذ</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            استخدم هذا القسم لحفظ التعليمات العاجلة والملاحظات المرتبطة بالموقع الفرعي.
          </p>
          <button
            className="pill-btn mt-6 inline-flex items-center gap-2 px-4 py-2"
            onClick={() => openNotesModal()}
            type="button"
          >
            <FiPlus />
            إضافة ملاحظة
          </button>
        </div>
      </div>

      <div className="columns-1 gap-4 space-y-4 sm:columns-2 xl:columns-3">
        {notesData.length > 0 ? (
          notesData.map((item, idx) => (
            <motion.div
              key={item._id}
              ref={(el) =>
                setNoteRefs((prev) => {
                  if (prev[item._id] === el) return prev;
                  return { ...prev, [item._id]: el };
                })
              }
              className="glass-card mb-4 break-inside-avoid rounded-2xl border border-slate-200/70 p-4 text-slate-900 dark:border-white/10 dark:text-white"
              style={{ transform: `rotate(${idx % 2 === 0 ? -1.2 : 1.2}deg)` }}
              whileHover={{ scale: 1.015, rotate: 0 }}
            >
              <div className="min-h-[100px] rounded-xl border border-slate-200/80 bg-white/75 p-3 dark:border-white/10 dark:bg-black/20">
                <p className="text-slate-700 dark:text-slate-100">{item.notes}</p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-3 py-1.5 text-sm font-bold text-black transition hover:bg-amber-400"
                  onClick={() => openNotesModal(item)}
                  type="button"
                >
                  <FiEdit2 />
                  تعديل
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full bg-red-500 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-red-600"
                  onClick={() => handleDelete(item._id)}
                >
                  <FiTrash2 />
                  حذف
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="glass-card rounded-3xl px-4 py-10 text-center text-slate-600 dark:text-slate-300">
            لا توجد ملاحظات مسجلة.
          </div>
        )}
      </div>

      {showDateModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="glass-panel w-full max-w-md rounded-3xl p-6 text-slate-900 dark:text-white"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h3 className="mb-4 text-xl font-black">
              {editId ? "تعديل التاريخ" : "إضافة تاريخ جديد"}
            </h3>
            <form onSubmit={handleDateSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
                  التاريخ
                </label>
                <input
                  type="date"
                  name="date"
                  value={dateForm.date}
                  onChange={handleDateChange}
                  required
                  className="w-full rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2.5 text-slate-900 outline-none dark:border-white/20 dark:bg-white/10 dark:text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  className="rounded-xl border border-slate-200/80 bg-white/70 px-4 py-2 text-sm text-slate-700 dark:border-white/20 dark:bg-white/10 dark:text-white"
                  onClick={closeDateModal}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="pill-btn px-5 py-2 text-sm"
                >
                  {editId ? "تحديث" : "إضافة"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {showNotesModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="glass-panel w-full max-w-lg rounded-3xl p-6 text-slate-900 dark:text-white"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h3 className="mb-4 text-xl font-black">
              {editId ? "تعديل الملاحظة" : "إضافة ملاحظة جديدة"}
            </h3>
            <form onSubmit={handleNotesSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
                  الملاحظات
                </label>
                <textarea
                  name="notes"
                  value={notesForm.notes}
                  onChange={handleNotesChange}
                  required
                  className="w-full rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2 text-slate-900 outline-none dark:border-white/20 dark:bg-white/10 dark:text-white"
                  rows="5"
                  placeholder="أدخل الملاحظات هنا..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  className="rounded-xl border border-slate-200/80 bg-white/70 px-4 py-2 text-sm text-slate-700 dark:border-white/20 dark:bg-white/10 dark:text-white"
                  onClick={closeNotesModal}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="pill-btn px-5 py-2 text-sm"
                >
                  {editId ? "تحديث" : "إضافة"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Deadline;
