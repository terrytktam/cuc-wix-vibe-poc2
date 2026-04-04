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
import { useLanguageStore } from '@/lib/languageStore';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Events | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguageStore();

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
                <h1 className="font-heading text-5xl mb-4">
                  {language === 'en' ? 'Event Not Found' : '活動未找到'}
                </h1>
                <p className="text-xl">
                  {language === 'en' ? "The event you're looking for doesn't exist" : '您要查找的活動不存在'}
                </p>
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
                      alt={language === 'en' ? (event.titleEn || 'Event') : (event.titleZh || event.titleEn || '活動')}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {language === 'en' ? event.presentsEn : event.presentsZh || event.presentsEn ? (
                    <p className="text-lg text-primary mb-4">
                      {language === 'en' ? event.presentsEn : event.presentsZh || event.presentsEn}
                    </p>
                  ) : null}
                  
                  <h1 className="font-heading text-6xl md:text-7xl mb-4 text-foreground">
                    {language === 'en' ? event.titleEn : event.titleZh || event.titleEn}
                  </h1>
                  
                  {language === 'en' ? event.subtitleEn : event.subtitleZh || event.subtitleEn ? (
                    <p className="text-2xl mb-8 text-foreground opacity-80">
                      {language === 'en' ? event.subtitleEn : event.subtitleZh || event.subtitleEn}
                    </p>
                  ) : null}

                  <div className="flex flex-wrap gap-6 mb-8">
                    {language === 'en' ? event.dateTimeVenueEn : event.dateTimeVenueZh || event.dateTimeVenueEn ? (
                      <div 
                        className="text-lg"
                        dangerouslySetInnerHTML={{ __html: language === 'en' ? event.dateTimeVenueEn || '' : event.dateTimeVenueZh || event.dateTimeVenueEn || '' }}
                      />
                    ) : null}
                  </div>

                  {language === 'en' ? event.natureEn : event.natureZh || event.natureEn ? (
                    <p className="text-base mb-4">
                      <span className="text-primary">{language === 'en' ? 'Nature' : '性質'}:</span> {language === 'en' ? event.natureEn : event.natureZh || event.natureEn}
                    </p>
                  ) : null}

                  {language === 'en' ? event.coOrganizersEn : event.coOrganizersZh || event.coOrganizersEn ? (
                    <p className="text-base mb-4">
                      <span className="text-primary">{language === 'en' ? 'Co-organizers' : '共同組織者'}:</span> {language === 'en' ? event.coOrganizersEn : event.coOrganizersZh || event.coOrganizersEn}
                    </p>
                  ) : null}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                >
                  <div className="lg:col-span-2 space-y-12">
                    {language === 'en' ? event.introductionEn : event.introductionZh || event.introductionEn ? (
                      <div>
                        <h2 className="font-heading text-4xl mb-6 text-foreground">
                          {language === 'en' ? 'Introduction' : '介紹'}
                        </h2>
                        <div 
                          className="text-lg leading-relaxed space-y-4"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.introductionEn || '') : (event.introductionZh || event.introductionEn || '') }}
                        />
                      </div>
                    ) : null}

                    {language === 'en' ? event.targetsEn : event.targetsZh || event.targetsEn ? (
                      <div>
                        <h2 className="font-heading text-4xl mb-6 text-foreground">
                          {language === 'en' ? 'Target Audience' : '目標受眾'}
                        </h2>
                        <div 
                          className="text-lg leading-relaxed space-y-4"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.targetsEn || '') : (event.targetsZh || event.targetsEn || '') }}
                        />
                      </div>
                    ) : null}

                    {language === 'en' ? event.courseContentEn : event.courseContentZh || event.courseContentEn ? (
                      <div>
                        <h2 className="font-heading text-4xl mb-6 text-foreground">
                          {language === 'en' ? 'Course Content' : '課程內容'}
                        </h2>
                        <div 
                          className="text-lg leading-relaxed space-y-4"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.courseContentEn || '') : (event.courseContentZh || event.courseContentEn || '') }}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="space-y-8">
                    {language === 'en' ? event.priceEn : event.priceZh || event.priceEn ? (
                      <div className="border border-muted-grey p-6">
                        <h3 className="font-heading text-2xl mb-4 text-primary">
                          {language === 'en' ? 'Price' : '價格'}
                        </h3>
                        <div 
                          className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.priceEn || '') : (event.priceZh || event.priceEn || '') }}
                        />
                      </div>
                    ) : null}

                    {language === 'en' ? event.deadlineEn : event.deadlineZh || event.deadlineEn ? (
                      <div className="border border-muted-grey p-6">
                        <h3 className="font-heading text-2xl mb-4 text-primary">
                          {language === 'en' ? 'Deadline' : '截止日期'}
                        </h3>
                        <div 
                          className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.deadlineEn || '') : (event.deadlineZh || event.deadlineEn || '') }}
                        />
                      </div>
                    ) : null}

                    {language === 'en' ? event.applicationMethodEn : event.applicationMethodZh || event.applicationMethodEn ? (
                      <div className="border border-muted-grey p-6">
                        <h3 className="font-heading text-2xl mb-4 text-primary">
                          {language === 'en' ? 'Application' : '申請'}
                        </h3>
                        <div 
                          className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.applicationMethodEn || '') : (event.applicationMethodZh || event.applicationMethodEn || '') }}
                        />
                      </div>
                    ) : null}

                    {event.registrationUrl && (
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-lg font-medium transition-all duration-300 hover:bg-opacity-90 w-full"
                      >
                        {language === 'en' ? 'Register Now' : '立即註冊'}
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
