import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }
  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postDelete(postId: ID!): PostPayload!
    signup(
      credentials: CredentialsInput!
      name: String!
      bio: String!
    ): AuthPayload!
    signin(credentials: CredentialsInput!): AuthPayload!
  }

  input CredentialsInput {
    email: String!
    password: String!
  }
  input PostInput {
    title: String
    content: String
  }

  type AuthPayload {
    userErrors: [UserError!]!
    token: String
  }
  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    createAt: String!
    user: User!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    posts: [Post!]!
  }

  type Profile {
    id: ID!
    bio: String!
    isMyProfile: Boolean!
    user: User!
  }

  type UserError {
    message: String!
  }
  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }
`;
