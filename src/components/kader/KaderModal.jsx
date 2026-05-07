import React from 'react';
import { motion as Motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { KADER_COLOR_OPTIONS } from '../../constants/kaderColors';

function KaderModal({
  show,
  editId,
  isSubmitting,
  formData,
  previewBadgeColor,
  previewBadgeText,
  onClose,
  onChange,
  onColorChange,
  onSubmit,
}) {
  if (!show) return null;

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#06060f]/75 p-4 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <Motion.div
        initial={{ scale: 0.94, opacity: 0, y: 14 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-900/20 dark:border-indigo-900/40 dark:bg-[#0e0e1e]"
      >
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500" aria-hidden />

        <div className="flex items-center justify-between border-b border-indigo-100 bg-indigo-50/60 px-6 py-4 dark:border-indigo-900/30 dark:bg-indigo-950/20">
          <div>
            <h2 className="text-xl font-black text-indigo-900 dark:text-indigo-100">
              {editId ? 'تعديل بيانات الكادر' : 'إضافة كادر جديد'}
            </h2>
            <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-500">
              {editId ? 'حدّث البيانات ثم اضغط حفظ' : 'أدخل بيانات عضو الكادر'}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-full border border-indigo-200 p-1.5 text-indigo-500 transition-all hover:bg-indigo-100 hover:text-indigo-700 dark:border-indigo-800/50 dark:hover:bg-indigo-900/50"
            disabled={isSubmitting}
          >
            <IoMdClose size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 p-6">
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-3 dark:border-indigo-900/30 dark:bg-indigo-950/20">
            <label className="mb-1.5 block text-sm font-bold text-indigo-500 dark:text-indigo-400">
              اسم الموظف
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="w-full rounded-xl border border-indigo-200 bg-indigo-50/50 px-3 py-2.5 text-sm text-indigo-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 dark:border-indigo-900/40 dark:bg-[#07070f] dark:text-indigo-100  dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
              placeholder="اكتب اسم الموظف"
            />

            <div className="mt-3 rounded-lg border border-indigo-100 bg-white/70 p-2.5 dark:border-indigo-900/30 dark:bg-indigo-950/30">
              <p className="mb-1 text-[11px] font-semibold text-indigo-500 dark:text-indigo-400">معاينة الاسم</p>
              <span
                className="inline-flex rounded-lg px-3 py-1 text-sm font-black"
                style={{
                  backgroundColor: previewBadgeColor,
                  color: previewBadgeText,
                }}
              >
                {formData.name?.trim() || 'اسم الموظف'}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-3 dark:border-indigo-900/30 dark:bg-indigo-950/20">
            <p className="mb-2 text-sm font-black text-indigo-700 dark:text-indigo-300">لون الاسم</p>
            <div className="flex flex-wrap gap-2">
              {KADER_COLOR_OPTIONS.map((option) => {
                const isActive = formData.nameColor === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onColorChange(option.value)}
                    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-all sm:text-sm ${
                      isActive
                        ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500/30 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-500'
                    }`}
                    title={option.label}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-black/10"
                      style={{ backgroundColor: option.hex }}
                    />
                    {isActive && <span className="text-[10px]">✓</span>}
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-3 dark:border-indigo-900/30 dark:bg-indigo-950/20">
            <label className="mb-2 block text-sm font-black text-indigo-700 dark:text-indigo-300">
              المهام
            </label>
            <textarea
              name="tasks"
              value={formData.tasks}
              onChange={onChange}
              className="w-full resize-y rounded-xl border border-indigo-200 bg-indigo-50/50 px-3 py-2.5 text-sm text-indigo-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 dark:border-indigo-900/40 dark:bg-[#07070f] dark:text-indigo-100  dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
              rows={5}
              placeholder="تفاصيل المهام"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-indigo-200 px-5 py-2.5 text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-50 dark:border-indigo-800/50 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
              disabled={isSubmitting}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/30 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-800/40 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'جاري الحفظ...' : editId ? 'تحديث' : 'حفظ'}
            </button>
          </div>
        </form>
      </Motion.div>
    </Motion.div>
  );
}

export default KaderModal;
