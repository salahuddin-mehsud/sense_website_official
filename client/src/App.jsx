import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SearchModal from './components/layout/SearchModal';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Collaboration from './pages/Collaboration';
import Membership from './pages/Membership';
import Volunteer from './pages/Volunteer';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const isAuthOrAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <ScrollToTop />
      <SearchModal />

      {!isAuthOrAdminRoute && <Navbar />}

      <main className="flex-1 flex flex-col">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/cabinet" element={<Navigate to="/team" replace />} />
          <Route path="/team" element={<Team />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/mission-vision" element={<Navigate to="/about" replace />} />

          {/* Auth & Admin Routes */}
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<Navigate to="/login" replace />} />
          <Route path="/admin" element={<Dashboard />} />

          {/* Fallback 404 */}
          <Route
            path="*"
            element={
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
                <h1 className="text-6xl font-extrabold text-sense-navy font-mono">404</h1>
                <h2 className="text-xl font-bold text-slate-800 mt-2">Page Not Found</h2>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  The requested SENSE IIUI page does not exist or has been relocated in the current session.
                </p>
                <a
                  href="/"
                  className="mt-6 px-6 py-2.5 bg-sense-blue hover:bg-sense-navy text-white text-xs font-bold rounded-xl transition"
                >
                  Return to Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>

      {!isAuthOrAdminRoute && <Footer />}
    </div>
  );
}

export default App;
