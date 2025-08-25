## Real Estate Project

#### 1. Set up process:

- Create .env files with the below fields


`
DATABASE_URL="postgresql://{you_username}:{password}@localhost:5432/realestate"
JWT_SECRET="generate_yours"
`

- Run the below commands and start testing on port 6000

`
docker compose build && docker compose up
`

## Database ER Diagram

![](er_diagram.png)