import React from 'react';
import { motion as Motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { getNameColorHex, NAME_COLOR_OPTIONS } from '../../constants/nameColors';

const inputClass =
  'w-full rounded-xl border border-indigo-200 bg-indigo-50/50 px-3 py-2.5 text-sm text-indigo-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 dark:border-indigo-900/40 dark:bg-[#07070f] dark:text-indigo-100 dark:placeholder:text-indigo-700 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20';

const sectionTitleClass =
  'mb-2 block text-sm font-black text-indigo-700 dark:text-indigo-300';

function TaskModal({
  show,
  isEditingTask,
  taskForm,
  isTaskSubmitting,
  onClose,
  onChange,
  onSubmit,
  onColorChange,
}) {
  if (!show) return null;

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#06060f]/75 p-4 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <Motion.div
        initial={{ scale: 0.94, opacity: 0, y: 14 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 14 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-900/20 dark:border-indigo-900/40 dark:bg-[#0e0e1e]"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-indigo-100 bg-indigo-50/60 px-6 py-4 dark:border-indigo-900/30 dark:bg-indigo-950/20">
          <div>
            <h2 className="text-xl font-black text-indigo-900 dark:text-indigo-100">
              {isEditingTask ? 'تعديل الفقرة' : 'إضافة فقرة جديدة'}
            </h2>
            <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-500">
              {isEditingTask ? 'عدّل البيانات ثم اضغط تحديث' : 'أدخل بيانات الفقرة الجديدة'}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-full border border-indigo-200 p-1.5 text-indigo-500 transition-all hover:bg-indigo-100 hover:text-indigo-700 dark:border-indigo-800/50 dark:hover:bg-indigo-900/50"
          >
            <IoMdClose size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={onSubmit} className="space-y-4 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-indigo-500 dark:text-indigo-400">
                اسم الموظف
              </label>
              <input
                type="text"
                name="username"
                value={taskForm.username}
                onChange={onChange}
                placeholder="اكتب اسم الموظف"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-indigo-500 dark:text-indigo-400">
                التاريخ
              </label>
              <input
                type="date"
                name="date"
                value={taskForm.date}
                onChange={onChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-3 dark:border-indigo-900/30 dark:bg-indigo-950/20">
            <label className={sectionTitleClass}>لون اسم الموظف</label>
            <div className="flex flex-wrap gap-2">
              {NAME_COLOR_OPTIONS.map((option) => {
                const isActive = taskForm.usernameColor === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onColorChange(option.value)}
                    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-all sm:text-sm ${
                      isActive
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-500'
                    }`}
                    title={option.label}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-black/10"
                      style={{ backgroundColor: getNameColorHex(option.value) }}
                    />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-3 dark:border-indigo-900/30 dark:bg-indigo-950/20">
              <label className={sectionTitleClass}>المهام</label>
              <textarea
                name="tasks"
                value={taskForm.tasks}
                onChange={onChange}
                rows={5}
                placeholder="تفاصيل المهام"
                className={`${inputClass} resize-y`}
              />
            </div>
          </div>

          <div>
            <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-3 dark:border-sky-900/30 dark:bg-sky-950/20">
              <label className={sectionTitleClass}>ملاحظة</label>
              <textarea
                name="notes"
                value={taskForm.notes}
                onChange={onChange}
                rows={6}
                placeholder="أي ملاحظات إضافية (اختياري)"
                className={`${inputClass} resize-y`}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-indigo-200 px-5 py-2.5 text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-50 dark:border-indigo-800/50 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isTaskSubmitting}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/30 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-800/40 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isTaskSubmitting ? 'جاري الحفظ...' : isEditingTask ? 'تحديث الفقرة' : 'حفظ الفقرة'}
            </button>
          </div>
        </form>
      </Motion.div>
    </Motion.div>
  );
}

export default TaskModal;
