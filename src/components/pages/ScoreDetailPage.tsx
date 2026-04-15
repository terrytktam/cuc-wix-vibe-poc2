import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ExternalLink, Music } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { SheetMusicCatalog, Songs } from '@/entities';
import { useLanguageStore } from '@/lib/languageStore';
import { useSEO } from '@/hooks/useSEO';

export default function ScoreDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [score, setScore] = useState<SheetMusicCatalog | null>(null);
  const [song, setSong] = useState<Songs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguageStore();
  useSEO('sheet-music');

  useEffect(() => {
    if (id) {
      loadScore();
    }
  }, [id]);

  const loadScore = async () => {
    try {
      const data = await BaseCrudService.getById<SheetMusicCatalog>('scores', id!);
      setScore(data);
      
      // Load song if songId exists
      if (data?.songId) {
        const songData = await BaseCrudService.getById<Songs>('songs', data.songId);
        setSong(songData);
      }
    } catch (error) {
      console.error('Error loading score:', error);
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
            ) : !score ? (
              <div className="text-center py-32">
                <h1 className="font-heading text-5xl mb-4">
                  {language === 'en' ? 'Score Not Found' : '樂譜未找到'}
                </h1>
                <p className="text-xl">
                  {language === 'en' ? "The score you're looking for doesn't exist" : '您要查找的樂譜不存在'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-[3/4] lg:sticky lg:top-32"
                >
                  <Image
                    src={score.itemImage || 'https://static.wixstatic.com/media/c418c8_6c13cacb65714369b3603db060d37dca~mv2.png?originWidth=576&originHeight=768'}
                    alt={score.itemName || 'Sheet Music'}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="font-heading text-5xl md:text-6xl mb-6 text-foreground">
                    {song ? (language === 'en' ? song.nameEn : song.nameZh || song.nameEn) : score.itemName}
                  </h1>

                  <div className="space-y-4 mb-8">
                    {score.voicing && (
                      <p className="text-lg">
                        <span className="text-primary">{language === 'en' ? 'Voicing' : '聲部'}:</span> {score.voicing}
                      </p>
                    )}
                    {score.series1 && (
                      <p className="text-lg">
                        <span className="text-primary">{language === 'en' ? 'Series' : '系列'}:</span> {score.series}
                      </p>
                    )}
                    {language === 'en' ? score.languageEn : score.languageZh || score.languageEn ? (
                      <p className="text-lg">
                        <span className="text-primary">{language === 'en' ? 'Language' : '語言'}:</span> {language === 'en' ? score.languageEn : score.languageZh || score.languageEn}
                      </p>
                    ) : null}
                    {score.publishYear && (
                      <p className="text-lg">
                        <span className="text-primary">{language === 'en' ? 'Published' : '出版'}:</span> {score.publishYear}
                      </p>
                    )}
                  </div>

                  {/* Song Details Section */}
                  {song && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="border border-muted-grey p-6 mb-8"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Music size={20} className="text-primary" />
                        <h3 className="font-heading text-2xl text-primary">
                          {language === 'en' ? 'Song Information' : '歌曲信息'}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-foreground opacity-75 mb-1">
                            {language === 'en' ? 'Title' : '標題'}
                          </p>
                          <p className="text-base font-medium">
                            {language === 'en' ? song.nameEn : song.nameZh || song.nameEn}
                          </p>
                        </div>
                        {(language === 'en' ? song.composerEn : song.composerZh || song.composerEn) && (
                          <div>
                            <p className="text-sm text-foreground opacity-75 mb-1">
                              {language === 'en' ? 'Composer' : '作曲家'}
                            </p>
                            <p className="text-base">
                              {language === 'en' ? song.composerEn : song.composerZh || song.composerEn}
                            </p>
                          </div>
                        )}
                        {(language === 'en' ? song.lyricistEn : song.lyricistZh || song.lyricistEn) && (
                          <div>
                            <p className="text-sm text-foreground opacity-75 mb-1">
                              {language === 'en' ? 'Lyricist' : '作詞家'}
                            </p>
                            <p className="text-base">
                              {language === 'en' ? song.lyricistEn : song.lyricistZh || song.lyricistEn}
                            </p>
                          </div>
                        )}
                        {(language === 'en' ? song.arrangerEn : song.arrangerZh || song.arrangerEn) && (
                          <div>
                            <p className="text-sm text-foreground opacity-75 mb-1">
                              {language === 'en' ? 'Arranger' : '編排者'}
                            </p>
                            <p className="text-base">
                              {language === 'en' ? song.arrangerEn : song.arrangerZh || song.arrangerEn}
                            </p>
                          </div>
                        )}
                        {(language === 'en' ? song.singerEn : song.singerZh || song.singerEn) && (
                          <div>
                            <p className="text-sm text-foreground opacity-75 mb-1">
                              {language === 'en' ? 'Singer' : '歌手'}
                            </p>
                            <p className="text-base">
                              {language === 'en' ? song.singerEn : song.singerZh || song.singerEn}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-4 mt-8">
                    {score.previewUrl && (
                      <a
                        href={score.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-lg font-medium transition-all duration-300 hover:bg-opacity-90 w-full"
                      >
                        {language === 'en' ? 'Preview Score' : '預覽樂譜'}
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {score.demoUrl && (
                      <a
                        href={score.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-transparent text-foreground border border-foreground px-6 py-3 text-lg transition-all duration-300 hover:bg-foreground hover:text-background w-full"
                      >
                        {language === 'en' ? 'Listen to Demo' : '聆聽示範'}
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {score.itemUrl && (
                      <a
                        href={score.itemUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-transparent text-foreground border border-foreground px-6 py-3 text-lg transition-all duration-300 hover:bg-foreground hover:text-background w-full"
                      >
                        {language === 'en' ? 'Order Now' : '立即訂購'}
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
