// contexts/NavigationContext.tsx
"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

type NavigationContextType = {
  activeSection: 'home' | 'favorites' | 'watchLater';
  setActiveSection: (section: 'home' | 'favorites' | 'watchLater') => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<'home' | 'favorites' | 'watchLater'>('home');

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}


