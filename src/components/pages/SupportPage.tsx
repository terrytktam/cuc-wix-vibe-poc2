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

export default function SupportPage() {
  const { language } = useLanguageStore();
  const [content, setContent] = useState<StaticDescriptions | null>(null);
  const [programs, setPrograms] = useState<StaticDescriptions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useSEO('support');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const staticContent = await BaseCrudService.getAll<StaticDescriptions>('staticdescriptions');
      
      const supportContent = staticContent.items.find(item => item.page === 'support');
      setContent(supportContent || null);

      // Get the four donation programs from StaticDescriptions
      const programNames = ['Annual Fund', 'On Wings of Song', 'Student Ticket', 'Canticum Novum H.K.'];
      const donationPrograms = staticContent.items.filter(item => 
        programNames.includes(item.page || '')
      );
      setPrograms(donationPrograms);
    } catch (error) {
      console.error('Error loading support content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
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
                className="text-center mb-24"
              >
                <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl mb-8 text-foreground">
                  {language === 'en' ? 'Support Us' : '支持我們'}
                </h1>
                {content && (
                  <div 
                    className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-secondary-foreground"
                    dangerouslySetInnerHTML={{ __html: language === 'en' ? (content.description_en || '') : (content.description_zh || content.description_en || '') }}
                  />
                )}
              </motion.div>

              {/* 2x2 Grid Layout for Donation Programs */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
              >
                {programs.map((program) => (
                  <motion.div
                    key={program._id}
                    variants={itemVariants}
                    className="group"
                  >
                    <div className="bg-secondary rounded-lg overflow-hidden h-full flex flex-col hover:bg-opacity-80 transition-all duration-300">
                      {/* Image Section */}
                      {program.pageImage && (
                        <div className="relative w-full h-64 overflow-hidden bg-muted-grey">
                          <Image
                            src={program.pageImage}
                            alt={language === 'en' ? program.titleEn || '' : program.titleZh || ''}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            width={500}
                          />
                        </div>
                      )}

                      {/* Content Section */}
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="font-heading text-3xl md:text-4xl mb-4 text-primary">
                          {language === 'en' ? program.titleEn : program.titleZh}
                        </h3>
                        
                        <div 
                          className="text-base md:text-lg leading-relaxed text-secondary-foreground flex-grow"
                          dangerouslySetInnerHTML={{ 
                            __html: language === 'en' 
                              ? (program.description_en || '') : (program.description_zh || program.description_en || '')
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
