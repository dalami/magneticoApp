import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

function Landing() {
  const uploadAppUrl = "https://magnetico-app.vercel.app";

  const handleCtaClick = (e) => {
    e.preventDefault();
    window.open(uploadAppUrl, '_blank');
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="Landing bg-gray-50">
      <Header onCtaClick={handleCtaClick} onSmoothScroll={handleSmoothScroll} />
      <Hero onCtaClick={handleCtaClick} onSmoothScroll={handleSmoothScroll} />
      <Gallery onCtaClick={handleCtaClick} />
      <HowItWorks onCtaClick={handleCtaClick} />
      <Features />
      <CTA onCtaClick={handleCtaClick} />
      <Footer onSmoothScroll={handleSmoothScroll} />
    </div>
  );
}

export default Landing;