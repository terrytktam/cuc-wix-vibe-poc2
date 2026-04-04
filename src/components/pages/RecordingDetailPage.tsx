import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ExternalLink } from 'lucide-react';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Recordings } from '@/entities';
import { useLanguageStore } from '@/lib/languageStore';

export default function RecordingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [recording, setRecording] = useState<Recordings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();
  const { language } = useLanguageStore();

  useEffect(() => {
    if (id) {
      loadRecording();
    }
  }, [id]);

  const loadRecording = async () => {
    try {
      const data = await BaseCrudService.getById<Recordings>('recordings', id!);
      setRecording(data);
    } catch (error) {
      console.error('Error loading recording:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAdding = addingItemId === recording?._id;

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
            ) : !recording ? (
              <div className="text-center py-32">
                <h1 className="font-heading text-5xl mb-4">
                  {language === 'en' ? 'Recording Not Found' : '錄音未找到'}
                </h1>
                <p className="text-xl">
                  {language === 'en' ? "The recording you're looking for doesn't exist" : '您要查找的錄音不存在'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-square lg:sticky lg:top-32"
                >
                  <Image
                    src={recording.itemImage || 'https://static.wixstatic.com/media/c418c8_26334df1817245e0a171458f233b1534~mv2.png?originWidth=576&originHeight=576'}
                    alt={recording.itemName || 'Recording'}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="font-heading text-5xl md:text-6xl mb-6 text-foreground">
                    {recording.itemName}
                  </h1>

                  <div className="space-y-4 mb-8">
                    {recording.releaseYear && (
                      <p className="text-lg">
                        <span className="text-primary">{language === 'en' ? 'Release Year' : '發行年份'}:</span> {recording.releaseYear}
                      </p>
                    )}
                    {recording.cucId && (
                      <p className="text-lg">
                        <span className="text-primary">CUC ID:</span> {recording.cucId}
                      </p>
                    )}
                    {recording.isrc && (
                      <p className="text-lg">
                        <span className="text-primary">ISRC:</span> {recording.isrc}
                      </p>
                    )}
                  </div>

                  {language === 'en' ? recording.introductionEn : recording.introductionZh || recording.introductionEn ? (
                    <div className="mb-8">
                      <h2 className="font-heading text-3xl mb-4 text-foreground">
                        {language === 'en' ? 'About' : '關於'}
                      </h2>
                      <div 
                        className="text-lg leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ __html: language === 'en' ? (recording.introductionEn || '') : (recording.introductionZh || recording.introductionEn || '') }}
                      />
                    </div>
                  ) : null}

                  {language === 'en' ? recording.songlistEn : recording.songlistZh || recording.songlistEn ? (
                    <div className="mb-8">
                      <h2 className="font-heading text-3xl mb-4 text-foreground">
                        {language === 'en' ? 'Track List' : '曲目列表'}
                      </h2>
                      <div 
                        className="text-base leading-relaxed space-y-2"
                        dangerouslySetInnerHTML={{ __html: language === 'en' ? (recording.songlistEn || '') : (recording.songlistZh || recording.songlistEn || '') }}
                      />
                    </div>
                  ) : null}

                  <div className="border-t border-b border-muted-grey py-8 mb-8">
                    <p className="text-4xl font-heading text-primary mb-6">
                      {formatPrice(recording.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                    </p>
                    <button
                      onClick={() => actions.addToCart({ 
                        collectionId: 'recordings', 
                        itemId: recording._id 
                      })}
                      disabled={isAdding}
                      className="w-full bg-primary text-primary-foreground px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-opacity-90 disabled:opacity-50"
                    >
                      {isAdding ? (language === 'en' ? 'Adding to Cart...' : '添加到購物車中...') : (language === 'en' ? 'Add to Cart' : '加入購物車')}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {recording.previewUrl && (
                      <a
                        href={recording.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-transparent text-foreground border border-foreground px-6 py-3 text-lg transition-all duration-300 hover:bg-foreground hover:text-background w-full"
                      >
                        {language === 'en' ? 'Preview' : '預覽'}
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {recording.spotifyUrl && (
                      <a
                        href={recording.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-transparent text-foreground border border-foreground px-6 py-3 text-lg transition-all duration-300 hover:bg-foreground hover:text-background w-full"
                      >
                        {language === 'en' ? 'Listen on Spotify' : '在 Spotify 上聆聽'}
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
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
