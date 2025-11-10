import {create} from 'zustand';
import {User, Match, Message, FilterSettings, AuthCredentials, AppSettings} from '../types';
import {CURRENT_USER, DUMMY_USERS, DUMMY_MATCHES, DUMMY_MESSAGES} from '../data/dummyData';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  currentUser: User | null;
  users: User[];
  allUsers: User[];
  matches: Match[];
  chats: {[key: string]: Message[]};
  isAuthenticated: boolean;
  filters: FilterSettings;
  hasUnsavedChanges: boolean;
  
  // ========== NEW: Enhanced Features ==========
  blockedUsers: string[];
  profileCompletion: number;
  settings: AppSettings;
  superLikes: number;
  // ===========================================
  
  // Auth Actions
  login: (credentials: AuthCredentials) => Promise<boolean>;
  register: (credentials: AuthCredentials) => Promise<boolean>;
  logout: () => void;
  
  // User Actions
  updateCurrentUser: (user: Partial<User>) => void;
  saveProfile: () => void;
  setUnsavedChanges: (value: boolean) => void;
  
  // ========== NEW: Enhanced User Actions ==========
  calculateProfileCompletion: () => void;
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  isUserBlocked: (userId: string) => boolean;
  swipeSuperLike: (userId: string) => void;
  // ===============================================
  
  // Swipe Actions
  swipeLeft: (userId: string) => void;
  swipeRight: (userId: string) => void;
  addMatch: (user: User) => void;
  getNextUser: () => User | null;
  
  // Chat Actions
  sendMessage: (matchId: string, text: string) => void;
  markMessagesAsRead: (matchId: string) => void;
  
  // ========== NEW: Enhanced Chat Actions ==========
  deleteChat: (matchId: string) => void;
  reportUser: (userId: string, reason: string) => Promise<void>;
  // ===============================================
  
  // Filter Actions
  updateFilters: (filters: Partial<FilterSettings>) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  
  // ========== NEW: Settings Actions ==========
  updateSettings: (settings: Partial<AppSettings>) => void;
  loadSettings: () => Promise<void>;
  saveSettings: () => Promise<void>;
  // ==========================================
}

// Simulated API calls
const simulateApiCall = (delay: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, delay));

