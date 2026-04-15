import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { SheetMusicCatalog, StaticDescriptions, Songs } from '@/entities';
import { useLanguageStore, buildLocalizedPath } from '@/lib/languageStore';
import { useSEO } from '@/hooks/useSEO';
import { Input } from '@/components/ui/input';

interface ScoreWithSongDetails extends SheetMusicCatalog {
  songDetails?: Songs;
}

interface SeriesStaticContent {
  introduction: StaticDescriptions | null;
  ordering: StaticDescriptions | null;
  payment: StaticDescriptions | null;
}

export default function SheetMusicListingPage() {
  const { series } = useParams<{ series: string }>();
  const [scores, setScores] = useState<ScoreWithSongDetails[]>([]);
  const [filteredScores, setFilteredScores] = useState<ScoreWithSongDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [staticContent, setStaticContent] = useState<SeriesStaticContent>({
    introduction: null,
    ordering: null,
    payment: null
  });
  const { language } = useLanguageStore();
  useSEO('sheet-music');

  useEffect(() => {
    if (series) {
      loadScores();
      loadStaticContent();
    }
  }, [series]);

  useEffect(() => {
    const filtered = scores.filter(score => {
      const query = searchQuery.toLowerCase();
      const matchesVoicing = score.voicing?.toLowerCase().includes(query);
      const matchesComposer = score.songDetails?.composerEn?.toLowerCase().includes(query) ||
                              score.songDetails?.composerZh?.toLowerCase().includes(query);
      const matchesLyricist = score.songDetails?.lyricistEn?.toLowerCase().includes(query) ||
                              score.songDetails?.lyricistZh?.toLowerCase().includes(query);
      const matchesArranger = score.songDetails?.arrangerEn?.toLowerCase().includes(query) ||
                              score.songDetails?.arrangerZh?.toLowerCase().includes(query);
      const matchesSinger = score.songDetails?.singerEn?.toLowerCase().includes(query) ||
                            score.songDetails?.singerZh?.toLowerCase().includes(query);
      const matchesSongName = score.songDetails?.nameEn?.toLowerCase().includes(query) ||
                              score.songDetails?.nameZh?.toLowerCase().includes(query);
      
      return matchesVoicing || matchesComposer || matchesLyricist || 
             matchesArranger || matchesSinger || matchesSongName;
    });
    setFilteredScores(filtered);
  }, [searchQuery, scores]);

  const loadStaticContent = async () => {
    try {
      const { items } = await BaseCrudService.getAll<StaticDescriptions>('staticdescriptions');
      
      // Map series to their static description page names
      const seriesPageMap: Record<string, { intro: string; ordering: string; payment: string }> = {
        'choral': {
          intro: 'ScoresChoralSeriesIntroduction',
          ordering: 'ScoresChoralSeriesOrdering',
          payment: 'ScoresChoralSeriesPayment'
        },
        'cantonese': {
          intro: 'ScoresCantoneseSeriesIntroduction',
          ordering: 'ScoresCantoneseSeriesOrdering',
          payment: 'ScoresCantoneseSeriesPayment'
        },
        'chorphilia': {
          intro: 'ScoresChorphillaIntroduction',
          ordering: 'ScoresChorphillaOrdering',
          payment: 'ScoresChorphillaPayment'
        }
      };

      const pageNames = seriesPageMap[series?.toLowerCase() || ''];
      
      if (pageNames) {
        const introduction = items.find(item => item.page === pageNames.intro) || null;
        const ordering = items.find(item => item.page === pageNames.ordering) || null;
        const payment = items.find(item => item.page === pageNames.payment) || null;
        
        setStaticContent({ introduction, ordering, payment });
      }
    } catch (error) {
      console.error('Error loading static content:', error);
    }
  };

  const loadScores = async () => {
    try {
      const { items } = await BaseCrudService.getAll<SheetMusicCatalog>('scores', {
        singleRef: ['songId']
      });
      const filteredScores = items.filter(score => {
        if (score.isHidden) return false;
        
        // Handle series1 as tags - check if series1 contains the target series1
        // Works with both comma-separated strings and array formats
        if (!score.series1) return false;
        
        const seriesTags = Array.isArray(score.series1) 
          ? score.series1 
          : score.series1.split(',').map(s => s.trim());
        
        return seriesTags.some(tag => 
          tag.toLowerCase() === series?.toLowerCase()
        );
      });
      
      // Attach song details to each score
      const scoresWithDetails: ScoreWithSongDetails[] = filteredScores.map(score => ({
        ...score,
        songDetails: (score as any).songId as Songs
      }));
      
      setScores(scoresWithDetails);
      setFilteredScores(scoresWithDetails);
    } catch (error) {
      console.error('Error loading scores:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeriesTitle = () => {
    switch (series) {
      case 'choral':
        return language === 'en' ? 'CU Chorus Choral Series' : '中大合唱系列';
      case 'cantonese':
        return language === 'en' ? 'CU Chorus Cantonese Series' : '中大粵語流行曲系列';
      case 'chorphilia':
        return 'Chorphilia';
      default:
        return language === 'en' ? 'Sheet Music' : '樂譜';
    }
  };

  const renderStaticSection = (content: StaticDescriptions | null, sectionTitle: string) => {
    if (!content) return null;
    
    const richText = language === 'en' ? content.description_en : content.description_zh;
    const plainText = language === 'en' ? content.descriptionEn : content.descriptionZh;
    const displayContent = richText || plainText;
    
    if (!displayContent) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 pb-12 border-b border-primary border-opacity-30"
      >
        <h2 className="font-heading text-4xl md:text-5xl mb-8 text-foreground">
          {sectionTitle}
        </h2>
        <div className="max-w-4xl text-lg leading-relaxed text-foreground opacity-90">
          {typeof displayContent === 'string' ? (
            <p>{displayContent}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: displayContent }} />
          )}
        </div>
      </motion.div>
    );
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
              {getSeriesTitle()}
            </h1>
          </motion.div>

          {/* Static Content Sections */}
          <div className="mb-20 max-w-4xl mx-auto">
            {renderStaticSection(
              staticContent.introduction,
              language === 'en' ? 'Introduction' : '介紹'
            )}
            {renderStaticSection(
              staticContent.ordering,
              language === 'en' ? 'Ordering' : '訂購'
            )}
            {renderStaticSection(
              staticContent.payment,
              language === 'en' ? 'Payment' : '付款'
            )}
          </div>

          {!isLoading && scores.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 flex justify-center"
            >
              <Input
                type="text"
                placeholder={language === 'en' ? 'Search scores...' : '搜尋樂譜...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md bg-secondary text-foreground border border-primary placeholder:text-foreground placeholder:opacity-50"
              />
            </motion.div>
          )}

          <div className="min-h-[40vh]">
            {isLoading ? (
              null
            ) : filteredScores.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl">
                  {searchQuery 
                    ? (language === 'en' ? 'No scores match your search' : '沒有符合您搜尋的樂譜')
                    : (language === 'en' ? 'No scores available in this series' : '此系列中沒有可用的樂譜')
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {filteredScores.map((score, index) => (
                  <motion.div
                    key={score._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <Link to={`/${language}/score/${score._id}`} className="group block h-full">
                      <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                        <Image
                          src={score.itemImage || 'https://static.wixstatic.com/media/c418c8_ccc8f6635f95461eb322a9b5ed034fba~mv2.png?originWidth=384&originHeight=512'}
                          alt={score.songDetails?.nameEn || 'Sheet Music'}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h2 className="font-heading text-2xl mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                        {language === 'en' ? score.songDetails?.nameEn : score.songDetails?.nameZh}
                      </h2>
                      {score.voicing && (
                        <p className="text-sm text-foreground opacity-70 mb-2">{score.voicing}</p>
                      )}
                      {score.songDetails && (
                        <div className="text-xs text-foreground opacity-60 space-y-1 mb-3">
                          {score.songDetails.composerEn && (
                            <p>{language === 'en' ? 'Composer: ' : '作曲家: '}{language === 'en' ? score.songDetails.composerEn : score.songDetails.composerZh}</p>
                          )}
                          {score.songDetails.lyricistEn && (
                            <p>{language === 'en' ? 'Lyricist: ' : '作詞家: '}{language === 'en' ? score.songDetails.lyricistEn : score.songDetails.lyricistZh}</p>
                          )}
                          {score.songDetails.arrangerEn && (
                            <p>{language === 'en' ? 'Arranger: ' : '編曲家: '}{language === 'en' ? score.songDetails.arrangerEn : score.songDetails.arrangerZh}</p>
                          )}
                        </div>
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
