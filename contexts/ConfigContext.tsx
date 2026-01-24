import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { HistoryPost } from '../types';

// Define the shape of our configuration
export interface AppConfig {
    // Cover / Diario Settings
    coverTitle: string;
    stickerText: string;
    ownerText: string;
    manifestoText: string;
    primaryColor: string;
    secondaryColor: string;
    isPublic: boolean;

    // History Settings
    historyPosts: HistoryPost[];
    historyLineColor: string;
}

// Default configuration values
const DEFAULT_CONFIG: AppConfig = {
    coverTitle: "DIARIO\nDE UN\nVIAJE",
    stickerText: "Confidencial\nExilio 2024",
    ownerText: "Propiedad de:\nEl Exiliado",
    manifestoText: "Bienvenidos a mi exilio. Lo que tienes aquí no es una lista de precios, sino los retazos de una maleta que recorrió el mundo buscando un sabor que solo existía en mi memoria.",
    primaryColor: "#D4AF37",
    secondaryColor: "#1a1a1a",
    isPublic: true,

    historyLineColor: "#D4AF37",
    historyPosts: [
        {
            id: '1',
            date: 'LONDRES 2018',
            title: 'LONDRES 2018',
            content: `"El frío de Camden Town me obligó a buscar refugio en la cocina. Aquí nació la idea de la Gigi Hadid; quería una burger que supiera a Barranquilla pero con la mística del West End."`,
            imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop',
            reactions: { likes: 124, dislikes: 2 },
            isNews: false
        },
        {
            id: '2',
            date: 'MADRID 2021',
            title: 'MADRID 2021',
            content: `"Malasaña nos dio la rebeldía. Aprendimos que un cocktail puede ser un poema y que el 'Cielo Tinto' debía llevar el fuego de la noche española."`,
            imageUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7a56?q=80&w=600&auto=format&fit=crop',
            reactions: { likes: 89, dislikes: 5 },
            isNews: false
        },
        {
            id: '3',
            date: 'EL REGRESO',
            title: 'EL REGRESO',
            content: `"Finalmente, la maleta se abrió en la Calle 92. Barranquilla, el destino final de este exilio."`,
            imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
            reactions: { likes: 256, dislikes: 0 },
            isNews: false
        }
    ]
};

interface ConfigContextType {
    config: AppConfig;
    updateConfig: (newConfig: Partial<AppConfig>) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize from localStorage if available, otherwise use defaults
    const [config, setConfig] = useState<AppConfig>(() => {
        const saved = localStorage.getItem('app_config');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge parsed config with DEFAULT_CONFIG to ensure new fields (like historyPosts) exist
                return { ...DEFAULT_CONFIG, ...parsed };
            } catch (e) {
                console.error("Error parsing config", e);
                return DEFAULT_CONFIG;
            }
        }
        return DEFAULT_CONFIG;
    });

    const updateConfig = (newConfig: Partial<AppConfig>) => {
        setConfig(prev => {
            const updated = { ...prev, ...newConfig };
            localStorage.setItem('app_config', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <ConfigContext.Provider value={{ config, updateConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};
