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

export default function MusicDirectorPage() {
  const [content, setContent] = useState<StaticDescriptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguageStore();
  useSEO('music-director');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { items } = await BaseCrudService.getAll<StaticDescriptions>('staticdescriptions');
      const directorContent = items.find(item => item.page === 'music-director');
      setContent(directorContent || null);
    } catch (error) {
      console.error('Error loading director content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      
      <main className="pt-32 pb-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="min-h-[60vh]">
            {isLoading ? (
              <div className="flex items-center justify-center py-32">
                <LoadingSpinner />
              </div>
            ) : !content ? (
              <div className="text-center py-32">
                <p className="text-xl">{language === 'en' ? 'Content not available' : '內容不可用'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="font-heading text-6xl md:text-7xl mb-8 text-foreground">
                    {language === 'en' ? content.titleEn : content.titleZh || content.titleEn || 'Music Director & Conductor'}
                  </h1>
                  <div 
                    className="text-lg leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{ __html: language === 'en' ? (content.description_en || '') : (content.description_zh || content.description_en || '') }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative aspect-[3/4]"
                >
                  <Image
                    src={content.pageImage || 'https://static.wixstatic.com/media/c418c8_a75f17116ae54af2a6c10de38eddf001~mv2.png?originWidth=576&originHeight=768'}
                    alt={language === 'en' ? 'Music Director & Conductor' : '音樂總監及指揮'}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
