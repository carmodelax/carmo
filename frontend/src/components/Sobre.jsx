import { GraduationCap, Home, Instagram, MessageCircle, ShieldCheck, Youtube } from "lucide-react";
import { Reveal, SectionHeading, waLink } from "./Shared";

const AVATAR =
  "https://yt3.googleusercontent.com/C26oHA46re7wf8lYPDs9byPeGHq2BgbFPfDjMSjn_hbSWGJaaalNaGb9jmFLmOmiCyL_3s6Brw=s900-c-k-c0x00ffffff-no-rj";
const SIDE_IMG =
  "https://images.unsplash.com/photo-1758618851142-609fd12bc1ae?crop=entropy&cs=srgb&fm=jpg&q=85";

const FEATURES = [
  { icon: ShieldCheck, text: "Segurança em primeiro lugar — técnica certa desde o primeiro tiro" },
  { icon: GraduationCap, text: "Formação de novos instrutores de tiro" },
  { icon: Home, text: "Proteção residencial para a sua família" },
];

const SOCIALS = [
  {
    id: "youtube",
    href: "https://youtube.com/@crcarmo",
    icon: Youtube,
    label: "YouTube",
    handle: "@crcarmo",
    testid: "sobre-link-youtube",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/cr_carmo",
    icon: Instagram,
    label: "Instagram",
    handle: "@cr_carmo",
    testid: "sobre-link-instagram",
  },
  {
    id: "whatsapp",
    href: waLink("Olá Carmo, vim pelo site e quero conversar."),
    icon: MessageCircle,
    label: "WhatsApp",
    handle: "(31) 99152-5097",
    testid: "sobre-link-whatsapp",
  },
];

export default function Sobre() {
  return (
    <section id="sobre" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <Reveal className="relative">
            <div className="absolute -left-8 top-8 h-full w-full border border-blood/30" />
            <div className="clip-corner relative">
              <img
                src={AVATAR}
                alt="Instrutor Carmo"
                className="h-[420px] w-full object-cover sm:h-[480px]"
                data-testid="sobre-photo"
              />
              <span className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-blood-bright" />
              <span className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-blood-bright" />
              <span className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-blood-bright" />
              <span className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-blood-bright" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-5 pt-16">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-blood-bright">
                  Instrutor Carmo
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                  Estande · Treino real · Ensina de verdade
                </p>
              </div>
            </div>
            <div className="clip-corner-sm absolute -bottom-10 -right-4 hidden w-48 rotate-3 overflow-hidden border border-line sm:block lg:-right-10">
              <img src={SIDE_IMG} alt="Alvo de treinamento" className="h-32 w-full object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <SectionHeading
            index="01"
            eyebrow="O Instrutor"
            title={
              <>
                Conheça o <span className="text-blood-bright">Carmo</span>
              </>
            }
          />
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Sou o Carmo, instrutor de tiro. Dou aula pra quem nunca pegou uma arma e também
              formato novos instrutores — do primeiro disparo ao nível profissional.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
              Meu trabalho vai muito além do estande: te oriento no processo do CAC, da posse e
              do porte, e ensino proteção residencial pra sua família dormir tranquila. Sem
              enrolação, sem achismo: técnica, responsabilidade e tudo dentro da lei.
            </p>
          </Reveal>

          <div className="mt-9 space-y-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.text} delay={0.1 + i * 0.08}>
                <div className="flex items-center gap-4 border-l-2 border-blood bg-card/60 p-4" data-testid={`sobre-feature-${i}`}>
                  <f.icon className="h-5 w-5 shrink-0 text-blood-bright" strokeWidth={1.8} />
                  <p className="text-sm text-zinc-200 sm:text-base">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {SOCIALS.map((s, i) => (
              <Reveal key={s.id} delay={0.1 + i * 0.07} className="h-full">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={s.testid}
                  className="group flex h-full flex-col justify-between border border-line bg-card p-5 transition-colors hover:border-blood"
                >
                  <s.icon className="h-6 w-6 text-blood transition-colors group-hover:text-blood-bright" strokeWidth={1.8} />
                  <div className="mt-6">
                    <p className="font-display text-lg font-extrabold uppercase text-white">
                      {s.label}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-zinc-500">{s.handle}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
