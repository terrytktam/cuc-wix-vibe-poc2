// HPI 1.7-G
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- CANONICAL DATA SOURCES ---
// Preserved exactly from the original code's intent and structure.
const EXPLORE_ITEMS = [
  {
    title: 'About Us',
    description: 'Learn about our mission, vision, and team',
    link: '/about',
    image: 'https://static.wixstatic.com/media/c418c8_660de16e84c4473a90609281ed302805~mv2.png?originWidth=896&originHeight=1152'
  },
  {
    title: 'Performances',
    description: 'Discover our upcoming and past events',
    link: '/upcoming-events',
    image: 'https://static.wixstatic.com/media/c418c8_19a32caf47bf4054bcd5d4d5caf7b2b7~mv2.png?originWidth=896&originHeight=1152'
  },
  {
    title: 'Sheet Music',
    description: 'Browse our choral series catalog',
    link: '/sheet-music',
    image: 'https://static.wixstatic.com/media/c418c8_94d3cdad7f8e4efaa76ae536a733c45c~mv2.png?originWidth=896&originHeight=1152'
  },
  {
    title: 'Recordings',
    description: 'Listen to our albums and recordings',
    link: '/recordings',
    image: 'https://static.wixstatic.com/media/c418c8_aad3b75f2c73428ab495993e8376b425~mv2.png?originWidth=896&originHeight=1152'
  }
];

export default function HomePage() {
  // --- SCROLL & MOTION HOOKS ---
  // Hero Parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Mission Sticky Reveal
  const missionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: missionScroll } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"]
  });
  const missionScale = useTransform(missionScroll, [0, 0.5, 1], [0.8, 1, 0.9]);
  const missionOpacity = useTransform(missionScroll, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Smooth progress bar for the whole page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary selection:text-background overflow-clip">
      <Header />

      {/* Global Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* --- HERO SECTION (The Overture) --- */}
      <section ref={heroRef} className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background z-10" />
          <Image
            src="https://static.wixstatic.com/media/c418c8_ed99705552a74e089558bbad36565418~mv2.png?originWidth=1600&originHeight=896"
            alt="CU Chorus performing on stage"
            className="w-full h-full object-cover opacity-60 grayscale-[30%]"
          />
        </motion.div>
        
        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-[100rem] mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <span className="text-primary tracking-[0.3em] text-sm md:text-base uppercase font-light">
              Est. 1972
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] tracking-tight mb-8 text-foreground"
          >
            The Legacy <br />
            <span className="italic text-primary/90">of Sound</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed font-light text-foreground/80"
          >
            Over 50 years of excellence in choral music, presenting high-quality performances
            for audiences across Hong Kong, China, and Southeast Asia.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <Link
              to="/upcoming-events"
              className="group relative px-10 py-4 overflow-hidden border border-primary bg-primary text-background transition-all duration-500 hover:bg-transparent hover:text-primary"
            >
              <span className="relative z-10 font-medium tracking-wide uppercase text-sm">Upcoming Events</span>
            </Link>
            <Link
              to="/about"
              className="group relative px-10 py-4 overflow-hidden border border-foreground/30 text-foreground transition-all duration-500 hover:border-primary hover:text-primary"
            >
              <span className="relative z-10 font-medium tracking-wide uppercase text-sm">Discover Our Story</span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-foreground/50">Scroll</span>
          <div className="w-[1px] h-16 bg-foreground/20 overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-1/2 bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* --- MISSION STATEMENT (The Motif - Sticky Scroll) --- */}
      <section ref={missionRef} className="relative h-[150vh] bg-background">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <div className="w-[80vw] h-[80vw] rounded-full border border-foreground/20" />
            <div className="absolute w-[60vw] h-[60vw] rounded-full border border-foreground/20" />
          </div>

          <div className="max-w-[100rem] mx-auto px-6 md:px-12 w-full">
            <motion.div
              style={{ scale: missionScale, opacity: missionOpacity }}
              className="text-center max-w-6xl mx-auto"
            >
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl mb-12 text-foreground leading-tight">
                Dedicated to Promoting <br />
                <span className="italic text-primary">the Art of Choral Music</span>
              </h2>
              <div className="w-24 h-[1px] bg-primary mx-auto mb-12" />
              <p className="text-xl md:text-3xl leading-relaxed font-light text-foreground/80 max-w-4xl mx-auto">
                CU Chorus is one of the best local university choirs in Hong Kong, renowned for
                high-quality performances and innovative programmes that inspire music lovers
                throughout the region.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- EXPLORE SECTION (The Repertoire - Editorial Layout) --- */}
      <section className="py-32 bg-secondary relative z-10">
        {/* Top Hairline Divider */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <span className="text-primary tracking-[0.2em] text-sm uppercase mb-4 block">Our Repertoire</span>
              <h2 className="font-heading text-5xl md:text-7xl text-foreground">
                Explore
              </h2>
            </div>
            <p className="text-foreground/60 max-w-md text-lg font-light">
              Delve into our rich history, upcoming performances, and extensive catalog of choral works.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
            {EXPLORE_ITEMS.map((item, index) => {
              // Create a staggered layout effect
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`group flex flex-col ${isEven ? 'md:mt-0' : 'md:mt-32'}`}
                >
                  <Link to={item.link} className="block w-full">
                    <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-background">
                      {/* Image Overlay for depth */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                      
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                      />
                      
                      {/* Decorative Corner Brackets */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-primary/0 group-hover:border-primary/50 transition-colors duration-500 z-20" />
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-primary/0 group-hover:border-primary/50 transition-colors duration-500 z-20" />
                    </div>
                    
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-heading text-4xl mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-lg leading-relaxed text-foreground/70 font-light max-w-sm">
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Animated Arrow */}
                      <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300 shrink-0">
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="text-foreground group-hover:text-background transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        >
                          <line x1="5" y1="19" x2="19" y2="5"></line>
                          <polyline points="10 5 19 5 19 14"></polyline>
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION (The Finale) --- */}
      <section className="relative py-40 bg-background overflow-hidden">
        {/* Background Texture/Image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://static.wixstatic.com/media/c418c8_c9a76efd173848869773f58170c24e95~mv2.png?originWidth=1600&originHeight=896"
            alt="Background texture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background" />
        </div>

        <div className="relative z-10 max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-primary tracking-[0.2em] text-sm uppercase mb-6 block">Join Our Journey</span>
            <h2 className="font-heading text-6xl md:text-8xl mb-10 text-foreground">
              Support Our Mission
            </h2>
            <p className="text-xl md:text-2xl mb-16 leading-relaxed font-light text-foreground/80">
              Help us continue promoting the art of choral music through sponsorship and support programs. Your contribution ensures the legacy of sound continues for generations.
            </p>
            
            <Link
              to="/support"
              className="inline-flex items-center justify-center gap-4 bg-primary text-background px-12 py-5 text-lg font-medium tracking-wide uppercase transition-all duration-500 hover:bg-white hover:scale-105"
            >
              <span>Learn More</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}