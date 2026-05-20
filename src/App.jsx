import { HashRouter, Routes, Route } from 'react-router-dom';
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return null;
}

function AppContent() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t.meta.title;
  }, [t]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<><ScrollToTop /><Home /></>} />
        <Route path="/cash" element={<><ScrollToTop /><Cash /></>} />
        <Route path="/government-employee" element={<><ScrollToTop /><GovernmentEmployee /></>} />
        <Route path="/waqf-services" element={<><ScrollToTop /><WaqfServices /></>} />
        <Route path="/real-estate-liquidity" element={<><ScrollToTop /><RealEstateLiquidity /></>} />
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
