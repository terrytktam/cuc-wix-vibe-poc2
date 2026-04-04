import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Concerts } from '@/entities';

export default function ConcertDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [concert, setConcert] = useState<Concerts | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadConcert();
    }
  }, [id]);

  const loadConcert = async () => {
    try {
      const data = await BaseCrudService.getById<Concerts>('concerts', id!);
      setConcert(data);
    } catch (error) {
      console.error('Error loading concert:', error);
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
            ) : !concert ? (
              <div className="text-center py-32">
                <h1 className="font-heading text-5xl mb-4">Concert Not Found</h1>
                <p className="text-xl">The concert you're looking for doesn't exist</p>
              </div>
            ) : (
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-16"
                >
                  <div className="relative aspect-[21/9] mb-12 overflow-hidden">
                    <Image
                      src="https://static.wixstatic.com/media/c418c8_2f995fd5496e4eb39b9dd9646a60a35d~mv2.png?originWidth=896&originHeight=384"
                      alt={concert.titleEn || 'Concert'}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {concert.presentsEn && (
                    <p className="text-lg text-primary mb-4">{concert.presentsEn}</p>
                  )}
                  
                  <h1 className="font-heading text-6xl md:text-7xl mb-4 text-foreground">
                    {concert.titleEn}
                  </h1>
                  
                  {concert.subtitleEn && (
                    <p className="text-2xl mb-8 text-foreground opacity-80">{concert.subtitleEn}</p>
                  )}

                  <div className="flex flex-wrap gap-6 mb-8">
                    {concert.date && (
                      <div className="flex items-center gap-2 text-lg">
                        <Calendar size={20} className="text-primary" />
                        <span>{new Date(concert.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    )}
                    
                    {concert.venueEn && (
                      <div className="flex items-center gap-2 text-lg">
                        <MapPin size={20} className="text-primary" />
                        <span>{concert.venueEn}</span>
                      </div>
                    )}
                  </div>

                  {concert.natureEn && (
                    <p className="text-base mb-4">
                      <span className="text-primary">Nature:</span> {concert.natureEn}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                >
                  <div className="lg:col-span-2 space-y-12">
                    {concert.priceEn && (
                      <div className="border border-muted-grey p-8">
                        <h2 className="font-heading text-3xl mb-4 text-primary">Ticket Information</h2>
                        <p className="text-lg mb-4">{concert.priceEn}</p>
                        {concert.seatingEn && (
                          <p className="text-base text-foreground opacity-80">{concert.seatingEn}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-8">
                    {concert.ticketingUrl && (
                      <a
                        href={concert.ticketingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-lg font-medium transition-all duration-300 hover:bg-opacity-90 w-full"
                      >
                        Get Tickets
                        <ExternalLink size={18} />
                      </a>
                    )}

                    {concert.youtubeUrl && (
                      <a
                        href={concert.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-transparent text-foreground border border-foreground px-6 py-3 text-lg transition-all duration-300 hover:bg-foreground hover:text-background w-full"
                      >
                        Watch Recording
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
