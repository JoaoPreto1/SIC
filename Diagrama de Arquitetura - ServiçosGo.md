```mermaid
graph TD
    %% Estilos
    classDef gateway fill:#f9f,stroke:#333,stroke-width:2px;
    classDef service fill:#bbf,stroke:#333,stroke-width:2px;
    classDef db fill:#dfd,stroke:#333,stroke-width:2px;
    classDef client fill:#fdd,stroke:#333,stroke-width:2px;

    %% Nós
    ClientWeb["Cliente Web (React)"]
    ClientMob["Cliente Mobile"]
    
    Gateway["API Gateway (Node.js)"]
    
    subgraph "Cluster de Microserviços"
        Auth["Auth Service (Node.js)"]
        User["User Service (GraphQL)"]
        Catalog["Catalog Service (Python)"]
        Booking["Booking Service (Node.js)"]
    end
    
    subgraph "Camada de Dados"
        AuthDB[("Auth DB\nPostgres")]
        UserDB[("User DB\nMongo")]
        CatalogDB[("Catalog DB\nPostgres")]
        BookingDB[("Booking DB\nMongo")]
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

    %% Aplicação de Estilos
    class ClientWeb,ClientMob client;
    class Gateway gateway;
    class Auth,User,Catalog,Booking service;
    class AuthDB,UserDB,CatalogDB,BookingDB db;
