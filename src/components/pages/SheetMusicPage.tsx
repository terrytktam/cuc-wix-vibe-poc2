import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/lib/languageStore';

export default function SheetMusicPage() {
  const { language } = useLanguageStore();

  const series = [
    {
      titleEn: 'CU Chorus Choral Series',
      titleZh: '中大合唱系列',
      descriptionEn: 'Classical and contemporary choral works',
      descriptionZh: '古典和當代合唱作品',
      path: '/sheet-music/choral',
      image: 'https://static.wixstatic.com/media/c418c8_55c5d404387d4ae1a62dd40e9b27db78~mv2.png?originWidth=768&originHeight=960'
    },
    {
      titleEn: 'CU Chorus Cantopop Series',
      titleZh: '中大粵語流行曲系列',
      descriptionEn: 'Popular Cantonese songs arranged for choir',
      descriptionZh: '為合唱團編排的流行粵語歌曲',
      path: '/sheet-music/cantopop',
      image: 'https://static.wixstatic.com/media/c418c8_72a94c0d83964802a8ca24ef13a2f6a5~mv2.png?originWidth=768&originHeight=960'
    },
    {
      titleEn: 'Chorphillia',
      titleZh: 'Chorphillia',
      descriptionEn: 'Specialized choral arrangements',
      descriptionZh: '專業合唱編排',
      path: '/sheet-music/chorphillia',
      image: 'https://static.wixstatic.com/media/c418c8_8ac11f4196484e559c9fc9cd900ddfa9~mv2.png?originWidth=768&originHeight=960'
    }
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
              {language === 'en' ? 'Sheet Music' : '樂譜'}
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              {language === 'en' ? 'Browse our collection of choral arrangements and scores' : '瀏覽我們的合唱編排和樂譜集合'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {series.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={item.path} className="group block">
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={language === 'en' ? item.titleEn : item.titleZh}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h2 className="font-heading text-4xl mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {language === 'en' ? item.titleEn : item.titleZh}
                  </h2>
                  <p className="text-lg leading-relaxed text-foreground opacity-80">
                    {language === 'en' ? item.descriptionEn : item.descriptionZh}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
