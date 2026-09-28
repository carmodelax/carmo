import { Star } from "lucide-react";
import { Reveal, SectionHeading } from "./Shared";

const REVIEW_URL = "https://g.page/r/CXERq_fFMkp_EBM/review";

// Comentários REAIS de alunos. Para publicar: { nome: "...", texto: "...", papel: "Aluno de tiro" }
const TESTIMONIALS = [];

function Stars({ size = "h-4 w-4" }) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={`${size} text-amber`} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="relative bg-surface/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Depoimentos"
          title={
            <>
              Voz de quem <span className="text-blood-bright">atirou comigo</span>
            </>
          }
        />

        {TESTIMONIALS.length > 0 ? (
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.nome} delay={0.05 * i} className="h-full">
                <figure
                  className="clip-corner flex h-full flex-col border border-line bg-card p-7"
                  data-testid={`depoimento-card-${i}`}
                >
                  <Stars />
                  <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-zinc-300">
                    “{t.texto}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className="flex h-10 w-10 items-center justify-center border border-blood font-display text-lg font-black text-blood-bright">
                      {t.nome.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-display text-lg font-extrabold uppercase text-white">
                        {t.nome}
                      </span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                        {t.papel}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={0.15}>
            <div
              className="clip-corner mt-12 border border-dashed border-line bg-card/60 p-10 text-center sm:p-14"
              data-testid="depoimentos-empty-state"
            >
              <div className="flex justify-center gap-1.5">
                <Stars size="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-extrabold uppercase leading-tight text-white sm:text-3xl">
                Treinou comigo? Sua opinião pode ser a primeira aqui.
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                Estou reunindo os comentários dos alunos. Avalie no Google — leva 1 minuto —
                e em breve o seu depoimento aparece nesta página.
              </p>
              <a
                href={REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="depoimentos-google-cta"
                className="clip-corner-sm mt-8 inline-flex items-center justify-center bg-blood px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-blood-bright"
              >
                Avaliar no Google
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
