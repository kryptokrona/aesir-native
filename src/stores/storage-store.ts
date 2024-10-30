import { createJSONStorage, persist } from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface AppStoreState {
  _hasHydrated: {
    user: boolean;
  };
  setHasHydrated: (key: keyof AppStoreState['_hasHydrated']) => void;
  resetHydration: () => void;
}
export const useStorageStore = create<AppStoreState>()((set) => ({
  _hasHydrated: {
    user: false,
  },
  setHasHydrated: (key) =>
    set((state) => ({
      _hasHydrated: { ...state._hasHydrated, [key]: true },
    })),
  resetHydration: () =>
    set(() => ({
      _hasHydrated: {
        user: false,
      },
    })),
}));

interface UserState {
  userName: string | null;
  authenticated: boolean;
  theme: 'light' | 'dark';
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userName: null,
      authenticated: false,
      theme: 'light',
    }),
    {
      name: 'async-user',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      onRehydrateStorage: () => () => {
        useStorageStore.getState().setHasHydrated('user');
      },
    },
  ),
);
