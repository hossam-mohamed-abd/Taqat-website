import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { GripVertical } from 'lucide-react';
import { formatArabicDate } from './taskUtils';
import { getContrastTextColor, getNameColorHex } from '../../constants/nameColors';

function getInitials(name) {
  if (!name) return '؟';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0];
  return parts[0][0] + parts[parts.length - 1][0];
}

function TaskCard({
  task,
  canDrag,
  isDragging,
  isDropTarget,
  isDeleting,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onEdit,
  onDelete,
}) {
  const usernameColorHex = getNameColorHex(task.usernameColor);
  const usernameTextColor = getContrastTextColor(usernameColorHex);

  return (
    <article
      draggable={canDrag}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`group relative flex overflow-hidden rounded-2xl border transition-all duration-200
        ${isDragging ? 'scale-[0.98] opacity-50' : ''}
        ${isDropTarget
          ? 'border-indigo-400/60 bg-indigo-50/80 dark:bg-indigo-950/40'
          : 'border-indigo-100 bg-white hover:shadow-lg hover:shadow-indigo-100/50 dark:border-indigo-900/30 dark:bg-[#0e0e1e] dark:hover:shadow-indigo-950/50'
        }
      `}
    >
      {/* Left accent strip */}
      <div
        className={`w-1.5 flex-shrink-0 rounded-s-2xl ${
          isDropTarget ? 'bg-indigo-500' : 'bg-gradient-to-b from-indigo-500 to-sky-500'
        }`}
        aria-hidden
      />

      <div className="flex-1 px-4 py-3.5">
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Drag handle */}
            {canDrag && (
              <span className="cursor-grab text-indigo-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-indigo-700">
                <GripVertical size={15} />
              </span>
            )}

            {/* Avatar */}
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-xs font-black"
              style={{
                backgroundColor: usernameColorHex,
                color: usernameTextColor,
                borderColor: `${usernameTextColor}33`,
              }}
            >
              {getInitials(task.username)}
            </div>

            <div>
              <p
                className="inline-flex rounded-lg px-2 py-0.5 text-sm font-bold leading-tight"
                style={{
                  backgroundColor: usernameColorHex,
                  color: usernameTextColor,
                }}
              >
                {task.username || 'غير محدد'}
              </p>
              
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700 transition-all hover:bg-violet-100 dark:border-violet-800/40 dark:bg-violet-950/40 dark:text-violet-400 dark:hover:bg-violet-900/50"
            >
              <FiEdit size={11} /> تعديل
            </button>
            <button
              onClick={onDelete}
              type="button"
              disabled={isDeleting}
              className="inline-flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600 transition-all hover:bg-orange-100 disabled:opacity-50 dark:border-orange-800/40 dark:bg-orange-950/30 dark:text-orange-400 dark:hover:bg-orange-900/40"
            >
              {isDeleting ? '...' : <FiTrash2 size={11} />} حذف
            </button>
          </div>
        </div>

        {/* Content sections */}
        <div className="mt-3.5 space-y-3 flex w-full gap-5 ">
          <section className="rounded-xl h-full w-1/2 border border-indigo-100 bg-indigo-50/60 px-3.5 py-3 dark:border-indigo-900/30 dark:bg-indigo-950/20">
            <h3 className="mb-2 text-lg font-black text-indigo-700 dark:text-indigo-300">المهام</h3>
            <p className="whitespace-pre-wrap text-lg leading-7 text-indigo-900 dark:text-indigo-200">
              {task.tasks || 'لا توجد مهام'}
            </p>
          </section>

          <section className="rounded-xl h-full w-1/2 border border-sky-100 bg-sky-50/70 px-3.5 py-3 dark:border-sky-900/30 dark:bg-sky-950/20">
            <h3 className="mb-2 text-lg font-black text-sky-700 dark:text-sky-300">ملاحظة</h3>
            <p className="whitespace-pre-wrap text-lg leading-7 text-sky-900 dark:text-sky-200">
              {task.notes || 'لا توجد ملاحظات'}
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
