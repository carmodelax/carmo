import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, X } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const GREETING =
  "Oi! Sou o assistente do site do Carmo. Tire dúvidas comigo sobre CAC, posse, porte, aulas de tiro e cursos. O que você precisa?";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);

  const sessionId = useRef(
    localStorage.getItem("carmo_chat_session") ||
      `web_${Math.random().toString(36).slice(2)}${Date.now()}`
  );

  useEffect(() => {
    localStorage.setItem("carmo_chat_session", sessionId.current);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, busy, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", text }, { role: "assistant", text: "" }]);

    try {
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, session_id: sessionId.current }),
      });
      if (!res.ok || !res.body) throw new Error("falha");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() || "";
        for (const chunk of chunks) {
          const data = chunk.replace(/^data: /, "").trim();
          if (!data || data === "[DONE]") continue;
          try {
            const payload = JSON.parse(data);
            if (payload.delta) {
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = {
                  role: "assistant",
                  text: copy[copy.length - 1].text + payload.delta,
                };
                return copy;
              });
            }
            if (payload.error) throw new Error(payload.error);
          } catch (e) {}
        }
      }
    } catch (e) {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          text: "Deu ruim aqui do meu lado. Chama direto no WhatsApp do Carmo: (31) 99152-5097.",
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        data-testid="chat-toggle"
        aria-label="Abrir assistente IA"
        className="fixed bottom-5 left-5 z-50 group flex h-14 w-14 items-center justify-center"
      >
        <span className="clip-corner-sm relative flex h-14 w-14 items-center justify-center border border-blood bg-card text-white shadow-lg shadow-black/50 transition-colors group-hover:bg-blood">
          <Sparkles className="h-6 w-6 text-blood-bright transition-colors group-hover:text-white" />
          <span className="laser-dot absolute right-2 top-2 h-2 w-2 rounded-full bg-blood-bright" />
        </span>
      </button>

      {open && (
        <div
          data-testid="chat-panel"
          className="fixed bottom-24 left-5 z-50 flex h-[480px] w-[min(92vw,380px)] flex-col border border-line bg-surface shadow-2xl shadow-black/60"
        >
          <div className="flex items-center justify-between border-b border-line bg-ink px-4 py-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-blood-bright" />
              <div className="leading-tight">
                <p className="font-display text-base font-extrabold uppercase text-white">
                  Assistente do Carmo
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                  IA · responde na hora
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              data-testid="chat-close"
              aria-label="Fechar assistente"
              className="flex h-8 w-8 items-center justify-center border border-line text-zinc-400 transition-colors hover:border-blood hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" data-testid="chat-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                data-testid={`chat-message-${m.role}`}
                className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-blood text-white"
                    : "mr-auto border border-line bg-card text-zinc-200"
                }`}
              >
                {m.text || (busy && i === messages.length - 1 ? "Mirando a resposta…" : "")}
              </div>
            ))}
          </div>

          <div className="border-t border-line bg-ink p-3">
            <p className="mb-2 text-center font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-600">
              IA pode errar · confirme no WhatsApp (31) 99152-5097
            </p>
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ex.: como tirar o CAC?"
                data-testid="chat-input"
                className="min-w-0 flex-1 border border-line bg-card px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-blood focus:outline-none"
              />
              <button
                onClick={send}
                disabled={busy}
                data-testid="chat-send"
                aria-label="Enviar mensagem"
                className="clip-corner-sm flex h-10 w-10 shrink-0 items-center justify-center bg-blood text-white transition-colors hover:bg-blood-bright disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
