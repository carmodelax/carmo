# PRD — IAT Carmo · Site de Instrutor de Tiro

## Problema original (mensagem do usuário)
"Sou instrutor de tiro dou aula de tiro. Formo outros instrutores, dou curso de proteção à residência e etc. Meu nome é Carmo."
Links: YouTube @crcarmo · Instagram @cr_carmo · WhatsApp wa.me/+5531991525097

## Respostas do usuário (briefing)
- Objetivo: "Que pessoas olhem o meu trabalho e venha fazer cursos e aulas comigo e tirar o CAC"
- Serviços a destacar: "CAC, posse, porte e curso de instrutores"
- Estilo visual: "Vermelho com preto, cenário de guerra com vários gatilhos"
- Fotos: "As minhas" (usada a logo real do canal dele; demais fotos são de estande genéricas até ele enviar as próprias)
- Preços: "Consultar pelo WhatsApp"

## Arquitetura
- Frontend: React 19 (CRA/craco) + Tailwind + framer-motion + lenis (smooth scroll) — one-page landing em pt-BR
- Componentes: HudHeader, Hero (reveal mascarado linha a linha + parallax), TickerMarquee (marquee lento 55s), Sobre (logo real do canal YouTube), Servicos (6 cards: CAC, Posse, Porte, Formação de Instrutores, Proteção Residencial, Aulas), CacTimeline (5 etapas), Simulador (widget interativo de objetivo → trilha → WhatsApp), Galeria (grid assimétrico), FaqCac (accordion shadcn), CtaFinal, Footer, WhatsAppFab, ErrorBoundary
- Logo: SVG original (hexágono tático + retículo) usado como favicon /logo.svg
- Backend: FastAPI template mantido (health + status checks) — a landing é estática, todos os CTAs apontam para WhatsApp com mensagem pré-preenchida
- Design system: ink #0A0A0B, blood #DC2626/#FF2E2E, amber #F59E0B, Barlow Condensed (display), DM Sans (body), JetBrains Mono (HUD), cantos chanfrados (clip-path), ruído de aço, hud-grid, mira animada

## Personas
- Iniciante que quer tirar o CAC e não sabe por onde começar
- Atirador que quer posse/porte e orientação jurídica
- Profissional que quer virar instrutor de tiro
- Família que quer treinamento de proteção residencial

## Implementado (2026-09-28)
- Landing one-page completa em português, vermelho/preto tático
- Hero cinético com reveal mascarado, parallax, retículo giratório, badge HUD
- Marquee editorial lento, Sobre com identidade real (logo do canal + links YouTube/Instagram/WhatsApp)
- 6 cards de curso com CTA WhatsApp individual, timeline CAC 5 etapas, simulador interativo de perfil
- Galeria, FAQ sobre CAC/posse/aulas/preços, CTA final vermelho, footer, botão flutuante WhatsApp
- Seção "Google Avaliações" no final do site (2026-09-28): botão "Avaliar no Google" com o link real de avaliação da ficha dele (g.page/r/CXERq_fFMkp_EBM) e link para a ficha no Maps (place_id ChIJqR9QFOqDJmgRcRGr98UySn8 — nome real: "Instrutor de Armamento e Tiro - Carmo | Assessoria CAC"). Sem avaliações públicas para exibir ainda; quando ele tiver ou fornecer chave da API do Google Places, trocar por avaliações ao vivo
- Seção de vídeo real do YouTube (2026-09-28): aula "Posse x Porte" (iMvQeEaGJN4) embedada com thumbnail + play preguiçoso
- Seção Depoimentos (2026-09-28): array TESTIMONIALS vazio → mostra estado vazio convidando a avaliar no Google; publicar comentários reais quando o Carmo enviar (nada inventado)
- Integração ChatGPT (2026-09-28): POST /api/chat (SSE streaming, modelo gpt-5.4 via EMERGENT_LLM_KEY, histórico em MongoDB chat_messages) + widget de chat flutuante no site (canto inferior esquerdo)
- Integração Google Sign-In (2026-09-28): auth gerenciada pela Emergent (auth.emergentagent.com), endpoints /api/auth/session, /api/auth/me, /api/auth/logout, cookie httpOnly 7 dias, botão Entrar/Sair no cabeçalho desktop e mobile. Login real com conta Google só foi testado via seed de sessão (Google exige conta humana)
- data-testid em todos os elementos interativos

## Verificado
- Backend: GET /api/ 200, POST /api/status 200
- Frontend: desktop 1440 + mobile 390 sem overflow-x, sem erros de console, todas as seções renderizando

## Backlog
- P1: Trocar fotos de estande por fotos reais do Carmo (ele enviar)
- P1: Depoimentos de alunos/instrutores formados
- P2: Agendamento de aulas online, vídeo do YouTube no hero, SEO local (Google Meu Negócio)