export const useStore = create<AppState>((set, get) => ({
  currentUser: null,
  users: [...DUMMY_USERS],
  allUsers: [...DUMMY_USERS],
  matches: [],
  chats: {},
  isAuthenticated: false,
  hasUnsavedChanges: false,
  filters: {
    gender: ['Female'],
    ageRange: [18, 80],
    distance: 50,
    showNearbyWhenEmpty: true,
    languages: [],
  },
  
  // ========== NEW: Initialize new state ==========
  blockedUsers: [],
  profileCompletion: 0,
  settings: {
    darkMode: false,
    language: 'en',
    notifications: true,
    showOnline: true,
    showDistance: true,
  },
  // ==============================================

  // Auth Actions
  login: async (credentials) => {
    await simulateApiCall(1500);
    
    // Simple validation - in real app, call API
    if (credentials.email && credentials.password.length >= 6) {
      set({
        isAuthenticated: true,
        currentUser: {...CURRENT_USER, email: credentials.email},
        matches: DUMMY_MATCHES,
        chats: DUMMY_MESSAGES,
      });
      
      // ========== NEW: Load settings and calculate profile ==========
      get().calculateProfileCompletion();
      await get().loadSettings();
      // ==============================================================
      
      return true;
    }
    return false;
  },

  register: async (credentials) => {
    await simulateApiCall(1500);
    
    // Validation
    if (credentials.email && credentials.password.length >= 6 && credentials.name) {
      const newUser: User = {
        ...CURRENT_USER,
        id: Date.now().toString(),
        name: credentials.name,
        email: credentials.email,
      };
      
      set({
        isAuthenticated: true,
        currentUser: newUser,
        matches: [],
        chats: {},
      });
      
      // ========== NEW: Calculate profile completion ==========
      get().calculateProfileCompletion();
      // ======================================================
      
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({
      isAuthenticated: false,
      currentUser: null,
      matches: [],
      chats: {},
      hasUnsavedChanges: false,
      users: [...DUMMY_USERS],
      allUsers: [...DUMMY_USERS],
      // ========== NEW: Reset blocked users ==========
      blockedUsers: [],
      // ==============================================
    });
  },

  // User Actions
  updateCurrentUser: (userData) => {
    set((state) => ({
      currentUser: state.currentUser ? {...state.currentUser, ...userData} : null,
      hasUnsavedChanges: true,
    }));
    
    // ========== NEW: Recalculate profile completion ==========
    get().calculateProfileCompletion();
    // ========================================================
  },

  saveProfile: () => {
    // In real app: call API to save
    set({hasUnsavedChanges: false});
  },

  setUnsavedChanges: (value) => {
    set({hasUnsavedChanges: value});
  },
  
  // ========== NEW: Profile Completion Calculation ==========
  calculateProfileCompletion: () => {
    const {currentUser} = get();
    if (!currentUser) {
      set({profileCompletion: 0});
      return;
    }

    let completedFields = 0;
    const totalFields = 12;

    // Check each field
    if (currentUser.name && currentUser.name.length >= 2) completedFields++;
    if (currentUser.age >= 18) completedFields++;
    if (currentUser.bio && currentUser.bio.length >= 50) completedFields++;
    if (currentUser.occupation && currentUser.occupation.length >= 3) completedFields++;
    if (currentUser.photos && currentUser.photos.length >= 3) completedFields++;
    if (currentUser.interests && currentUser.interests.length >= 3) completedFields++;
    if (currentUser.languages && currentUser.languages.length >= 1) completedFields++;
    if (currentUser.details.height) completedFields++;
    if (currentUser.details.education) completedFields++;
    if (currentUser.details.smoking) completedFields++;
    if (currentUser.details.drinking) completedFields++;
    if (currentUser.pronouns) completedFields++;

    const completion = Math.round((completedFields / totalFields) * 100);
    set({profileCompletion: completion});
  },

  blockUser: (userId) => {
    set((state) => ({
      blockedUsers: [...state.blockedUsers, userId],
      matches: state.matches.filter(m => m.user.id !== userId),
      users: state.users.filter(u => u.id !== userId),
    }));
    // Reapply filters to remove blocked user
    get().applyFilters();
  },

  unblockUser: (userId) => {
    set((state) => ({
      blockedUsers: state.blockedUsers.filter(id => id !== userId),
    }));
    // Reapply filters to include unblocked user
    get().applyFilters();
  },

  isUserBlocked: (userId) => {
    return get().blockedUsers.includes(userId);
  },
  // ========================================================

  // Swipe Actions
  swipeLeft: (userId) => {
    set((state) => ({
      users: state.users.filter((u) => u.id !== userId),
    }));
  },

  swipeRight: (userId) => {
    const user = get().users.find((u) => u.id === userId);
    if (user) {
      const isMatch = Math.random() > 0.2;
      if (isMatch) {
        get().addMatch(user);
      }
      get().swipeLeft(userId);
    }
  },

  addMatch: (user) => {
    const newMatch: Match = {
      id: `match-${Date.now()}`,
      user,
      matchedAt: new Date(),
      unreadCount: 0,
    };
    
    set((state) => ({
      matches: [newMatch, ...state.matches],
      chats: {
        ...state.chats,
        [newMatch.id]: [],
      },
    }));
  },

  getNextUser: () => {
    const {users, blockedUsers} = get(); // ========== NEW: Check blocked users ==========
    const availableUsers = users.filter(u => !blockedUsers.includes(u.id));
    return availableUsers.length > 0 ? availableUsers[0] : null;
  },

  // Chat Actions
  sendMessage: (matchId, text) => {
    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      receiverId: matchId,
      text,
      timestamp: new Date(),
      read: false,
    };

    set((state) => ({
      chats: {
        ...state.chats,
        [matchId]: [...(state.chats[matchId] || []), message],
      },
      matches: state.matches.map((m) =>
        m.id === matchId ? {...m, lastMessage: message} : m,
      ),
    }));
  },

  markMessagesAsRead: (matchId) => {
    set((state) => ({
      matches: state.matches.map((m) =>
        m.id === matchId ? {...m, unreadCount: 0} : m,
      ),
      chats: {
        ...state.chats,
        [matchId]: state.chats[matchId]?.map(msg => ({...msg, read: true})) || [],
      },
    }));
  },
  
  // ========== NEW: Enhanced Chat Actions ==========
  deleteChat: (matchId) => {
    set((state) => {
      const newChats = {...state.chats};
      delete newChats[matchId];
      
      return {
        matches: state.matches.filter(m => m.id !== matchId),
        chats: newChats,
      };
    });
  },

  reportUser: async (userId, reason) => {
    await simulateApiCall(500);
    // In real app: send report to server
    console.log(`User ${userId} reported for: ${reason}`);
    // You can add more logic here like showing success message
  },
  // ===============================================

  // Filter Actions
  updateFilters: (newFilters) => {
    set((state) => ({
      filters: {...state.filters, ...newFilters},
    }));
  },

  applyFilters: () => {
    const {filters, allUsers, blockedUsers} = get();
    
    let filteredUsers = [...allUsers];
    
    // Filter out blocked users
    filteredUsers = filteredUsers.filter(u => !blockedUsers.includes(u.id));
    
    // Gender filter - ĐÃ FIX
    if (filters.gender.length > 0) {
      filteredUsers = filteredUsers.filter(user => {
        // Kiểm tra user.details.gender có trong filters.gender không
        return user.details.gender && filters.gender.includes(user.details.gender);
      });
    }
    
    // Age filter
    filteredUsers = filteredUsers.filter(user => 
      user.age >= filters.ageRange[0] && user.age <= filters.ageRange[1]
    );
    
    // Distance filter
    filteredUsers = filteredUsers.filter(user => 
      user.distance <= filters.distance
    );
    
    // Language filter
    if (filters.languages.length > 0) {
      filteredUsers = filteredUsers.filter(user =>
        filters.languages.some(lang => user.languages.includes(lang))
      );
    }
    
    set({users: filteredUsers});
  },
  superLikes: 5, // Users get 5 super likes per day
  
  swipeSuperLike: (userId) => {
    const {superLikes} = get();
    if (superLikes <= 0) {
      // Show alert that no super likes left
      return;
    }
    
    const user = get().users.find((u) => u.id === userId);
    if (user) {
      // Super like has 80% match rate
      const isMatch = Math.random() > 0.2;
      if (isMatch) {
        get().addMatch(user);
      }
      get().swipeLeft(userId);
      set({superLikes: superLikes - 1});
    }
  },
  clearFilters: () => {
    set({
      filters: {
        gender: ['Female'],
        ageRange: [18, 80],
        distance: 50,
        showNearbyWhenEmpty: true,
        languages: [],
      },
    });
    get().applyFilters(); // ========== NEW: Apply filters after clearing ==========
  },
  
  // ========== NEW: Settings Actions ==========
  updateSettings: (newSettings) => {
    set((state) => ({
      settings: {...state.settings, ...newSettings},
    }));
    get().saveSettings();
  },

  loadSettings: async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('appSettings');
      if (savedSettings) {
        set({settings: JSON.parse(savedSettings)});
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  },

  saveSettings: async () => {
    try {
      const {settings} = get();
      await AsyncStorage.setItem('appSettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  },
  // ==========================================
}));