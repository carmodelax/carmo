import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { waLink, DEFAULT_MSG } from "./Shared";
import { useAuth } from "./AuthProvider";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.3-2.1 3.7-5.2 3.7-8.6z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.8-5.1L1.3 17.3C3.3 21.4 7.3 24 12 24z" />
      <path fill="#FBBC05" d="M5.2 14.3c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.3 6.7C.5 8.3 0 10.1 0 12s.5 3.7 1.3 5.3l3.9-3z" />
      <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.3 0 3.3 2.6 1.3 6.7l3.9 3c.9-2.9 3.6-5 6.8-5z" />
    </svg>
  );
}

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
  const { user, login, logout } = useAuth();

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
          {user ? (
            <div className="hidden items-center gap-2.5 sm:flex" data-testid="auth-user-chip">
              {user.picture ? (
                <img src={user.picture} alt="" className="h-8 w-8 rounded-full border border-blood" />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blood font-display text-sm font-black text-blood-bright">
                  {user.name.charAt(0)}
                </span>
              )}
              <span className="max-w-[110px] truncate font-mono text-[11px] uppercase tracking-wide text-white">
                {user.name}
              </span>
              <button
                onClick={logout}
                data-testid="auth-logout-button"
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400 transition-colors hover:text-blood-bright"
              >
                Sair
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              data-testid="auth-google-button"
              className="clip-corner-sm hidden items-center gap-2 border border-line bg-card px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-blood sm:inline-flex"
            >
              <GoogleMark />
              Entrar
            </button>
          )}
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
              {user ? (
                <div className="mt-4 flex items-center justify-between border border-line bg-card px-4 py-3" data-testid="auth-mobile-user-chip">
                  <span className="max-w-[160px] truncate font-mono text-[11px] uppercase tracking-wide text-white">
                    {user.name}
                  </span>
                  <button
                    onClick={logout}
                    data-testid="auth-mobile-logout"
                    className="font-mono text-[10px] uppercase tracking-[0.15em] text-blood-bright"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={login}
                  data-testid="auth-mobile-google"
                  className="clip-corner-sm mt-4 inline-flex items-center justify-center gap-2 border border-line bg-card px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white"
                >
                  <GoogleMark />
                  Entrar com Google
                </button>
              )}
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
