import { Context } from '..';

export const Query = {
  me: (_: any, __: any, { userInfo, prisma }: Context) => {
    if (!userInfo) return null;
    return prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  posts: async (
    _: any,
    { take, skip }: { take: number; skip: number },
    { prisma }: Context
  ) => {
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [{ createdAt: 'desc' }],
      skip,
      take,
    });
  },
  profile: async (
    _: any,
    { userId }: { userId: string | null },
    { prisma, userInfo }: Context
  ) => {
    userId = userInfo && !userId ? userInfo?.userId.toString() : userId;
    const isMyProfile = Number(userId) === userInfo?.userId;

    const profile = await prisma.profile.findUnique({
      where: {
        userId: Number(userId),
      },
    });

    if (!profile) return null;

    return {
      ...profile,
      isMyProfile,
    };
  },
};
