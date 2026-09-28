import { MessageCircle } from "lucide-react";
import { Reveal, waLink, WHATSAPP_DISPLAY } from "./Shared";

export default function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-blood" data-testid="cta-final">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(0,0,0,0.10) 0px, rgba(0,0,0,0.10) 2px, transparent 2px, transparent 16px)",
        }}
      />
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="absolute -right-16 top-1/2 h-[420px] w-[420px] -translate-y-1/2 text-ink/25 lg:right-8"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
        <path d="M50 4v20M50 76v20M4 50h20M76 50h20" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/70">
            {"// Última chamada"}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display text-[clamp(3rem,9vw,7rem)] font-black uppercase leading-[0.88] tracking-tight text-ink">
            Fale comigo
            <br />
            hoje.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-ink/80 sm:text-lg">
            Chama no WhatsApp, conta seu objetivo e eu te oriento no primeiro passo — sem
            compromisso.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a
              href={waLink("Olá Carmo, vim pelo site e quero começar. Podemos conversar?")}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-final-whatsapp"
              className="clip-corner inline-flex items-center justify-center gap-3 bg-ink px-8 py-5 font-mono text-sm font-bold uppercase tracking-[0.15em] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Chamar no WhatsApp
            </a>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
              {WHATSAPP_DISPLAY} · atendo pessoalmente
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
