import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'zh';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  initializeLanguage: (lang: Language) => void;
}

const STORAGE_KEY = 'cu-chorus-language';

export const useLanguageStore = create<LanguageStore>(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'zh' : 'en' })),
      initializeLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ language: state.language }),
    }
  )
);

// Helper to get language from URL or localStorage
export const getLanguageFromPath = (pathname: string): Language => {
  const match = pathname.match(/^\/(?:en|zh)/);
  return (match?.[1] as Language) || 'en';
};

// Helper to build language-prefixed path
export const buildLocalizedPath = (path: string, language: Language): string => {
  // Remove existing language prefix if present
  const cleanPath = path.replace(/^\/(?:en|zh)/, '') || '/';
  return `/${language}${cleanPath}`;
};
