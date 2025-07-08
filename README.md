# Plataforma de Doações

Uma plataforma moderna para gerenciamento de doações construída com Next.js, TypeScript, Prisma e Material-UI.

## 🚀 Funcionalidades

- ✅ Sistema de autenticação com NextAuth.js
- ✅ Formulário de doações com validação
- ✅ Dashboard com estatísticas em tempo real
- ✅ Gráficos interativos com Recharts
- ✅ Interface responsiva com Material-UI
- ✅ Banco de dados SQLite com Prisma
- ✅ API RESTful com validação Zod
- ✅ Integração com Axios para consumo da API
- ✅ Paginação de resultados
- ✅ Tratamento de erros robusto

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Material-UI (MUI), Recharts
- **Backend**: Next.js API Routes
- **HTTP Client**: Axios para integração com APIs internas e externas
- **Database**: SQLite com Prisma ORM
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Styling**: customizações com MUI 

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/devAry96/plataforma-de-doacoes.git](https://github.com/devAry96/plataforma-de-doacoes.git)
   cd plataforma-de-doacoes-main
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # Database
   DATABASE_URL="file:./dev.db"

   # Stripe Configuration (opcional)
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

   # Environment
   NODE_ENV=development
   ```

4. **Configure o banco de dados**
   ```bash
   # Gere o cliente Prisma
   npm run db:generate
   
   # Execute as migrações
   npm run db:push
   ```

5. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

6. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
webdev/
├── src/
│   ├── app/
│   │   ├── api/                # API Routes: Rotas de API do Next.js (ex: autenticação)
│   │   │   └── auth/
│   │   │       └── [...nextauth].ts
│   │   ├── auth/
│   │   │   ├── signin/         # Página de login
│   │   │   │   └── page.tsx
│   │   │   └── signout/        # Página de logout
│   │   │       └── page.tsx
│   │   ├── profile/            # Página de perfil do usuário
│   │   │   └── page.tsx
│   │   ├── dashboard/          # Página principal do usuário logado
│   │   │   └── page.tsx
│   │   └── layout.tsx          # Layout global da aplicação
│   ├── domain/
│   │   └── entities/           # Entidades de domínio (ex: User, Donation)
│   │       ├── User.ts
│   │       └── Donation.ts
│   ├── application/
│   │   └── useCases/           # Casos de uso (lógica de negócio)
│   │       ├── CreateDonationUseCase.ts
│   │       └── GetDonationsUseCase.ts
│   ├── infra/
│   │   ├── axios/
│   │   │   └── api.ts          # Configuração do Axios para chamadas HTTP
│   │   ├── prisma/
│   │   │   └── prisma.ts       # Instância do Prisma Client
│   │   └── repositories/       # Repositórios e acesso a dados
│   │       ├── PrismaDonationRepository.ts
│   │       └── PrismaUserRepository.ts
│   ├── presentation/
│   │   └── controllers/        # Controllers: lógica de entrada/saída das rotas
│   │       └── DonationController.ts
│   ├── shared/
│   │   ├── components/         # Componentes compartilhados (Navbar, Footer, etc)
│   │   │   ├── ChartStats.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── PlanGuard.tsx
│   │   │   └── ToastProvider.tsx
│   │   └── utils/              # Utilitários compartilhados
│   │       └── auth.ts
│   └── lib/
│       └── auth.ts             # Configurações e helpers de autenticação                 # Utilitários e configurações
```

## 🔐 Autenticação

A aplicação usa NextAuth.js com provider de credenciais. Para fins de demonstração, qualquer email/senha válida é aceita.

**Em produção, implemente:**
- Hash de senhas (bcrypt)
- Validação de email
- Rate limiting
- Autenticação social (Google, GitHub, etc.)

## 📊 API Endpoints

### Doações
- `GET /api/donations` - Lista doações (com paginação)
- `POST /api/donations` - Cria nova doação
- `GET /api/donations/stats` - Estatísticas de doações

### Autenticação
- `GET /api/auth/signin` - Página de login
- `GET /api/auth/signout` - Logout

## 🎨 Componentes Principais

- **DonorForm**: Formulário de doação com validação
- **ChartStats**: Gráficos de estatísticas
- **DonationCard**: Card de exibição de doações
- **Layout**: Layout principal da aplicação
- **Navbar**: Navegação principal

## 🚀 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linting
npm run db:generate  # Gerar cliente Prisma
npm run db:push      # Sincronizar banco
npm run db:studio    # Abrir Prisma Studio
```

## 🔧 Configuração de Produção

1. **Configure um banco de dados de produção** (PostgreSQL, MySQL)
2. **Configure variáveis de ambiente de produção**
3. **Configure NextAuth com um secret seguro**
4. **Configure CORS se necessário**
5. **Configure rate limiting**
6. **Configure logging e monitoramento**

## 🐛 Solução de Problemas

### Erro de banco de dados
```bash
npm run db:generate
npm run db:push
```

### Erro de autenticação
Verifique as variáveis de ambiente `NEXTAUTH_URL` e `NEXTAUTH_SECRET`.

### Erro de build
```bash
rm -rf .next
npm run build
```

## 📝 Melhorias Implementadas

### Validação e Segurança
- ✅ Validação com Zod em formulários e APIs
- ✅ Tratamento de erros robusto
- ✅ Tipagem TypeScript completa
- ✅ Sanitização de dados

### Performance
- ✅ Paginação de resultados
- ✅ Loading states
- ✅ Error boundaries
- ✅ Otimização de re-renderização

### UX/UI
- ✅ Feedback visual para ações
- ✅ Estados de loading
- ✅ Mensagens de erro claras
- ✅ Interface responsiva
- ✅ Animações suaves

### Arquitetura
- ✅ Clean Architecture
- ✅ Separação de responsabilidades
- ✅ Injeção de dependências
- ✅ Repository pattern

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório.
