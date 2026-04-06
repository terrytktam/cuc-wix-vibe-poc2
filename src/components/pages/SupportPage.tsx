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
  const [programs, setPrograms] = useState<DonationProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useSEO('support');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const [staticContent, donationPrograms] = await Promise.all([
        BaseCrudService.getAll<StaticDescriptions>('staticdescriptions'),
        BaseCrudService.getAll<DonationProgram>('donationprograms')
      ]);
      
      const supportContent = staticContent.items.find(item => item.page === 'support');
      setContent(supportContent || null);
      setPrograms(donationPrograms.items || []);
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
                    dangerouslySetInnerHTML={{ __html: language === 'en' ? (content.descriptionEn || '') : (content.descriptionZh || content.descriptionEn || '') }}
                  />
                )}
              </motion.div>

              {/* Donation Programs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {programs.length > 0 ? (
                  programs.map((program, index) => (
                    <motion.div
                      key={program._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="group block">
                        <div className="relative aspect-[4/5] mb-6 overflow-hidden">
                          <Image
                            src={program.programImage || 'https://static.wixstatic.com/media/c418c8_0ad917176870435b9a5ccb5386ba55ec~mv2.png?originWidth=960&originHeight=1216'}
                            alt={language === 'en' ? (program.programNameEn || '') : (program.programNameZh || program.programNameEn || '')}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h2 className="font-heading text-4xl mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                          {language === 'en' ? program.programNameEn : program.programNameZh || program.programNameEn}
                        </h2>
                        <p className="text-lg leading-relaxed text-foreground opacity-80">
                          {language === 'en' ? program.descriptionEn : program.descriptionZh || program.descriptionEn}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="text-xl">{language === 'en' ? 'No programs available' : '沒有可用的計劃'}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
