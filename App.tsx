
import React, { useState, useEffect } from 'react';
import { AppView, MenuCategory } from './types';
import FanzineHeader from './components/FanzineHeader';
import Navigation from './components/Navigation';
import CoverView from './components/CoverView';
import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import RecommendView from './components/RecommendView';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.COVER);

  // Handle manual navigation from home tiles
  const handleSelectCategory = (cat: MenuCategory) => {
    setView(AppView.MENU);
  };

  // Temporary toggle for Admin (can be moved to a secret click or long press)
  const toggleAdmin = () => {
    setView(prev => prev === AppView.ADMIN ? AppView.HOME : AppView.ADMIN);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative overflow-hidden flex flex-col bg-background-light dark:bg-background-dark">
      {/* Visual Overlays */}
      <div className="fixed inset-0 texture-overlay w-full h-full z-50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-paper-light/30 dark:bg-black/20 pointer-events-none"></div>

      {/* Header - Passing toggleAdmin to the menu button logic would be cleaner but let's keep it simple */}
      <div onClick={(e) => {
        // Simple "secret": click the header title area while holding shift? 
        // Or just repurpose the menu button for now in this demo.
        if (e.detail === 3) toggleAdmin(); // Triple click header for Admin
      }}>
        <FanzineHeader />
      </div>

      <div className="flex-grow flex flex-col overflow-y-auto no-scrollbar pt-4">
        {view === AppView.COVER && (
          <CoverView onEnter={() => setView(AppView.HOME)} />
        )}

        {view === AppView.HOME && (
          <HomeView onSelectCategory={handleSelectCategory} />
        )}

        {view === AppView.MENU && (
          <MenuView />
        )}

        {view === AppView.RECOMMEND && (
          <RecommendView />
        )}

        {view === AppView.ADMIN && (
          <AdminPanel />
        )}

        {/* Placeholder for Search/Profile if needed */}
        {(view === AppView.SEARCH || view === AppView.PROFILE) && (
          <div className="flex-grow flex items-center justify-center p-12 text-center">
            <div className="bg-white p-8 border-2 border-black rotate-1">
              <h2 className="font-punk text-3xl">Under Construction</h2>
              <p className="font-hand mt-4">The rebellion is busy cooking.</p>
              <button 
                onClick={() => setView(AppView.HOME)}
                className="mt-6 bg-primary text-white px-4 py-2 font-punk text-xl border-2 border-black"
              >
                GO BACK
              </button>
            </div>
          </div>
        )}
      </div>

      <Navigation currentView={view} setView={setView} />
      
      {/* Global CSS for animations & noise */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .flyer-shadow {
          box-shadow: 5px 5px 0px 0px rgba(0,0,0,0.15);
        }
      `}} />
    </div>
  );
};

export default App;
