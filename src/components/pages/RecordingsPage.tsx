import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Recordings } from '@/entities';
import { useLanguageStore, buildLocalizedPath } from '@/lib/languageStore';
import { useSEO } from '@/hooks/useSEO';

export default function RecordingsPage() {
  const [recordings, setRecordings] = useState<Recordings[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguageStore();
  useSEO('recordings');

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Recordings>('recordings');
      setRecordings(items);
    } catch (error) {
      console.error('Error loading recordings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      
      <main className="pt-32 pb-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl mb-8 text-foreground">
              {language === 'en' ? 'Recordings' : '錄音'}
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              {language === 'en' ? 'Explore our collection of albums and recordings' : '探索我們的專輯和錄音集合'}
            </p>
          </motion.div>

          <div className="min-h-[40vh]">
            {isLoading ? (
              null
            ) : recordings.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl">
                  {language === 'en' ? 'No recordings available' : '沒有可用的錄音'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {recordings.map((recording, index) => (
                  <motion.div
                    key={recording._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <Link to={`/${language}/recording/${recording._id}`} className="group block h-full">
                      <div className="relative aspect-square mb-4 overflow-hidden">
                        <Image
                          src={recording.itemImage || 'https://static.wixstatic.com/media/c418c8_06f60772399a489193a730c7da4dd1c0~mv2.png?originWidth=384&originHeight=384'}
                          alt={recording.itemName || 'Recording'}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h2 className="font-heading text-2xl mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                        {recording.itemName}
                      </h2>
                      {recording.releaseYear && (
                        <p className="text-sm text-foreground opacity-70">{recording.releaseYear}</p>
                      )}
                      <p className="text-sm text-foreground opacity-50 mt-3">
                        {language === 'en' ? 'View Details' : '查看詳情'}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
