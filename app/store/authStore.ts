// /store/authStore.ts
import { create } from 'zustand';

type Role = 'patient' | 'doctor';

interface AuthStore {
  role: Role;
  setRole: (role: Role) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  role: 'patient',
  setRole: (role) => set({ role }),
}));