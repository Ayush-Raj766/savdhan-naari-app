import { create } from 'zustand';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface EmergencyLog {
  id: string;
  date: string;
  time: string;
  location: string;
  station: string;
  status: 'cancelled' | 'sent';
}

interface AppState {
  isAuthenticated: boolean;
  user: {
    name: string;
    phone: string;
    age: number;
    gender: string;
    role: 'user' | 'admin';
  } | null;
  contacts: Contact[];
  watchConnected: boolean;
  heartRate: number;
  motionActive: boolean;
  micActive: boolean;
  emergencyActive: boolean;
  emergencyLogs: EmergencyLog[];
  language: 'en' | 'hi';

  setAuth: (auth: boolean) => void;
  setUser: (user: AppState['user']) => void;
  addContact: (contact: Contact) => void;
  removeContact: (id: string) => void;
  setWatchConnected: (connected: boolean) => void;
  setEmergencyActive: (active: boolean) => void;
  addEmergencyLog: (log: EmergencyLog) => void;
  setLanguage: (lang: 'en' | 'hi') => void;
  login: (user: AppState['user']) => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  isAuthenticated: false,
  user: null,
  contacts: [],
  watchConnected: true,
  heartRate: 72,
  motionActive: true,
  micActive: false,
  emergencyActive: false,
  emergencyLogs: [
    {
      id: '1',
      date: '2026-02-15',
      time: '23:45',
      location: 'Connaught Place, Delhi',
      station: 'CP Police Station',
      status: 'sent',
    },
    {
      id: '2',
      date: '2026-02-10',
      time: '21:30',
      location: 'MG Road, Bangalore',
      station: 'MG Road Station',
      status: 'cancelled',
    },
  ],
  language: 'en',

  setAuth: (auth) => set({ isAuthenticated: auth }),
  setUser: (user) => set({ user }),
  addContact: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  removeContact: (id) =>
    set((state) => ({ contacts: state.contacts.filter((c) => c.id !== id) })),
  setWatchConnected: (connected) => set({ watchConnected: connected }),
  setEmergencyActive: (active) => set({ emergencyActive: active }),
  addEmergencyLog: (log) =>
    set((state) => ({ emergencyLogs: [log, ...state.emergencyLogs] })),
  setLanguage: (lang) => set({ language: lang }),
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null, contacts: [] }),
}));
