import { UserState } from '@/types/user';
import { atom } from 'recoil';

export const userStatus = atom<boolean>({
  key: 'userStatus',
  default: false,
});
