# Implementing API by Graphql

The Blog-server is built node.js (typescript), Postgresql(prisma) and Graphql (apollo-server).

## Installing prerequisite

```sh
npm init -y
npm i -D nodemon typescript ts-node-dev @types/node
tsc --init
```

## Installing Prisma

[Prisma](https://www.prisma.io/docs/getting-started) is an open source next-generation ORM. It consists of the following parts:

- Prisma Client: Auto-generated and type-safe query builder for Node.js & TypeScript
- Prisma Migrate: Migration system
- Prisma Studio: GUI to view and edit data in your database

```sh
npm i prisma
npx prisma init
```

.env :

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

prisma > schema.prisma:

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

```sh
npx prisma db push
npx prisma studio
```

## Installing Apollo server

Apollo Studio is a cloud platform that helps you build, validate, and secure your organization's graph. [Get started here!](https://www.apollographql.com/docs/studio/getting-started/)

```sh
npm install apollo-server graphql
```

Let's get started. [https://studio.apollographql.com/sandbox/explorer](https://studio.apollographql.com/sandbox/explorer)
