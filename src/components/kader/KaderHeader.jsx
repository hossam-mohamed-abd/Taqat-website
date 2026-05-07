import React from 'react';
import { motion as Motion } from 'framer-motion';
import { CalendarDays, ChevronLeft } from 'lucide-react';
import { FiEdit, FiPlus } from 'react-icons/fi';

function KaderHeader({
  mainTitle,
  date,
  editingDate,
  stats,
  onBack,
  onDateChange,
  onToggleDateEditing,
}) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-[#07071c] via-[#0d0d2a] to-[#140a38] p-5 shadow-2xl shadow-indigo-950/40 sm:p-7">
      <Motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, -18, 0], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-sky-500/15 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 14, 0], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 transition-colors hover:text-white"
          type="button"
        >
          <ChevronLeft size={13} />
          العودة للتفاصيل
        </button>
        <span className="opacity-40">/</span>
        <span className="text-white/85">الكادر</span>
      </div>

      <div className="relative flex flex-wrap items-end gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
            لجنة المتابعة
            {mainTitle && (
              <>
                {' — '}
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
                  {mainTitle}
                </span>
              </>
            )}
          </h1>
          <div className="flex items-center h-full flex-wrap gap-2 pt-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white/85">
            <CalendarDays size={15} />
            {editingDate ? (
              <input
                type="date"
                value={date}
                onChange={onDateChange}
                className="rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-sm text-white outline-none"
                onBlur={() => onToggleDateEditing(false)}
                autoFocus
              />
            ) : (
              <span>{date}</span>
            )}
            <button
              onClick={() => onToggleDateEditing(!editingDate)}
              className="rounded-md p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              title="تعديل التاريخ"
              type="button"
            >
              <FiEdit size={14} />
            </button>
          </div>
            <span className="rounded-full border  border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white/85">
              إجمالي الأعضاء: {stats.total}
            </span>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
              لديهم مهام: {stats.withTasks}
            </span>
            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
        </div>
          </div>
          
        </div>

        
      </div>
    </div>
  );
}

export default KaderHeader;
