import React from 'react';

const Footer = () => {
    return (
        <footer className="relative mt-10 border-t border-white/10 bg-[#0b0b13] text-slate-200">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.16),transparent_55%)]" />
            <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 md:items-center md:py-10">
                <div className="space-y-1 text-right">
                    <h3 className="text-xl font-extrabold text-white">طاقات الصمود</h3>
                    <p className="text-sm text-slate-300">لوحة إدارة موحدة للمهام والكادر والمهل الزمنية.</p>
                </div>

                <div className="text-center text-sm text-slate-300">
                    <p>واجهة حديثة متجاوبة مع دعم كامل للوضعين الداكن والفاتح.</p>
                    <p className="mt-1 text-xs text-slate-400">React + Tailwind + GSAP + Framer Motion</p>
                </div>

                <div className="text-left text-sm md:text-end">
                    <p className="font-semibold text-rose-300">© 2026 طاقات الصمود</p>
                    <p className="text-xs text-slate-400">جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
