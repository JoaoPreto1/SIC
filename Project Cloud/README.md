# Plataforma de Freelancers (Microserviços)

Este projeto implementa uma arquitetura de microserviços para uma plataforma de contratação de serviços.

## Estrutura
*   **api-gateway**: Ponto de entrada único (Node.js). Porta 8080.
*   **auth-service**: Autenticação (Node.js + PostgreSQL).
*   **user-service**: Perfis de utilizadores (Node.js + MongoDB + GraphQL).
*   **catalog-service**: Catálogo de serviços (Python/FastAPI + PostgreSQL).
*   **booking-service**: Gestão de pedidos (Node.js + MongoDB).

## Pré-requisitos
*   Docker
*   Docker Compose

## Como Correr

1.  **Iniciar a aplicação:**
    ```bash
    docker-compose up --build
    
    ```
    (Adicione `-d` para correr em background: `docker-compose up --build -d`)

2.  **Parar a aplicação:**
    ```bash
    docker-compose down
    ```

## Testar Endpoints

Pode testar se os serviços estão a funcionar acedendo aos endpoints de saúde através do Gateway:

*   **Gateway:** [http://localhost:8080/health](http://localhost:8080/health)
*   **Auth:** [http://localhost:8080/api/auth/health](http://localhost:8080/api/auth/health)
*   **User:** [http://localhost:8080/api/users/health](http://localhost:8080/api/users/health)
*   **Catalog:** [http://localhost:8080/api/catalog/health](http://localhost:8080/api/catalog/health)
*   **Booking:** [http://localhost:8080/api/bookings/health](http://localhost:8080/api/bookings/health)

## Documentação
A arquitetura e diagramas encontram-se no ficheiro `context_architecture.md`.
