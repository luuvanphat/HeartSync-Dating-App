import React, {createContext, useContext, ReactNode} from 'react';
import {useStore} from '../store/useStore';

export interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    notification: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    surface: string;
    disabled: string;
  };
}

const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#00BCD4',
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#333333',
    textSecondary: '#666666',
    border: '#EEEEEE',
    notification: '#FF3B30',
    success: '#4CAF50',
    error: '#FF3B30',
    warning: '#FF9800',
    info: '#00BCD4',
    surface: '#FFFFFF',
    disabled: '#CCCCCC',
  },
};

const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#00BCD4',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    border: '#2C2C2C',
    notification: '#FF453A',
    success: '#32D74B',
    error: '#FF453A',
    warning: '#FF9F0A',
    info: '#00BCD4',
    surface: '#1E1E1E',
    disabled: '#3A3A3C',
  },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const darkMode = useStore((state) => state.settings.darkMode);
  const updateSettings = useStore((state) => state.updateSettings);

  const theme = darkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    updateSettings({darkMode: !darkMode});
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};