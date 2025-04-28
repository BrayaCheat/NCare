import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@supabase/auth-helpers-nextjs';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage'
    }
  )
);

export default useUserStore;