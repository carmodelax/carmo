import { MessageCircle } from "lucide-react";
import { waLink, DEFAULT_MSG } from "./Shared";

export default function WhatsAppFab() {
  return (
    <a
      href={waLink(DEFAULT_MSG)}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-fab"
      aria-label="Conversar com o Carmo no WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3"
    >
      <span className="clip-corner-sm hidden bg-blood px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-white opacity-0 transition-all duration-300 group-hover:opacity-100 md:block">
        Falar com o Carmo
      </span>
      <span className="clip-corner-sm relative flex h-14 w-14 items-center justify-center bg-blood text-white shadow-lg shadow-blood/40 transition-colors group-hover:bg-blood-bright">
        <span className="laser-dot absolute inset-0" />
        <MessageCircle className="relative h-6 w-6" />
      </span>
    </a>
  );
}
