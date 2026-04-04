import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/lib/languageStore';

export default function SupportPage() {
  const { language } = useLanguageStore();

  const sections = [
    {
      titleEn: 'Sponsorship Programs',
      titleZh: '贊助計劃',
      descriptionEn: 'Partner with us to support choral music',
      descriptionZh: '與我們合作支持合唱音樂',
      path: '/sponsorship',
      image: 'https://static.wixstatic.com/media/c418c8_319fe620e4f942ec9ad5fd4b0398795a~mv2.png?originWidth=768&originHeight=960'
    },
    {
      titleEn: 'Individual Donations',
      titleZh: '個人捐贈',
      descriptionEn: 'Make a personal contribution to our mission',
      descriptionZh: '為我們的使命做出個人貢獻',
      path: '/sponsorship',
      image: 'https://static.wixstatic.com/media/c418c8_3fad499e94e44cb0846ff00ba2393b8c~mv2.png?originWidth=768&originHeight=960'
    },
    {
      titleEn: 'Corporate Partnerships',
      titleZh: '企業合作',
      descriptionEn: 'Collaborate with us on special projects',
      descriptionZh: '與我們合作進行特殊項目',
      path: '/sponsorship',
      image: 'https://static.wixstatic.com/media/c418c8_58740a8e4e1f40ab87a8c06d1818c111~mv2.png?originWidth=768&originHeight=960'
    },
    {
      titleEn: 'Legacy Giving',
      titleZh: '遺產捐贈',
      descriptionEn: 'Create a lasting impact through planned giving',
      descriptionZh: '通過計劃捐贈創造持久影響',
      path: '/sponsorship',
      image: 'https://static.wixstatic.com/media/c418c8_a37509f1dc7a495e84dc10060dd0e7de~mv2.png?originWidth=768&originHeight=960'
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
              {language === 'en' ? 'Support Us' : '支持我們'}
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              {language === 'en' ? 'Help us continue our mission of promoting the art of choral music' : '幫助我們繼續推廣合唱藝術的使命'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.path + index}
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
