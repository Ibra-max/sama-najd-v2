import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyCtaMobile from './components/StickyCtaMobile';
import Home from './pages/Home';
import Cash from './pages/Cash';
import GovernmentEmployee from './pages/GovernmentEmployee';
import WaqfServices from './pages/WaqfServices';
import RealEstateLiquidity from './pages/RealEstateLiquidity';
import { useLanguage } from './i18n/LanguageContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppContent() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t.meta.title;
  }, [t]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cash" element={<Cash />} />
        <Route path="/government-employee" element={<GovernmentEmployee />} />
        <Route path="/waqf-services" element={<WaqfServices />} />
        <Route path="/real-estate-liquidity" element={<RealEstateLiquidity />} />
      </Routes>
      <Footer />
      <StickyCtaMobile />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
