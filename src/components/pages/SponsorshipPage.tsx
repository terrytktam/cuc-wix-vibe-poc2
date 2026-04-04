import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { StaticDescriptions } from '@/entities';
import { useLanguageStore } from '@/lib/languageStore';

export default function SponsorshipPage() {
  const [content, setContent] = useState<StaticDescriptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguageStore();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { items } = await BaseCrudService.getAll<StaticDescriptions>('staticdescriptions');
      const sponsorshipContent = items.find(item => item.page === 'sponsorship');
      setContent(sponsorshipContent || null);
    } catch (error) {
      console.error('Error loading sponsorship content:', error);
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
                <h1 className="font-heading text-6xl md:text-7xl mb-8 text-foreground">
                  {language === 'en' ? 'Sponsorship Programs' : '贊助計劃'}
                </h1>
                <p className="text-xl max-w-4xl mx-auto leading-relaxed">
                  {language === 'en' 
                    ? 'Thank you for your interest in supporting CU Chorus. Your sponsorship helps us continue our mission of promoting the art of choral music through high-quality performances and innovative programs.'
                    : '感謝您對支持中大合唱團的興趣。您的贊助幫助我們通過高質量的演出和創新計劃繼續推廣合唱藝術的使命。'
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="font-heading text-6xl md:text-7xl mb-8 text-foreground">
                    {language === 'en' ? content.titleEn : content.titleZh || content.titleEn || 'Sponsorship Programs'}
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
                    src={content.pageImage || 'https://static.wixstatic.com/media/c418c8_742ba87e023b4b0c8cf99733efd4ca05~mv2.png?originWidth=576&originHeight=768'}
                    alt={language === 'en' ? 'Sponsorship' : '贊助'}
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
