import { useEffect } from 'react';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import Services from '../components/Services';
import Steps from '../components/Steps';
import CtaBlock from '../components/CtaBlock';
import LeadForm from '../components/LeadForm';
import { useReveal } from '../hooks/useReveal';

export default function Home() {
  useReveal();

  return (
    <>
      <Hero page="home" />
      <TrustStrip />
      <Services />
      <Steps />
      <CtaBlock />
      <LeadForm service="home" badgeLabel="FORM · 05" />
    </>
  );
}
