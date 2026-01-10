import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gallery7 from '@/assets/gallery-7.jpg';
import gallery8 from '@/assets/gallery-8.jpg';
import gallery11 from '@/assets/gallery-11.jpg';
import gallery12 from '@/assets/gallery-12.jpg';

const images = [
  { src: gallery7, alt: 'Men\'s textured fade' },
  { src: gallery8, alt: 'Classic crop styling' },
  { src: gallery11, alt: 'Soft layers' },
  { src: gallery12, alt: 'Bridal curls' },
];

const GalleryPreview = () => {
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
            The Lookbook
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Transformations That <span className="italic">Inspire</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`gallery-item rounded-lg overflow-hidden ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`${index === 0 ? 'aspect-square' : 'aspect-square'}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-sans text-sm text-cream tracking-widest uppercase">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link to="/gallery" className="btn-outline-luxury">
            View Full Lookbook
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;
