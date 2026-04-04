import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Calendar, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Events, Concerts } from '@/entities';

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [concerts, setConcerts] = useState<Concerts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const [eventsResult, concertsResult] = await Promise.all([
        BaseCrudService.getAll<Events>('events'),
        BaseCrudService.getAll<Concerts>('concerts')
      ]);
      
      const upcomingEvents = eventsResult.items.filter(event => !event.isHeld);
      const upcomingConcerts = concertsResult.items.filter(concert => !concert.held);
      
      setEvents(upcomingEvents);
      setConcerts(upcomingConcerts);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const allUpcoming = [
    ...events.map(e => ({ ...e, type: 'event' as const })),
    ...concerts.map(c => ({ ...c, type: 'concert' as const }))
  ];

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
              Upcoming Events
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Join us for our upcoming performances and events
            </p>
          </motion.div>

          <div className="min-h-[40vh]">
            {isLoading ? (
              null
            ) : allUpcoming.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl">No upcoming events at this time</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {allUpcoming.map((item, index) => {
                  const isEvent = item.type === 'event';
                  const title = isEvent ? (item as Events).titleEn : (item as Concerts).titleEn;
                  const venue = isEvent ? (item as Events).dateTimeVenueEn : (item as Concerts).venueEn;
                  const id = isEvent ? (item as Events).eventCode : (item as Concerts).code;
                  const date = isEvent ? null : (item as Concerts).date;
                  
                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Link 
                        to={`/${isEvent ? 'event' : 'concert'}/${item._id}`}
                        className="group block"
                      >
                        <div className="relative aspect-[4/5] mb-6 overflow-hidden">
                          <Image
                            src="https://static.wixstatic.com/media/c418c8_62499b36114545c4967c5ec12ba054a2~mv2.png?originWidth=768&originHeight=960"
                            alt={title || 'Event'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h2 className="font-heading text-3xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                          {title}
                        </h2>
                        {date && (
                          <div className="flex items-center gap-2 text-base mb-2 text-foreground opacity-80">
                            <Calendar size={16} className="text-primary" />
                            <span>{new Date(date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                        )}
                        {venue && (
                          <div className="flex items-start gap-2 text-base text-foreground opacity-80">
                            <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                            <span>{venue}</span>
                          </div>
                        )}
                      </Link>
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
