## Description

nest.js events app 
1. User:

   ● Register 

   ● Login

   ● *Logout

2. *Event:

   ● CRUD

3. **Event list

4. **Event list with pagination/filter

   ● filter: day

   ● filter: week

   ● filter: month

*only logged users

**only events owners

## Technologies
1. Nest.js
2. TypeORM
3. Postgres
4. Docker

## Before first run

1. Run `npm install`
2. Copy `.env.example` to `.env` and fill it with correct data

## API Docs

1. Postman collection and environment available in `./postman` (recommended)

## Running with docker

```bash
$ docker-compose up --build -V -d
$ docker-compose up
```