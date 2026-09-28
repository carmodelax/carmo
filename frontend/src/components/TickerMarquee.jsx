import { Crosshair } from "./Shared";

const ITEMS = [
  "CAC",
  "Posse de arma",
  "Porte de arma",
  "Formação de instrutores",
  "Proteção residencial",
  "Aulas de tiro",
];

export default function TickerMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      data-testid="tactical-marquee"
      className="relative overflow-hidden border-y border-line bg-surface py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-2xl font-extrabold uppercase tracking-wide text-white/90 md:text-3xl">
              {t}
            </span>
            <Crosshair className="h-4 w-4 shrink-0 text-blood" />
          </span>
        ))}
      </div>
    </div>
  );
}
