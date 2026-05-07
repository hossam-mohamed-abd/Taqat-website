# خطة إعادة تصميم موقع طاقات الصمود — Design Overhaul Plan

## الهدف | Goal

إعادة تصميم كامل للواجهة الأمامية لمنصة **طاقات الصمود** لتصبح حديثة ومتجاوبة ومبهرة بصرياً، مع الحفاظ الكامل على المنطق الوظيفي وطلبات API.

---

## الوضع الحالي | Current State Analysis

### المشاكل الحالية
- **Navbar**: عنوان بسيط، لا يوجد تدرج حقيقي، RTL layout ضعيف
- **Login**: نصف الشاشة image + نصف form بخلفية حمراء صلبة — قديم الشكل
- **Main.jsx**: بطاقات عشوائية بدرجات ألوان مختلفة بشكل فوضوي
- **Sun_Main.jsx**: نفس المشكلة + أحجام أيقونات كبيرة جداً بدون نظام
- **SubMainDetails.jsx**: أزرار كبيرة جداً & layout عمودي بسيط
- **Tasks.jsx** & **Kader.jsx**: جداول بدون هوية بصرية واضحة وإن كانت functional
- **Deadline.jsx**: تصميم بسيط جداً بدون لمسات premium
- **Footer**: سطرين فقط بدون محتوى حقيقي
- **ThemeToggle**: يعمل لكن مدمج مع Framer Motion فقط، لا GSAP
- **خطوط**: يستخدم system-ui افتراضي، لا توجد Google Fonts
- **CSS**: `index.css` و `styles.css` فارغان تقريباً

### Tech Stack الحالي
- React 19 + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion (مثبّت)
- React Icons + Lucide React
- React Router Dom v7
- No GSAP yet

---

## نظام التصميم الجديد | New Design System

### الألوان | Color Palette
```
Primary:    #DC2626 (Red-600) — هوية طاقات الصمود
Secondary:  #1E1E2E (Dark Navy)
Accent:     #F59E0B (Amber)
Surface:    #0F0F1A (Deep Dark)
Glass:      rgba(255,255,255,0.05) with backdrop-blur
```

### الخطوط | Fonts
- **Arabic**: `Cairo` + `Tajawal` (من Google Fonts)
- **English/Numbers**: `Inter` أو `Outfit`

### المبادئ | Design Principles
1. **Dark-first** — تصميم داكن أساسي مع دعم فاتح
2. **Glassmorphism** — بطاقات شفافة مع blur
3. **GSAP Animations** — لدخول العناصر وانتقال الصفحات
4. **Micro-interactions** — hover, ripple, scale effects
5. **RTL First** — جميع التخطيطات مناسبة للعربية

---

## خطة التنفيذ | Implementation Plan

### المرحلة 1: الأساس | Foundation
---

#### [MODIFY] [index.css](file:///d:/work/Web/work/taqat/Taqat-website/src/index.css)
- استيراد Google Fonts (Cairo, Tajawal, Inter)
- CSS custom properties لنظام الألوان
- تعريف `@keyframes` متقدمة للـ GSAP fallback
- Base styles لـ RTL Arabic

#### [MODIFY] [styles.css](file:///d:/work/Web/work/taqat/Taqat-website/src/styles.css)
- تحديث شامل: Variables للألوان، glassmorphism utilities, scrollbar styling
- إضافة `.glass-card`, `.gradient-text`, `.shimmer` classes
- Dark/Light mode tokens

#### تثبيت GSAP | Install GSAP
```bash
npm install gsap
```

#### [MODIFY] [package.json](file:///d:/work/Web/work/taqat/Taqat-website/package.json)
- إضافة `gsap` للـ dependencies

---

### المرحلة 2: المكونات المشتركة | Shared Components
---

