import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Crosshair, waLink, WHATSAPP_DISPLAY } from "./Shared";

const HERO_IMG =
  "https://images.unsplash.com/photo-1779379019105-b40c1bb18621?crop=entropy&cs=srgb&fm=jpg&q=85";

const LINES = [
  { text: "SEU PRÓXIMO", style: "text-white" },
  { text: "TIRO COMEÇA", style: "text-white" },
  { text: "AQUI.", style: "text-blood-bright" },
];

const TICKS = [
  "Aulas do zero ao avançado",
  "Formação de instrutores",
  "Proteção residencial",
];

export default function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 900], [0, 180]);
  const yFg = useTransform(scrollY, [0, 900], [0, -36]);

  return (
    <section id="topo" className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* backdrop with parallax */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -bottom-48">
        <img
          src={HERO_IMG}
          alt="Treino de tiro em estande"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/35 to-transparent" />
      </motion.div>
      <div className="noise absolute inset-0" />
      <div className="hud-grid absolute inset-0 opacity-50" />
      <div className="absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-blood/25 blur-[140px]" />

      {/* rotating reticle */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="absolute right-[5%] top-[20%] hidden h-44 w-44 animate-spin-slow text-blood/60 lg:block"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 6" />
        <path d="M50 8v16M50 76v16M8 50h16M76 50h16" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="50" cy="50" r="2.5" fill="#FF2E2E" />
      </svg>

      <motion.div
        style={{ y: yFg }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-36 sm:px-8 lg:pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-7 inline-flex items-center gap-3 border border-line bg-ink/60 px-4 py-2 backdrop-blur-sm"
          data-testid="hero-badge"
        >
          <span className="laser-dot h-2 w-2 rounded-full bg-blood-bright" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-200 sm:text-[11px]">
            IAT Carmo · Instrutor de Tiro · MG
          </span>
        </motion.div>

        <h1 className="font-display text-[clamp(3.4rem,11vw,8.5rem)] font-black uppercase leading-[0.88] tracking-tight">
          {LINES.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-1">
              <motion.span
                className={`block ${line.style}`}
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.18 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                data-testid={`hero-line-${i}`}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg"
          data-testid="hero-subline"
        >
          CAC, posse, porte, formação de instrutores e proteção residencial — com aula de tiro
          do zero ao avançado. Tudo dentro da lei, com quem vive isso todos os dias.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href={waLink("Olá Carmo, vim pelo site e quero tirar meu CAC. Qual o próximo passo?")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-cta-cac"
            className="clip-corner group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-blood px-7 py-4 font-mono text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors"
          >
            <span className="absolute inset-0 translate-y-full bg-blood-bright transition-transform duration-300 group-hover:translate-y-0" />
            <span className="relative">Quero tirar meu CAC</span>
            <ArrowRight className="relative h-4 w-4" />
          </a>
          <a
            href={waLink("Olá Carmo, vim pelo site e quero agendar uma aula de tiro.")}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-cta-whatsapp"
            className="clip-corner group inline-flex items-center justify-center gap-3 border border-white/25 px-7 py-4 font-mono text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-blood-bright"
          >
            <MessageCircle className="h-4 w-4 text-blood-bright" />
            {WHATSAPP_DISPLAY}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6"
        >
          {TICKS.map((t) => (
            <span
              key={t}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300"
            >
              <Crosshair className="h-3.5 w-3.5 text-blood-bright" />
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400 md:flex">
        <ArrowRight className="h-3.5 w-3.5 rotate-90 text-blood-bright" />
        Role para mirar
      </div>
    </section>
  );
}
