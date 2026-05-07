import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../Config/Api";
import { FiClock, FiUsers, FiFileText } from "react-icons/fi";
import { ChevronLeft } from "lucide-react";

const SubMainDetails = () => {
    const { subId } = useParams();
    const navigate = useNavigate();
    const [subMain, setSubMain] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        let isMounted = true;

        const fetchSubMain = async () => {
            setIsLoading(true);
            try {
                const res = await Api.get(`/api/sub-main/${subId}`, {
                    headers: { Authorization: token },
                });
                if (!isMounted) return;
                setSubMain(res.data.subMain);
            } catch (err) {
                console.error("Error fetching sub-main:", err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchSubMain();

        return () => {
            isMounted = false;
        };
    }, [subId]);

    if (isLoading) {
        return (
            <div className="p-8 text-center text-slate-600 dark:text-slate-200">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-red-400/40 border-t-red-300" />
                جاري تحميل تفاصيل الموقع...
            </div>
        );
    }

    if (!subMain) {
        return <div className="p-8 text-center text-slate-600 dark:text-slate-200">تعذر تحميل البيانات.</div>;
    }

    const cards = [
        {
            key: "deadline",
            title: "المهل الزمنية",
            subtitle: "تحديد التواريخ والملاحظات المرتبطة بالموقع",
            icon: <FiClock className="text-3xl" />,
            color: "from-red-500/30 to-orange-500/15",
            onClick: () => navigate(`/deadline/${subId}`),
        },
        {
            key: "kader",
            title: "إدارة الكادر",
            subtitle: "تنظيم لجنة المتابعة وتوزيع المسؤوليات",
            icon: <FiUsers className="text-3xl" />,
            color: "from-emerald-500/30 to-teal-500/15",
            onClick: () => navigate(`/kader/${subId}`),
        },
        {
            key: "tasks",
            title: "الفقرات والمهام",
            subtitle: "متابعة الفقرات اليومية والإنجاز والمتبقي",
            icon: <FiFileText className="text-3xl" />,
            color: "from-sky-500/30 to-indigo-500/15",
            onClick: () => navigate(`/tasks/${subId}`),
        },
    ];

    return (
        <section className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-8 pt-8 sm:px-6" dir="rtl">
            <div className="mb-8 rounded-3xl border border-slate-200/70 bg-white/80 p-6 dark:border-white/10 dark:bg-[#11111f]/90">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    type="button"
                >
                    <ChevronLeft size={16} />
                    العودة للمواقع الفرعية
                </button>
                <h1 className="gradient-text text-3xl font-black sm:text-5xl">{subMain.name}</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-300">اختر القسم الذي تريد إدارته لهذا الموقع الفرعي.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                {cards.map((card, index) => (
                    <button
                        key={card.key}
                        onClick={card.onClick}
                        type="button"
                        className="glass-card group relative overflow-hidden rounded-3xl border border-slate-200/70 p-6 text-right text-slate-900 hover:border-slate-300 dark:border-white/10 dark:text-white dark:hover:border-white/25"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.color}`} />
                        <div className="relative z-10">
                            <div className="mb-5 inline-flex rounded-2xl border border-amber-200/70 bg-white/70 p-3 text-amber-600 dark:border-transparent dark:bg-black/30 dark:text-amber-200">{card.icon}</div>
                            <h2 className="text-2xl font-black">{card.title}</h2>
                            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{card.subtitle}</p>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default SubMainDetails;
