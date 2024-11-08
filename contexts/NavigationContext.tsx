// contexts/NavigationContext.tsx
"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type NavigationContextType = {
  activeSection: 'home' | 'favorites' | 'watchLater';
  setActiveSection: (section: 'home' | 'favorites' | 'watchLater') => void;
};

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
	const [activeSection, setActiveSection] = useState<'home' | 'favorites' | 'watchLater'>('home');

	useEffect(() => {
		const path = window.location.pathname;
		if (path === '/favorites') {
		  setActiveSection('favorites');
		} else if (path === '/watch-later') {
		  setActiveSection('watchLater');
		} else {
		  setActiveSection('home');
		}
	  }, [window.location.pathname]); 
	
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
