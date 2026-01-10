import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
import { MapPin, Phone, Mail, Clock, Instagram, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Request Received",
      description: "Our concierge team will contact you within 24 hours.",
    });
    
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
                The Concierge
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light mb-6">
                Get in <span className="italic text-primary">Touch</span>
              </h1>
              <p className="font-sans text-lg text-cream/70 max-w-2xl mx-auto">
                Our dedicated concierge team is here to assist you in 
                planning your perfect beauty experience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-24 marble-texture">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-display text-4xl mb-8">
                  Visit Our <span className="italic">Sanctuary</span>
                </h2>

                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl mb-1">Location</h3>
                      <p className="font-sans text-muted-foreground">
                        Arunodaya Nagar, Hyderabad<br />
                        Telangana, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl mb-1">Phone</h3>
                      <a 
                        href="tel:+919876543210" 
                        className="font-sans text-muted-foreground hover:text-primary transition-colors"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl mb-1">Email</h3>
                    <a 
                        href="mailto:niorahairandbeautysalon@gmail.com" 
                        className="font-sans text-muted-foreground hover:text-primary transition-colors"
                      >
                        niorahairandbeautysalon@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl mb-1">Hours</h3>
                      <p className="font-sans text-muted-foreground">
                        Mon - Fri: 8:00 AM - 10:00 PM<br />
                        Sat - Sun: 7:30 AM - 10:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl mb-1">Instagram</h3>
                      <a 
                        href="https://instagram.com/niora_unisex_salon" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-muted-foreground hover:text-primary transition-colors"
                      >
                        @niora_unisex_salon
                      </a>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="aspect-video rounded-lg overflow-hidden shadow-luxury">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2!2d78.4!3d17.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI0JzAwLjAiTiA3OMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Niora Salon Location"
                  />
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-secondary text-cream p-8 lg:p-12 rounded-lg shadow-luxury">
                  <h2 className="font-display text-4xl mb-2">
                    Request a <span className="italic text-primary">Call</span>
                  </h2>
                  <p className="font-sans text-cream/60 mb-8">
                    Fill out the form below and our concierge will reach out to you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="input-luxury border-charcoal-light text-cream placeholder:text-cream/40"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          required
                          className="input-luxury border-charcoal-light text-cream placeholder:text-cream/40"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          required
                          className="input-luxury border-charcoal-light text-cream placeholder:text-cream/40"
                        />
                      </div>
                    </div>

                    <div>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="input-luxury border-charcoal-light text-cream bg-transparent"
                      >
                        <option value="" className="bg-secondary">Select Service</option>
                        <option value="hair" className="bg-secondary">Couture Hair</option>
                        <option value="skin" className="bg-secondary">Skin Artistry</option>
                        <option value="bridal" className="bg-secondary">Bridal Suite</option>
                        <option value="membership" className="bg-secondary">VIP Membership</option>
                        <option value="home" className="bg-secondary">Home Service</option>
                        <option value="other" className="bg-secondary">Other Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your beauty goals..."
                        rows={4}
                        className="input-luxury border-charcoal-light text-cream placeholder:text-cream/40 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-luxury w-full flex items-center justify-center gap-2"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
