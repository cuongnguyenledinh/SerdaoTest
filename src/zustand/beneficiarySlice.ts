import { StateCreator } from 'zustand';

export interface BeneficiaryProps {
  id: string;
  firstName: string;
  lastName: string;
  iban: string;
}

export interface BeneficiaryState {
  listBeneficiary: BeneficiaryProps[];
  addBeneficiary: (val: BeneficiaryProps) => void;
}

export const createBeneficiarySlice: StateCreator<
  BeneficiaryState,
  [['zustand/persist', unknown]],
  []
> = (set: any) => ({
  listBeneficiary: [],
  addBeneficiary: (val: BeneficiaryProps) =>
    set((state: any) => ({
      listBeneficiary: [val, ...state.listBeneficiary],
    })),
});
