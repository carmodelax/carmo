import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { waLink, DEFAULT_MSG } from "./Shared";

const NAV = [
  { href: "#sobre", label: "Sobre", id: "sobre" },
  { href: "#cursos", label: "Cursos", id: "cursos" },
  { href: "#cac", label: "CAC", id: "cac" },
  { href: "#galeria", label: "Galeria", id: "galeria" },
  { href: "#faq", label: "FAQ", id: "faq" },
];

export default function HudHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#topo" data-testid="nav-logo-link" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logotipo IAT Carmo" className="h-10 w-10" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl font-black uppercase tracking-wide text-white">
              Carmo
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.28em] text-blood-bright">
              IAT · Treinamento de Tiro
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-testid={`nav-link-${item.id}`}
              className="group relative font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-blood-bright transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waLink(DEFAULT_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-whatsapp-button"
            className="clip-corner-sm hidden items-center bg-blood px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-blood-bright sm:inline-flex"
          >
            WhatsApp
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            data-testid="nav-mobile-toggle"
            aria-label="Abrir menu"
            className="inline-flex h-10 w-10 items-center justify-center border border-line text-white transition-colors hover:border-blood"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-line bg-ink/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-6 pt-2">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  data-testid={`nav-mobile-link-${item.id}`}
                  className="border-b border-line/60 py-3 font-display text-2xl font-bold uppercase text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={waLink(DEFAULT_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="nav-mobile-whatsapp"
                className="clip-corner-sm mt-4 inline-flex items-center justify-center bg-blood px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-white"
              >
                Chamar no WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
