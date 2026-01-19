
import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const NavItem = ({ view, icon, label }: { view: AppView, icon: string, label: string }) => (
    <button 
      onClick={() => setView(view)}
      className={`flex flex-col items-center group transition-all ${currentView === view ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100'}`}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center transform transition-transform border-2 border-black ${currentView === view ? 'bg-primary text-white -rotate-3' : 'bg-white dark:bg-gray-800 text-dark dark:text-white rotate-0'}`}>
        <span className="material-symbols-outlined font-bold">{icon}</span>
      </div>
      <span className="font-punk text-[10px] mt-1 text-black dark:text-white tracking-widest uppercase">{label}</span>
    </button>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
      <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md border-t-4 border-black px-6 py-4 flex justify-between items-center h-24 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] ripped-edge-top">
        <NavItem view={AppView.COVER} icon="auto_stories" label="Cover" />
        <NavItem view={AppView.HOME} icon="home" label="Vibes" />
        <NavItem view={AppView.RECOMMEND} icon="auto_awesome" label="Chef" />
        <NavItem view={AppView.MENU} icon="restaurant_menu" label="Menu" />
      </div>
    </nav>
  );
};

export default Navigation;
