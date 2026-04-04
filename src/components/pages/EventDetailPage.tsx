import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Events } from '@/entities';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Events | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = async () => {
    try {
      const data = await BaseCrudService.getById<Events>('events', id!);
      setEvent(data);
    } catch (error) {
      console.error('Error loading event:', error);
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
            ) : !event ? (
              <div className="text-center py-32">
                <h1 className="font-heading text-5xl mb-4">Event Not Found</h1>
                <p className="text-xl">The event you're looking for doesn't exist</p>
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
                      src="https://static.wixstatic.com/media/c418c8_ff9508f8858c4635bb71f1941e3790a5~mv2.png?originWidth=896&originHeight=384"
                      alt={event.titleEn || 'Event'}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {event.presentsEn && (
                    <p className="text-lg text-primary mb-4">{event.presentsEn}</p>
                  )}
                  
                  <h1 className="font-heading text-6xl md:text-7xl mb-4 text-foreground">
                    {event.titleEn}
                  </h1>
                  
                  {event.subtitleEn && (
                    <p className="text-2xl mb-8 text-foreground opacity-80">{event.subtitleEn}</p>
                  )}

                  <div className="flex flex-wrap gap-6 mb-8">
                    {event.dateTimeVenueEn && (
                      <div 
                        className="text-lg"
                        dangerouslySetInnerHTML={{ __html: event.dateTimeVenueEn }}
                      />
                    )}
                  </div>

                  {event.natureEn && (
                    <p className="text-base mb-4">
                      <span className="text-primary">Nature:</span> {event.natureEn}
                    </p>
                  )}

                  {event.coOrganizersEn && (
                    <p className="text-base mb-4">
                      <span className="text-primary">Co-organizers:</span> {event.coOrganizersEn}
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
                    {event.introductionEn && (
                      <div>
                        <h2 className="font-heading text-4xl mb-6 text-foreground">Introduction</h2>
                        <div 
                          className="text-lg leading-relaxed space-y-4"
                          dangerouslySetInnerHTML={{ __html: event.introductionEn }}
                        />
                      </div>
                    )}

                    {event.targetsEn && (
                      <div>
                        <h2 className="font-heading text-4xl mb-6 text-foreground">Target Audience</h2>
                        <div 
                          className="text-lg leading-relaxed space-y-4"
                          dangerouslySetInnerHTML={{ __html: event.targetsEn }}
                        />
                      </div>
                    )}

                    {event.courseContentEn && (
                      <div>
                        <h2 className="font-heading text-4xl mb-6 text-foreground">Course Content</h2>
                        <div 
                          className="text-lg leading-relaxed space-y-4"
                          dangerouslySetInnerHTML={{ __html: event.courseContentEn }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-8">
                    {event.priceEn && (
                      <div className="border border-muted-grey p-6">
                        <h3 className="font-heading text-2xl mb-4 text-primary">Price</h3>
                        <div 
                          className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: event.priceEn }}
                        />
                      </div>
                    )}

                    {event.deadlineEn && (
                      <div className="border border-muted-grey p-6">
                        <h3 className="font-heading text-2xl mb-4 text-primary">Deadline</h3>
                        <div 
                          className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: event.deadlineEn }}
                        />
                      </div>
                    )}

                    {event.applicationMethodEn && (
                      <div className="border border-muted-grey p-6">
                        <h3 className="font-heading text-2xl mb-4 text-primary">Application</h3>
                        <div 
                          className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: event.applicationMethodEn }}
                        />
                      </div>
                    )}

                    {event.registrationUrl && (
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-lg font-medium transition-all duration-300 hover:bg-opacity-90 w-full"
                      >
                        Register Now
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
