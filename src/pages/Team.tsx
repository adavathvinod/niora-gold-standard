import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
import { Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import stylist1 from '@/assets/stylist-1.jpg';
import stylist2 from '@/assets/stylist-2.jpg';
import stylist3 from '@/assets/stylist-3.jpg';

const teamMembers = [
  {
    name: 'Priya Sharma',
    title: 'Creative Director & Master Stylist',
    image: stylist1,
    specialties: ['Balayage', 'Editorial Styling', 'Bridal'],
    certifications: ['L\'Oréal Certified', 'Wella Master Colorist', 'Sassoon Academy'],
    experience: '12+ Years',
    bio: 'With over a decade of experience in high-fashion hair artistry, Priya brings Parisian elegance to every transformation.',
  },
  {
    name: 'Rahul Kapoor',
    title: 'Senior Barber & Men\'s Styling Expert',
    image: stylist2,
    specialties: ['Classic Cuts', 'Beard Sculpting', 'Grooming'],
    certifications: ['American Crew Certified', 'Reuzel Master', 'Schorem Graduate'],
    experience: '8+ Years',
    bio: 'A master of precision and detail, Rahul specializes in creating distinguished looks for the modern gentleman.',
  },
  {
    name: 'Dr. Anjali Mehta',
    title: 'Lead Skin Specialist',
    image: stylist3,
    specialties: ['HydraFacial', 'Anti-Aging', 'Dermaplaning'],
    certifications: ['MBBS Dermatology', 'IADVL Member', 'HydraFacial MD'],
    experience: '10+ Years',
    bio: 'Combining medical expertise with aesthetic artistry, Dr. Anjali delivers science-backed skincare solutions.',
  },
];

const Team = () => {
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
                The Master Stylists
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light mb-6">
                Meet Our <span className="italic text-primary">Artisans</span>
              </h1>
              <p className="font-sans text-lg text-cream/70 max-w-2xl mx-auto">
                World-class talent with global certifications and an unwavering 
                commitment to the art of beauty.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-24 marble-texture">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="space-y-32">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                    index % 2 === 1 ? '' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-luxury">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Experience Badge */}
                    <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-6 py-4 rounded-lg shadow-gold">
                      <p className="font-display text-2xl">{member.experience}</p>
                      <p className="font-sans text-xs uppercase tracking-wide">Experience</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-1 lg:pr-8' : 'lg:pl-8'}>
                    <h2 className="font-display text-4xl md:text-5xl mb-2">{member.name}</h2>
                    <p className="font-sans text-primary font-medium tracking-wide uppercase text-sm mb-6">
                      {member.title}
                    </p>
                    <p className="font-sans text-muted-foreground leading-relaxed mb-8">
                      {member.bio}
                    </p>

                    {/* Specialties */}
                    <div className="mb-8">
                      <h4 className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">
                        Specialties
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="px-4 py-2 bg-primary/10 text-primary font-sans text-sm rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="mb-8">
                      <h4 className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">
                        Certifications
                      </h4>
                      <div className="space-y-2">
                        {member.certifications.map((cert) => (
                          <div key={cert} className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            <span className="font-sans text-sm">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link to="/contact" className="btn-luxury inline-block">
                      <span>Book with {member.name.split(' ')[0]}</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Team CTA */}
        <section className="py-24 bg-secondary text-cream text-center">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
                Join Our <span className="italic text-primary">Elite Team</span>
              </h2>
              <p className="font-sans text-cream/70 mb-8">
                Are you a talented stylist looking for the next step in your career? 
                We're always seeking exceptional artists to join our family.
              </p>
              <Link to="/contact" className="btn-outline-luxury border-primary text-primary hover:bg-primary hover:text-secondary">
                Send Your Portfolio
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Team;
