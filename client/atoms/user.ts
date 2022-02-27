import { atom } from 'recoil';

export interface User {
  id: string;
  avatarURL: string;
  identifier: string;
  nickname: string;
}

interface UserStateNotLoggedIn {
  isLoggedIn: false;
}

interface UserStateLoggedIn {
  isLoggedIn: true;
  user: User;
}

export type UserAtom = UserStateLoggedIn | UserStateNotLoggedIn;

export const userAtom = atom<UserAtom>({
  key: 'user',
  default: {
    isLoggedIn: false,
  },
});
