import { Whoami, WhoamiStore } from '../types';
import { create } from 'zustand';

const initialWhoami: Whoami = {
  userName: '',
  id: '',
  isBlocked: false,
  isConfirmed: false,
};

export const useWhoamiStore = create<WhoamiStore>(set => ({
  whoami: initialWhoami,
  setWhoamiStore: whoami => set({ whoami }),
}));
