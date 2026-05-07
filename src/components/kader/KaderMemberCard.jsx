import { motion as Motion } from 'framer-motion';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { DEFAULT_KADER_COLOR, KADER_COLOR_MAP } from '../../constants/kaderColors';
import { getContrastTextColor } from '../../constants/nameColors';

function KaderMemberCard({ item, index, onEdit, onDelete }) {
  const badgeColor = KADER_COLOR_MAP[item.nameColor] || KADER_COLOR_MAP[DEFAULT_KADER_COLOR];
  const badgeTextColor = getContrastTextColor(badgeColor);
  const displayName = item.name?.trim() || 'غير محدد';

  return (
    <Motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.04 }}
      className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/40 dark:border-indigo-900/30 dark:bg-[#101025] dark:hover:border-indigo-700/40 dark:hover:shadow-indigo-950/40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(99,102,241,0.08),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative z-10">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="h-10 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: badgeColor }} />
            <div className="min-w-0">
              <p className="truncate text-lg font-black text-indigo-900 dark:text-indigo-100">{displayName}</p>
            </div>
          </div>

          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 px-2 text-[11px] font-black text-indigo-600 dark:border-indigo-800/40 dark:bg-indigo-950/40 dark:text-indigo-300">
            {index + 1}
          </span>
        </div>

        <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 dark:border-indigo-900/30 dark:bg-indigo-950/20">
          <h3 className="mb-1.5 text-lg font-black text-indigo-700 dark:text-indigo-300">المهام</h3>
          <p className="whitespace-pre-wrap text-lg leading-7 text-indigo-900 dark:text-indigo-200">
            {item.tasks || 'لا توجد مهام'}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            onClick={onEdit}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700 transition-all hover:bg-violet-100 dark:border-violet-800/40 dark:bg-violet-950/40 dark:text-violet-400 dark:hover:bg-violet-900/50"
          >
            <FiEdit size={12} /> تعديل
          </button>

          <button
            onClick={onDelete}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600 transition-all hover:bg-orange-100 dark:border-orange-800/40 dark:bg-orange-950/30 dark:text-orange-400 dark:hover:bg-orange-900/40"
          >
            <FiTrash2 size={12} /> حذف
          </button>
        </div>
      </div>
    </Motion.article>
  );
}

export default KaderMemberCard;
