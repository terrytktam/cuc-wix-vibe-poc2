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
import { SheetMusicCatalog } from '@/entities';

export default function ScoreDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [score, setScore] = useState<SheetMusicCatalog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    if (id) {
      loadScore();
    }
  }, [id]);

  const loadScore = async () => {
    try {
      const data = await BaseCrudService.getById<SheetMusicCatalog>('scores', id!);
      setScore(data);
    } catch (error) {
      console.error('Error loading score:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAdding = addingItemId === score?._id;

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
                <h1 className="font-heading text-5xl mb-4">Score Not Found</h1>
                <p className="text-xl">The score you're looking for doesn't exist</p>
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
                    {score.itemName}
                  </h1>

                  <div className="space-y-4 mb-8">
                    {score.voicing && (
                      <p className="text-lg">
                        <span className="text-primary">Voicing:</span> {score.voicing}
                      </p>
                    )}
                    {score.series && (
                      <p className="text-lg">
                        <span className="text-primary">Series:</span> {score.series}
                      </p>
                    )}
                    {score.languageEn && (
                      <p className="text-lg">
                        <span className="text-primary">Language:</span> {score.languageEn}
                      </p>
                    )}
                    {score.publishYear && (
                      <p className="text-lg">
                        <span className="text-primary">Published:</span> {score.publishYear}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-b border-muted-grey py-8 mb-8">
                    <p className="text-4xl font-heading text-primary mb-6">
                      {formatPrice(score.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                    </p>
                    <button
                      onClick={() => actions.addToCart({ 
                        collectionId: 'scores', 
                        itemId: score._id 
                      })}
                      disabled={isAdding}
                      className="w-full bg-primary text-primary-foreground px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-opacity-90 disabled:opacity-50"
                    >
                      {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {score.previewUrl && (
                      <a
                        href={score.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-transparent text-foreground border border-foreground px-6 py-3 text-lg transition-all duration-300 hover:bg-foreground hover:text-background w-full"
                      >
                        Preview Score
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
                        Listen to Demo
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
