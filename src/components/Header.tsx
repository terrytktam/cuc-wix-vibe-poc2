import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Instagram, Youtube, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/integrations';
import { useLanguageStore, buildLocalizedPath } from '@/lib/languageStore';
import Cart from '@/components/Cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguageStore();
  const location = useLocation();
  const { itemCount, actions: cartActions } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Remove language prefix from pathname for comparison
  const cleanPath = location.pathname.replace(/^\/(?:en|zh)/, '') || '/';
  const isActive = (path: string) => cleanPath === path || (path === '/' && cleanPath === '');

  const navigationItems = [
    {
      label: language === 'en' ? 'Home' : '主頁',
      path: '/'
    },
    {
      label: language === 'en' ? 'About Us' : '關於我們',
      path: '/about',
      children: [
        { label: language === 'en' ? 'Mission & Vision' : '使命與願景', path: '/mission-vision' },
        { label: language === 'en' ? 'Music Director' : '音樂總監', path: '/music-director' },
        { label: language === 'en' ? 'Staff & Administration' : '職員及行政', path: '/staff' },
        { label: language === 'en' ? 'Chorus Members' : '合唱團成員', path: '/members' }
      ]
    },
    {
      label: language === 'en' ? 'Performances & Events' : '演出及活動',
      path: '/upcoming-events',
      children: [
        { label: language === 'en' ? 'Upcoming Events' : '即將舉行', path: '/upcoming-events' },
        { label: language === 'en' ? 'Past Events' : '過往活動', path: '/past-events' }
      ]
    },
    {
      label: language === 'en' ? 'Sheet Music' : '樂譜',
      path: '/sheet-music',
      children: [
        { label: language === 'en' ? 'CU Chorus Choral Series' : '中大合唱系列', path: '/sheet-music/choral' },
        { label: language === 'en' ? 'CU Chorus Cantonese Series' : '中大粵語流行曲系列', path: '/sheet-music/cantonese' },
        { label: language === 'en' ? 'Chorphilia' : 'Chorphilia', path: '/sheet-music/chorphilia' }
      ]
    },
    {
      label: language === 'en' ? 'Recordings' : '錄音',
      path: '/recordings'
    },
    {
      label: language === 'en' ? 'Support Us' : '支持我們',
      path: '/support',
      children: [
        { label: language === 'en' ? 'Sponsorship Programs' : '贊助計劃', path: '/sponsorship' }
      ]
    }
  ];

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'zh' : 'en';
    const newPath = buildLocalizedPath(cleanPath, newLanguage);
    // Update store first, then navigate
    toggleLanguage();
    // Use router navigation instead of full page reload
    window.location.href = newPath;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-muted-grey">
      <div className="max-w-[100rem] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={buildLocalizedPath('/', language)} className="flex items-center">
            <h1 className="font-heading text-2xl md:text-3xl text-foreground hover:text-primary transition-colors duration-300">
              CU Chorus
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={buildLocalizedPath(item.path, language)}
                  className={`text-base font-paragraph transition-colors duration-300 ${
                    isActive(item.path) ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
                
                {item.children && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-secondary border border-muted-grey py-4 px-6 min-w-[200px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={buildLocalizedPath(child.path, language)}
                          className={`block py-2 text-sm transition-colors duration-300 ${
                            isActive(child.path) ? 'text-primary' : 'text-foreground hover:text-primary'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Social Media, Cart & Language Toggle */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors duration-300"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
            <button
              onClick={cartActions.toggleCart}
              className="relative text-foreground hover:text-primary transition-colors duration-300"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={handleLanguageToggle}
              className="text-sm font-paragraph text-foreground hover:text-primary transition-colors duration-300 border border-muted-grey px-3 py-1"
              aria-label="Toggle language"
            >
              {language === 'en' ? '中文' : 'EN'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-foreground hover:text-primary transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-secondary border-t border-muted-grey overflow-hidden"
          >
            <nav className="max-w-[100rem] mx-auto px-8 py-6">
              {navigationItems.map((item) => (
                <div key={item.path} className="mb-4">
                  <Link
                    to={buildLocalizedPath(item.path, language)}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 text-base font-paragraph transition-colors duration-300 ${
                      isActive(item.path) ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                  
                  {item.children && (
                    <div className="ml-4 mt-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={buildLocalizedPath(child.path, language)}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block py-2 text-sm transition-colors duration-300 ${
                            isActive(child.path) ? 'text-primary' : 'text-foreground hover:text-primary'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-muted-grey">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
                <button
                  onClick={cartActions.toggleCart}
                  className="relative text-foreground hover:text-primary transition-colors duration-300"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart size={20} />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {itemCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={handleLanguageToggle}
                  className="text-sm font-paragraph text-foreground hover:text-primary transition-colors duration-300 border border-muted-grey px-3 py-1"
                  aria-label="Toggle language"
                >
                  {language === 'en' ? '中文' : 'EN'}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <Cart />
    </header>
  );
}
