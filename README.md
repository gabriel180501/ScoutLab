# ScoutLab

Plataforma full stack de análise de desempenho no futebol. Esta primeira entrega conecta uma interface React a uma API NestJS, que consulta jogadores armazenados no PostgreSQL.

## Tecnologias

- React, TypeScript e Vite
- NestJS e TypeScript
- PostgreSQL 17
- Docker Compose

## Executar localmente

Requisitos: Node.js 22+, npm e Docker com Docker Compose.

```bash
cp .env.example .env
npm install
docker compose up -d
npm run dev:backend
```

Em outro terminal:

```bash
npm run dev:frontend
```

Acesse `http://localhost:5173`. A API fica em `http://localhost:3000/api`, com os endpoints `GET /api/health` e `GET /api/players`.

## Fluxo da primeira funcionalidade

1. O navegador solicita `GET /api/players`.
2. O Vite encaminha a chamada à API NestJS durante o desenvolvimento.
3. O backend consulta a tabela `players` no PostgreSQL.
4. A resposta JSON alimenta os cards e a tabela da página inicial.
