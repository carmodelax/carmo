import { motion } from "framer-motion";

export const WHATSAPP_DISPLAY = "(31) 99152-5097";
export const waLink = (msg) =>
  `https://wa.me/5531991525097?text=${encodeURIComponent(msg)}`;

export const DEFAULT_MSG =
  "Olá Carmo, vim pelo site e quero informações sobre os cursos e o processo do CAC.";

export function Crosshair({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function Reveal({ children, delay = 0, y = 32, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ index, eyebrow, title, sub }) {
  return (
    <div className="text-left">
      <Reveal>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-blood-bright">
          {index ? `// ${index} · ` : "// "}
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {sub ? (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">{sub}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
