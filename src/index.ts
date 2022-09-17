import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { Query } from './resolvers';
import { typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
  },
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen({ port: 8082 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
