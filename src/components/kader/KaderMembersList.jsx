import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Users } from 'lucide-react';
import KaderMemberCard from './KaderMemberCard';

function KaderMembersList({ items, onOpenModal, onEditItem, onDeleteItem }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm dark:border-indigo-900/30 dark:bg-[#0e0e1e]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(99,102,241,0.08),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(14,165,233,0.08),transparent_35%)]"
      />

      <div className="relative flex items-center justify-between border-b border-indigo-100 bg-indigo-50/60 px-5 py-3.5 dark:border-indigo-900/30 dark:bg-indigo-950/20">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/60 dark:text-indigo-400">
            <Users size={16} />
          </span>
          <h2 className="text-base font-black text-indigo-900 dark:text-indigo-100">قائمة الكادر</h2>
          {items.length > 0 && (
            <span className="rounded-full border border-indigo-200 bg-indigo-100 px-2 py-0.5 text-[11px] font-bold text-indigo-600 dark:border-indigo-800/50 dark:bg-indigo-900/50 dark:text-indigo-400">
              {items.length}
            </span>
          )}
        </div>

        <button
          onClick={onOpenModal}
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-100 px-3 py-1.5 text-xs font-bold text-indigo-700 transition-all hover:bg-indigo-200 dark:border-indigo-800/40 dark:bg-indigo-900/40 dark:text-white dark:hover:bg-indigo-900/60"
        >
          <FiPlus size={12} /> إضافة
        </button>
      </div>

      <div className="relative p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/30 py-12 dark:border-indigo-900/40 dark:bg-indigo-950/15">
            <FiPlus size={34} className="mb-3 text-indigo-500 dark:text-indigo-700" />
            <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-500">لا توجد بيانات للكادر بعد</p>
            <button
              type="button"
              onClick={onOpenModal}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-900/35 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500"
            >
              <FiPlus size={12} /> إضافة عضو
            </button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
            {items.map((item, index) => (
              <KaderMemberCard
                key={item._id}
                item={item}
                index={index}
                onEdit={() => onEditItem(item)}
                onDelete={() => onDeleteItem(item._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default KaderMembersList;
