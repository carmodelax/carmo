import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHeading, waLink } from "./Shared";

const FAQS = [
  {
    q: "O que é o CAC, na prática?",
    a: "CAC significa Colecionador, Atirador e Caçador — o credenciamento concedido pelo Exército Brasileiro. É ele que permite, por exemplo, manter acervo de armas e munições e praticar tiro com mais facilidade. Cada perfil (colecionador, atirador ou caçador) tem regras e requisitos próprios.",
    id: "o-que-e-cac",
  },
  {
    q: "CAC e posse são a mesma coisa?",
    a: "Não. O CAC é credenciamento junto ao Exército; a posse é a autorização para ter uma arma no seu domicílio, com registro na Polícia Federal. Muita gente faz os dois caminhos — e o ideal é entender qual serve pro seu objetivo antes de começar. Fala comigo no WhatsApp que eu te explico a diferença no seu caso.",
    id: "cac-ou-posse",
  },
  {
    q: "Nunca atirei. Posso fazer aula com você?",
    a: "Pode e deve! Tenho aulas do zero absoluto ao avançado: segurança, manipulação, postura, mira e prática guiada no estande. Ninguém nasce sabendo — o importante é começar com a orientação certa.",
    id: "nunca-atirei",
  },
  {
    q: "Como funciona a formação de instrutores?",
    a: "É um treinamento para quem quer lecionar tiro com responsabilidade e técnica. Os detalhes de conteúdo, carga horária e certificação eu passo direto no WhatsApp, porque monto conforme o seu nível e objetivo.",
    id: "formacao-instrutores",
  },
  {
    q: "Quanto custa?",
    a: "Depende do curso e do seu objetivo. Os valores eu passo direto no WhatsApp: (31) 99152-5097. Chama que a gente alinha.",
    id: "precos",
  },
];

export default function FaqCac() {
  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            index="06"
            eyebrow="Perguntas frequentes"
            title={
              <>
                Antes de <span className="text-blood-bright">atirar</span>, pergunte
              </>
            }
          />
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="border-t border-line" data-testid="faq-accordion">
              {FAQS.map((f) => (
                <AccordionItem key={f.id} value={f.id} className="border-b border-line">
                  <AccordionTrigger
                    data-testid={`faq-trigger-${f.id}`}
                    className="py-6 text-left font-display text-xl font-extrabold uppercase tracking-wide text-white hover:text-blood-bright hover:no-underline sm:text-2xl [&>svg]:text-blood-bright"
                  >
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
              Ficou de fora? Pergunta direto no{" "}
              <a
                href={waLink("Olá Carmo, vim pelo site e tenho uma dúvida sobre CAC e cursos.")}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="faq-whatsapp-link"
                className="text-blood-bright underline underline-offset-4 transition-colors hover:text-white"
              >
                WhatsApp
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
