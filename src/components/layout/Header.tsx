import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import nioraLogo from '@/assets/niora-logo.png';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'The Atelier' },
  { href: '/makeup-photography', label: 'Makeup & Photography' },
  { href: '/gallery', label: 'Lookbook' },
  { href: '/vip', label: 'Private Suite' },
  { href: '/booking', label: 'Book Now' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      } else {
        setIsScrolled(false);
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`header-floating py-4 px-6 lg:px-12 ${
          isScrolled ? 'scrolled' : ''
        } ${isHidden ? 'hidden' : ''}`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={nioraLogo} alt="Niora" className="h-12 w-auto" />
            <span className="font-display text-2xl font-bold tracking-wide text-white">
              NIORA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-sans font-medium tracking-widest uppercase transition-colors duration-300 hover:text-primary ${
                  location.pathname === link.href
                    ? 'text-primary'
                    : isScrolled
                    ? 'text-foreground'
                    : 'text-secondary-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-secondary/95 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-secondary p-8"
            >
              <button
                className="absolute top-6 right-6 p-2 text-cream"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mt-20 flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block font-display text-3xl transition-colors duration-300 hover:text-primary ${
                        location.pathname === link.href
                          ? 'text-primary'
                          : 'text-cream'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="absolute bottom-12 left-8 right-8">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-luxury w-full text-center block"
                >
                  <span>Book Now</span>
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
