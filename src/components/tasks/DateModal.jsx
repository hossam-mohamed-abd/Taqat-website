import React from 'react';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { CalendarDays } from 'lucide-react';

function DateModal({ show, date, onClose, onDateChange, onSave }) {
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
        className="w-full max-w-sm overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-900/20 dark:border-indigo-900/40 dark:bg-[#0e0e1e]"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-indigo-100 bg-indigo-50/60 px-5 py-4 dark:border-indigo-900/30 dark:bg-indigo-950/20">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/60 dark:text-indigo-400">
              <CalendarDays size={16} />
            </span>
            <div>
              <h3 className="text-base font-black text-indigo-900 dark:text-indigo-100">تعديل التاريخ</h3>
              <p className="text-[11px] text-indigo-600 dark:text-indigo-500">يُطبَّق على الفقرات الجديدة</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-full border border-indigo-200 p-1.5 text-indigo-500 transition-all hover:bg-indigo-100 hover:text-indigo-700 dark:border-indigo-800/50 dark:hover:bg-indigo-900/50"
          >
            <IoMdClose size={17} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="mb-5 w-full cursor-pointer rounded-xl border border-indigo-200 bg-indigo-50/50 px-3 py-2.5 text-sm text-indigo-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 dark:border-indigo-900/40 dark:bg-[#07070f] dark:text-indigo-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
          />

          <div className="flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-indigo-200 px-5 py-2.5 text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-50 dark:border-indigo-800/50 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={onSave}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/30 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500"
            >
              حفظ
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DateModal;
