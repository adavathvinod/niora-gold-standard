import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
import { X } from 'lucide-react';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';
import gallery7 from '@/assets/gallery-7.jpg';
import gallery8 from '@/assets/gallery-8.jpg';
import gallery9 from '@/assets/gallery-9.jpg';
import gallery10 from '@/assets/gallery-10.jpg';
import gallery11 from '@/assets/gallery-11.jpg';
import gallery12 from '@/assets/gallery-12.jpg';
import bridalImage from '@/assets/bridal-hero.jpg';
import salonInterior from '@/assets/salon-interior-1.png';
import salonSkincare from '@/assets/salon-skincare.png';
import salonSpa from '@/assets/salon-spa.png';

const galleryImages = [
  { src: gallery1, category: 'Hair Color', title: 'Balayage Transformation' },
  { src: gallery7, category: 'Men\'s Styling', title: 'Textured Fade' },
  { src: gallery8, category: 'Men\'s Styling', title: 'Classic Crop' },
  { src: gallery9, category: 'Hair Color', title: 'Platinum Ombre' },
  { src: gallery10, category: 'Hair Color', title: 'Natural Waves' },
  { src: gallery11, category: 'Hair Color', title: 'Soft Layers' },
  { src: gallery12, category: 'Bridal', title: 'Bridal Curls' },
  { src: gallery2, category: 'Men\'s Styling', title: 'Modern Fade' },
  { src: gallery3, category: 'Skin', title: 'Luxury Facial' },
  { src: gallery4, category: 'Nails', title: 'Champagne Elegance' },
  { src: gallery5, category: 'Bridal', title: 'Wedding Updo' },
  { src: gallery6, category: 'Hair Color', title: 'Vivid Color Art' },
  { src: bridalImage, category: 'Bridal', title: 'Classic Bridal Look' },
  { src: salonInterior, category: 'Salon', title: 'Our Space' },
  { src: salonSkincare, category: 'Salon', title: 'Skincare Bar' },
  { src: salonSpa, category: 'Salon', title: 'Spa Suite' },
];

const categories = ['All', 'Hair Color', 'Men\'s Styling', 'Bridal', 'Skin', 'Nails', 'Salon'];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

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
                The Lookbook
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light mb-6">
                Our <span className="italic text-primary">Portfolio</span>
              </h1>
              <p className="font-sans text-lg text-cream/70 max-w-2xl mx-auto">
                A curated collection of transformations that showcase 
                the artistry and excellence of our master stylists.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter */}
        <section className="py-8 marble-texture border-b border-border sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 font-sans text-sm tracking-wide transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-transparent text-foreground hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 marble-texture">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.src}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`gallery-item rounded-lg overflow-hidden cursor-pointer ${
                      index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className={`${index === 0 ? 'aspect-square' : 'aspect-[4/5]'} relative group`}>
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="font-sans text-xs text-primary tracking-widest uppercase mb-1">
                            {image.category}
                          </p>
                          <h3 className="font-display text-xl text-cream">
                            {image.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Rating Section */}
        <section className="py-16 bg-secondary text-cream text-center">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-primary text-3xl">★</span>
              ))}
            </div>
            <p className="font-display text-2xl italic text-champagne mb-2">
              4.8 out of 5 Stars
            </p>
            <p className="font-sans text-cream/60">
              Based on 150+ reviews from our valued clients
            </p>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/95 backdrop-blur-lg p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 text-cream hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <p className="font-sans text-xs text-primary tracking-widest uppercase mb-1">
                  {selectedImage.category}
                </p>
                <h3 className="font-display text-2xl text-cream">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;
