import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-hair.jpg';

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <motion.img
          src={heroImage}
          alt="Luxury hair transformation"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-secondary/30 to-secondary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-sans text-sm tracking-[0.3em] uppercase text-primary mb-6"
          >
            The Gold Standard of Beauty
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream mb-6 leading-tight"
          >
            Where Beauty
            <br />
            <span className="italic text-gold-gradient">Meets Royalty</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-sans text-lg text-cream/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the epitome of luxury hair and beauty at Niora. 
            Where master stylists transform aspirations into artistry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact" className="btn-luxury">
              <span>Book Your Experience</span>
            </Link>
            <Link to="/services" className="btn-outline-luxury border-cream text-cream hover:bg-cream hover:text-secondary">
              Explore Services
            </Link>
          </motion.div>

          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex items-center justify-center gap-4"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-primary text-xl">★</span>
              ))}
            </div>
            <span className="font-sans text-sm text-cream/70 tracking-wide">
              800+ Five Star Reviews
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-xs text-cream/50 tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
