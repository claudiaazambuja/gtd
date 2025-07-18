├── docker/

├── docker-compose.yml

├── Dockerfile

├── .env

├── .env.example

├── .gitignore

├── package.json

├── tsconfig.json

├── jest.config.ts

├── README.md

├── prisma/                      # Caso use Prisma ORM (opcional)

│   └── schema.prisma

├── src/

│   ├── app.module.ts

│   ├── main.ts

│   ├── config/                  # Configurações da aplicação

│   │   ├── app.config.ts

│   │   ├── database.config.ts

│   │   └── rabbitmq.config.ts

│   ├── auth/                    # Autenticação (Passport, JWT etc.)

│   │   ├── auth.module.ts

│   │   ├── auth.service.ts

│   │   ├── auth.controller.ts

│   │   ├── jwt.strategy.ts

│   │   └── guards/

│   ├── i18n/                    # Arquivos de internacionalização

│   │   └── pt/

│   │       └── common.json

│   ├── common/                  # Filtros, interceptors, pipes etc.

│   │   ├── filters/

│   │   ├── interceptors/

│   │   └── pipes/

│   ├── modules/                 # Domínios da aplicação

│   │   ├── notes/

│   │   │   ├── notes.controller.ts

│   │   │   ├── notes.service.ts

│   │   │   ├── notes.module.ts

│   │   │   └── dto/

│   │   ├── projects/

│   │   └── tasks/

│   ├── cache/                   # Configuração do Cache Manager

│   │   └── cache.module.ts

│   └── messaging/               # RabbitMQ publishers/subscribers

│       ├── consumers/

│       ├── publishers/

│       └── messaging.module.ts

├── test/                        # Testes com Jest

│   └── notes.e2e-spec.ts
