import JWT from 'jsonwebtoken';
import { JSON_SIGNATURE } from '../../keys';

export const getUserFromToken = (token: string) => {
  try {
    console.log(token);
    const userInfo = JWT.verify(token, JSON_SIGNATURE) as {
      userId: number;
    };
    console.log('****');
    console.log(userInfo);
    return userInfo;
  } catch (err) {
    console.log(err);
    return null;
  }
};
