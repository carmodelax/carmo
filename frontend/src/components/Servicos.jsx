import {
  ArrowUpRight,
  BadgeCheck,
  FileCheck,
  GraduationCap,
  Home,
  Shield,
  Target,
} from "lucide-react";
import { Reveal, SectionHeading, waLink } from "./Shared";

const COURSES = [
  {
    id: "cac",
    num: "01",
    icon: BadgeCheck,
    title: "CAC",
    tag: "Colecionador · Atirador · Caçador",
    desc: "Credenciamento junto ao Exército Brasileiro: te oriento no perfil certo, nos requisitos e em cada etapa do processo.",
    msg: "Olá Carmo, vim pelo site e quero tirar meu CAC.",
  },
  {
    id: "posse",
    num: "02",
    icon: Shield,
    title: "Posse de Arma",
    tag: "Arma no domicílio",
    desc: "Orientação completa para buscar sua posse com segurança jurídica, da documentação à comprovação de capacidade técnica.",
    msg: "Olá Carmo, vim pelo site e quero informações sobre a posse de arma.",
  },
  {
    id: "porte",
    num: "03",
    icon: FileCheck,
    title: "Porte de Arma",
    tag: "Conforme o seu enquadramento",
    desc: "Análise do seu caso e caminho legal para o porte, com acompanhamento em todo o requerimento.",
    msg: "Olá Carmo, vim pelo site e quero informações sobre o porte de arma.",
  },
  {
    id: "instrutores",
    num: "04",
    icon: GraduationCap,
    title: "Formação de Instrutores",
    tag: "Nível profissional",
    desc: "Você vira instrutor: formação completa pra quem quer ensinar tiro com técnica, método e responsabilidade.",
    msg: "Olá Carmo, vim pelo site e quero me tornar instrutor de tiro.",
  },
  {
    id: "protecao",
    num: "05",
    icon: Home,
    title: "Proteção Residencial",
    tag: "Casa blindada",
    desc: "Estratégia, planejamento e treinamento pra deixar sua casa mais segura e sua família mais preparada.",
    msg: "Olá Carmo, vim pelo site e quero o curso de proteção residencial.",
  },
  {
    id: "aulas",
    num: "06",
    icon: Target,
    title: "Aulas de Tiro",
    tag: "Do zero ao avançado",
    desc: "Manipulação, postura, mira, respiração e muita prática guiada no estande. Ninguém nasce sabendo — comece certo.",
    msg: "Olá Carmo, vim pelo site e quero agendar aulas de tiro.",
  },
];

function CornerMark({ pos }) {
  return <span className={`absolute h-4 w-4 border-blood-bright opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${pos}`} />;
}

export default function Servicos() {
  return (
    <section id="cursos" className="relative bg-surface/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Serviços & Formações"
          title={
            <>
              Escolha sua <span className="text-blood-bright">munição</span>
            </>
          }
          sub="Cada caminho tem um processo certo. Clica no card, fala comigo no WhatsApp e eu te oriento do primeiro passo ao certificado."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c, i) => (
            <Reveal key={c.id} delay={0.05 * i} className="h-full">
              <a
                href={waLink(c.msg)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`curso-card-${c.id}`}
                className="clip-corner group relative flex h-full flex-col border border-line bg-card p-7 transition-colors duration-300 hover:border-blood"
              >
                <CornerMark pos="left-2 top-2 border-l-2 border-t-2" />
                <CornerMark pos="right-2 top-2 border-r-2 border-t-2" />
                <CornerMark pos="bottom-2 left-2 border-b-2 border-l-2" />
                <CornerMark pos="bottom-2 right-2 border-b-2 border-r-2" />
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blood-bright to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  <c.icon className="h-8 w-8 text-blood transition-colors group-hover:text-blood-bright" strokeWidth={1.6} />
                  <span className="font-mono text-xs text-zinc-600 transition-colors group-hover:text-blood-bright">
                    /{c.num}
                  </span>
                </div>
                <h3 className="mt-9 font-display text-2xl font-extrabold uppercase leading-tight text-white">
                  {c.title}
                </h3>
                <p className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-blood-bright">
                  {c.tag}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{c.desc}</p>
                <span className="mt-7 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-zinc-300 transition-colors group-hover:text-blood-bright">
                  Consultar no WhatsApp
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
