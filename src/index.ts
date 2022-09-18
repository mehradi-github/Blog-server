import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { Query } from './resolvers';
import { Mutation } from './resolvers/Mutation/mutation';
import { typeDefs } from './schema';
import { PrismaClient, Prisma } from '@prisma/client';
import { getUserFromToken } from './utils/getUserFromToken';

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userInfo: {
    userId: number;
  } | null;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: async ({ req }: any): Promise<Context> => {
    const userInfo = await getUserFromToken(req.headers.authorization);
    return {
      prisma,
      userInfo,
    };
  },
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen({ port: 8082 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
