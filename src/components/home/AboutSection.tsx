import { motion } from 'framer-motion';
import salonInterior from '@/assets/salon-interior-1.png';
import salonReception from '@/assets/salon-reception.png';

const AboutSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-luxury">
              <img
                src={salonInterior}
                alt="Niora Salon Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-8 -right-8 w-2/3 aspect-[4/3] rounded-lg overflow-hidden shadow-luxury border-4 border-secondary"
            >
              <img
                src={salonReception}
                alt="Niora Reception"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:pl-8"
          >
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-primary mb-4">
              Our Philosophy
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-8 leading-tight">
              The Art of
              <br />
              <span className="italic text-primary">Timeless Beauty</span>
            </h2>
            <p className="font-sans text-cream/80 leading-relaxed mb-6">
              At Niora, we believe that beauty is an art form—one that requires 
              passion, precision, and an unwavering commitment to excellence. 
              Our sanctuary is designed to transport you into a world of luxury 
              and sophistication.
            </p>
            <p className="font-sans text-cream/80 leading-relaxed mb-8">
              Every detail of our space—from the champagne gold accents to the 
              marble finishes—has been curated to create an atmosphere worthy 
              of royalty. Here, transformation is not just a service; 
              it's an experience.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <p className="font-display text-4xl text-primary mb-2">800+</p>
                <p className="font-sans text-xs tracking-wide text-cream/60 uppercase">
                  5-Star Reviews
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl text-primary mb-2">15+</p>
                <p className="font-sans text-xs tracking-wide text-cream/60 uppercase">
                  Master Stylists
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl text-primary mb-2">5</p>
                <p className="font-sans text-xs tracking-wide text-cream/60 uppercase">
                  Years of Excellence
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
