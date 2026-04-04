import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { StaticDescriptions } from '@/entities';
import { useLanguageStore } from '@/lib/languageStore';

export default function MissionVisionPage() {
  const [content, setContent] = useState<StaticDescriptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguageStore();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { items } = await BaseCrudService.getAll<StaticDescriptions>('staticdescriptions');
      const missionContent = items.find(item => item.page === 'mission-vision');
      setContent(missionContent || null);
    } catch (error) {
      console.error('Error loading mission content:', error);
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
                    {language === 'en' ? content.titleEn : content.titleZh || content.titleEn || 'Mission & Vision'}
                  </h1>
                  <div 
                    className="text-lg leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{ __html: language === 'en' ? (content.descriptionEn || '') : (content.descriptionZh || content.descriptionEn || '') }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative aspect-[3/4]"
                >
                  <Image
                    src={content.pageImage || 'https://static.wixstatic.com/media/c418c8_90a165930e134a67a309eba2306689fa~mv2.png?originWidth=576&originHeight=768'}
                    alt={language === 'en' ? 'Mission and Vision' : '使命與願景'}
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
