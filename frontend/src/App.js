import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter } from "react-router-dom";
import Lenis from "lenis";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import HudHeader from "@/components/HudHeader";
import Hero from "@/components/Hero";
import TickerMarquee from "@/components/TickerMarquee";
import Sobre from "@/components/Sobre";
import Servicos from "@/components/Servicos";
import CacTimeline from "@/components/CacTimeline";
import Simulador from "@/components/Simulador";
import Galeria from "@/components/Galeria";
import FaqCac from "@/components/FaqCac";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let rafId = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      rafId = requestAnimationFrame(loop);
    });
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -72 });
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);
}

function Home() {
  useLenis();
  return (
    <div className="overflow-x-clip bg-ink font-body text-white">
      <HudHeader />
      <main>
        <Hero />
        <TickerMarquee />
        <Sobre />
        <Servicos />
        <CacTimeline />
        <Simulador />
        <Galeria />
        <FaqCac />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
