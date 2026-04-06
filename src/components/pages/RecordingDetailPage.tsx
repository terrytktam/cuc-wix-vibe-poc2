import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ExternalLink, Users, MessageSquare, Disc3, Package } from 'lucide-react';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Recordings, Contributors, Mentions, RecordTypes, RecordingMediums } from '@/entities';
import { useLanguageStore } from '@/lib/languageStore';
import { useSEO } from '@/hooks/useSEO';

export default function RecordingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [recording, setRecording] = useState<Recordings | null>(null);
  const [recordType, setRecordType] = useState<RecordTypes | null>(null);
  const [medium, setMedium] = useState<RecordingMediums | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();
  const { language } = useLanguageStore();
  useSEO('recordings');

  useEffect(() => {
    if (id) {
      loadRecording();
    }
  }, [id]);

  const loadRecording = async () => {
    try {
      const data = await BaseCrudService.getById<Recordings>('recordings', id!, {
        multiRef: ['contributors', 'mentions']
      });
      setRecording(data);
      
      // Load record type if recordTypeReference exists
      if (data?.recordTypeReference) {
        const typeData = await BaseCrudService.getById<RecordTypes>('recordtypes', data.recordTypeReference);
        setRecordType(typeData);
      }
      
      // Load medium if mediumReference exists
      if (data?.mediumReference) {
        const mediumData = await BaseCrudService.getById<RecordingMediums>('mediums', data.mediumReference);
        setMedium(mediumData);
      }
    } catch (error) {
      console.error('Error loading recording:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAdding = addingItemId === recording?._id;

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
            ) : !recording ? (
              <div className="text-center py-32">
                <h1 className="font-heading text-5xl mb-4">
                  {language === 'en' ? 'Recording Not Found' : '錄音未找到'}
                </h1>
                <p className="text-xl">
                  {language === 'en' ? "The recording you're looking for doesn't exist" : '您要查找的錄音不存在'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-square lg:sticky lg:top-32"
                >
                  <Image
                    src={recording.itemImage || 'https://static.wixstatic.com/media/c418c8_26334df1817245e0a171458f233b1534~mv2.png?originWidth=576&originHeight=576'}
                    alt={recording.itemName || 'Recording'}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="font-heading text-5xl md:text-6xl mb-6 text-foreground">
                    {recording.itemName}
                  </h1>

                  <div className="space-y-4 mb-8">
                    {recording.releaseYear && (
                      <p className="text-lg">
                        <span className="text-primary">{language === 'en' ? 'Release Year' : '發行年份'}:</span> {recording.releaseYear}
                      </p>
                    )}
                    {recording.cucId && (
                      <p className="text-lg">
                        <span className="text-primary">CUC ID:</span> {recording.cucId}
                      </p>
                    )}
                    {recording.isrc && (
                      <p className="text-lg">
                        <span className="text-primary">ISRC:</span> {recording.isrc}
                      </p>
                    )}
                  </div>

                  {/* Record Type and Medium Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {recordType && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="border border-muted-grey p-4"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Disc3 size={18} className="text-primary" />
                          <h3 className="font-heading text-lg text-primary">
                            {language === 'en' ? 'Record Type' : '錄音類型'}
                          </h3>
                        </div>
                        <p className="text-base font-medium mb-1">
                          {language === 'en' ? recordType.typeEn : recordType.typeZh || recordType.typeEn}
                        </p>
                        {(language === 'en' ? recordType.descriptionEn : recordType.descriptionZh || recordType.descriptionEn) && (
                          <p className="text-sm text-foreground opacity-75">
                            {language === 'en' ? recordType.descriptionEn : recordType.descriptionZh || recordType.descriptionEn}
                          </p>
                        )}
                      </motion.div>
                    )}
                    
                    {medium && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="border border-muted-grey p-4"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Package size={18} className="text-primary" />
                          <h3 className="font-heading text-lg text-primary">
                            {language === 'en' ? 'Medium' : '介質'}
                          </h3>
                        </div>
                        <p className="text-base font-medium mb-1">
                          {language === 'en' ? medium.mediumEn : medium.mediumZh || medium.mediumEn}
                        </p>
                        {medium.description && (
                          <p className="text-sm text-foreground opacity-75">
                            {medium.description}
                          </p>
                        )}
                        {medium.isPhysical !== undefined && (
                          <p className="text-xs text-foreground opacity-60 mt-2">
                            {medium.isPhysical ? (language === 'en' ? 'Physical Medium' : '實體介質') : (language === 'en' ? 'Digital Medium' : '數字介質')}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {language === 'en' ? recording.introduction_en : recording.introduction_zh || recording.introduction_en ? (
                    <div className="mb-8">
                      <h2 className="font-heading text-3xl mb-4 text-foreground">
                        {language === 'en' ? 'About' : '關於'}
                      </h2>
                      <div 
                        className="text-lg leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ __html: language === 'en' ? (recording.introduction_en || '') : (recording.introduction_zh || recording.introduction_en || '') }}
                      />
                    </div>
                  ) : null}

                  {language === 'en' ? recording.songlist_en : recording.songlist_zh || recording.songlist_en ? (
                    <div className="mb-8">
                      <h2 className="font-heading text-3xl mb-4 text-foreground">
                        {language === 'en' ? 'Track List' : '曲目列表'}
                      </h2>
                      <div 
                        className="text-base leading-relaxed space-y-2"
                        dangerouslySetInnerHTML={{ __html: language === 'en' ? (recording.songlist_en || '') : (recording.songlist_zh || recording.songlist_en || '') }}
                      />
                    </div>
                  ) : null}

                  {language === 'en' ? recording.recording_en : recording.recording_zh || recording.recording_en ? (
                    <div className="mb-8">
                      <h2 className="font-heading text-3xl mb-4 text-foreground">
                        {language === 'en' ? 'Recording Details' : '錄音詳情'}
                      </h2>
                      <div 
                        className="text-base leading-relaxed space-y-2"
                        dangerouslySetInnerHTML={{ __html: language === 'en' ? (recording.recording_en || '') : (recording.recording_zh || recording.recording_en || '') }}
                      />
                    </div>
                  ) : null}

                  <div className="border-t border-b border-muted-grey py-8 mb-8">
                    <p className="text-4xl font-heading text-primary mb-6">
                      {formatPrice(recording.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                    </p>
                    <button
                      onClick={() => actions.addToCart({ 
                        collectionId: 'recordings', 
                        itemId: recording._id 
                      })}
                      disabled={isAdding}
                      className="w-full bg-primary text-primary-foreground px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-opacity-90 disabled:opacity-50"
                    >
                      {isAdding ? (language === 'en' ? 'Adding to Cart...' : '添加到購物車中...') : (language === 'en' ? 'Add to Cart' : '加入購物車')}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {recording.previewUrl && (
                      <a
                        href={recording.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-transparent text-foreground border border-foreground px-6 py-3 text-lg transition-all duration-300 hover:bg-foreground hover:text-background w-full"
                      >
                        {language === 'en' ? 'Preview' : '預覽'}
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {recording.spotifyUrl && (
                      <a
                        href={recording.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-transparent text-foreground border border-foreground px-6 py-3 text-lg transition-all duration-300 hover:bg-foreground hover:text-background w-full"
                      >
                        {language === 'en' ? 'Listen on Spotify' : '在 Spotify 上聆聽'}
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {recording.appleMusicUrl && (
                      <a
                        href={recording.appleMusicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-transparent text-foreground border border-foreground px-6 py-3 text-lg transition-all duration-300 hover:bg-foreground hover:text-background w-full"
                      >
                        {language === 'en' ? 'Listen on Apple Music' : '在 Apple Music 上聆聽'}
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {recording.youtubeUrl && (
                      <a
                        href={recording.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-transparent text-foreground border border-foreground px-6 py-3 text-lg transition-all duration-300 hover:bg-foreground hover:text-background w-full"
                      >
                        {language === 'en' ? 'Watch on YouTube' : '在 YouTube 上觀看'}
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {recording.kkBoxUrl && (
                      <a
                        href={recording.kkBoxUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-transparent text-foreground border border-foreground px-6 py-3 text-lg transition-all duration-300 hover:bg-foreground hover:text-background w-full"
                      >
                        {language === 'en' ? 'Listen on KKBox' : '在 KKBox 上聆聽'}
                        <ExternalLink size={18} />
                      </a>
                    )}

                    {/* Contributors Section */}
                    {recording.contributors && recording.contributors.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="border border-muted-grey p-6 mt-6"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <Users size={20} className="text-primary" />
                          <h3 className="font-heading text-2xl text-primary">
                            {language === 'en' ? 'Contributors' : '貢獻者'}
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {recording.contributors.map((contributor) => (
                            <div key={contributor._id} className="pb-3 border-b border-muted-grey last:border-b-0">
                              <p className="text-base font-medium">
                                {language === 'en' ? contributor.namesEn : contributor.namesZh || contributor.namesEn}
                              </p>
                              <p className="text-sm text-foreground opacity-75">
                                {language === 'en' ? contributor.roleEn : contributor.roleZh || contributor.roleEn}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Mentions Section */}
                    {recording.mentions && recording.mentions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="border border-muted-grey p-6 mt-6"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <MessageSquare size={20} className="text-primary" />
                          <h3 className="font-heading text-2xl text-primary">
                            {language === 'en' ? 'Mentions' : '提及'}
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {recording.mentions.map((mention) => (
                            <div key={mention._id} className="pb-3 border-b border-muted-grey last:border-b-0">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <p className="text-base font-medium">{mention.title}</p>
                                  <p className="text-xs text-foreground opacity-75">
                                    {mention.author} • {mention.source}
                                  </p>
                                  {mention.date && (
                                    <p className="text-xs text-foreground opacity-60 mt-1">
                                      {new Date(mention.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                      })}
                                    </p>
                                  )}
                                </div>
                                {mention.url && (
                                  <a
                                    href={mention.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary opacity-80 hover:opacity-100 transition-all flex-shrink-0"
                                  >
                                    <ExternalLink size={16} />
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
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
