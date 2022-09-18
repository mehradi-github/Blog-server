import { Context } from '../..';
import validator from 'validator';
import bcrypt from 'bcryptjs';

interface SignupArgs {
  credentials: {
    email: string;
    password: string;
  };
  name: string;
  bio: string;
}
interface UserPayload {
  userErrors: {
    message: string;
  }[];
  token: string | null;
}
export const authResolver = {
  signup: async (
    _: any,
    { credentials, name, bio }: SignupArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;
    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      return {
        userErrors: [
          {
            message: 'Invalid email',
          },
        ],
        token: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: 'Invalid name or bio',
          },
        ],
        token: null,
      };
    }

    const isValidPassword = validator.isLength(password, { min: 8 });
    if (!isValidPassword) {
      return {
        userErrors: [
          {
            message: 'Invalid password',
          },
        ],
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    await prisma.profile.create({
      data: {
        bio,
        userId: user.id,
      },
    });

    return {
      userErrors: [],
      token: 'ok',
    };
  },
};
