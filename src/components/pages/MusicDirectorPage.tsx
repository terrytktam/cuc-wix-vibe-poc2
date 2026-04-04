import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Biographies } from '@/entities';

export default function MusicDirectorPage() {
  const [director, setDirector] = useState<Biographies | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDirector();
  }, []);

  const loadDirector = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Biographies>('biographies');
      const directorBio = items.find(item => item.title === 'music-director');
      setDirector(directorBio || null);
    } catch (error) {
      console.error('Error loading director bio:', error);
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
            ) : !director ? (
              <div className="text-center py-32">
                <p className="text-xl">Content not available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-[3/4] lg:sticky lg:top-32"
                >
                  <Image
                    src={director.portraitImage || 'https://static.wixstatic.com/media/c418c8_a75f17116ae54af2a6c10de38eddf001~mv2.png?originWidth=576&originHeight=768'}
                    alt={director.nameEn || 'Music Director'}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="font-heading text-6xl md:text-7xl mb-4 text-foreground">
                    {director.nameEn}
                  </h1>
                  <p className="text-2xl text-primary mb-8">Music Director & Conductor</p>
                  <div 
                    className="text-lg leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{ __html: director.descriptionEn || '' }}
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
