import { create } from "zustand";

interface User {
  id: string;
  name: string;
  role: "sacco_admin" | "matatu_owner" | "driver";
}

interface SACCO {
  id: string;
  name: string;
}

interface BimaBazaarState {
  currentUser: User | null;
  currentSACCO: SACCO | null;
  setCurrentUser: (user: User | null) => void;
  setCurrentSACCO: (sacco: SACCO | null) => void;
}

export const useBimaBazaarStore = create<BimaBazaarState>((set) => ({
  currentUser: null,
  currentSACCO: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  setCurrentSACCO: (sacco) => set({ currentSACCO: sacco }),
}));
