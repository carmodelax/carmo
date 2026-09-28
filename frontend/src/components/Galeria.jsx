import { Reveal, SectionHeading } from "./Shared";

const SHOTS = [
  {
    src: "https://images.unsplash.com/photo-1758618851142-609fd12bc1ae?crop=entropy&cs=srgb&fm=jpg&q=85",
    caption: "Treino real no estande",
    cls: "md:col-span-7 h-[300px] md:h-[440px]",
    testid: "galeria-foto-1",
  },
  {
    src: "https://images.unsplash.com/photo-1788959647839-a9f83f11521a?crop=entropy&cs=srgb&fm=jpg&q=85",
    caption: "Precisão no alvo",
    cls: "md:col-span-5 h-[300px] md:h-[440px]",
    testid: "galeria-foto-2",
  },
  {
    src: "https://images.unsplash.com/photo-1782800633459-51a74faaa476?crop=entropy&cs=srgb&fm=jpg&q=85",
    caption: "Equipamento certo",
    cls: "md:col-span-5 h-[300px] md:h-[400px]",
    testid: "galeria-foto-3",
  },
  {
    src: "https://images.unsplash.com/photo-1675285551699-0f17c1731430?crop=entropy&cs=srgb&fm=jpg&q=85",
    caption: "Instrução acompanhada",
    cls: "md:col-span-7 h-[300px] md:h-[400px]",
    testid: "galeria-foto-4",
  },
  {
    src: "https://images.unsplash.com/photo-1612777660478-735ae8b55004?crop=entropy&cs=srgb&fm=jpg&q=85",
    caption: "Material de treino",
    cls: "md:col-span-12 h-[260px] md:h-[320px]",
    testid: "galeria-foto-5",
  },
];

export default function Galeria() {
  return (
    <section id="galeria" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Galeria"
          title={
            <>
              Dentro do <span className="text-blood-bright">estande</span>
            </>
          }
          sub="Como é o treino comigo: alvo, fogo real e orientação de perto. O resto você vive na primeira aula."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12">
          {SHOTS.map((s, i) => (
            <Reveal key={s.testid} delay={0.05 * i} className={s.cls.includes("md:col-span-12") ? "md:col-span-12" : "contents"}>
              <figure
                className={`clip-corner group relative overflow-hidden border border-line ${s.cls}`}
                data-testid={s.testid}
              >
                <img
                  src={s.src}
                  alt={s.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-blood-bright opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-blood-bright opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <figcaption className="absolute bottom-4 left-4 flex items-center gap-3">
                  <span className="h-px w-6 bg-blood-bright" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-white">
                    {s.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
