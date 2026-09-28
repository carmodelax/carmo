import { Instagram, MessageCircle, Youtube } from "lucide-react";

const LINKS = [
  { href: "#sobre", label: "Sobre", id: "sobre" },
  { href: "#cursos", label: "Cursos", id: "cursos" },
  { href: "#cac", label: "CAC", id: "cac" },
  { href: "#galeria", label: "Galeria", id: "galeria" },
  { href: "#faq", label: "FAQ", id: "faq" },
];

const SOCIALS = [
  { href: "https://youtube.com/@crcarmo", icon: Youtube, label: "YouTube", testid: "footer-link-youtube" },
  { href: "https://www.instagram.com/cr_carmo", icon: Instagram, label: "Instagram", testid: "footer-link-instagram" },
  { href: "https://wa.me/5531991525097", icon: MessageCircle, label: "WhatsApp", testid: "footer-link-whatsapp" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-ink" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Logotipo IAT Carmo" className="h-10 w-10" />
              <div className="leading-none">
                <p className="font-display text-2xl font-black uppercase text-white">Carmo</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.28em] text-blood-bright">
                  IAT · Treinamento de Tiro
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-500">
              Instrutor de tiro. CAC, posse, porte, formação de instrutores e proteção
              residencial — do primeiro tiro ao nível profissional.
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Links do site">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`footer-link-${l.id}`}
                className="w-fit font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-blood-bright"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={s.testid}
                className="group flex w-fit items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
              >
                <s.icon className="h-4 w-4 text-blood transition-colors group-hover:text-blood-bright" strokeWidth={1.8} />
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="font-mono text-[11px] text-zinc-600">
            © {year} Carmo · IAT — Instrutor de Tiro
          </p>
          <p className="font-mono text-[11px] text-zinc-600">
            Pratique tiro com segurança e dentro da lei.
          </p>
        </div>
      </div>
    </footer>
  );
}
