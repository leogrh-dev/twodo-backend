# Twodo - Backend

> API moderna e escalável para gerenciamento de notas, construída com NestJS e Clean Architecture.

## 📖 Sobre o Projeto

O **Twodo Backend** é a API responsável por autenticação, manipulação de notas, gerenciamento de arquivos e serviços de infraestrutura como Redis, envio de e-mails e integração com AWS. Todo o sistema foi projetado com **Clean Architecture** para garantir **baixa acoplamento**, **alta coesão** e **facilidade de testes**.

### 🎯 Objetivo
Fornecer uma base de backend robusta, modular e desacoplada para atender às funcionalidades do Twodo de forma segura e escalável.

---

## 🏗️ Arquitetura

Este backend segue **rigorosamente** os princípios da **Clean Architecture** de Uncle Bob, com separação clara de responsabilidades entre as camadas da aplicação.

```
🏛️ Clean Architecture Layers
├── 🟢 Entities (Regras de Negócio Corporativas)
├── 🔵 Use Cases (Regras de Negócio da Aplicação)
├── 🟡 Interface Adapters (DTOs, Mappers, Resolvers, Repositórios)
└── 🔴 Frameworks & Drivers (Banco, Redis, GraphQL, S3, Email)
```

### Princípios Aplicados
- **Regra da Dependência**: As dependências sempre apontam para dentro
- **Independência de Frameworks**: O domínio não conhece NestJS, GraphQL ou MongoDB
- **Inversão de Dependência**: Interfaces no centro, implementações nas bordas
- **Testabilidade Extrema**: Use Cases puros, desacoplados de tecnologias externas

---

## 🛠️ Stack Tecnológica

### Backend
- **NestJS** — Estrutura principal do backend
- **TypeScript** — Strict mode habilitado
- **GraphQL** — API flexível baseada em esquemas
- **MongoDB (Mongoose)** — Banco de dados NoSQL
- **Redis** — Cache e controle de estado
- **AWS S3** — Armazenamento de arquivos
- **Nodemailer** — Serviço SMTP para envio de e-mails

---

## 📁 Estrutura do Projeto

```
src/
├─ application/             # Interfaces dos contratos do domínio
├─ core/                    # Entities e Use Cases (domínio puro)
├─ infrastructure/          # Implementações de interface adapters
├─ shared/                  # Decorators, exceptions e guards
├─ app.module.ts            # Módulo principal do NestJS
├─ main.ts                  # Entry point da aplicação
└─ schema.gql               # Esquema gerado do GraphQL
```

### Organização por Domínio

Cada subpasta segue **feature-based architecture** respeitando o isolamento de contexto e limites da aplicação:

- `auth/`, `note/`, `file/` no domínio (`core/use-cases`)
- Implementações em `infrastructure/` respeitam as interfaces de `application/interfaces`

---

## 🔐 Exemplo de `.env`

```env
# Configuração da aplicação
PORT=3000

# MongoDB
MONGO_URI=mongodb://localhost:27017/twodo

# Autenticação
JWT_SECRET=sua-chave-ultra-secreta
GOOGLE_CLIENT_ID=sua-client-id.apps.googleusercontent.com

# SMTP
SMTP_EMAIL=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-de-aplicativo

# Redis
REDIS_URL=redis://localhost:6379

# AWS S3
AWS_ACCESS_KEY_ID=SEU_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=SUA_SECRET_KEY
AWS_REGION=us-east-1
AWS_S3_BUCKET=twodo-files
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- MongoDB e Redis rodando localmente ou via Docker
- Arquivo `.env` com as variáveis acima

### Passos

# Instale as dependências
npm install

# Inicie o backend
npm run start:dev

## 📈 Status do Desenvolvimento

🔄 **Em Desenvolvimento Ativo**

### Próximas Funcionalidades:
- [ ] Upload e preview de arquivos
- [ ] Busca full-text nas notas
- [ ] Compartilhamento de notas entre usuários
- [ ] Auditoria de alterações

---

## 🤝 Contribuindo

1. Faça um fork do repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'feat: nova funcionalidade'`)
4. Push na sua branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### 📋 Diretrizes de Contribuição:
- Seguir **rigorosamente a Clean Architecture**
- Nenhuma regra de negócio fora dos **Use Cases**
- Escrever testes para todas as regras de negócio
- Toda dependência externa deve ser injetada
- Não acoplar o domínio ao NestJS, Mongoose, GraphQL, etc.

## 👥 Autor

Desenvolvido por Leonardo Gabriel Reis Henrique

---

**Twodo Backend** — onde organização encontra arquitetura de verdade.