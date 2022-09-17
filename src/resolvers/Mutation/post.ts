import { Post, Prisma } from '@prisma/client';
import { networkInterfaces } from 'os';
import { Context } from '../..';

interface PostArgs {
  post: {
    title?: string;
    content?: string;
  };
}
interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | Prisma.Prisma__PostClient<Post> | null;
}

export const postResolvers = {
  postCreate: async (
    _: any,
    { post }: PostArgs,
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: 'You must provide title and content to create a post',
          },
        ],
        post: null,
      };
    }
    console.log(post);
    return {
      userErrors: [],
      post: prisma.post.create({
        data: {
          title,
          content,
          authorId: 1,
        },
      }),
    };
  },
};