#### [MODIFY] [Navbar.jsx](file:///d:/work/Web/work/taqat/Taqat-website/src/components/Navbar.jsx)
**التغييرات:**
- خلفية `bg-[#0F0F1A]/90 backdrop-blur-xl` مع border سفلي شفاف
- Logo مع حلقة متحركة (GSAP pulse)
- Hamburger menu للموبايل مع Framer Motion
- Sticky navbar يتغير عند الـ scroll (يصغر ويزيد شفافية)
- زر تسجيل الخروج بتصميم pill button مع gradient

#### [MODIFY] [Footer.jsx](file:///d:/work/Web/work/taqat/Taqat-website/src/components/Footer.jsx)
**التغييرات:**
- تصميم أكثر ثراءً: شعار + حقوق + سطر تقني
- خلفية gradient داكنة مع border علوي

#### [MODIFY] [ThemeToggle.jsx](file:///d:/work/Web/work/taqat/Taqat-website/src/components/ThemeToggle.jsx)
**التغييرات:**
- تصميم أحدث: Pill-switch بدلاً من الزر الدائري
- GSAP animation للتبديل
- موقع أفضل (داخل Navbar)

---

### المرحلة 3: صفحة تسجيل الدخول | Login Page
---

#### [MODIFY] [Login.jsx](file:///d:/work/Web/work/taqat/Taqat-website/src/components/Login.jsx)
**التصميم الجديد:**
- خلفية كاملة الشاشة مع animated gradient mesh
- بطاقة زجاجية (glassmorphism) في المنتصف
- شعار الموقع في الأعلى مع GSAP stagger animation
- حقول input بتصميم floating label + border glow
- زر "دخول" مع gradient + ripple effect
- particle background خفيف (CSS only) أو GSAP

```
التصميم: Dark background + Glass card + Logo top center
لا image جانبية — تصميم كامل الشاشة centered
```

---

### المرحلة 4: صفحة Main (المواقع الرئيسية) | Main Page
---

#### [MODIFY] [Main.jsx](file:///d:/work/Web/work/taqat/Taqat-website/src/pages/Main.jsx)
**التصميم الجديد:**
- Header مع عنوان مزخرف + gradient text
- بطاقات موقع بتصميم uniform: dark glass card + accent top border
- كل بطاقة بلون accent مميز لكن ضمن نظام ألوان متناسق (لا ألوان عشوائية)
- GSAP staggered entrance: البطاقات تدخل الشاشة بالتتابع
- Hover: perspective tilt effect + glow shadow
- Modal بتصميم جديد: dark glass + smooth entrance animation

---

### المرحلة 5: صفحة Sub-Main | Sub-Main Page
---

#### [MODIFY] [Sun_Main.jsx](file:///d:/work/Web/work/taqat/Taqat-website/src/pages/Sun_Main.jsx)
**التصميم الجديد:**
- Breadcrumb navigation: الرئيسية ← اسم الموقع الرئيسي
- بطاقات أصغر وأنيق من الحالية
- Grid متجاوب: 1 → 2 → 3 → 4 columns
- كل بطاقة بـ icon + اسم + أزرار
- GSAP cascade entry animation

---

### المرحلة 6: صفحة SubMainDetails | Details Page
---

#### [MODIFY] [SubMainDetails.jsx](file:///d:/work/Web/work/taqat/Taqat-website/src/pages/SubMainDetails.jsx)
**التصميم الجديد:**
- ثلاثة أزرار كبيرة لكن بتصميم premium cards لا أزرار pill
- كل بطاقة بـ icon كبير + اسم + وصف قصير + hover animation
- Layout أفقي على الـ desktop وعمودي على الموبايل
- GSAP stagger على دخول البطاقات الثلاثة

```
الأزرار الثلاثة:
├── Deadline: أيقونة ساعة + "المهل الزمنية"
├── الكادر: أيقونة مجموعة + "إدارة الكادر"
└── الفقرات: أيقونة قائمة + "الفقرات والمهام"
```

---

### المرحلة 7: صفحة Tasks (الفقرات) | Tasks Page
---

