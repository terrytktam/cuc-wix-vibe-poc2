import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { StaticDescriptions } from '@/entities';
import { useLanguageStore } from '@/lib/languageStore';
import { useSEO } from '@/hooks/useSEO';

interface DonationProgram {
  _id: string;
  programNameEn?: string;
  programNameZh?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  programImage?: string;
}

export default function SupportPage() {
  const { language } = useLanguageStore();
  const [content, setContent] = useState<StaticDescriptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useSEO('support');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const [staticContent] = await Promise.all([
        BaseCrudService.getAll<StaticDescriptions>('staticdescriptions'),
      ]);
      
      const supportContent = staticContent.items.find(item => item.page === 'support');
      setContent(supportContent || null);
    } catch (error) {
      console.error('Error loading support content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      
      <main className="pt-32 pb-32">
        <div className="max-w-[100rem] mx-auto px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
              >
                <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl mb-8 text-foreground">
                  {language === 'en' ? 'Support Us' : '支持我們'}
                </h1>
                {content && (
                  <div 
                    className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: language === 'en' ? (content.description_en || '') : (content.description_zh || content.description_en || '') }}
                  />
                )}
              </motion.div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
