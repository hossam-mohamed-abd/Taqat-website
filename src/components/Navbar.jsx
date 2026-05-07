/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Menu, X, Home } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/image.png';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logoRingRef = useRef(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    gsap.to(logoRingRef.current, {
      boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)',
      duration: 0.1,
      onComplete: () => {
        gsap.fromTo(
          logoRingRef.current,
          { boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.55)' },
          {
            boxShadow: '0 0 0 18px rgba(99, 102, 241, 0)',
            duration: 1.9,
            repeat: -1,
            repeatDelay: 0.8,
            ease: 'power2.out',
          }
        );
      },
    });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const goHome = () => {
    setMobileMenuOpen(false);
    navigate(isLoggedIn ? '/main' : '/');
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 transition-all duration-300 ${
        isScrolled ? 'bg-[#08081a]/85 backdrop-blur-xl' : 'bg-[#08081a]/95 backdrop-blur-md'
      }`}
      dir="rtl"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 ${
          isScrolled ? 'py-2.5' : 'py-4'
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-4" onClick={goHome}>
          <div className="relative">
            <span
              ref={logoRingRef}
              className="absolute inset-0 rounded-full border border-indigo-500/40"
            />
            <img
              src={logo}
              alt="شعار طاقات الصمود"
              className="relative h-12 w-12 cursor-pointer rounded-full border border-indigo-500/70 object-cover sm:h-14 sm:w-14"
            />
          </div>
          <div className="cursor-pointer">
            <h1 className="text-lg font-extrabold tracking-wide text-white sm:text-2xl">طاقات الصمود</h1>
            <p className="text-xs text-slate-300 sm:text-sm">منصة إدارة المواقع والكادر</p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-white/20 p-2 text-white md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="toggle-menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {isLoggedIn && (
          <div className="hidden items-center text-white gap-3 md:flex">
            <ThemeToggle />
            <Link
              to="/main"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold  transition hover:bg-white/20"
            >
              <Home size={16} />
              الصفحة الرئيسية
            </Link>
            <button onClick={handleLogout} className="pill-btn px-5 py-2.5 text-sm" type="button">
              تسجيل الخروج
            </button>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isLoggedIn && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-white/10 bg-[#0f0f1a]/95 px-4 py-4 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-sm font-bold text-slate-200">الوضع</span>
                <ThemeToggle />
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/main');
                }}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right font-semibold text-white"
                type="button"
              >
                الصفحة الرئيسية
              </button>
              <button
                onClick={handleLogout}
                className="pill-btn px-4 py-3 text-right"
                type="button"
              >
                تسجيل الخروج
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
