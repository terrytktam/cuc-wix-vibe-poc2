import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguageStore } from '@/lib/languageStore';
import { getSEOConfig, updateSEOHead } from '@/lib/seo';

export const useSEO = (pageKey: string) => {
  const location = useLocation();
  const { language } = useLanguageStore();

  useEffect(() => {
    const seoConfig = getSEOConfig(pageKey, language);
    updateSEOHead(seoConfig, language, location.pathname);
  }, [pageKey, language, location.pathname]);
};
