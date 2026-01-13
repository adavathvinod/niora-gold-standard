import { Instagram, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="social-sticky flex"
    >
      <a
        href="https://instagram.com/niora_unisex_salon"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="Follow us on Instagram"
      >
        <Instagram className="w-5 h-5" />
      </a>
      <a
        href="https://wa.me/917416683838"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="Message us on WhatsApp"
      >
        <Phone className="w-5 h-5" />
      </a>
      <a
        href="https://maps.google.com/?q=Arunodaya+Nagar"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="Find us on Google Maps"
      >
        <MapPin className="w-5 h-5" />
      </a>
    </motion.div>
  );
};

export default SocialSidebar;
