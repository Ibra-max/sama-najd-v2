import { useEffect } from 'react';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import Services from '../components/Services';
import Steps from '../components/Steps';
import CtaBlock from '../components/CtaBlock';
import LeadForm from '../components/LeadForm';
import { useReveal } from '../hooks/useReveal';

const DiagonalDivider = () => (
  <div className="divider-diagonal" aria-hidden="true">
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
      <path d="M0,0 L1440,80 L1440,80 L0,80 Z" fill="var(--navy-3)" />
    </svg>
  </div>
);

export default function Home() {
  useReveal();

  return (
    <>
      <Hero page="home" />
      <TrustStrip />
      <Services />
      <DiagonalDivider />
      <Steps />
      <CtaBlock />
      <LeadForm service="home" badgeLabel="FORM · 05" />
    </>
  );
}
