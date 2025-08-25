## Real Estate Project

#### 1. Set up process:

- Create .env files with the below fields


```
DATABASE_URL="postgresql://{you_username}:{password}@localhost:5432/realestate"
JWT_SECRET="generate_yours"
PORT=8000
```
- In your docker-compose.yml file, update the below database credentials to match your own. 
Where there's username and password, replace.

```angular2html
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: real-estate
    ports:
      - "8000:8000"
    volumes:
      - .:/usr/src/app
      - pnpm_store:/root/.pnpm-store
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://username:password@db:5432/realestate
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: [ "CMD-SHELL", "wget -qO- http://localhost:8000/health || exit 1" ]
      interval: 10s
      timeout: 5s
      retries: 5

  db:
    image: postgres:15-alpine
    container_name: postgres-db
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: username
      POSTGRES_PASSWORD: password
      POSTGRES_DB: realestate
    volumes:
      - postgres_data:/var/lib/postgresql/data
```



- Run the below commands and start testing on port 8000
```angular2html
$pnpm install && pnpm build

$prisma generate

$docker compose build && docker compose up
```

- For API documentation, visit:
`localhost:8000/api`

## Database ER Diagram

![](er_diagram.png)