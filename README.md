## Installation

```bash
$ cp .env.example .env
$ pnpm install
```
## Docker
```bash
$ docker compose up -d
```

## DB setup
```bash
$ pnpm db:up
$ pnpm db:generate
$ pnpm db:seed
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## API doc
```
http://localhost:3000/doc
```
Postman collection can be found in `./postman` folder


## To Improve: 
1. Use Queue for email processing
2. add validation to avoid booking lest then 30 minutes
3. Add DB constrain to avoid overlap (move this logic to DB)
4. Prisma caching middleware have some strange bug with configuration. Better to use in-house solution or caching queries  

## Service Architecture:
             +------------------+
             |   NestJS Server  |
             +------------------+
                      |
          +-----------|------------+
          |           v            |
    +-------------+  +-----------+ |
    |    Prisma   |  |   Redis   | |
    |   Database  |  |   Cache   | |
    +-------------+  +-----------+ |
          |                      |
          +----------------------+



