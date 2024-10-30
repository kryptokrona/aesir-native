import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface WalletStore {
  hash: string;
  cash: number;
  someNestedObject: {
    someNestedKey: string;
  };
}

export const useWalletStore = create<WalletStore>()(
  immer((set) => ({
    hash: '',
    cash: 0,
    someNestedObject: {
      someNestedKey: '',
    },
  })),
);

function exampleUpdateStoreFunction() {
  useWalletStore.setState((state) => {
    state.hash = 'new hash';
    state.cash = 100;
    state.someNestedObject.someNestedKey = 'new nested key';
  });
}