#### [MODIFY] [Tasks.jsx](file:///d:/work/Web/work/taqat/Taqat-website/src/pages/Tasks.jsx)
**التغييرات الرئيسية:**
- Header bar محسّن مع breadcrumb
- جدول mobile-friendly أفضل: sticky headers, better cell padding
- تحسين شكل أسماء الموظفين (color badges)
- Filter modal بتصميم أحدث
- Loading skeleton بدلاً من spinner بسيط
- Add/Edit modal بتصميم premium

---

### المرحلة 8: صفحة Kader | Kader Page
---

#### [MODIFY] [Kader.jsx](file:///d:/work/Web/work/taqat/Taqat-website/src/pages/Kader.jsx)
**التغييرات الرئيسية:**
- نفس نظام التصميم المستخدم في Tasks
- Header محسّن
- جدول بتحسينات بصرية
- Modal أفضل تصميماً

---

### المرحلة 9: صفحة Deadline | Deadline Page
---

#### [MODIFY] [deadline.jsx](file:///d:/work/Web/work/taqat/Taqat-website/src/pages/deadline.jsx)
**التصميم الجديد:**
- بطاقة التاريخ بتصميم premium: countdown-style display
- ملاحظات كـ sticky notes بنمط masonry layout
- Background شفاف مع glassmorphism cards
- GSAP للملاحظات عند الإضافة/الحذف

---

### المرحلة 10: App.jsx و الـ Layout | App Layout
---

#### [MODIFY] [App.jsx](file:///d:/work/Web/work/taqat/Taqat-website/src/App.jsx)
- إضافة page transition animations
- تحسين layout wrapper

---

## مكتبات جديدة | New Dependencies

| المكتبة | الاستخدام |
|---------|-----------|
| `gsap` | ScrollTrigger، stagger، timeline animations |

---

## نظام تنظيم CSS الجديد | CSS Organization

```
src/
├── index.css          ← Google Fonts imports + root variables
├── styles.css         ← Tailwind base + utility classes + animations
└── components/
    └── (لا ملفات CSS منفصلة — كل شيء عبر Tailwind + inline GSAP)
```

---

## ترتيب التنفيذ | Execution Order

1. `npm install gsap`
2. `index.css` + `styles.css` (Design tokens + fonts)
3. `Navbar.jsx` → `Footer.jsx` → `ThemeToggle.jsx`
4. `Login.jsx`
5. `Main.jsx`
6. `Sun_Main.jsx`
7. `SubMainDetails.jsx`
8. `Tasks.jsx`
9. `Kader.jsx`
10. `deadline.jsx`
11. `App.jsx` (page transitions)
12. التحقق النهائي والضبط

---

## ملاحظات مهمة | Important Notes

> [!IMPORTANT]
> جميع طلبات API ومتغيرات الـ state ستبقى كما هي — التغييرات بصرية فقط في كل ملف

> [!NOTE]
> نظام الألوان المقترح:
> - أحمر (Primary): هوية الموقع
> - أسود/navy داكن: خلفية رئيسية
> - Amber: accent للـ highlights
> سيتم تطبيق dark mode كـ default مع إمكانية التبديل

> [!WARNING]
> ملف `ThemeToggle.jsx` سيتم نقل تكامله داخل `Navbar.jsx` لتبسيط اللايأوت وإزالة الزر العائم

---

## خطة التحقق | Verification Plan

### اختبارات بصرية
- [ ] تجربة الصفحات على موبايل (375px، 768px، 1440px)
- [ ] التحقق من عمل dark/light mode في كل صفحة
- [ ] التأكد من أن جميع الـ animations تعمل بسلاسة

### اختبارات وظيفية
- [ ] تسجيل الدخول يعمل
- [ ] إضافة/تعديل/حذف العناصر في كل صفحة
- [ ] التنقل بين الصفحات
- [ ] تحميل ملف Excel

