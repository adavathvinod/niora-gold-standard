import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
import { Scissors, Sparkles, Heart, Crown, Palette, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import bridalImage from '@/assets/bridal-hero.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery1 from '@/assets/gallery-1.jpg';

const serviceCategories = [
  {
    title: 'Couture Hair',
    icon: Scissors,
    image: gallery1,
    description: 'Precision artistry for those who demand excellence',
    services: [
      { name: 'Signature Haircut & Styling', price: '₹1,999' },
      { name: 'Global Hair Color', price: '₹4,999' },
      { name: 'Balayage & Highlights', price: '₹6,999' },
      { name: 'Keratin Treatment', price: '₹8,999' },
      { name: 'Hair Spa Therapy', price: '₹2,499' },
      { name: 'Olaplex Reconstruction', price: '₹5,499' },
    ],
  },
  {
    title: 'Skin Artistry',
    icon: Sparkles,
    image: gallery3,
    description: 'Advanced treatments for radiant, timeless beauty',
    services: [
      { name: 'Signature Facial', price: '₹2,499' },
      { name: 'HydraFacial Luxe', price: '₹5,999' },
      { name: 'Anti-Aging Treatment', price: '₹7,499' },
      { name: 'Chemical Peel', price: '₹4,999' },
      { name: 'LED Light Therapy', price: '₹3,499' },
      { name: 'Dermaplaning', price: '₹2,999' },
    ],
  },
  {
    title: 'Bridal Suite',
    icon: Heart,
    image: bridalImage,
    description: 'Complete transformations for your most precious moments',
    services: [
      { name: 'Bridal Makeup & Hair', price: '₹25,000' },
      { name: 'Reception Look', price: '₹18,000' },
      { name: 'Pre-Wedding Prep (3 sessions)', price: '₹15,000' },
      { name: 'Groom\'s Package', price: '₹8,000' },
      { name: 'Bridal Trial Session', price: '₹5,000' },
      { name: 'Family Package (5 people)', price: '₹45,000' },
    ],
  },
];

const premiumServices = [
  {
    icon: Crown,
    title: 'VIP Experience',
    description: 'Private suite, champagne service, and dedicated stylist',
    price: 'From ₹15,000',
  },
  {
    icon: Palette,
    title: 'Color Consultation',
    description: 'Expert color analysis with master colorist',
    price: 'Complimentary',
  },
  {
    icon: Star,
    title: 'Home Service',
    description: 'Luxury salon experience at your doorstep',
    price: 'From ₹10,000',
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <SocialSidebar />
      
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-secondary text-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-sans text-sm tracking-[0.3em] uppercase text-primary mb-4">
                The Atelier
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light mb-6">
                Our <span className="italic text-primary">Services</span>
              </h1>
              <p className="font-sans text-lg text-cream/70 max-w-2xl mx-auto">
                Each service is crafted with precision and care, 
                designed to elevate your beauty experience to new heights.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Premium Services Banner */}
        <section className="py-12 marble-texture border-y border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {premiumServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-4 text-center md:text-left"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg">{service.title}</h3>
                    <p className="font-sans text-xs text-muted-foreground">
                      {service.description}
                    </p>
                    <p className="font-sans text-sm text-primary font-medium">
                      {service.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Categories */}
        {serviceCategories.map((category, categoryIndex) => (
          <section
            key={category.title}
            className={`py-24 ${categoryIndex % 2 === 0 ? 'marble-texture' : 'bg-secondary text-cream'}`}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                categoryIndex % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={categoryIndex % 2 === 1 ? 'lg:order-2' : ''}
                >
                  <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-luxury">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={categoryIndex % 2 === 1 ? 'lg:order-1' : ''}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-display text-3xl md:text-4xl">{category.title}</h2>
                      <p className={`font-sans text-sm ${categoryIndex % 2 === 1 ? 'text-cream/70' : 'text-muted-foreground'}`}>
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {category.services.map((service) => (
                      <div
                        key={service.name}
                        className={`flex items-center justify-between py-4 border-b ${
                          categoryIndex % 2 === 1 ? 'border-charcoal-light/30' : 'border-border'
                        }`}
                      >
                        <span className="font-sans">{service.name}</span>
                        <span className="font-sans text-primary font-medium">{service.price}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/contact" className="btn-luxury inline-block">
                    <span>Book This Service</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-24 bg-secondary text-cream text-center">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-sans text-sm tracking-[0.3em] uppercase text-primary mb-4">
                Bespoke Service
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
                Can't Find What You're <span className="italic">Looking For?</span>
              </h2>
              <p className="font-sans text-cream/70 mb-8">
                Our concierge team is available to create a customized 
                beauty experience tailored to your unique needs.
              </p>
              <Link to="/contact" className="btn-luxury">
                <span>Contact Our Concierge</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
