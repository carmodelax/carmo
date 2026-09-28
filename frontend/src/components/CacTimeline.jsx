import { Reveal, SectionHeading, waLink, WHATSAPP_DISPLAY } from "./Shared";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Diagnóstico do seu perfil",
    desc: "A gente conversa no WhatsApp e define o caminho certo: CAC, posse, porte ou aulas.",
  },
  {
    num: "02",
    title: "Laudo psicológico",
    desc: "Avaliação com psicólogo de confiança — te indico profissionais de referência.",
  },
  {
    num: "03",
    title: "Curso e capacidade técnica",
    desc: "Formação teórica e prática comprovada no estande, do jeito que os órgãos exigem.",
  },
  {
    num: "04",
    title: "Requerimento e acompanhamento",
    desc: "Protocolo do processo com revisão de tudo pra não dar erro em documento nenhum.",
  },
  {
    num: "05",
    title: "Certificado na mão",
    desc: "Credenciamento ou registro concedido — e você ainda fica de olho nos prazos de renovação.",
  },
];

export default function CacTimeline() {
  return (
    <section id="cac" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            index="03"
            eyebrow="Passo a passo"
            title={
              <>
                O caminho do <span className="text-blood-bright">CAC</span> sem erro
              </>
            }
          />
          <Reveal delay={0.2}>
            <div className="clip-corner mt-9 border border-line bg-card p-7">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-blood-bright">
                // CAC em resumo
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                CAC é o credenciamento de <strong className="text-white">Colecionador, Atirador e Caçador</strong>{" "}
                junto ao Exército Brasileiro. Cada perfil tem regras próprias — e o que vale é
                saber qual é o seu antes de gastar tempo e dinheiro no caminho errado.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Eu te oriento e te preparo em cada etapa, do laudo ao certificado.
              </p>
              <a
                href={waLink("Olá Carmo, vim pelo site e tenho dúvidas sobre o CAC. Pode me explicar o processo?")}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cac-cta-whatsapp"
                className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-blood-bright transition-colors hover:text-white"
              >
                Tirar minha dúvida no WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ol className="relative space-y-9 border-l border-line pl-8 sm:pl-12">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={0.08 * i}>
                <li className="relative" data-testid={`cac-step-${s.num}`}>
                  <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center border border-blood bg-ink sm:-left-[65px]">
                    <span className="h-1.5 w-1.5 bg-blood-bright" />
                  </span>
                  <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-blood">
                    ETAPA {s.num}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold uppercase text-white sm:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {s.desc}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.2}>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
              * Etapas gerais. O caminho exato depende do seu objetivo — alinhe comigo no
              WhatsApp: {WHATSAPP_DISPLAY}.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
