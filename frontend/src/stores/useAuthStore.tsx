import { produce } from 'immer';
import { create } from 'zustand';

import { removeToken, setToken } from '@/lib/cookies';
import { User } from '@/types/entities/user';

export type useAuthStoreType = {
  user: User | null;
  isAuthed: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  stopLoading: () => void;
};

const useAuthStore = create<useAuthStoreType>(set => ({
  user: null,
  isAuthed: false,
  isLoading: true,
  login: user => {
    if (user.token) setToken(user.token);
    set(
      produce<useAuthStoreType>(state => {
        state.user = user;
        state.isAuthed = true;
      }),
    );
  },
  logout: () => {
    removeToken();
    set(
      produce<useAuthStoreType>(state => {
        state.user = null;
        state.isAuthed = false;
      }),
    );
  },
  stopLoading: () => {
    set(
      produce<useAuthStoreType>(state => {
        state.isLoading = false;
      }),
    );
  },
}));

export default useAuthStore;
