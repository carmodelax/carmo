# Auth Testing Playbook (Google via Emergent Auth) — site do Carmo

## Fluxo
1. Frontend botão "Entrar" → `https://auth.emergentagent.com/?redirect=<origin>/`
2. Volta para `<origin>/#session_id=...` → AuthCallback troca por sessão no backend: POST /api/auth/session (header X-Session-ID)
3. Backend consulta https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data, salva user + user_sessions (7 dias), seta cookie httpOnly session_token
4. GET /api/auth/me valida cookie (ou Bearer) e retorna user
5. POST /api/auth/logout apaga sessão e limpa cookie

## Seed de sessão de teste
mongosh --eval "
use('test_database');
var userId = 'test-user-' + Date.now();
var sessionToken = 'test_session_' + Date.now();
db.users.insertOne({ user_id: userId, email: 'test.user.' + Date.now() + '@example.com', name: 'Test User', picture: '', created_at: new Date() });
db.user_sessions.insertOne({ user_id: userId, session_token: sessionToken, expires_at: new Date(Date.now() + 7*24*60*60*1000), created_at: new Date() });
print('Session token: ' + sessionToken);
"

## Verificações
curl -X GET "$API/api/auth/me" -H "Authorization: Bearer <token>"   # 200 + user
curl -X POST "$API/api/chat" -H "Content-Type: application/json" -d '{"message":"oi"}'  # SSE data: {...delta...}

## Checklist
- [x] user_id custom (UUID), queries com {"_id": 0}
- [x] AuthCallback usa useLocation().hash (não window.location.hash)
- [x] AuthProvider pula /auth/me quando hash contém session_id=
- [x] Cookie httpOnly secure samesite=none path=/
- [ ] Login real no navegador (exige conta Google humana — validar manualmente)
