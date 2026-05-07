import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { CalendarDays, ChevronLeft, Download } from 'lucide-react';

function TasksHeader({ mainTitle, savedDate, onBack, onOpenDateModal, onOpenCreateTask, onDownload }) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-[#07071c] via-[#0d0d2a] to-[#140a38] p-5 shadow-2xl shadow-indigo-950/40 sm:p-7">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-sky-500/15 blur-3xl" aria-hidden />

      {/* Breadcrumb */}
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
        <span className="text-white/85">الفقرات والأعمال المتبقية</span>
      </div>

      {/* Title + Actions */}
      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
            إدارة الفقرات
            {mainTitle && (
              <>
                {' — '}
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
                  {mainTitle}
                </span>
              </>
            )}
          </h1>
          
          <p className="mt-3 text-sm text-white/40">اسحب الفقرات لإعادة الترتيب · العمود ت هو رقم الترتيب</p>
          {/* Date chip */}
          <button
            onClick={onOpenDateModal}
            type="button"
            className="inline-flex mt-3 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition-all hover:bg-white/20 hover:text-white"
          >
            <CalendarDays size={15} />
            {savedDate}
          </button>
        </div>
        

        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          

          {/* Add task */}
          <button
            onClick={onOpenCreateTask}
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-900/50 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-800/60 active:translate-y-0"
          >
            <FiPlus size={16} />
            إضافة فقرة
          </button>

          {/* Download */}
          <button
            onClick={onDownload}
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/70 transition-all hover:bg-white/15 hover:text-white"
          >
            <Download size={15} />
            تنزيل
          </button>
        </div>
      </div>
    </div>
  );
}

export default TasksHeader;
