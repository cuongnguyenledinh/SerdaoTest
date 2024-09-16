import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './persistStorage';

import { BeneficiaryState, createBeneficiarySlice } from './beneficiarySlice';
import { createTransactionSlice, TransactionState } from './transactionSlice';

export const useBoundStore = create<BeneficiaryState & TransactionState>()(
  persist(
    (...a) => ({
      // @ts-ignore
      ...createBeneficiarySlice(...a),
      // @ts-ignore
      ...createTransactionSlice(...a),
    }),
    {
      name: 'bounded-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
