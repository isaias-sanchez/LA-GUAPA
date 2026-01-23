
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppView, MenuCategory, MenuItem } from './types';
import FanzineHeader from './components/FanzineHeader';
import Navigation from './components/Navigation';
import CoverView from './components/CoverView';
import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import RecommendView from './components/RecommendView';
import AdminPanel from './components/AdminPanel';
import ProductDetailView from './components/ProductDetailView';
import { StoryJourney } from './components/StoryJourney';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.COVER);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleSelectCategory = (cat: MenuCategory) => {
    setView(AppView.MENU);
  };

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
    setView(AppView.DETAIL);
  };

  const toggleAdmin = () => {
    setView(prev => prev === AppView.ADMIN ? AppView.HOME : AppView.ADMIN);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative overflow-hidden flex flex-col bg-background-light dark:bg-background-dark">
      {/* Visual Overlays */}
      <div className="fixed inset-0 texture-overlay w-full h-full z-50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-paper-light/30 dark:bg-black/20 pointer-events-none"></div>

      <div onClick={(e) => {
        if (e.detail === 3) toggleAdmin();
      }}>
        {view !== AppView.DETAIL && <FanzineHeader />}
      </div>

      <main className="flex-grow flex flex-col overflow-y-auto no-scrollbar pt-4 pb-24 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={view === AppView.DETAIL ? `detail-${selectedItem?.id}` : view}
            initial={{ opacity: 0, x: 20, rotate: 1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -20, rotate: -1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex-grow flex flex-col"
          >
            {view === AppView.COVER && (
              <CoverView onEnter={() => setView(AppView.HOME)} />
            )}

            {view === AppView.HOME && (
              <HomeView onSelectCategory={handleSelectCategory} />
            )}

            {view === AppView.MENU && (
              <MenuView onSelectItem={handleSelectItem} />
            )}

            {view === AppView.RECOMMEND && (
              <RecommendView />
            )}

            {view === AppView.JOURNEY && (
              <StoryJourney />
            )}

            {view === AppView.ADMIN && (
              <AdminPanel />
            )}

            {view === AppView.DETAIL && selectedItem && (
              <ProductDetailView 
                item={selectedItem} 
                onBack={() => setView(AppView.MENU)} 
              />
            )}

            {(view === AppView.SEARCH || view === AppView.PROFILE) && (
              <div className="flex-grow flex items-center justify-center p-12 text-center">
                <div className="bg-white p-8 border-2 border-black rotate-1">
                  <h2 className="font-punk text-3xl text-secondary">En Construcción</h2>
                  <p className="font-hand mt-4 text-dark">La rebelión está ocupada cocinando.</p>
                  <button 
                    onClick={() => setView(AppView.HOME)}
                    className="mt-6 bg-primary text-white px-4 py-2 font-punk text-xl border-2 border-black"
                  >
                    VOLVER
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {view !== AppView.DETAIL && <Navigation currentView={view} setView={setView} />}
      
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
        .shadow-heavy {
          box-shadow: 6px 6px 0px 0px rgba(0,0,0,1);
        }
      `}} />
    </div>
  );
};

export default App;
