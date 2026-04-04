import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SupportPage() {
  const sections = [
    {
      title: 'Sponsorship Programs',
      description: 'Partner with us to support choral music',
      path: '/sponsorship',
      image: 'https://static.wixstatic.com/media/c418c8_319fe620e4f942ec9ad5fd4b0398795a~mv2.png?originWidth=768&originHeight=960'
    },
    {
      title: 'Individual Donations',
      description: 'Make a personal contribution to our mission',
      path: '/sponsorship',
      image: 'https://static.wixstatic.com/media/c418c8_3fad499e94e44cb0846ff00ba2393b8c~mv2.png?originWidth=768&originHeight=960'
    },
    {
      title: 'Corporate Partnerships',
      description: 'Collaborate with us on special projects',
      path: '/sponsorship',
      image: 'https://static.wixstatic.com/media/c418c8_58740a8e4e1f40ab87a8c06d1818c111~mv2.png?originWidth=768&originHeight=960'
    },
    {
      title: 'Legacy Giving',
      description: 'Create a lasting impact through planned giving',
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
              Support Us
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Help us continue our mission of promoting the art of choral music
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
