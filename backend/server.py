from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone
import os
import json
import logging
import httpx
import uuid
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime, timedelta, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')
AI_MODEL = "gpt-5.4"
AI_SYSTEM_MESSAGE = (
    "Você é o CARMO de verdade — instrutor de tiro de Belo Horizonte/MG (IAT Carmo, ficha no Google: "
    "'Instrutor de Armamento e Tiro - Carmo | Assessoria CAC') — respondendo no SEU site, sempre em PRIMEIRA PESSOA, como se fosse ele digitando. "
    "SUA VOZ: mineiro raiz, direto, descontraído e confiante. Frases curtas e energéticas, jeito de instrutor veterano que não tem paciência com enrolação. "
    "Zero papo de robô, zero formalidade bancária. Feche ideias no estilo dele: 'Apenas treine.', 'Sem enrolação.', 'Vem que aí a gente resolve.', 'O resto é conversa.'. "
    "O QUE VOCÊ FAZ (e pode falar à vontade): aula de tiro do primeiro tiro ao avançado; formação de NOVOS INSTRUTORES de tiro; "
    "curso de proteção residencial pra família; orientação no processo de CAC (Colecionador, Atirador e Caçador), posse e porte de arma. "
    "SEUS CANAIS: WhatsApp (31) 99152-5097, Instagram @cr_carmo, YouTube @crcarmo. "
    "REGRAS: responda em português brasileiro, no máximo 4 frases curtas; nunca use emojis; sempre caminhos 100% legais e responsáveis — segurança em primeiro lugar; "
    "NUNCA invente preço, prazo, data, lei citada em detalhe ou certificação: se perguntarem valor, responda no seu estilo que valor é caso a caso e chama no WhatsApp; "
    "se for dúvida jurídica complexa ou caso específico, diga que você analisa o caso no WhatsApp; "
    "sempre termine convidando a agir (chamar no WhatsApp, marcar aula, avaliar a ficha no Google). "
)


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class UserOut(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)

    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])

    return status_checks


# ---------- IA (ChatGPT via Emergent LLM Key) ----------

async def load_history(session_id: str, limit: int = 8):
    cursor = db.chat_messages.find({"session_id": session_id}, {"_id": 0}).sort("created_at", -1).limit(limit)
    msgs = await cursor.to_list(limit)
    return list(reversed(msgs))

@api_router.post("/chat")
async def chat(request: ChatRequest):
    text = (request.message or "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="Mensagem vazia")
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="IA não configurada")

    session_id = (request.session_id or f"web_{uuid.uuid4().hex}").strip()[:64]

    await db.chat_messages.insert_one({
        "session_id": session_id,
        "role": "user",
        "text": text[:2000],
        "created_at": datetime.now(timezone.utc),
    })

    history = await load_history(session_id)
    context = "\n".join(
        f"{'Aluno' if m['role'] == 'user' else 'Assistente'}: {m['text'][:500]}"
        for m in history[-6:]
    )
    prompt = f"Conversa anterior:\n{context}\n\nAluno: {text}" if context else text

    chat_llm = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message=AI_SYSTEM_MESSAGE,
    ).with_model("openai", AI_MODEL)

    async def event_generator():
        full = []
        try:
            async for ev in chat_llm.stream_message(UserMessage(text=prompt)):
                if isinstance(ev, TextDelta):
                    full.append(ev.content)
                    yield f"data: {json.dumps({'delta': ev.content}, ensure_ascii=False)}\n\n"
                elif isinstance(ev, StreamDone):
                    break
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)}, ensure_ascii=False)}\n\n"
        finally:
            if full:
                await db.chat_messages.insert_one({
                    "session_id": session_id,
                    "role": "assistant",
                    "text": "".join(full)[:4000],
                    "created_at": datetime.now(timezone.utc),
                })
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ---------- Auth (Google via Emergent Auth) ----------

EMERGENT_SESSION_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("session_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Não autenticado")

    doc = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=401, detail="Sessão inválida")

    expires_at = doc["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Sessão expirada")

    user = await db.users.find_one({"user_id": doc["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")
    return user

@api_router.post("/auth/session", response_model=UserOut)
async def auth_session(request: Request, response: Response):
    session_id = request.headers.get("X-Session-ID", "").strip()
    if not session_id:
        raise HTTPException(status_code=400, detail="session_id ausente")

    async with httpx.AsyncClient(timeout=15) as http:
        r = await http.get(EMERGENT_SESSION_URL, headers={"X-Session-ID": session_id})
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Falha ao validar sessão Google")
    data = r.json()

    email = data.get("email")
    if not email:
        raise HTTPException(status_code=401, detail="Dados Google incompletos")

    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one(
            {"email": email},
            {"$set": {"name": data.get("name", existing.get("name", "")), "picture": data.get("picture")}},
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": email,
            "name": data.get("name", ""),
            "picture": data.get("picture"),
            "created_at": datetime.now(timezone.utc),
        })

    token = data.get("session_token")
    if not token:
        raise HTTPException(status_code=401, detail="Sessão sem token")
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": token,
        "expires_at": datetime.now(timezone.utc) + timedelta(days=7),
        "created_at": datetime.now(timezone.utc),
    })

    response.set_cookie(
        key="session_token",
        value=token,
        max_age=7 * 24 * 3600,
        path="/",
        secure=True,
        samesite="none",
        httponly=True,
    )
    return {"user_id": user_id, "email": email, "name": data.get("name", ""), "picture": data.get("picture")}

@api_router.get("/auth/me", response_model=UserOut)
async def auth_me(request: Request):
    return await get_current_user(request)

@api_router.post("/auth/logout")
async def auth_logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie(key="session_token", path="/")
    return {"ok": True}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
