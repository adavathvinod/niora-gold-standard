import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
import { Scissors, Sparkles, Heart, Crown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import bridalImage from '@/assets/bridal-hero.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery1 from '@/assets/gallery-1.jpg';

// Types for services with different price structures
type SimpleService = { name: string; price: string };
type SizedService = { name: string; s?: string; m?: string; l?: string };
type DualService = { name: string; pedi?: string; mani?: string };

interface ServiceCategory {
  title: string;
  icon: React.ElementType;
  services: (SimpleService | SizedService | DualService)[];
  hasSizes?: boolean;
  hasDual?: boolean;
  sizeLabels?: string[];
  dualLabels?: string[];
}

const serviceCategories: ServiceCategory[] = [
  {
    title: 'Hair Wash / Hair Cut',
    icon: Scissors,
    services: [
      { name: 'Shampoo & Conditioning (Female)', price: '₹349' },
      { name: 'Shampoo & Conditioning (Male)', price: '₹149' },
      { name: 'Fringe / Bangs Cut', price: '₹299' },
      { name: 'Classic Cut (U/V/Straight)', price: '₹449' },
      { name: 'Advance Hair Cut', price: '₹849' },
      { name: 'Kids Creative Cut (Below 10yr Girls)', price: '₹549' },
      { name: 'Kids Creative Cut (Below 10yr Boys)', price: '₹349' },
      { name: 'Kids Cut (Below 10 yr)', price: '₹199' },
      { name: 'Basic Cut (without hair Wash Men)', price: '₹249' },
      { name: 'Creative Cut (Men)', price: '₹349' },
      { name: 'Head Shave', price: '₹299' },
      { name: 'Beard Trim / Shave Beard Styling', price: '₹99' },
      { name: 'Beard Styling', price: '₹149' },
    ],
  },
  {
    title: 'Hair Styling',
    icon: Scissors,
    services: [
      { name: 'Blowdry Setting', price: '₹599' },
      { name: 'Fashion Curls', price: '₹699' },
      { name: 'Sleek Straight Ironing', price: '₹699' },
      { name: 'Tongs Setting', price: '₹799' },
    ],
  },
  {
    title: 'Head Massage',
    icon: Sparkles,
    services: [
      { name: '20 min Head Oil Massage (Men)', price: '₹349' },
      { name: '20 min Head Oil Massage (Women)', price: '₹499' },
      { name: 'Deep Conditioning (Men)', price: '₹599' },
      { name: 'Deep Conditioning (Women)', price: '₹799' },
    ],
  },
  {
    title: 'Hair Spa',
    icon: Sparkles,
    hasSizes: true,
    sizeLabels: ['S', 'M', 'L'],
    services: [
      { name: 'Classic Hair Spa', s: '₹999', m: '₹1,199', l: '₹1,399' },
      { name: 'Hydrate / Repair Spa', s: '₹1,199', m: '₹1,399', l: '₹1,599' },
      { name: 'Oil Reflection Spa', s: '₹1,599', m: '₹1,799', l: '₹1,999' },
      { name: 'Keratin Restore Spa', s: '₹1,899', m: '₹2,099', l: '₹2,299' },
      { name: 'Protein Spa', s: '₹1,999', m: '₹2,199', l: '₹2,399' },
      { name: 'Men Classic Spa', s: '₹699' },
      { name: 'Men Hydrate', s: '₹999' },
      { name: 'Oil Reflection', s: '₹1,299' },
      { name: 'Keratin Restore', s: '₹1,499' },
      { name: 'Protein Spa (Men)', s: '₹1,799' },
      { name: 'Anti-Hairfall Treatment', s: '₹1,499' },
      { name: 'Anti-Dandruff Treatment', s: '₹1,499' },
    ],
  },
  {
    title: 'Hair Treatments',
    icon: Scissors,
    hasSizes: true,
    sizeLabels: ['S', 'M', 'L'],
    services: [
      { name: 'Permanent Straightening', s: '₹4,999', m: '₹5,999', l: '₹6,999' },
      { name: 'Permanent Smoothing', s: '₹4,999', m: '₹5,999', l: '₹6,999' },
      { name: 'Permanent Rebonding', s: '₹4,999', m: '₹5,999', l: '₹6,999' },
      { name: 'Hair Keratin / Cysteine', s: '₹5,499', m: '₹6,499', l: '₹7,599' },
      { name: 'Hair Perming', s: '₹5,999', m: '₹7,499', l: '₹8,999' },
      { name: 'Brazilian Hair Botox', s: '₹6,599', m: '₹7,999', l: '₹9,499' },
      { name: 'Nanoplastia', s: '₹6,599', m: '₹7,999', l: '₹9,499' },
      { name: 'Kera-Smoothing', s: '₹6,999', m: '₹8,499', l: '₹10,499' },
      { name: 'Keratin / Straightening Men', s: '₹3,499' },
      { name: 'Rebonding / Perming Men', s: '₹2,999' },
      { name: 'Brazilian Hair Botox Men', s: '₹3,499' },
    ],
  },
  {
    title: 'Hair Colours',
    icon: Scissors,
    services: [
      { name: 'Hair Colour (Ammonia) For Men', price: '₹699' },
      { name: 'Hair Colour (Ammonia Free) Men', price: '₹899' },
      { name: 'Global Highlights For Men', price: '₹1,999' },
      { name: 'Beard & Moustache Colour', price: '₹349' },
      { name: 'Female Root Touchup (Upto 2 Inch Ammonia)', price: '₹699' },
      { name: 'Female Root Touchup (Upto 2 Inch Ammonia Free)', price: '₹899' },
    ],
  },
  {
    title: 'Advance Hair Colour',
    icon: Scissors,
    hasSizes: true,
    sizeLabels: ['S', 'M', 'L'],
    services: [
      { name: 'Global Ammonia', s: '₹1,699', m: '₹2,299', l: '₹3,199' },
      { name: 'Global Ammonia Free', s: '₹1,899', m: '₹2,899', l: '₹3,499' },
      { name: 'Global Fashion Colour', s: '₹2,199', m: '₹2,999', l: '₹3,999' },
      { name: 'Balayage Technique', s: '₹2,799', m: '₹3,499', l: '₹4,299' },
      { name: 'Global Highlights Balayage', s: '₹3,499', m: '₹4,299', l: '₹5,199' },
      { name: 'Global Colour & Highlights', s: '₹4,199', m: '₹5,099', l: '₹5,999' },
      { name: 'Highlights Crazy Colour Per Streak', s: '₹499' },
      { name: 'Coloured Streak With Pre-Lighting', s: '₹399' },
      { name: 'Coloured Streak Without Pre-Lighting', s: '₹299' },
    ],
  },
  {
    title: 'Henna Application',
    icon: Heart,
    services: [
      { name: 'Black Henna', price: '₹499' },
      { name: 'Red Henna', price: '₹499' },
    ],
  },
  {
    title: 'Threading',
    icon: Sparkles,
    services: [
      { name: 'Eyebrows', price: '₹50' },
      { name: 'Forehead', price: '₹40' },
      { name: 'Upperlip / Chin', price: '₹40' },
      { name: 'Lower Lip', price: '₹40' },
      { name: 'Full Face', price: '₹150' },
    ],
  },
  {
    title: 'Waxing',
    icon: Sparkles,
    services: [
      { name: 'Full Arms', price: '₹699' },
      { name: 'Full Legs', price: '₹999' },
      { name: 'Under Arms', price: '₹249' },
      { name: 'FA + FL + UA', price: '₹1,599' },
      { name: 'Full Back', price: '₹699' },
      { name: 'Midriff', price: '₹699' },
      { name: 'Half Legs', price: '₹649' },
      { name: 'Full Body (excluding Bikini Line)', price: '₹2,999' },
    ],
  },
  {
    title: 'Brazilian Wax',
    icon: Sparkles,
    services: [
      { name: 'Upper Lip', price: '₹99' },
      { name: 'Chin', price: '₹99' },
      { name: 'Lower Lip', price: '₹99' },
      { name: 'Full Face', price: '₹299' },
      { name: 'Under Arms', price: '₹299' },
      { name: 'Full Bikini', price: '₹2,499' },
    ],
  },
  {
    title: 'Clean Up',
    icon: Sparkles,
    services: [
      { name: 'Classic Clean Up', price: '₹699' },
      { name: 'Organic Clean Up', price: '₹999' },
      { name: 'Advance Clean Up', price: '₹1,199' },
      { name: 'Organic Power Alga Mask', price: '₹999' },
    ],
  },
  {
    title: 'D-Tan',
    icon: Sparkles,
    services: [
      { name: 'Classic D-Tan Face & Neck', price: '₹499' },
      { name: 'Blouse Line', price: '₹399' },
      { name: 'Under Arms', price: '₹199' },
      { name: 'Premium Face / Neck', price: '₹799' },
      { name: 'Full Arms / Half Legs', price: '₹1,199' },
      { name: 'Full Body (Expect Face & Neck)', price: '₹2,799' },
      { name: 'Body Polishing', price: '₹3,999' },
    ],
  },
  {
    title: 'Facial',
    icon: Sparkles,
    services: [
      { name: 'Classic Facial', price: '₹999' },
      { name: 'Pure Gold Facial', price: '₹1,299' },
      { name: 'Pro Hydra', price: '₹1,599' },
      { name: 'Pro Merga', price: '₹1,599' },
      { name: 'Pro Matte', price: '₹1,599' },
      { name: 'Dead Sea Mineral', price: '₹1,999' },
      { name: 'Papaya & Marshmallow', price: '₹2,999' },
      { name: 'Ginger & Walnut', price: '₹2,999' },
      { name: 'Jamaican Sorel', price: '₹2,999' },
      { name: 'Chocolate Mint', price: '₹3,499' },
      { name: 'Korean (Rice-Water)', price: '₹3,599' },
      { name: 'Blanch', price: '₹4,999' },
      { name: 'Sensi-Ace', price: '₹4,999' },
      { name: 'Upendice', price: '₹4,999' },
      { name: 'Bridal Glow', price: '₹5,499' },
      { name: 'Adden Hydra Machine', price: '₹1,199' },
    ],
  },
  {
    title: 'Pedicure & Manicure',
    icon: Sparkles,
    hasDual: true,
    dualLabels: ['Pedi', 'Mani'],
    services: [
      { name: 'Basic (Cut, File, Cleanse)', pedi: '₹499', mani: '₹399' },
      { name: 'Classic', pedi: '₹699', mani: '₹499' },
      { name: 'SPA', pedi: '₹1,199', mani: '₹1,199' },
      { name: 'Anti Tan', pedi: '₹1,399', mani: '₹999' },
      { name: 'Lemon / Blueberry', pedi: '₹1,499', mani: '₹1,299' },
      { name: 'Chocolate Mint', pedi: '₹1,699', mani: '₹1,499' },
      { name: 'Crystal', pedi: '₹1,999', mani: '₹1,699' },
      { name: 'Bomb / Candle', pedi: '₹2,199', mani: '₹1,899' },
      { name: 'Cut & File', pedi: '₹149' },
      { name: 'Change of Polish', pedi: '₹199' },
      { name: 'Cut File & Polish', pedi: '₹299' },
    ],
  },
  {
    title: 'Nails',
    icon: Sparkles,
    services: [
      { name: 'Gel Nail Polish Hands', price: '₹799' },
      { name: 'Gel Nail Polish Feet', price: '₹899' },
      { name: 'Gel Nail Extensions', price: '₹1,799' },
      { name: 'Acrylic Nail Extensions', price: '₹1,999' },
      { name: 'Nail Art Per Finger', price: '₹150' },
      { name: 'Cat Eye Per Finger', price: '₹120' },
    ],
  },
  {
    title: 'Warts Removal',
    icon: Sparkles,
    services: [
      { name: 'Machine', price: '₹199' },
      { name: 'Thread', price: '₹49' },
    ],
  },
  {
    title: 'Makeup',
    icon: Heart,
    services: [
      { name: 'Light Makeup', price: '₹3,499' },
      { name: 'Party Makeup', price: '₹4,499' },
      { name: 'No Makeup Look', price: '₹4,999' },
      { name: 'Engagement Look', price: '₹5,499' },
      { name: 'Reception Look', price: '₹5,499' },
      { name: 'Bridal Look', price: '₹7,999' },
      { name: 'Bridal HD Makeup', price: '₹9,999' },
      { name: 'Groom Makeup', price: '₹4,999' },
      { name: 'Saree Draping', price: '₹800 onwards' },
      { name: 'Hair Styling', price: '₹800 onwards' },
    ],
  },
  {
    title: 'Mehandi',
    icon: Heart,
    services: [
      { name: 'Arabic One Hand', price: '₹499' },
      { name: 'Floral One Hand', price: '₹499' },
      { name: 'Bridal 2 Hands', price: '₹3,999' },
      { name: 'Baby Shower 1 Hand', price: '₹999' },
      { name: 'Engagement 2 Hands', price: '₹3,499' },
      { name: 'Party 2 Hands', price: '₹1,499' },
      { name: 'Extra Art', price: '₹200' },
    ],
  },
  {
    title: 'Massage',
    icon: Sparkles,
    services: [
      { name: 'Feet Massage (20 Min)', price: '₹699' },
      { name: 'Full Body Massage', price: '₹3,499 onwards' },
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
    icon: Star,
    title: 'Home Service',
    description: 'Luxury salon experience at your doorstep',
    price: 'From ₹5,000',
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        <section className="py-24 marble-texture">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-light mb-4">
                Our <span className="italic">Services</span>
              </h2>
              <div className="section-divider" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.05 }}
                >
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={category.title} className="border border-border rounded-lg overflow-hidden bg-card shadow-soft">
                      <AccordionTrigger className="bg-secondary text-cream px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <category.icon className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="font-display text-lg text-left">{category.title}</h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pt-4 pb-6">
                        {/* Size Labels for sized services */}
                        {category.hasSizes && category.sizeLabels && (
                          <div className="flex justify-end gap-4 mb-3 pr-2">
                            {category.sizeLabels.map(label => (
                              <span key={label} className="font-sans text-xs text-muted-foreground w-14 text-center">
                                {label}
                              </span>
                            ))}
                          </div>
                        )}
                        {/* Dual Labels for pedi/mani services */}
                        {category.hasDual && category.dualLabels && (
                          <div className="flex justify-end gap-2 mb-3 pr-2">
                            {category.dualLabels.map(label => (
                              <span key={label} className="font-sans text-xs text-muted-foreground w-16 text-center">
                                {label}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="space-y-3">
                          {category.services.map((service, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between py-2 border-b border-border last:border-0"
                            >
                              <span className="font-sans text-sm flex-1 pr-2">{service.name}</span>
                              
                              {/* Simple price */}
                              {'price' in service && (
                                <span className="font-sans text-sm text-primary font-medium whitespace-nowrap">
                                  {service.price}
                                </span>
                              )}
                              
                              {/* Sized prices */}
                              {category.hasSizes && 's' in service && (
                                <div className="flex gap-4">
                                  <span className="font-sans text-xs text-primary w-14 text-center">
                                    {service.s || '-'}
                                  </span>
                                  <span className="font-sans text-xs text-primary w-14 text-center">
                                    {service.m || '-'}
                                  </span>
                                  <span className="font-sans text-xs text-primary w-14 text-center">
                                    {service.l || '-'}
                                  </span>
                                </div>
                              )}
                              
                              {/* Dual prices (pedi/mani) */}
                              {category.hasDual && 'pedi' in service && (
                                <div className="flex gap-2">
                                  <span className="font-sans text-xs text-primary w-16 text-center">
                                    {service.pedi || '-'}
                                  </span>
                                  <span className="font-sans text-xs text-primary w-16 text-center">
                                    {service.mani || '-'}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
                Ready to <span className="italic">Transform?</span>
              </h2>
              <p className="font-sans text-cream/70 mb-8">
                Book your appointment today and experience the gold standard of beauty.
              </p>
              <Link to="/booking" className="btn-luxury">
                <span>Book Your Appointment</span>
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
