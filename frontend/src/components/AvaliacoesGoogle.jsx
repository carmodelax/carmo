import { Star } from "lucide-react";
import { Reveal } from "./Shared";

const REVIEW_URL = "https://g.page/r/CXERq_fFMkp_EBM/review";
const MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJqR9QFOqDJmgRcRGr98UySn8";

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.3-2.1 3.7-5.2 3.7-8.6z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.8-5.1L1.3 17.3C3.3 21.4 7.3 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.2 14.3c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.3 6.7C.5 8.3 0 10.1 0 12s.5 3.7 1.3 5.3l3.9-3z"
      />
      <path
        fill="#EA4335"
        d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.3 0 3.3 2.6 1.3 6.7l3.9 3c.9-2.9 3.6-5 6.8-5z"
      />
    </svg>
  );
}

export default function AvaliacoesGoogle() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-ink py-24 lg:py-28" data-testid="avaliacoes-google">
      <div className="hud-grid absolute inset-0 opacity-40" />
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="clip-corner noise relative overflow-hidden border border-line bg-card p-8 sm:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blood/20 blur-[100px]" />
            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4">
                  <GoogleG />
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blood-bright">
                      {"// Google Avaliações"}
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-black uppercase leading-none text-white sm:text-4xl">
                      Já treinou comigo?
                    </h2>
                  </div>
                </div>
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
                  Sua avaliação no Google leva 1 minuto e ajuda outros atiradores a encontrarem
                  um trabalho sério de verdade — é o que mantém essa página viva.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="avaliacoes-google-cta"
                    className="clip-corner-sm inline-flex items-center justify-center gap-2 bg-blood px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-blood-bright"
                  >
                    <Star className="h-4 w-4 fill-current" />
                    Avaliar no Google
                  </a>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="avaliacoes-google-maps-link"
                    className="clip-corner-sm inline-flex items-center justify-center border border-white/25 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-zinc-200 transition-colors hover:border-blood-bright hover:text-white"
                  >
                    Ver ficha no Google
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="clip-corner-sm border border-line bg-ink/70 p-7 text-center" data-testid="avaliacoes-stars-card">
                  <div className="flex items-center justify-center gap-1.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-8 w-8 text-amber" fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                    Sua nota vale muito
                  </p>
                  <p className="mt-4 font-display text-xl font-extrabold uppercase leading-snug text-white">
                    Instrutor de Armamento e Tiro — Carmo
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Assessoria CAC
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
