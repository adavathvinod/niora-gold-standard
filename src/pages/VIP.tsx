import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
import { Crown, Diamond, Star, Home, Gift, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const membershipTiers = [
  {
    name: 'Gold',
    icon: Star,
    price: '₹2,499',
    period: 'per month',
    description: 'Perfect introduction to luxury',
    benefits: [
      '10% off all services',
      'Priority booking (24hr advance)',
      'Complimentary beverages',
      'Birthday month special',
      'Monthly newsletter & tips',
    ],
    featured: false,
  },
  {
    name: 'Platinum',
    icon: Diamond,
    price: '₹4,999',
    period: 'per month',
    description: 'The ultimate luxury experience',
    benefits: [
      '20% off all services',
      'Same-day priority booking',
      'Private styling suite access',
      'Complimentary hair spa monthly',
      'Exclusive product samples',
      'Partner discounts (fashion & dining)',
      'Anniversary celebration service',
    ],
    featured: true,
  },
  {
    name: 'Royal',
    icon: Crown,
    price: '₹9,999',
    period: 'per month',
    description: 'Bespoke luxury without limits',
    benefits: [
      '30% off all services',
      'Anytime priority booking',
      'Dedicated personal stylist',
      'Monthly home service included',
      'VIP event invitations',
      'Complimentary product kit quarterly',
      'Exclusive private suite',
      'Concierge service 24/7',
    ],
    featured: false,
  },
];

const homeServices = [
  {
    name: 'Bridal Home Package',
    description: 'Complete bridal transformation at your venue',
    price: 'From ₹45,000',
  },
  {
    name: 'Party Prep Package',
    description: 'Hair and makeup for up to 5 guests',
    price: 'From ₹25,000',
  },
  {
    name: 'Personal Styling Session',
    description: 'Individual hair styling and grooming',
    price: 'From ₹10,000',
  },
  {
    name: 'Spa Day at Home',
    description: 'Complete spa treatments in your space',
    price: 'From ₹15,000',
  },
];

const VIP = () => {
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
                The Private Suite
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light mb-6">
                Exclusive <span className="italic text-primary">Membership</span>
              </h1>
              <p className="font-sans text-lg text-cream/70 max-w-2xl mx-auto">
                Unlock a world of privileges designed for those who 
                appreciate the finest in beauty and self-care.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Membership Tiers */}
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
                Choose Your <span className="italic">Tier</span>
              </h2>
              <div className="section-divider" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {membershipTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative p-8 rounded-lg ${
                    tier.featured
                      ? 'bg-secondary text-cream shadow-luxury scale-105 border-2 border-primary'
                      : 'bg-card border border-border'
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 font-sans text-xs tracking-widest uppercase">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      tier.featured ? 'bg-primary/20' : 'bg-primary/10'
                    }`}>
                      <tier.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-3xl mb-2">{tier.name}</h3>
                    <p className={`font-sans text-sm ${tier.featured ? 'text-cream/70' : 'text-muted-foreground'}`}>
                      {tier.description}
                    </p>
                    <div className="mt-6">
                      <span className="font-display text-4xl text-primary">{tier.price}</span>
                      <span className={`font-sans text-sm ${tier.featured ? 'text-cream/60' : 'text-muted-foreground'}`}>
                        {' '}{tier.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <Star className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className={`font-sans text-sm ${tier.featured ? 'text-cream/80' : 'text-foreground'}`}>
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`block text-center py-4 font-sans text-sm tracking-widest uppercase transition-all duration-300 ${
                      tier.featured
                        ? 'btn-luxury w-full'
                        : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                    }`}
                  >
                    <span>Join {tier.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Home Services */}
        <section className="py-24 bg-secondary text-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                    <Home className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-sans text-sm tracking-[0.3em] uppercase text-primary">
                      Exclusive Service
                    </p>
                    <h2 className="font-display text-4xl">Home Visits</h2>
                  </div>
                </div>
                <p className="font-sans text-cream/70 leading-relaxed mb-8">
                  Experience the luxury of Niora in the comfort of your own space. 
                  Our home service brings our master stylists, premium products, and 
                  exclusive treatments directly to you.
                </p>
                <p className="font-sans text-cream/70 leading-relaxed mb-8">
                  Perfect for brides, special occasions, or those who prefer 
                  private pampering sessions.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                {homeServices.map((service) => (
                  <div
                    key={service.name}
                    className="p-6 bg-charcoal-light/30 rounded-lg border border-charcoal-light/50 hover:border-primary/50 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-xl">{service.name}</h3>
                      <span className="font-sans text-primary font-medium">
                        {service.price}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-cream/60">
                      {service.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gift Cards */}
        <section className="py-24 marble-texture">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Gift className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
                The Gift of <span className="italic">Luxury</span>
              </h2>
              <p className="font-sans text-muted-foreground mb-8 max-w-2xl mx-auto">
                Give the gift of an unforgettable experience. Our luxury gift cards 
                are the perfect way to share the Niora experience with someone special.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-luxury">
                  <span>Purchase Gift Card</span>
                </Link>
                <Link to="/contact" className="btn-outline-luxury">
                  Corporate Gifting
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

export default VIP;
