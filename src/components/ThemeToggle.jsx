import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();
  const knobRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const xValue = isDark ? -2 : -26;
    gsap.to(knobRef.current, {
      x: xValue,
      duration: 0.35,
      ease: 'power2.out',
    });

    gsap.fromTo(
      iconRef.current,
      { rotate: isDark ? -18 : 18, scale: 0.88 },
      { rotate: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
    );
  }, [isDark]);

  return (
    <button
      onClick={toggleTheme}
      className={`relative h-9 w-[66px] rounded-full border border-white/15 bg-white/10 p-1 transition hover:bg-white/15 ${className}`}
      title={isDark ? 'تبديل إلى الوضع النهاري' : 'تبديل إلى الوضع الليلي'}
      aria-label={isDark ? 'تبديل إلى الوضع النهاري' : 'تبديل إلى الوضع الليلي'}
      type="button"
    >
      <span
        ref={knobRef}
        className="absolute top-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-red-500 text-white shadow-md"
      >
        <span ref={iconRef}>{isDark ? <Sun size={15} /> : <Moon size={15} />}</span>
      </span>
      <span className="sr-only">theme-toggle</span>
    </button>
  );
};

export default ThemeToggle;