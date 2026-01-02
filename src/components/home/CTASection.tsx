import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary text-cream relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-primary mb-6">
            Your Transformation Awaits
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
            Begin Your Journey to
            <br />
            <span className="italic text-primary">Timeless Elegance</span>
          </h2>
          <p className="font-sans text-lg text-cream/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the elite who trust Niora for their beauty transformations. 
            Experience the difference that true luxury makes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-luxury">
              <span>Book Your Appointment</span>
            </Link>
            <Link to="/vip" className="btn-outline-luxury border-primary text-primary hover:bg-primary hover:text-secondary">
              Explore VIP Membership
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
