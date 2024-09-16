import { StateCreator } from 'zustand';

export interface TransactionProps {
  id: string;
  amount: number;
  account: {
    name: string;
    iban: string;
  };
}

export interface TransactionState {
  balance: number;
  listTransaction: TransactionProps[];
  setBalance: (val: number) => void;
  addTransaction: (val: TransactionProps) => void;
}

export const createTransactionSlice: StateCreator<
  TransactionState,
  [['zustand/persist', unknown]],
  []
> = (set: any) => ({
  balance: 1000,
  listTransaction: [],
  setBalance: (val: number) => set(() => ({ balance: val })),
  addTransaction: (val: TransactionProps) =>
    set((state: any) => ({
      listTransaction: [val, ...state.listTransaction],
    })),
});
