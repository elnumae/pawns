import { create } from 'zustand';
import { login, logout, initAuth, getUserEmail } from '@/auth';

interface AuthState {
  isLichessConnected: boolean;
  userEmail: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isLichessConnected: false,
  userEmail: null,
  connect: async () => {
    try {
      await login();
    } catch (error) {
      console.error('Failed to connect to Lichess:', error);
    }
  },
  disconnect: async () => {
    try {
      await logout();
      set({ isLichessConnected: false, userEmail: null });
    } catch (error) {
      console.error('Failed to disconnect from Lichess:', error);
    }
  },
  initialize: async () => {
    try {
      const loggedIn = await initAuth();
      if (loggedIn) {
        const email = await getUserEmail();
        set({ isLichessConnected: true, userEmail: email });
      }
    } catch (error) {
      console.error('Failed to initialize Lichess auth:', error);
    }
  }
})); 