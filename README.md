# SIC
Projeto de Serviços e Interfaces para a Cloud

Este projeto implementa uma arquitetura de microserviços para uma plataforma de contratação de serviços.

# Plataforma de Freelancers (Microserviços)
Este projeto implementa uma arquitetura de microserviços para uma plataforma de contratação de serviços.

## Estrutura
*   **api-gateway**: Ponto de entrada único (Node.js). Porta 8080.
*   **auth-service**: Autenticação (Node.js + PostgreSQL).
*   **user-service**: Perfis de utilizadores (Node.js + MongoDB + GraphQL).
*   **catalog-service**: Catálogo de serviços (Python/FastAPI + PostgreSQL).
*   **booking-service**: Gestão de pedidos (Node.js + MongoDB).

## Como Correr

1.  **Iniciar a aplicação:**
    ```bash
    docker-compose up --build
    
2.  **Parar a aplicação:**
    ```bash
    docker-compose down
    ```

## Testar Endpoints

*   **Gateway:** [http://localhost:8080/health](http://localhost:8080/health)
*   **Auth:** [http://localhost:8080/api/auth/health](http://localhost:8080/api/auth/health)
*   **User:** [http://localhost:8080/api/users/health](http://localhost:8080/api/users/health)
*   **Catalog:** [http://localhost:8080/api/catalog/health](http://localhost:8080/api/catalog/health)
*   **Booking:** [http://localhost:8080/api/bookings/health](http://localhost:8080/api/bookings/health)
