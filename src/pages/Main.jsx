/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { MapPinned } from "lucide-react";
import Api from "../Config/Api";
import { successNotification } from "../components/success";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.1 } },
};

const accentStyles = [
  "from-red-500/35 to-red-700/25",
  "from-amber-500/35 to-orange-600/20",
  "from-sky-500/35 to-indigo-600/20",
  "from-emerald-500/35 to-teal-600/20",
];

const MainTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const res = await Api.get(`/api/main`, {
        headers: { Authorization: token },
      });
      setData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingData(null);
    setFormData({ name: "" });
    setModalOpen(true);
  };

  const handleEditClick = (item) => {
    setEditingData(item);
    setFormData({ name: item.name });
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    if (confirm("هل أنت متأكد من حذف هذا العنصر؟")) {
      Api
        .delete(`/api/main/${id}`, {
          headers: { Authorization: token },
        })
        .then(() => {
          successNotification("تم الحذف بنجاح");
          fetchData();
        })
        .catch((err) => console.error("Error deleting item:", err));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const method = editingData ? "patch" : "post";
    const url = editingData
      ? `/api/main/${editingData._id}`
      : `/api/main/create-main`;

    Api({
      method,
      url,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(() => {
        setModalOpen(false);
        successNotification(editingData ? "تم التعديل بنجاح" : "تم الإضافة بنجاح");
        fetchData();
      })
      .catch((err) => console.error("Error submitting data:", err));
  };

  return (
    <section className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-8 pt-8 sm:px-6" dir="rtl">
      <div className="mb-8 rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-xl dark:border-white/10 dark:bg-[#11111f]/90">
        <p className="mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">الصفحة الرئيسية / المواقع</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="gradient-text text-3xl font-black sm:text-4xl">المواقع الرئيسية</h1>
          <button
            onClick={handleAddClick}
            className="pill-btn inline-flex items-center justify-center gap-2 px-5 py-2.5"
          >
            <FiPlus />
            إضافة موقع رئيسي
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {isLoading ? (
          <div className="glass-card w-full rounded-3xl px-4 py-12 text-center text-slate-600 dark:text-slate-200">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-red-400/40 border-t-red-300" />
            جاري تحميل المواقع...
          </div>
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={item._id}
              className="glass-card group relative w-full overflow-hidden rounded-3xl border border-slate-200/70 p-6 text-slate-900 sm:w-[calc(50%-0.625rem)] xl:w-[calc(33.333%-0.85rem)] dark:border-white/10 dark:text-white"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${accentStyles[index % accentStyles.length]} opacity-80`}
              />
              <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-red-500 via-orange-400 to-amber-300" />

              <div className="relative z-10  flex h-full min-h-56 flex-col justify-between">
                <div className="flex  items-center justify-between">
                  <span className="rounded-xl border border-amber-200/60 bg-white/70 p-2 text-amber-600 dark:border-transparent dark:bg-white/10 dark:text-amber-300">
                    <MapPinned size={20} />
                  </span>
                </div>
                <div className=" text-2xl font-bold w-full">
                <button
                  onClick={() => navigate(`/sub-main/${item._id}`)}
                  className="mt-4 rounded-2xl border w-full border-slate-200/80 bg-white/75 px-4 py-6 text-right   text-slate-900 transition hover:bg-white/95 dark:border-white/15 dark:bg-black/20 dark:text-white dark:hover:bg-white/15"
                >
                  {item.name}
                </button>
                </div>

                <div className="mt-5 flex justify-end gap-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-3 py-1.5 text-sm font-bold text-black transition hover:bg-amber-400"
                  >
                    <FiEdit />
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="inline-flex items-center gap-1 rounded-full bg-red-500 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-red-600"
                  >
                    <FiTrash />
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-card w-full rounded-3xl px-4 py-12 text-center text-slate-600 dark:text-slate-200">
            لا توجد بيانات
          </div>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="glass-panel w-full max-w-md rounded-3xl p-6 text-white"
              variants={modal}
            >
              <h2 className="mb-4 text-xl font-black">
                {editingData ? "تعديل موقع" : "إضافة موقع جديد"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-slate-200">اسم الموقع</label>
                  <input
                    type="text"
                    placeholder="اسم الموقع"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-white outline-none focus:border-red-300"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold"
                  >
                    إلغاء
                  </button>
                  <button type="submit" className="pill-btn px-4 py-2 text-sm">
                    {editingData ? "تحديث" : "إضافة"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MainTable;
