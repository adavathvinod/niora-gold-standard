import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
import { Camera, Sparkles, Heart, Crown, Star, Users } from 'lucide-react';
import bridalHero from '@/assets/bridal-hero.jpg';

const makeupServices = [
  {
    name: 'Bridal Makeup',
    description: 'Complete bridal transformation with HD/Airbrush makeup, hairstyling, and draping for your special day.',
    price: 'From ₹15,000',
    features: ['HD/Airbrush Makeup', 'Hairstyling', 'Saree/Lehenga Draping', 'Touch-up Kit'],
    icon: Crown,
  },
  {
    name: 'Engagement Makeup',
    description: 'Stunning look for your engagement ceremony with premium products and styling.',
    price: 'From ₹8,000',
    features: ['Premium Makeup', 'Hairstyling', 'Outfit Coordination', 'Long-lasting Formula'],
    icon: Heart,
  },
  {
    name: 'Party Makeup',
    description: 'Glamorous makeup for parties, receptions, and special occasions.',
    price: 'From ₹3,500',
    features: ['Glamour Makeup', 'Hairstyling', 'Eye Lashes', 'Setting Spray'],
    icon: Sparkles,
  },
  {
    name: 'Pre-Wedding Shoot Makeup',
    description: 'Camera-ready makeup designed to look flawless in photographs and videos.',
    price: 'From ₹6,000',
    features: ['Photo-Ready Finish', 'Multiple Look Options', 'Touch-ups Included', 'All-Day Wear'],
    icon: Camera,
  },
];

const photographyPackages = [
  {
    name: 'Bridal Portfolio',
    description: 'Complete bridal photography package capturing every moment of your special day.',
    price: 'From ₹35,000',
    features: ['8+ Hours Coverage', '500+ Edited Photos', 'Cinematic Video', 'Photo Album'],
    popular: true,
  },
  {
    name: 'Pre-Wedding Shoot',
    description: 'Romantic pre-wedding photoshoot at your choice of location.',
    price: 'From ₹25,000',
    features: ['4-6 Hours', 'Multiple Locations', '200+ Edited Photos', 'Highlight Video'],
    popular: false,
  },
  {
    name: 'Engagement Ceremony',
    description: 'Capture the joy of your engagement with professional photography.',
    price: 'From ₹15,000',
    features: ['4 Hours Coverage', '300+ Edited Photos', 'Same-Day Preview', 'Digital Delivery'],
    popular: false,
  },
  {
    name: 'Fashion & Portfolio',
    description: 'Professional portfolio shoot for models, actors, and influencers.',
    price: 'From ₹10,000',
    features: ['3 Hours Studio', '50+ Edited Photos', 'Multiple Looks', 'Retouching Included'],
    popular: false,
  },
];

const MakeupPhotography = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <SocialSidebar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={bridalHero}
              alt="Makeup and Photography"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-secondary/40 to-secondary/80" />
          </div>
          
          <div className="relative z-10 h-full flex items-center justify-center px-6">
            <div className="text-center max-w-4xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-sans text-sm tracking-[0.3em] uppercase text-primary mb-4"
              >
                Artistry & Elegance
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream mb-6"
              >
                Makeup & <span className="italic text-primary">Photography</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="font-sans text-lg text-cream/80 max-w-2xl mx-auto"
              >
                Where flawless artistry meets stunning visuals. Create memories 
                that last a lifetime with our expert makeup artists and photographers.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Makeup Services Section */}
        <section className="py-24 marble-texture">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <p className="font-sans text-sm tracking-[0.3em] uppercase text-primary mb-4">
                Professional Artistry
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
                Makeup <span className="italic">Services</span>
              </h2>
              <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
                Our expert makeup artists use premium international brands to 
                create stunning looks tailored to your style and occasion.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {makeupServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="group bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-luxury"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-display text-2xl">{service.name}</h3>
                        <span className="font-sans text-primary font-medium">{service.price}</span>
                      </div>
                      <p className="font-sans text-muted-foreground mb-4">{service.description}</p>
                      <ul className="grid grid-cols-2 gap-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="font-sans text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Photography Packages Section */}
        <section className="py-24 bg-secondary text-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <p className="font-sans text-sm tracking-[0.3em] uppercase text-primary mb-4">
                Capture Every Moment
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
                Photography <span className="italic text-primary">Packages</span>
              </h2>
              <p className="font-sans text-cream/70 max-w-2xl mx-auto">
                Professional photography services to immortalize your most 
                precious moments with artistic excellence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {photographyPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className={`relative group rounded-lg p-6 transition-all duration-500 ${
                    pkg.popular 
                      ? 'bg-gradient-to-b from-primary/20 to-primary/5 border-2 border-primary' 
                      : 'bg-charcoal border border-charcoal-light hover:border-primary/50'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-secondary px-4 py-1 rounded-full font-sans text-xs font-medium tracking-wide">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6 pt-2">
                    <h3 className="font-display text-xl mb-2">{pkg.name}</h3>
                    <p className="font-display text-2xl text-primary">{pkg.price}</p>
                  </div>
                  
                  <p className="font-sans text-sm text-cream/70 mb-6 text-center">
                    {pkg.description}
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="font-sans text-sm text-cream/80 flex items-center gap-3">
                        <Star className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to="/photography-booking"
                    className={`block text-center py-3 rounded font-sans text-sm font-medium tracking-wide transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-primary text-secondary hover:bg-primary/90'
                        : 'border border-primary text-primary hover:bg-primary hover:text-secondary'
                    }`}
                  >
                    Book Now
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 marble-texture">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
                Why Choose <span className="italic">Niora</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: 'Expert Team',
                  description: 'Certified professionals with years of experience in bridal and fashion makeup.',
                },
                {
                  icon: Sparkles,
                  title: 'Premium Products',
                  description: 'We use only international premium brands for a flawless, long-lasting finish.',
                },
                {
                  icon: Camera,
                  title: 'State-of-Art Equipment',
                  description: 'Professional-grade cameras and lighting for stunning visual results.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl mb-3">{item.title}</h3>
                  <p className="font-sans text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-secondary via-charcoal to-secondary text-cream">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-sans text-sm tracking-[0.3em] uppercase text-primary mb-4">
                Book Your Session
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
                Ready to Look <span className="italic text-primary">Stunning</span>?
              </h2>
              <p className="font-sans text-lg text-cream/70 mb-10 max-w-2xl mx-auto">
                Book a consultation with our expert team to discuss your 
                makeup and photography requirements. Let's create magic together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/booking" className="btn-luxury">
                  <span>Book Consultation</span>
                </Link>
                <Link to="/contact" className="btn-outline-luxury border-cream text-cream hover:bg-cream hover:text-secondary">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MakeupPhotography;
