import { selector } from 'recoil';
import { UserAtom, userAtom } from '../atoms/user';
import Client from '../utils/client';

export const userSelector = selector<UserAtom>({
  key: 'user_selector',
  get: async ({ get }) => {
    return get(userAtom);
  },
  set: async ({ set }) => {
    try {
      const { data } = await Client.get('/v1/user/me');

      const {
        id,
        identifier,
        avatarURL,
        userProfile: { nickname },
      } = data as {
        id: string;
        identifier: string;
        avatarURL: string;
        userProfile: {
          nickname: string;
        };
      };

      set(userAtom, {
        isLoggedIn: true,
        user: {
          id,
          identifier,
          avatarURL,
          nickname,
        },
      });
    } catch (err) {
      set(userAtom, { isLoggedIn: false });
    }
  },
});
