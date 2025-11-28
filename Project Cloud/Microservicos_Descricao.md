# Descrição Detalhada dos Microserviços - ServiçosJá

Este documento fornece uma visão técnica aprofundada de cada componente da arquitetura de microserviços da plataforma "ServiçosJá".

---

## 1. API Gateway
**Função:** Ponto único de entrada (Single Entry Point) para todos os clientes (Web e Mobile).
**Tecnologia:** Node.js (Express)
**Porta:** 8080

### Responsabilidades
*   **Roteamento:** Encaminha os pedidos HTTP para o microserviço correto (ex: `/auth/*` -> Auth Service).
*   **Segurança:** Implementa middlewares globais (CORS, Helmet).
*   **Autenticação (Proxy):** Verifica a presença de tokens em pedidos protegidos antes de os passar aos serviços internos.
*   **Agregação (Futuro):** Pode agregar respostas de múltiplos serviços numa única resposta para o cliente.

### Endpoints Expostos (Exemplos)
*   `POST /auth/login` -> Encaminha para Auth Service
*   `GET /services` -> Encaminha para Catalog Service
*   `POST /bookings` -> Encaminha para Booking Service

---

## 2. Auth Service (Serviço de Autenticação)
**Função:** Gestão de identidades e segurança.
**Tecnologia:** Node.js, PostgreSQL
**Porta:** 3000

### Responsabilidades
*   **Registo:** Criação de novas contas de utilizador (hash de passwords com bcrypt).
*   **Login:** Validação de credenciais e emissão de tokens JWT (JSON Web Tokens).
*   **Validação:** Endpoint interno para verificar se um token é válido.

### Dados Geridos
*   Utilizadores (ID, Email, PasswordHash, Role [Client/Provider])

---

## 3. User Service (Serviço de Utilizadores)
**Função:** Gestão de perfis e informações detalhadas dos utilizadores.
**Tecnologia:** Node.js, GraphQL, MongoDB
**Porta:** 3001

### Responsabilidades
*   **Perfil:** Armazena dados ricos (Nome, Morada, Biografia, Foto).
*   **Portfólio:** Permite aos profissionais adicionar fotos de trabalhos anteriores.
*   **Flexibilidade:** Usa GraphQL para permitir que o frontend peça apenas os campos que necessita (ex: apenas o nome e foto para uma lista, ou perfil completo para uma página de detalhe).

### Dados Geridos
*   Perfis de Utilizador (ligados ao ID do Auth Service)
*   Portfólios
*   Avaliações recebidas

---

## 4. Catalog Service (Serviço de Catálogo)
**Função:** Gestão dos serviços oferecidos na plataforma.
**Tecnologia:** Python (FastAPI), PostgreSQL
**Porta:** 8000

### Responsabilidades
*   **Categorias:** Gestão da taxonomia de serviços (ex: "Construção", "Limpeza", "Jardinagem").
*   **Serviços:** CRUD de serviços oferecidos pelos profissionais (ex: "Instalação de Tomadas" - 30€/hora).
*   **Pesquisa:** Permite filtrar serviços por categoria, preço ou localização.

### Dados Geridos
*   Categorias
*   Serviços (Título, Descrição, Preço, ProviderID)

---

## 5. Booking Service (Serviço de Reservas)
**Função:** Motor de transações e fluxo de contratação.
**Tecnologia:** Node.js, MongoDB
**Porta:** 3002

### Responsabilidades
*   **Criação de Reserva:** Regista a intenção de contratação.
*   **Máquina de Estados:** Gere o ciclo de vida da reserva:
    *   `PENDING`: Criada pelo cliente, aguarda resposta.
    *   `CONFIRMED`: Aceite pelo profissional.
    *   `REJECTED`: Recusada pelo profissional.
    *   `COMPLETED`: Serviço realizado.
*   **Orquestração:** Comunica com o User Service (para obter dados do cliente) e Catalog Service (para validar o serviço) durante o processo

### Dados Geridos
*   Reservas (Date, Status, ClientID, ProviderID, ServiceID, Price)
