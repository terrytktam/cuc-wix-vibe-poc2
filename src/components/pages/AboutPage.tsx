import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const sections = [
    {
      title: 'Mission & Vision',
      description: 'Discover our purpose and aspirations',
      path: '/mission-vision',
      image: 'https://static.wixstatic.com/media/c418c8_106ef438ee254ef7aa11c558b246bbce~mv2.png?originWidth=768&originHeight=960'
    },
    {
      title: 'Music Director & Conductor',
      description: 'Meet our artistic leadership',
      path: '/music-director',
      image: 'https://static.wixstatic.com/media/c418c8_79c5ab544a564cd2bb01bc97827cc06f~mv2.png?originWidth=768&originHeight=960'
    },
    {
      title: 'Staff & Administration',
      description: 'Our dedicated team behind the scenes',
      path: '/staff',
      image: 'https://static.wixstatic.com/media/c418c8_e74ce068db1b428089c08c8cfd12e276~mv2.png?originWidth=768&originHeight=960'
    },
    {
      title: 'Chorus Members',
      description: 'The voices that bring our music to life',
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
              About Us
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Learn more about our organization, our people, and our commitment to excellence in choral music
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
                      alt={section.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h2 className="font-heading text-4xl mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {section.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-foreground opacity-80">
                    {section.description}
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
