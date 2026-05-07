/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronLeft } from "lucide-react";
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

const gradients = [
  "from-red-500/25 to-rose-700/10",
  "from-amber-400/25 to-orange-600/10",
  "from-cyan-400/25 to-indigo-700/10",
  "from-emerald-400/25 to-teal-700/10",
];

const Sub_Main = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainOptions, setMainOptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [formData, setFormData] = useState({ name: "", mainId: "" });
  const [currentMain, setCurrentMain] = useState(null);
  const { mainId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchMainOptions();
    fetchCurrentMain();
  }, [mainId]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const res = await Api.get(`/api/sub-main?mainId=${mainId}`, {
        headers: { Authorization: token },
      });
      setData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMainOptions = () => {
    const token = localStorage.getItem("token");
    Api
      .get(`/api/main`, {
        headers: { Authorization: token },
      })
      .then((res) => setMainOptions(res.data.data))
      .catch((err) => console.error("Error fetching main options:", err));
  };

  const fetchCurrentMain = () => {
    if (!mainId) return;
    const token = localStorage.getItem("token");
    Api
      .get(`/api/main/${mainId}`, {
        headers: { Authorization: token },
      })
      .then((res) => setCurrentMain(res.data.data))
      .catch((err) => console.error("Error fetching current main:", err));
  };

  const handleAddClick = () => {
    setEditingData(null);
    setFormData({ name: "", mainId: mainId || "" });
    setModalOpen(true);
  };

  const handleEditClick = (item) => {
    setEditingData(item);
    setFormData({ name: item.name, mainId: item.mainId?._id || "" });
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    if (confirm("هل أنت متأكد من حذف هذا العنصر؟")) {
      Api
        .delete(`/api/sub-main/${id}`, {
          headers: { Authorization: token },
        })
        .then(() => {
          successNotification("تم الحذف بنجاح ");
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
      ? `/api/sub-main/${editingData._id}`
      : `/api/sub-main/create-submain`;

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
        successNotification(
          method === "post" ? "تم اضافه الموقع بنجاح" : "تم التعديل بنجاح "
        );
        fetchData();
      })
      .catch((err) => console.error("Error submitting data:", err));
  };

  return (
    <section className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-8 pt-8 sm:px-6" dir="rtl">
      <div className="mb-7 rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-xl sm:p-6 dark:border-white/10 dark:bg-[#11111f]/90">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <button onClick={() => navigate('/main')} className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white">
            <ChevronLeft size={14} />
            الرئيسية
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{currentMain?.name || 'الموقع الرئيسي'}</span>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="gradient-text text-3xl font-black sm:text-4xl">المواقع الفرعية</h1>
            {currentMain && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">الموقع الرئيسي: {currentMain.name}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate('/main')}
              className="rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              العودة للمواقع الرئيسية
            </button>
            <button className="pill-btn inline-flex items-center gap-2 px-4 py-2" onClick={handleAddClick}>
              <FiPlus /> إضافة موقع فرعي
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
          {isLoading && (
            <div className="glass-card w-full rounded-3xl px-4 py-12 text-center text-slate-600 dark:text-slate-200">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-red-400/40 border-t-red-300" />
              جاري تحميل المواقع الفرعية...
            </div>
          )}

          {!isLoading && data.length === 0 && (
            <div className="glass-card col-span-full rounded-3xl p-10 text-center text-slate-600 dark:text-slate-300">
              لا توجد بيانات
            </div>
          )}

          {!isLoading && data.map((item, idx) => (
            <article
              key={item._id}
              className="glass-card group relative w-full overflow-hidden rounded-3xl border border-slate-200/70 p-6 text-slate-900 sm:w-[calc(50%-0.625rem)] xl:w-[calc(33.333%-0.85rem)] dark:border-white/10 dark:text-white"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[idx % gradients.length]}`}
              />
              <div className="relative z-10 flex h-full min-h-48 flex-col justify-between">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs text-slate-700 dark:border-transparent dark:bg-white/10 dark:text-slate-100">
                  <MapPin size={14} />
                  موقع فرعي
                </div>
               <div className=" text-2xl font-bold w-full">

                <button
                  onClick={() => navigate(`/sub-main/details/${item._id}`)}
                  className="mt-4 rounded-2xl border w-full border-slate-200/80 bg-white/75 px-4 py-4 text-right text-slate-900 transition hover:bg-white/95 dark:border-white/15 dark:bg-black/15 dark:text-white dark:hover:bg-white/15"
                >
                  {item.name}
                </button>
               </div>

                <div className="mt-5 flex justify-end gap-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-3 py-1.5 text-sm font-bold text-black transition hover:bg-amber-400"
                  >
                    <FiEdit /> تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="inline-flex items-center gap-1 rounded-full bg-red-500 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-red-600"
                  >
                    <FiTrash /> حذف
                  </button>
                </div>
              </div>
            </article>
          ))}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="glass-panel w-[94%] max-w-md rounded-3xl p-6 text-white"
              variants={modal}
            >
              <h2 className="mb-4 text-xl font-black">
                {editingData ? "تعديل موقع" : "إضافة موقع جديد"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm">الاسم</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 outline-none focus:border-red-300"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm">الموقع الرئيسي</label>
                  <select
                    name="mainId"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 outline-none"
                    value={formData.mainId}
                    onChange={(e) =>
                      setFormData({ ...formData, mainId: e.target.value })
                    }
                    required
                  >
                    <option value="">اختر الموقع الرئيسي</option>
                    {mainOptions.map((main) => (
                      <option key={main._id} value={main._id}>
                        {main.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold"
                    onClick={() => setModalOpen(false)}
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="pill-btn px-4 py-2 text-sm"
                  >
                    {editingData ? "تعديل" : "إضافة"}
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

export default Sub_Main;
