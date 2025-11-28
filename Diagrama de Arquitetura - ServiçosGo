```mermaid
graph TD
    %% Estilos
    classDef gateway fill:#f9f,stroke:#333,stroke-width:2px;
    classDef service fill:#bbf,stroke:#333,stroke-width:2px;
    classDef db fill:#dfd,stroke:#333,stroke-width:2px;
    classDef client fill:#fdd,stroke:#333,stroke-width:2px;

    %% Nós
    ClientWeb[Cliente Web (React)]:::client
    ClientMob[Cliente Mobile]:::client
    
    Gateway[API Gateway (Node.js)]:::gateway
    
    subgraph "Cluster de Microserviços"
        Auth[Auth Service (Node.js)]:::service
        User[User Service (GraphQL)]:::service
        Catalog[Catalog Service (Python)]:::service
        Booking[Booking Service (Node.js)]:::service
    end
    
    subgraph "Camada de Dados"
        AuthDB[(Auth DB\nPostgres)]:::db
        UserDB[(User DB\nMongo)]:::db
        CatalogDB[(Catalog DB\nPostgres)]:::db
        BookingDB[(Booking DB\nMongo)]:::db
    end

    %% Relações Externas
    ClientWeb -->|HTTPS/REST| Gateway
    ClientMob -->|HTTPS/REST| Gateway

    %% Roteamento Gateway
    Gateway -->|/auth| Auth
    Gateway -->|/users| User
    Gateway -->|/services| Catalog
    Gateway -->|/bookings| Booking

    %% Comunicação Inter-serviços
    Booking -.->|gRPC/HTTP| User
    Booking -.->|gRPC/HTTP| Catalog

    %% Persistência
    Auth --- AuthDB
    User --- UserDB
    Catalog --- CatalogDB
    Booking --- BookingDB
