import React from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { ClipboardList } from 'lucide-react';

function RemainingWorkPanel({ loading, remainingWorks, deletingRemainingId, onCreate, onEdit, onDelete }) {
  return (
    <aside className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm dark:border-indigo-900/30 dark:bg-[#0e0e1e]">
      {/* Header — sky-accented */}
      <div className="flex items-center justify-between border-b border-sky-100 bg-sky-50/60 px-4 py-3.5 dark:border-sky-900/30 dark:bg-sky-950/20">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/60 dark:text-sky-400">
            <ClipboardList size={14} />
          </span>
          <h2 className="text-sm font-black text-sky-900 dark:text-sky-100">العمل المتبقي</h2>
          {remainingWorks.length > 0 && !loading && (
            <span className="rounded-full border border-sky-200 bg-sky-100 px-2 py-0.5 text-[11px] font-bold text-sky-600 dark:border-sky-800/50 dark:bg-sky-900/50 dark:text-sky-400">
              {remainingWorks.length}
            </span>
          )}
        </div>

        <button
          onClick={onCreate}
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-100 px-3 py-1.5 text-xs font-bold text-sky-700 transition-all hover:bg-sky-200 dark:border-sky-800/40 dark:bg-sky-900/40 dark:text-sky-400 dark:hover:bg-sky-900/60"
        >
          <FiPlus size={12} /> إضافة
        </button>
      </div>

      {/* Body */}
      <div className="p-3.5">
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="h-16 animate-pulse rounded-xl border border-sky-100 bg-sky-50 dark:border-sky-900/20 dark:bg-sky-950/10"
              />
            ))}
          </div>
        ) : remainingWorks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-sky-200 py-8 dark:border-sky-900/40">
            <ClipboardList size={28} className="mb-2 text-sky-500 dark:text-sky-700" />
            <p className="text-sm font-semibold text-sky-700 dark:text-sky-600">لا يوجد عمل متبقٍ</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {remainingWorks.map((item, index) => (
              <div
                key={item._id}
                className="group rounded-xl border border-sky-100 bg-sky-50/60 p-3 transition-all hover:bg-sky-50 dark:border-sky-900/20 dark:bg-sky-950/10 dark:hover:bg-sky-950/20"
                style={{ borderInlineStart: '3px solid #0ea5e9' }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex items-center justify-center rounded-full border border-sky-200 bg-sky-100 px-2 py-0.5 text-[11px] font-black text-sky-600 dark:border-sky-800/40 dark:bg-sky-900/50 dark:text-sky-400">
                    {item.order ?? index + 1}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => onEdit(item)}
                      type="button"
                      className="rounded-lg p-1.5 text-violet-500 transition-all hover:bg-violet-100 dark:hover:bg-violet-900/30"
                    >
                      <FiEdit size={13} />
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      type="button"
                      disabled={deletingRemainingId === item._id}
                      className="rounded-lg p-1.5 text-orange-500 transition-all hover:bg-orange-100 disabled:opacity-50 dark:hover:bg-orange-900/30"
                    >
                      {deletingRemainingId === item._id ? '...' : <FiTrash2 size={13} />}
                    </button>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-sky-900 dark:text-sky-200">{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default RemainingWorkPanel;
