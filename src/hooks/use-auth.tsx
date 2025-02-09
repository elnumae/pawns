import { create } from 'zustand';
import { login, logout, initAuth, getUserEmail } from '@/auth';

interface AuthState {
  isLichessConnected: boolean;
  userEmail: string | null;
  isInitialized: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isLichessConnected: false,
  userEmail: null,
  isInitialized: false,
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
      // Skip if already initialized
      const state = useAuth.getState();
      if (state.isInitialized) return;

      const loggedIn = await initAuth();
      if (loggedIn) {
        const email = await getUserEmail();
        set({ isLichessConnected: true, userEmail: email, isInitialized: true });
      } else {
        set({ isInitialized: true });
      }
    } catch (error) {
      console.error('Failed to initialize Lichess auth:', error);
      set({ isInitialized: true });
    }
  }
})); 