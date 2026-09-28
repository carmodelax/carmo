import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Crosshair as CrosshairIcon } from "lucide-react";
import { Reveal, SectionHeading, waLink } from "./Shared";

const OPTIONS = [
  {
    id: "cac",
    label: "Tirar meu CAC",
    course: "CAC — Colecionador, Atirador e Caçador",
    text: "Seu caminho começa com uma conversa pra definir seu perfil e os requisitos do seu caso.",
    msg: "Olá Carmo, vim pelo site. Meu objetivo é tirar o CAC. Qual o próximo passo?",
  },
  {
    id: "posse",
    label: "Ter minha posse",
    course: "Posse de Arma",
    text: "Vou te mostrar o processo completo pra ter a sua arma no domicílio, sem erro.",
    msg: "Olá Carmo, vim pelo site. Meu objetivo é ter a posse de arma. Como funciona?",
  },
  {
    id: "porte",
    label: "Andar armado (porte)",
    course: "Porte de Arma",
    text: "Primeiro a gente analisa o seu enquadramento legal — depois monta a estratégia do requerimento.",
    msg: "Olá Carmo, vim pelo site. Meu objetivo é o porte de arma. Qual o próximo passo?",
  },
  {
    id: "instrutor",
    label: "Virar instrutor de tiro",
    course: "Formação de Instrutores",
    text: "Formação profissional pra você ensinar tiro com método, técnica e responsabilidade.",
    msg: "Olá Carmo, vim pelo site. Meu objetivo é me tornar instrutor de tiro. Me conta como funciona.",
  },
  {
    id: "casa",
    label: "Proteger minha casa",
    course: "Proteção Residencial",
    text: "Curso prático pra blindar sua casa e preparar sua família pra agir certo.",
    msg: "Olá Carmo, vim pelo site. Meu objetivo é proteger minha residência. Como começo?",
  },
  {
    id: "zero",
    label: "Aprender a atirar do zero",
    course: "Aulas de Tiro — do zero ao avançado",
    text: "Começa do absoluto zero: segurança, manipulação, postura e prática guiada no estande.",
    msg: "Olá Carmo, vim pelo site. Nunca atirei e quero aprender do zero. Como funciona?",
  },
];

export default function Simulador() {
  const [sel, setSel] = useState(null);

  return (
    <section id="simulador" className="relative bg-surface/40 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="clip-corner noise relative overflow-hidden border border-line bg-card p-7 sm:p-12">
            <div className="hud-grid absolute inset-0 opacity-40" />
            <div className="relative z-10">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-blood-bright">
                // Simulador rápido
              </p>
              <h2 className="mt-4 font-display text-3xl font-black uppercase leading-none text-white sm:text-5xl">
                Qual é o seu <span className="text-blood-bright">objetivo?</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm text-zinc-400 sm:text-base">
                Selecione abaixo e eu te mostro qual é a trilha certa pra você.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                {OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setSel(o)}
                    data-testid={`simulador-option-${o.id}`}
                    className={`clip-corner-sm border px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-colors sm:text-xs ${
                      sel?.id === o.id
                        ? "border-blood bg-blood text-white"
                        : "border-line bg-ink/60 text-zinc-300 hover:border-blood hover:text-white"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              <div className="mt-9" data-testid="simulador-result">
                <AnimatePresence mode="wait">
                  {sel ? (
                    <motion.div
                      key={sel.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                      className="border-l-2 border-blood-bright bg-ink/70 p-6"
                    >
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                        Trilha recomendada
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-extrabold uppercase text-blood-bright sm:text-3xl">
                        {sel.course}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">
                        {sel.text}
                      </p>
                      <a
                        href={waLink(sel.msg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="simulador-whatsapp-cta"
                        className="clip-corner-sm mt-6 inline-flex items-center gap-2 bg-blood px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-blood-bright"
                      >
                        Falar com o Carmo
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-4 border border-dashed border-line p-6"
                      data-testid="simulador-empty-state"
                    >
                      <CrosshairIcon className="h-6 w-6 shrink-0 text-blood" strokeWidth={1.5} />
                      <p className="text-sm text-zinc-400">
                        Mirando ainda? Sem problema — seleciona um objetivo aí em cima e eu te
                        mostro o caminho.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
