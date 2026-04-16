import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Calendar, MapPin, ExternalLink, Users, MessageSquare, BookOpen, Link as LinkIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Events, Contributors, Mentions, Biographies, Relationships } from '@/entities';
import { useLanguageStore } from '@/lib/languageStore';
import { useSEO } from '@/hooks/useSEO';

export default function EventDetailPage() {
  const { code } = useParams<{ code: string }>();
  const [event, setEvent] = useState<Events | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguageStore();
  useSEO('upcoming-events');

  useEffect(() => {
    if (code) {
      loadEvent();
    }
  }, [code]);

  const loadEvent = async () => {
    try {
      const result = await BaseCrudService.getAll<Events>('events', {}, { limit: 1000 });
      const foundEvent = result.items.find(e => e.eventCode === code);
      if (foundEvent) {
        const data = await BaseCrudService.getById<Events>('events', foundEvent._id, {
          singleRef: ['series'],
          multiRef: ['contributors', 'mentions', 'biographies', 'relations']
        });
        setEvent(data);
      }
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
                    {language === 'en' ? event.dateTimeVenue_en : event.dateTimeVenue_zh || event.dateTimeVenue_en ? (
                      <div 
                        className="text-lg"
                        dangerouslySetInnerHTML={{ __html: language === 'en' ? event.dateTimeVenue_en || '' : event.dateTimeVenue_zh || event.dateTimeVenue_en || '' }}
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
                    {language === 'en' ? event.introduction_en : event.introduction_zh || event.introduction_en ? (
                      <div>
                        <h2 className="font-heading text-4xl mb-6 text-foreground">
                          {language === 'en' ? 'Introduction' : '介紹'}
                        </h2>
                        <div 
                          className="text-lg leading-relaxed space-y-4"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.introduction_en || '') : (event.introduction_zh || event.introduction_en || '') }}
                        />
                      </div>
                    ) : null}

                    {language === 'en' ? event.targets_en : event.targets_zh || event.targets_en ? (
                      <div>
                        <h2 className="font-heading text-4xl mb-6 text-foreground">
                          {language === 'en' ? 'Target Audience' : '目標受眾'}
                        </h2>
                        <div 
                          className="text-lg leading-relaxed space-y-4"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.targets_en || '') : (event.targets_zh || event.targets_en || '') }}
                        />
                      </div>
                    ) : null}

                    {language === 'en' ? event.courseContent_en : event.courseContent_zh || event.courseContent_en ? (
                      <div>
                        <h2 className="font-heading text-4xl mb-6 text-foreground">
                          {language === 'en' ? 'Course Content' : '課程內容'}
                        </h2>
                        <div 
                          className="text-lg leading-relaxed space-y-4"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.courseContent_en || '') : (event.courseContent_zh || event.courseContent_en || '') }}
                        />
                      </div>
                    ) : null}

                    {language === 'en' ? event.setPieces_en : event.setPieces_zh || event.setPieces_en ? (
                      <div>
                        <h2 className="font-heading text-4xl mb-6 text-foreground">
                          {language === 'en' ? 'Set Pieces' : '指定曲目'}
                        </h2>
                        <div 
                          className="text-lg leading-relaxed space-y-4"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.setPieces_en || '') : (event.setPieces_zh || event.setPieces_en || '') }}
                        />
                      </div>
                    ) : null}

                    {/* Contributors Section */}
                    {event.contributors && event.contributors.length > 0 && (
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
                          {event.contributors.map((contributor) => (
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
                    {event.biographies && event.biographies.length > 0 && (
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
                          {event.biographies.map((bio) => (
                            <div key={bio._id} className="pb-6 border-b border-muted-grey last:border-b-0">
                              {bio.portraitImage && (
                                <div className="mb-4 aspect-square max-w-xs overflow-hidden">
                                  <Image
                                    src={bio.portraitImage}
                                    alt={language === 'en' ? (bio.name_en || 'Biography') : (bio.name_zh || bio.name_en || '傳記')}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <h3 className="text-xl font-medium mb-2">
                                {language === 'en' ? bio.name_en : bio.name_zh || bio.name_en}
                              </h3>
                              <p className="text-base leading-relaxed">
                                {language === 'en' ? bio.description_en : bio.description_zh || bio.description_en}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Mentions Section */}
                    {event.mentions && event.mentions.length > 0 && (
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
                          {event.mentions.map((mention) => (
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
                    {event.relations && event.relations.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="border border-muted-grey p-8"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <LinkIcon size={24} className="text-primary" />
                          <h2 className="font-heading text-3xl text-primary">
                            {language === 'en' ? 'Related Events' : '相關活動'}
                          </h2>
                        </div>
                        <div className="space-y-4">
                          {event.relations.map((relation) => (
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
                    {language === 'en' ? event.price_en : event.price_zh || event.price_en ? (
                      <div className="border border-muted-grey p-6">
                        <h3 className="font-heading text-2xl mb-4 text-primary">
                          {language === 'en' ? 'Price' : '價格'}
                        </h3>
                        <div 
                          className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.price_en || '') : (event.price_zh || event.price_en || '') }}
                        />
                      </div>
                    ) : null}

                    {language === 'en' ? event.quotaDeadline_en : event.quotaDeadline_zh || event.quotaDeadline_en ? (
                      <div className="border border-muted-grey p-6">
                        <h3 className="font-heading text-2xl mb-4 text-primary">
                          {language === 'en' ? 'Deadline' : '截止日期'}
                        </h3>
                        <div 
                          className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.quotaDeadline_en || '') : (event.quotaDeadline_zh || event.quotaDeadline_en || '') }}
                        />
                      </div>
                    ) : null}

                    {language === 'en' ? event.applicationMethod_en : event.applicationMethod_zh || event.applicationMethod_en ? (
                      <div className="border border-muted-grey p-6">
                        <h3 className="font-heading text-2xl mb-4 text-primary">
                          {language === 'en' ? 'Application' : '申請'}
                        </h3>
                        <div 
                          className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.applicationMethod_en || '') : (event.applicationMethod_zh || event.applicationMethod_en || '') }}
                        />
                      </div>
                    ) : null}

                    {language === 'en' ? event.concessionDiscount_en : event.concessionDiscount_zh || event.concessionDiscount_en ? (
                      <div className="border border-muted-grey p-6">
                        <h3 className="font-heading text-2xl mb-4 text-primary">
                          {language === 'en' ? 'Concession Discount' : '優惠折扣'}
                        </h3>
                        <div 
                          className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.concessionDiscount_en || '') : (event.concessionDiscount_zh || event.concessionDiscount_en || '') }}
                        />
                      </div>
                    ) : null}

                    {language === 'en' ? event.enquiry_en : event.enquiry_zh || event.enquiry_en ? (
                      <div className="border border-muted-grey p-6">
                        <h3 className="font-heading text-2xl mb-4 text-primary">
                          {language === 'en' ? 'Enquiry' : '查詢'}
                        </h3>
                        <div 
                          className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.enquiry_en || '') : (event.enquiry_zh || event.enquiry_en || '') }}
                        />
                      </div>
                    ) : null}

                    {language === 'en' ? event.remark_en : event.remark_zh || event.remark_en ? (
                      <div className="border border-muted-grey p-6">
                        <h3 className="font-heading text-2xl mb-4 text-primary">
                          {language === 'en' ? 'Remarks' : '備註'}
                        </h3>
                        <div 
                          className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: language === 'en' ? (event.remark_en || '') : (event.remark_zh || event.remark_en || '') }}
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
