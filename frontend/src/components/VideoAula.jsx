import { useState } from "react";
import { Play, Youtube } from "lucide-react";
import { Reveal, waLink } from "./Shared";

const VIDEO_ID = "iMvQeEaGJN4";
const VIDEO_TITLE = "Você sabe a diferença real entre posse e porte de arma?";
const CHANNEL_URL = "https://youtube.com/@crcarmo";

export default function VideoAula() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="video" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.3em] text-blood-bright">
              <Youtube className="h-5 w-5" />
              YouTube · @crcarmo
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Não caia nos erros de{" "}
              <span className="text-blood-bright">posse e porte</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400">
              Direto do meu canal: a aula que todo futuro CAC precisa ver antes de gastar
              tempo e dinheiro no caminho errado.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="video-link-youtube"
                className="clip-corner-sm inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-zinc-200 transition-colors hover:border-blood-bright hover:text-white"
              >
                <Youtube className="h-4 w-4 text-blood-bright" />
                Ver mais vídeos
              </a>
              <a
                href={waLink("Olá Carmo, vim pelo site e vi seu vídeo sobre posse e porte. Quero tirar minhas dúvidas.")}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="video-link-whatsapp"
                className="clip-corner-sm inline-flex items-center justify-center bg-blood px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-blood-bright"
              >
                Tirar minhas dúvidas
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <div className="clip-corner relative border border-line bg-card" data-testid="video-frame">
              <span className="absolute left-3 top-3 z-20 h-5 w-5 border-l-2 border-t-2 border-blood-bright" />
              <span className="absolute bottom-3 right-3 z-20 h-5 w-5 border-b-2 border-r-2 border-blood-bright" />
              {playing ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1`}
                  title={VIDEO_TITLE}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              ) : (
                <button
                  onClick={() => setPlaying(true)}
                  data-testid="video-play-button"
                  aria-label={`Assistir: ${VIDEO_TITLE}`}
                  className="group relative block w-full"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                    alt={VIDEO_TITLE}
                    onError={(e) => {
                      e.currentTarget.src = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
                    }}
                    className="aspect-video w-full object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-blood shadow-lg shadow-blood/50 transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-1 h-8 w-8 fill-current text-white" />
                    </span>
                  </span>
                  <span className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-left">
                    <span className="h-px w-6 shrink-0 bg-blood-bright" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white sm:text-[11px]">
                      Assistir · Posse x Porte
                    </span>
                  </span>
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
