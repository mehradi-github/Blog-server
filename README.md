# Implementing API by Graphql

The Blog-server is built node.js (typescript), Postgresql(prisma) and Graphql (apollo-server).

## Installing prerequisite

```sh
npm init -y
npm i validator bcryptjs
npm i -D nodemon typescript ts-node-dev @types/node @types/validator @types/bcryptjs
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

```javascript
mutation Signup($credentials: CredentialsInput!, $name: String!, $bio: String!) {
  signup(credentials: $credentials, name: $name, bio: $bio) {
    userErrors {
      message
    }
    token
  }
}
mutation Signin($credentials: CredentialsInput!) {
  signin(credentials: $credentials) {
    token
    userErrors {
      message
    }
  }
}
mutation PostCreate($post: PostInput!) {
  postCreate(post: $post) {
    userErrors {
      message
    }
    post {
      id
      title
      content
      published
      createdAt
    }
  }
}
query Profile($userId: ID!) {
  profile(userId: $userId) {
    id
    bio
    isMyProfile
    user {
      id
      email
      name
      posts {
        id
        title
        content
        published
        createdAt
      }
    }
  }
}
```

Let's get started. [https://studio.apollographql.com/sandbox/explorer](https://studio.apollographql.com/sandbox/explorer)

## Installing JSON Web Token (JWT)

JSON [Web Token (JWT)](https://www.rfc-editor.org/rfc/rfc7519) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.

```sh
npm i jsonwebtoken
npm i -D @types/jsonwebtoken
```

```javascript
const token = JWT.sign({ userId: user.id }, JSON_SIGNATURE, {
        expiresIn: 3600000,
      }),
const userInfo= JWT.verify(token, JSON_SIGNATURE) as { userId: number };
```
