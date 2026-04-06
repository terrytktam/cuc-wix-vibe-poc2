import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import { BaseCrudService } from '@/integrations';
import { SheetMusicCatalog, StaticDescriptions } from '@/entities';
import { useLanguageStore, buildLocalizedPath } from '@/lib/languageStore';
import { useSEO } from '@/hooks/useSEO';
import { Input } from '@/components/ui/input';

export default function SheetMusicListingPage() {
  const { series } = useParams<{ series: string }>();
  const [scores, setScores] = useState<SheetMusicCatalog[]>([]);
  const [filteredScores, setFilteredScores] = useState<SheetMusicCatalog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [description, setDescription] = useState<StaticDescriptions | null>(null);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();
  const { language } = useLanguageStore();
  useSEO('sheet-music');

  useEffect(() => {
    loadScores();
    loadDescription();
  }, [series]);

  useEffect(() => {
    const filtered = scores.filter(score => 
      score.itemName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      score.voicing?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredScores(filtered);
  }, [searchQuery, scores]);

  const loadDescription = async () => {
    try {
      const { items } = await BaseCrudService.getAll<StaticDescriptions>('staticdescriptions');
      const pageDescription = items.find(item => 
        item.page?.toLowerCase() === `sheet-music-${series}`.toLowerCase()
      );
      setDescription(pageDescription || null);
    } catch (error) {
      console.error('Error loading description:', error);
    }
  };

  const loadScores = async () => {
    try {
      const { items } = await BaseCrudService.getAll<SheetMusicCatalog>('scores');
      const filteredScores = items.filter(score => 
        !score.isHidden && 
        score.series?.toLowerCase() === series?.toLowerCase()
      );
      setScores(filteredScores);
      setFilteredScores(filteredScores);
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
      case 'cantopop':
        return language === 'en' ? 'CU Chorus Cantopop Series' : '中大粵語流行曲系列';
      case 'chorphillia':
        return 'Chorphillia';
      default:
        return language === 'en' ? 'Sheet Music' : '樂譜';
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
              {getSeriesTitle()}
            </h1>
            {description && (
              <div className="mb-8">
                <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
                  {language === 'en' ? description.descriptionEn : description.descriptionZh}
                </p>
              </div>
            )}
            {!description && (
              <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
                {language === 'en' ? 'Browse our collection of choral scores' : '瀏覽我們的合唱樂譜集合'}
              </p>
            )}
          </motion.div>

          {!isLoading && scores.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Input
                type="text"
                placeholder={language === 'en' ? 'Search scores...' : '搜尋樂譜...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md mx-auto block bg-secondary text-foreground border-primary placeholder:text-foreground placeholder:opacity-50"
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
                {filteredScores.map((score, index) => {
                  const isAdding = addingItemId === score._id;
                  
                  return (
                    <motion.div
                      key={score._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <Link to={`/score/${score._id}`} className="group block">
                        <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                          <Image
                            src={score.itemImage || 'https://static.wixstatic.com/media/c418c8_ccc8f6635f95461eb322a9b5ed034fba~mv2.png?originWidth=384&originHeight=512'}
                            alt={score.itemName || 'Sheet Music'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h2 className="font-heading text-2xl mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                          {score.itemName}
                        </h2>
                        {score.voicing && (
                          <p className="text-sm text-foreground opacity-70 mb-2">{score.voicing}</p>
                        )}
                      </Link>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-heading text-primary">
                          {formatPrice(score.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                        </span>
                        <button
                          onClick={() => actions.addToCart({ 
                            collectionId: 'scores', 
                            itemId: score._id 
                          })}
                          disabled={isAdding}
                          className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-opacity-90 disabled:opacity-50"
                        >
                          {isAdding ? (language === 'en' ? 'Adding...' : '添加中...') : (language === 'en' ? 'Add to Cart' : '加入購物車')}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
