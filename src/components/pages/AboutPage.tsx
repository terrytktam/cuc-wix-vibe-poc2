import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/lib/languageStore';

export default function AboutPage() {
  const { language } = useLanguageStore();

  const sections = [
    {
      titleEn: 'Mission & Vision',
      titleZh: '使命與願景',
      descriptionEn: 'Discover our purpose and aspirations',
      descriptionZh: '發現我們的目的和願景',
      path: '/mission-vision',
      image: 'https://static.wixstatic.com/media/c418c8_106ef438ee254ef7aa11c558b246bbce~mv2.png?originWidth=768&originHeight=960'
    },
    {
      titleEn: 'Music Director & Conductor',
      titleZh: '音樂總監及指揮',
      descriptionEn: 'Meet our artistic leadership',
      descriptionZh: '認識我們的藝術領導',
      path: '/music-director',
      image: 'https://static.wixstatic.com/media/c418c8_79c5ab544a564cd2bb01bc97827cc06f~mv2.png?originWidth=768&originHeight=960'
    },
    {
      titleEn: 'Staff & Administration',
      titleZh: '職員及行政',
      descriptionEn: 'Our dedicated team behind the scenes',
      descriptionZh: '我們幕後的專業團隊',
      path: '/staff',
      image: 'https://static.wixstatic.com/media/c418c8_e74ce068db1b428089c08c8cfd12e276~mv2.png?originWidth=768&originHeight=960'
    },
    {
      titleEn: 'Chorus Members',
      titleZh: '合唱團成員',
      descriptionEn: 'The voices that bring our music to life',
      descriptionZh: '為我們的音樂帶來生命的聲音',
      path: '/members',
      image: 'https://static.wixstatic.com/media/c418c8_50b2d56b21104206a428c607642253e8~mv2.png?originWidth=768&originHeight=960'
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
              {language === 'en' ? 'About Us' : '關於我們'}
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'Learn more about our organization, our people, and our commitment to excellence in choral music'
                : '了解更多關於我們的組織、我們的人員和我們對合唱音樂卓越的承諾'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.path}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={section.path} className="group block">
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden">
                    <Image
                      src={section.image}
                      alt={language === 'en' ? section.titleEn : section.titleZh}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h2 className="font-heading text-4xl mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {language === 'en' ? section.titleEn : section.titleZh}
                  </h2>
                  <p className="text-lg leading-relaxed text-foreground opacity-80">
                    {language === 'en' ? section.descriptionEn : section.descriptionZh}
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
