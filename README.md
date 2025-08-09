<!--
  studyhub – a gamified study platform

  This README provides an overview of the project structure, the technology
  stack and instructions for running the application locally.  The goal of
  studyhub is to offer an open‑source, web‑based learning environment
  supporting Physics, Mathematics, Chemistry and Portuguese.  Each subject
  offers a digital textbook, flashcards, quizzes, rich analytics and a
  configuration panel.  The project is organised as a full‑stack
  application with a React/TypeScript frontend and a Node/Express backend.
-->

# studyhub

studyhub é uma plataforma de estudos gamificada que roda diretamente no
navegador.  Seu objetivo é ajudar estudantes a aprender de forma
significativa através de livros digitais, flashcards inteligentes e
quizzes desafiadores.  O código deste repositório está dividido entre
frontend (`/frontend`) e backend (`/backend`), ambos escritos em
TypeScript/JavaScript e suportados por um fluxo de CI/CD que faz o
deploy automático do cliente no GitHub Pages e do servidor em um
provedor cloud gratuito (p.ex. Render ou Heroku).

## Visão Geral

O aplicativo foi concebido para suportar quatro disciplinas: **Física**,
**Matemática**, **Química** e **Português**.  Para cada disciplina há
cinco abas principais:

1. **Textbook** – capítulo interativo com sumário lateral, busca em
   texto completo via FlexSearch, renderização de LaTeX (via
   MathJax, incluindo pacotes `mhchem` e bibliotecas para circuitos) e
   editor embutido.  Exibe texto, imagens e animações leves.
2. **Flashcards** – implementa algoritmos de repetição espaçada (FSRS
   e SM‑2 opcional) com diferentes tipos de cartão (V/F, resposta
   digitada, autoavaliação, cloze deletion, imagem→resposta).  As
   revisões contam com feedback visual/sonoro e tags por assunto.
3. **Quizzes** – questões de Verdadeiro/Falso e múltipla escolha com
   cronômetro, embaralhamento de alternativas e banco de perguntas
   separado dos flashcards.
4. **Estatísticas** – mostra gráficos interativos sobre tempo de
   estudo, acurácia, dificuldade e progresso, além de elementos de
   gamificação como pontos, streaks, níveis e badges.  Permite
   exportar/importar dados em JSON.
5. **Configurações** – controles para tema (claro/escuro), limite de
   cartões/dia, escolha de algoritmo (FSRS/SM‑2), gerenciamento de
   perfil (login local preparado para OAuth), sons e idioma
   (PT‑BR/EN).  Inclui recursos de acessibilidade (atalhos de
   teclado, fontes escaláveis).

## Tecnologia

- **Frontend**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) com
  [Vite](https://vitejs.dev/) para bundling.  Interface construída
  utilizando [Tailwind CSS](https://tailwindcss.com/),
  [shadcn/ui](https://ui.shadcn.com/) e ícones de
  [lucide-react](https://lucide.dev/).  O cliente é configurado como
  PWA usando `vite-plugin-pwa` para permitir uso offline parcial e
  sincronização com o backend quando online.
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) com
  API REST.  Banco de dados SQLite armazenado em disco e migrável via
  [better‑sqlite3](https://github.com/WiseLibs/better-sqlite3).  O
  servidor implementa cadastro/autenticação básica e endpoints para
  sincronizar dados do usuário.
- **Internacionalização**: [react‑i18next](https://react.i18next.com/) para
  PT‑BR/EN.
- **LaTeX**: [MathJax](https://www.mathjax.org/) com pacotes `mhchem` e
  bibliotecas de circuitos para renderizar fórmulas e diagramas.

## Estrutura de Pastas

```
studyhub/
│
├─ frontend/               # Aplicação React/Vite
│  ├─ src/
│  │  ├─ components/       # Componentes reutilizáveis
│  │  ├─ pages/            # Páginas de cada matéria e seção
│  │  ├─ hooks/            # Hooks personalizados
│  │  ├─ lib/              # Funções utilitárias (algoritmos de repetição)
│  │  ├─ locales/          # Traduções PT‑BR/EN
│  │  └─ styles/           # Estilos e configurações Tailwind
│  ├─ public/              # Assets estáticos e manifesto PWA
│  ├─ vite.config.ts
│  ├─ postcss.config.cjs
│  └─ tailwind.config.cjs
│
├─ backend/                # API Node/Express
│  ├─ src/
│  │  ├─ routes/           # Rotas da API
│  │  ├─ controllers/      # Controladores de requisições
│  │  ├─ models/           # Modelo de dados e acesso ao SQLite
│  │  └─ seed/             # Scripts de inserção de dados iniciais
│  ├─ migrations/          # Migrações de banco de dados
│  ├─ server.js            # Ponto de entrada
│  └─ package.json
│
├─ .github/
│  ├─ workflows/
│  │  ├─ ci.yml            # Lint, build e testes
│  │  ├─ deploy-pages.yml  # Deploy do frontend no GitHub Pages
│  │  └─ deploy-backend.yml# Deploy do backend em Render/Heroku
│  ├─ ISSUE_TEMPLATE/
│  │  ├─ bug_report.yml    # Template para relatórios de bug
│  │  └─ feature_request.yml
│  └─ pull_request_template.md
│
├─ .gitignore
├─ LICENSE
└─ README.md
```

## Como rodar localmente

1. Clone o repositório e acesse a pasta:

   ```bash
   git clone https://github.com/seu_usuario/studyhub.git
   cd studyhub
   ```

2. Instale dependências em cada parte:

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Rode o banco de dados de desenvolvimento (SQLite) e aplique seeds:

   ```bash
   cd backend
   npm run migrate        # aplica migrações
   npm run seed           # insere conteúdos iniciais
   npm run dev            # inicia a API em http://localhost:3000
   ```

4. Em outra aba de terminal, inicie o frontend:

   ```bash
   cd frontend
   npm run dev            # inicia Vite em http://localhost:5173
   ```

5. Abra <http://localhost:5173> no navegador.  Use as credenciais de
   teste definidas no seed (usuário `demo`, senha `demo`) para
   autenticar e explorar as funcionalidades.

## CI/CD e Deploy

O repositório inclui três workflows de GitHub Actions:

1. **ci.yml** – executa linting (`eslint`), checagem de tipos, build do
   frontend e do backend e testes automatizados em pull requests.
2. **deploy‑pages.yml** – publica o diretório `frontend/dist` no GitHub
   Pages a cada push na branch `main`.  Requer configuração prévia do
   GitHub Pages no projeto.
3. **deploy‑backend.yml** – realiza deploy do backend em Render ou
   Heroku via GitHub Actions.  As credenciais do serviço devem ser
   configuradas em secrets do repositório (`RENDER_API_KEY` ou
   `HEROKU_API_KEY`).

## Contribuição

Sugestões e contribuições são bem‑vindas!  Para reportar um bug ou
sugerir novas funcionalidades use os templates em `.github/ISSUE_TEMPLATE/`.  Siga
a convenção de branches (`feature/…`, `bugfix/…`) e faça pull requests
para a branch `main`.  O template de pull request em `.github/pull_request_template.md`
inclui um checklist de boas práticas.