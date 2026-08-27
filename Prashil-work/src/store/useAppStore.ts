import { create } from 'zustand';

export type UserRole = 'student' | 'teacher' | 'admin';

interface AppState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  
  // Student specific global state
  activeSubject: string | null;
  setActiveSubject: (subject: string | null) => void;
  
  // Global UI state
  isVizzyOpen: boolean;
  setVizzyOpen: (isOpen: boolean) => void;
  
  // Audio state
  isAudioEnabled: boolean;
  setAudioEnabled: (isEnabled: boolean) => void;
  // User state from backend
  user: null | any;
  fetchUser: (role: UserRole) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  role: 'student',
  setRole: (role) => {
    set({ role });
    get().fetchUser(role);
  },
  
  user: null,
  fetchUser: async (role) => {
    try {
      const res = await fetch(`http://localhost:3001/api/users/me?role=${role}`);
      if (res.ok) {
        const data = await res.json();
        set({ user: data });
      }
    } catch (e) {
      console.error('Failed to fetch user', e);
    }
  },
  
  activeSubject: null,
  setActiveSubject: (subject) => set({ activeSubject: subject }),
  
  isVizzyOpen: false,
  setVizzyOpen: (isOpen) => set({ isVizzyOpen: isOpen }),
  
  isAudioEnabled: true,
  setAudioEnabled: (isEnabled) => set({ isAudioEnabled: isEnabled }),
}));
