import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, Heart } from 'lucide-react';
import bridalImage from '@/assets/bridal-hero.jpg';

const services = [
  {
    icon: Scissors,
    title: 'Couture Hair',
    description: 'Precision cuts, color artistry, and styling that defines elegance.',
    price: 'From ₹1,999',
  },
  {
    icon: Sparkles,
    title: 'Skin Artistry',
    description: 'Advanced facials, rejuvenation, and skincare treatments.',
    price: 'From ₹2,499',
  },
  {
    icon: Heart,
    title: 'Bridal Suite',
    description: 'Complete bridal transformation for your perfect day.',
    price: 'From ₹25,000',
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-24 lg:py-32 marble-texture">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-primary mb-4">
            The Atelier
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Crafted for <span className="italic">Royalty</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Services List */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="service-card p-8 rounded-lg"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-2xl">{service.title}</h3>
                      <span className="font-sans text-sm text-primary font-medium">
                        {service.price}
                      </span>
                    </div>
                    <p className="font-sans text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/services" className="btn-luxury inline-block">
                <span>View All Services</span>
              </Link>
            </motion.div>
          </div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-luxury">
              <img
                src={bridalImage}
                alt="Bridal beauty"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary text-cream p-8 rounded-lg shadow-luxury max-w-xs">
              <p className="font-display text-3xl italic mb-2">Bridal Suite</p>
              <p className="font-sans text-sm text-cream/70">
                Complete transformations for your most cherished moments
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
