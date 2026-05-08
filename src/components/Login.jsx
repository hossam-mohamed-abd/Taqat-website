import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { successNotification } from './success';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Api from '../Config/Api';
import logo from '../assets/image.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const cardRef = useRef(null);
    const logoRef = useRef(null);
    const fieldsRef = useRef([]);
    const submitRef = useRef(null);

    useEffect(() => {
        const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

        timeline
            .fromTo(
                cardRef.current,
                { y: 28, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.65 }
            )
            .fromTo(
                logoRef.current,
                { scale: 0.78, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5 },
                '-=0.36'
            )
            .fromTo(
                fieldsRef.current,
                { y: 14, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.45 },
                '-=0.3'
            )
            .fromTo(
                submitRef.current,
                { y: 12, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45 },
                '-=0.18'
            );
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setError('');

        try {
            await Api.post('/api/auth/login', {
                username,
                password,
            })
                .then((res) => {
                    const msg = res.data.message;

                    localStorage.setItem('token', res?.data?.token);

                    successNotification(msg);

                    navigate('/main');
                })
                .catch((err) => {
                    const errMsg =
                        err.response?.data?.message || 'فشل تسجيل الدخول';

                    setError(errMsg);
                });
        } catch (err) {
            console.error(err);

            setError('حدث خطأ أثناء الاتصال بالخادم');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0b13] px-4 py-10"
            dir="rtl"
        >
            <div className="mesh-bg noise-overlay absolute inset-0" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(220,38,38,0.25),transparent_42%),radial-gradient(circle_at_80%_85%,rgba(245,158,11,0.16),transparent_40%)]" />

            <div className="pointer-events-none absolute inset-0 hidden sm:block">
                {Array.from({ length: 20 }).map((_, idx) => (
                    <span
                        key={idx}
                        className="absolute h-1.5 w-1.5 animate-pulse rounded-full bg-white/35"
                        style={{
                            top: `${(idx * 17) % 100}%`,
                            left: `${(idx * 23) % 100}%`,
                            animationDelay: `${(idx % 7) * 0.45}s`,
                        }}
                    />
                ))}
            </div>

            <div
                ref={cardRef}
                className="relative z-10 w-full max-w-xl rounded-3xl border border-white/15 bg-white/[0.07] p-6 shadow-[0_35px_70px_-30px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:p-10"
            >
                <div className="mb-7 text-center">
                    <div
                        ref={logoRef}
                        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-rose-400/55 bg-gradient-to-br from-rose-600 to-red-700 p-1 shadow-lg"
                    >
                        <img
                            src={logo}
                            alt="شعار طاقات الصمود"
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>

                    <h1 className="text-3xl font-black text-white sm:text-4xl">
                        طاقات الصمود
                    </h1>

                    <p className="mt-2 text-sm text-slate-200 sm:text-base">
                        تسجيل الدخول للوصول إلى لوحة الإدارة
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="rounded-2xl border border-red-300/40 bg-red-500/15 px-4 py-3 text-center text-sm font-semibold text-red-100">
                            {error}
                        </div>
                    )}

                    <div
                        ref={(el) => (fieldsRef.current[0] = el)}
                        className="relative"
                    >
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="peer w-full rounded-2xl border border-white/25 bg-white/10 px-4 pb-3 pt-6 text-white outline-none transition placeholder:text-transparent focus:border-rose-400 focus:ring-2 focus:ring-rose-400/30"
                            placeholder="اسم المستخدم"
                            required
                        />

                        <label
                            htmlFor="username"
                            className="pointer-events-none absolute right-4 top-2 text-xs font-semibold text-slate-300 transition peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-rose-300"
                        >
                            اسم المستخدم
                        </label>
                    </div>

                    <div
                        ref={(el) => (fieldsRef.current[1] = el)}
                        className="relative"
                    >
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="peer w-full rounded-2xl border border-white/25 bg-white/10 px-4 pb-3 pt-6 text-white outline-none transition placeholder:text-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
                            placeholder="كلمة المرور"
                            required
                        />

                        <label
                            htmlFor="password"
                            className="pointer-events-none absolute right-4 top-2 text-xs font-semibold text-slate-300 transition peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-amber-300"
                        >
                            كلمة المرور
                        </label>

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-200 transition hover:text-white"
                            aria-label={
                                showPassword
                                    ? 'إخفاء كلمة السر'
                                    : 'عرض كلمة السر'
                            }
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible size={22} />
                            ) : (
                                <AiOutlineEye size={22} />
                            )}
                        </button>
                    </div>

                    <button
                        ref={submitRef}
                        type="submit"
                        disabled={loading}
                        className="shimmer w-full overflow-hidden rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-500 px-4 py-3 text-lg font-black text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'جاري تسجيل الدخول...' : 'دخول'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Login;