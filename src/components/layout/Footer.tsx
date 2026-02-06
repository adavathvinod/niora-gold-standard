import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, MapPin, Mail } from 'lucide-react';
import nioraLogo from '@/assets/niora-logo.png';

const Footer = forwardRef<HTMLElement>((_, ref) => {
  return (
    <footer ref={ref} className="bg-secondary text-cream">
      {/* Review Ticker */}
      <div className="border-b border-charcoal-light/30 py-4 overflow-hidden">
        <div className="review-ticker">
          <div className="review-ticker-content">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-8">
                <span className="text-primary">★★★★★</span>
                <span className="font-sans text-sm tracking-wide">
                  "Absolutely exceptional service!" —
                </span>
                <span className="text-primary">★★★★★</span>
                <span className="font-sans text-sm tracking-wide">
                  "Best salon experience ever!" —
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={nioraLogo} alt="Niora" className="h-16 w-auto" />
            </Link>
            <p className="font-display text-2xl italic text-primary mb-4">
              "The Signature of Bold Perfection"
            </p>
            <p className="font-sans text-sm text-cream/70 leading-relaxed">
              The Gold Standard of Beauty. Experience luxury hair and beauty
              services crafted by world-class master stylists.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-6 text-primary">Navigate</h4>
            <ul className="space-y-3">
            {[
                { href: '/services', label: 'The Atelier' },
                { href: '/gallery', label: 'Lookbook' },
                { href: '/vip', label: 'Private Suite' },
                { href: '/booking', label: 'Book Now' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm tracking-wide text-cream/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl mb-6 text-primary">
              The Concierge
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="font-sans text-sm text-cream/70">
                  Arunodaya Nagar, Hyderabad
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+917416683838"
                    className="font-sans text-sm text-cream/70 hover:text-primary transition-colors"
                  >
                    +91 74166 83838
                  </a>
                  <a
                    href="tel:+916303891181"
                    className="font-sans text-sm text-cream/70 hover:text-primary transition-colors"
                  >
                    +91 63038 91181
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:niorahairandbeautysalon@gmail.com"
                  className="font-sans text-sm text-cream/70 hover:text-primary transition-colors"
                >
                  niorahairandbeautysalon@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h4 className="font-display text-xl mb-6 text-primary">
              Opening Hours
            </h4>
            <ul className="space-y-2 mb-6">
              <li className="font-sans text-sm text-cream/70">
                Mon - Fri: 8:00 AM - 10:00 PM
              </li>
              <li className="font-sans text-sm text-cream/70">
                Sat - Sun: 7:30 AM - 10:00 PM
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/niora_unisex_salon"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/917416683838"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://share.google/8rVbPUUMhWG08eGUc"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Location"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-charcoal-light/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-cream/50 tracking-wide">
            © 2024 Niora Hair and Beauty. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-primary">
              <span className="text-lg">★★★★★</span>
              <span className="font-sans text-xs text-cream/70">
                150+ Five Star Reviews
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
