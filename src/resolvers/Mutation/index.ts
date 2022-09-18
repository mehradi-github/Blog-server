import { authResolver } from './auth';
import { postResolvers } from './post';

export const Mutation = {
  ...postResolvers,
  ...authResolver,
};
