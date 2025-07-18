# 📝 GTD Task Manager - Projeto com NestJS, Docker, PostgreSQL e RabbitMQ

Este projeto é um gerenciador de tarefas baseado na metodologia **GTD (Getting Things Done)**. Ele foi desenvolvido com foco em escalabilidade, internacionalização e comunicação assíncrona entre serviços.

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- TypeScript
- PostgreSQL + Prisma ORM
- Docker & Docker Compose
- RabbitMQ
- i18n com `nestjs-i18n`
- Cache Manager
- JWT + Passport
- Jest (Testes)
- Faker.js (para popular o banco com dados fake)

---
<details>
  <summary>  📁 Estrutura do Projeto</summary>

  
  ├── docker/ # Arquivos e configurações de container
  
  ├── docker-compose.yml # Orquestração dos serviços
  
  ├── Dockerfile # Build da aplicação NestJS
  
  ├── .env # Variáveis de ambiente
  
  ├── .env.example # Exemplo do .env
  
  ├── .gitignore # Ignora arquivos não versionados
  
  ├── package.json # Dependências e scripts
  
  ├── tsconfig.json # Configuração do TypeScript
  
  ├── jest.config.ts # Configuração dos testes
  
  ├── README.md # Este arquivo :)
  
  ├── gtd.sql # Script SQL para criação do banco
  
  ├── prisma/
  
  │ └── schema.prisma # Definição do schema com Prisma
  
  ├── src/
  
  │ ├── app.module.ts # Módulo raiz
  
  │ ├── main.ts # Arquivo principal
  
  │ ├── config/ # Configurações
  
  │ │ ├── app.config.ts
  
  │ │ ├── database.config.ts
  
  │ │ └── rabbitmq.config.ts
  
  │ ├── auth/ # Autenticação
  
  │ │ ├── auth.module.ts
  
  │ │ ├── auth.service.ts
  
  │ │ ├── auth.controller.ts
  
  │ │ ├── jwt.strategy.ts
  
  │ │ └── guards/
  
  │ ├── i18n/ # Internacionalização
  
  │ │ └── pt/
  
  │ │ └── common.json
  
  │ ├── common/ # Utilitários da aplicação
  
  │ │ ├── filters/
  
  │ │ ├── interceptors/
  
  │ │ └── pipes/
  
  │ ├── modules/ # Módulos de domínio
  
  │ │ ├── notes/
  
  │ │ │ ├── notes.controller.ts
  
  │ │ │ ├── notes.service.ts
  
  │ │ │ ├── notes.module.ts
  
  │ │ │ └── dto/
  
  │ │ ├── projects/
  
  │ │ └── tasks/
  
  │ ├── cache/ # Configuração de cache
  
  │ │ └── cache.module.ts
  
  │ └── messaging/ # RabbitMQ
  
  │ ├── consumers/
  
  │ ├── publishers/
  
  │ └── messaging.module.ts
  
  ├── test/
  
  │ └── notes.e2e-spec.ts

</details>


## ⚙️ Como Rodar

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)

2. Configure o ambiente
Copie o .env.example para .env:

```bash
cp .env.example .env
```

3. Suba a aplicação com Docker
```bash
docker-compose up --build
```
Isso irá:

Subir o PostgreSQL e aplicar o gtd.sql

Iniciar o RabbitMQ

Rodar a aplicação NestJS

Popular o banco com dados falsos usando Faker.js

🧪 Testes
Execute os testes com:

```bash
npm run test
```

🌐 Internacionalização
O projeto já está preparado para múltiplos idiomas. Os arquivos de tradução estão na pasta:

```bash
src/i18n/
```

🐇 RabbitMQ
A aplicação publica e consome mensagens assíncronas via RabbitMQ. A configuração está no módulo:

```bash
src/messaging/
```

🧠 Metodologia GTD
GTD (Getting Things Done) é uma metodologia de produtividade baseada em capturar e organizar todas as suas tarefas em listas claras e acionáveis. Este projeto implementa isso com:

Projetos

Tarefas

Notas

📂 Script SQL
Ao subir o PostgreSQL, o Docker irá automaticamente aplicar o script gtd.sql. Esse script define as tabelas e pode ser modificado conforme o schema do Prisma.

🔐 Autenticação
A autenticação é feita via JWT + Passport. O módulo auth cuida da segurança das rotas.

💬 Feedback e Contribuições
Sinta-se à vontade para abrir issues ou pull requests!
