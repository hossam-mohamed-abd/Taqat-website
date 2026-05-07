/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import MainTable from "./pages/Main";
import PrivateRoute from "./components/ProtectedRoutes";
import Tasks from "./pages/Tasks";
import Sub_Main from "./pages/Sun_Main";
import SubMainDetails from "./pages/SubMainDetails";
import Kader from "./pages/Kader";
import Deadline from "./pages/deadline";

const pageMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
};

function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/';

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-surface)] text-[var(--color-text)] dark:bg-gradient-to-br dark:from-[#07070f] dark:via-[#0f1630] dark:to-[#1a1233]">
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 hidden dark:block">
        <motion.div
          className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 24, 0], opacity: [0.24, 0.34, 0.24] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-28 -right-16 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl"
          animate={{ x: [0, -36, 0], y: [0, -20, 0], opacity: [0.22, 0.32, 0.22] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <div className="relative z-10 min-h-screen">
        {!isLoginRoute && <Navbar />}

        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            variants={pageMotion}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.36, ease: 'easeOut' }}
            className="min-h-[calc(100vh-70px)]"
          >
            <Routes location={location}>
              <Route path="/" element={<Login />} />

              <Route
                path="/main"
                element={
                  <PrivateRoute>
                    <MainTable />
                  </PrivateRoute>
                }
              />
              <Route
                path="/sub-main/:mainId"
                element={
                  <PrivateRoute>
                    <Sub_Main />
                  </PrivateRoute>
                }
              />
              <Route
                path="/sub-main/details/:subId"
                element={
                  <PrivateRoute>
                    <SubMainDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="tasks/:id"
                element={
                  <PrivateRoute>
                    <Tasks />
                  </PrivateRoute>
                }
              />
              <Route
                path="kader/:submainId"
                element={
                  <PrivateRoute>
                    <Kader />
                  </PrivateRoute>
                }
              />
              <Route
                path="deadline/:submainId"
                element={
                  <PrivateRoute>
                    <Deadline />
                  </PrivateRoute>
                }
              />
            </Routes>
          </motion.main>
        </AnimatePresence>

        {!isLoginRoute && <Footer />}
      </div>
    </div>
  );
}

export default App;
