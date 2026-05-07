import React from 'react';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';

const inputClass =
  'w-full resize-y rounded-xl border border-sky-200 bg-sky-50/50 px-3 py-2.5 text-sm text-sky-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 dark:border-sky-900/40 dark:bg-[#07070f] dark:text-sky-100 dark:placeholder:text-sky-800 dark:focus:border-sky-500 dark:focus:ring-sky-500/20';

function RemainingWorkModal({
  show,
  editingRemainingId,
  remainingContent,
  isRemainingSubmitting,
  onClose,
  onChange,
  onSubmit,
}) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#06060f]/75 p-4 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 14 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 14 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-2xl shadow-sky-900/20 dark:border-sky-900/40 dark:bg-[#0e0e1e]"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sky-100 bg-sky-50/60 px-5 py-4 dark:border-sky-900/30 dark:bg-sky-950/20">
          <div>
            <h2 className="text-lg font-black text-sky-900 dark:text-sky-100">
              {editingRemainingId ? 'تعديل العمل المتبقي' : 'إضافة عمل متبقٍ'}
            </h2>
            <p className="mt-0.5 text-xs text-sky-600 dark:text-sky-500">
              {editingRemainingId ? 'عدّل الوصف ثم احفظ' : 'أدخل وصف العمل المتبقي'}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-full border border-sky-200 p-1.5 text-sky-500 transition-all hover:bg-sky-100 hover:text-sky-700 dark:border-sky-800/50 dark:hover:bg-sky-900/50"
          >
            <IoMdClose size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={onSubmit} className="space-y-4 p-5">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-sky-500 dark:text-sky-400">
              الوصف
            </label>
            <textarea
              value={remainingContent}
              onChange={(e) => onChange(e.target.value)}
              rows={5}
              placeholder="اكتب العمل المتبقي بالتفصيل"
              className={inputClass}
            />
          </div>

          <div className="flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-sky-200 px-5 py-2.5 text-sm font-bold text-sky-600 transition-all hover:bg-sky-50 dark:border-sky-800/50 dark:text-sky-400 dark:hover:bg-sky-950/50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isRemainingSubmitting}
              className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-900/30 transition-all hover:-translate-y-0.5 hover:from-sky-400 hover:to-indigo-500 hover:shadow-sky-800/40 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isRemainingSubmitting ? 'جاري الحفظ...' : editingRemainingId ? 'تحديث' : 'حفظ'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default RemainingWorkModal;
