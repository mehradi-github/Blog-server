import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }
  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
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
  input PostInput {
    title: String
    content: String
  }
`;
