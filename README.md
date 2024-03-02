## Installation

```bash
$ pnpm install
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


## To Improve: 
1. Use Redis caching for find  queries
2. Use Queue for email processing
3. add validation to avoid booking lest then 30 minutes
4. Add DB constrain to avoid overlap (move this logic to DB)

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



