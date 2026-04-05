import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Calendar, MapPin, Clock, ExternalLink, Users, MessageSquare, BookOpen, Link as LinkIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Concerts, Contributors, Mentions, Biographies, Relationships } from '@/entities';
import { useLanguageStore } from '@/lib/languageStore';
import { useSEO } from '@/hooks/useSEO';

export default function ConcertDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [concert, setConcert] = useState<Concerts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguageStore();
  useSEO('upcoming-events');

  useEffect(() => {
    if (id) {
      loadConcert();
    }
  }, [id]);

  const loadConcert = async () => {
    try {
      const data = await BaseCrudService.getById<Concerts>('concerts', id!, {
        multiRef: ['contributors', 'mentions', 'biographies', 'relations']
      });
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
                <h1 className="font-heading text-5xl mb-4">
                  {language === 'en' ? 'Concert Not Found' : '音樂會未找到'}
                </h1>
                <p className="text-xl">
                  {language === 'en' ? "The concert you're looking for doesn't exist" : '您要查找的音樂會不存在'}
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
                      src="https://static.wixstatic.com/media/c418c8_2f995fd5496e4eb39b9dd9646a60a35d~mv2.png?originWidth=896&originHeight=384"
                      alt={language === 'en' ? (concert.titleEn || 'Concert') : (concert.titleZh || concert.titleEn || '音樂會')}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {language === 'en' ? concert.presentsEn : concert.presentsZh || concert.presentsEn ? (
                    <p className="text-lg text-primary mb-4">
                      {language === 'en' ? concert.presentsEn : concert.presentsZh || concert.presentsEn}
                    </p>
                  ) : null}
                  
                  <h1 className="font-heading text-6xl md:text-7xl mb-4 text-foreground">
                    {language === 'en' ? concert.titleEn : concert.titleZh || concert.titleEn}
                  </h1>
                  
                  {language === 'en' ? concert.subtitleEn : concert.subtitleZh || concert.subtitleEn ? (
                    <p className="text-2xl mb-8 text-foreground opacity-80">
                      {language === 'en' ? concert.subtitleEn : concert.subtitleZh || concert.subtitleEn}
                    </p>
                  ) : null}

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
                    
                    {language === 'en' ? concert.venueEn : concert.venueZh || concert.venueEn ? (
                      <div className="flex items-center gap-2 text-lg">
                        <MapPin size={20} className="text-primary" />
                        <span>{language === 'en' ? concert.venueEn : concert.venueZh || concert.venueEn}</span>
                      </div>
                    ) : null}
                  </div>

                  {language === 'en' ? concert.natureEn : concert.natureZh || concert.natureEn ? (
                    <p className="text-base mb-4">
                      <span className="text-primary">{language === 'en' ? 'Nature' : '性質'}:</span> {language === 'en' ? concert.natureEn : concert.natureZh || concert.natureEn}
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
                    {language === 'en' ? concert.priceEn : concert.priceZh || concert.priceEn ? (
                      <div className="border border-muted-grey p-8">
                        <h2 className="font-heading text-3xl mb-4 text-primary">
                          {language === 'en' ? 'Ticket Information' : '票務信息'}
                        </h2>
                        <p className="text-lg mb-4">
                          {language === 'en' ? concert.priceEn : concert.priceZh || concert.priceEn}
                        </p>
                        {language === 'en' ? concert.seatingEn : concert.seatingZh || concert.seatingEn ? (
                          <p className="text-base text-foreground opacity-80">
                            {language === 'en' ? concert.seatingEn : concert.seatingZh || concert.seatingEn}
                          </p>
                        ) : null}
                      </div>
                    ) : null}

                    {/* Contributors Section */}
                    {concert.contributors && concert.contributors.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="border border-muted-grey p-8"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <Users size={24} className="text-primary" />
                          <h2 className="font-heading text-3xl text-primary">
                            {language === 'en' ? 'Contributors' : '貢獻者'}
                          </h2>
                        </div>
                        <div className="space-y-4">
                          {concert.contributors.map((contributor) => (
                            <div key={contributor._id} className="pb-4 border-b border-muted-grey last:border-b-0">
                              <p className="text-lg font-medium">
                                {language === 'en' ? contributor.namesEn : contributor.namesZh || contributor.namesEn}
                              </p>
                              <p className="text-base text-foreground opacity-75">
                                {language === 'en' ? contributor.roleEn : contributor.roleZh || contributor.roleEn}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Biographies Section */}
                    {concert.biographies && concert.biographies.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="border border-muted-grey p-8"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <BookOpen size={24} className="text-primary" />
                          <h2 className="font-heading text-3xl text-primary">
                            {language === 'en' ? 'Biographies' : '傳記'}
                          </h2>
                        </div>
                        <div className="space-y-6">
                          {concert.biographies.map((bio) => (
                            <div key={bio._id} className="pb-6 border-b border-muted-grey last:border-b-0">
                              {bio.portraitImage && (
                                <div className="mb-4 aspect-square max-w-xs overflow-hidden">
                                  <Image
                                    src={bio.portraitImage}
                                    alt={language === 'en' ? (bio.nameEn || 'Biography') : (bio.nameZh || bio.nameEn || '傳記')}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <h3 className="text-xl font-medium mb-2">
                                {language === 'en' ? bio.nameEn : bio.nameZh || bio.nameEn}
                              </h3>
                              <p className="text-base leading-relaxed">
                                {language === 'en' ? bio.descriptionEn : bio.descriptionZh || bio.descriptionEn}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Mentions Section */}
                    {concert.mentions && concert.mentions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="border border-muted-grey p-8"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <MessageSquare size={24} className="text-primary" />
                          <h2 className="font-heading text-3xl text-primary">
                            {language === 'en' ? 'Mentions' : '提及'}
                          </h2>
                        </div>
                        <div className="space-y-4">
                          {concert.mentions.map((mention) => (
                            <div key={mention._id} className="pb-4 border-b border-muted-grey last:border-b-0">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <p className="text-lg font-medium">{mention.title}</p>
                                  <p className="text-sm text-foreground opacity-75">
                                    {mention.author} • {mention.source}
                                  </p>
                                  {mention.date && (
                                    <p className="text-sm text-foreground opacity-60 mt-1">
                                      {new Date(mention.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                      })}
                                    </p>
                                  )}
                                  {mention.text && (
                                    <p className="text-base mt-2 leading-relaxed">{mention.text}</p>
                                  )}
                                </div>
                                {mention.url && (
                                  <a
                                    href={mention.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary opacity-80 hover:opacity-100 transition-all flex-shrink-0"
                                  >
                                    <ExternalLink size={18} />
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Relations Section */}
                    {concert.relations && concert.relations.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="border border-muted-grey p-8"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <LinkIcon size={24} className="text-primary" />
                          <h2 className="font-heading text-3xl text-primary">
                            {language === 'en' ? 'Related Concerts' : '相關音樂會'}
                          </h2>
                        </div>
                        <div className="space-y-4">
                          {concert.relations.map((relation) => (
                            <div key={relation._id} className="pb-4 border-b border-muted-grey last:border-b-0">
                              <p className="text-lg font-medium">
                                {language === 'en' ? relation.masterTitleEn : relation.masterTitleZh || relation.masterTitleEn}
                              </p>
                              <p className="text-base text-foreground opacity-75">
                                {language === 'en' ? 'Related to' : '相關於'}: {language === 'en' ? relation.childTitleEn : relation.childTitleZh || relation.childTitleEn}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
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
                        {language === 'en' ? 'Get Tickets' : '購票'}
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
                        {language === 'en' ? 'Watch Recording' : '觀看錄製'}
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
