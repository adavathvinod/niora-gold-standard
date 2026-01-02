import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays, isSameDay, isAfter, startOfToday } from 'date-fns';
import { Check, ChevronRight, Clock, Scissors, User, CalendarDays } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import stylist1 from '@/assets/stylist-1.jpg';
import stylist2 from '@/assets/stylist-2.jpg';
import stylist3 from '@/assets/stylist-3.jpg';
import { cn } from '@/lib/utils';

const services = [
  { id: 'haircut', name: 'Signature Haircut & Styling', category: 'Couture Hair', duration: '45 min', price: '₹1,999' },
  { id: 'color', name: 'Global Hair Color', category: 'Couture Hair', duration: '120 min', price: '₹4,999' },
  { id: 'balayage', name: 'Balayage & Highlights', category: 'Couture Hair', duration: '180 min', price: '₹6,999' },
  { id: 'keratin', name: 'Keratin Treatment', category: 'Couture Hair', duration: '150 min', price: '₹8,999' },
  { id: 'facial', name: 'Signature Facial', category: 'Skin Artistry', duration: '60 min', price: '₹2,499' },
  { id: 'hydrafacial', name: 'HydraFacial Luxe', category: 'Skin Artistry', duration: '90 min', price: '₹5,999' },
  { id: 'bridal-trial', name: 'Bridal Trial Session', category: 'Bridal Suite', duration: '120 min', price: '₹5,000' },
  { id: 'bridal-full', name: 'Bridal Makeup & Hair', category: 'Bridal Suite', duration: '240 min', price: '₹25,000' },
];

const stylists = [
  { id: 'priya', name: 'Priya Sharma', title: 'Creative Director', image: stylist1, specialties: ['Balayage', 'Bridal', 'Color'] },
  { id: 'rahul', name: 'Rahul Kapoor', title: 'Senior Barber', image: stylist2, specialties: ['Men\'s Cuts', 'Beard', 'Grooming'] },
  { id: 'anjali', name: 'Dr. Anjali Mehta', title: 'Skin Specialist', image: stylist3, specialties: ['Facials', 'Anti-Aging', 'HydraFacial'] },
];

const timeSlots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
];

type BookingStep = 'service' | 'stylist' | 'datetime' | 'details' | 'confirmation';

const Booking = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<BookingStep>('service');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const service = services.find(s => s.id === selectedService);
  const stylist = stylists.find(s => s.id === selectedStylist);

  const steps: { id: BookingStep; label: string; icon: React.ElementType }[] = [
    { id: 'service', label: 'Service', icon: Scissors },
    { id: 'stylist', label: 'Stylist', icon: User },
    { id: 'datetime', label: 'Date & Time', icon: CalendarDays },
    { id: 'details', label: 'Details', icon: Check },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCurrentStep('confirmation');
    setIsSubmitting(false);
    toast({
      title: "Booking Confirmed!",
      description: "You will receive a confirmation call within 24 hours.",
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'service': return !!selectedService;
      case 'stylist': return !!selectedStylist;
      case 'datetime': return !!selectedDate && !!selectedTime;
      case 'details': return formData.name && formData.phone;
      default: return false;
    }
  };

  const goToNext = () => {
    const stepOrder: BookingStep[] = ['service', 'stylist', 'datetime', 'details'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const goToPrevious = () => {
    const stepOrder: BookingStep[] = ['service', 'stylist', 'datetime', 'details'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  // Generate some "unavailable" times for realism
  const getAvailableTimes = () => {
    if (!selectedDate) return timeSlots;
    const dayOfWeek = selectedDate.getDay();
    // Less availability on weekends
    if (dayOfWeek === 0) return timeSlots.filter((_, i) => i >= 2); // Sunday opens later
    if (dayOfWeek === 6) return timeSlots.filter((_, i) => i % 2 === 0); // Saturday alternating
    return timeSlots;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <SocialSidebar />
      
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 bg-secondary text-cream">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-sans text-sm tracking-[0.3em] uppercase text-primary mb-4">
                Online Booking
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-light mb-6">
                Book Your <span className="italic text-primary">Experience</span>
              </h1>
              <p className="font-sans text-lg text-cream/70">
                Select your service, choose your stylist, and find the perfect time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Progress Steps */}
        {currentStep !== 'confirmation' && (
          <section className="py-8 marble-texture border-b border-border">
            <div className="max-w-4xl mx-auto px-6 lg:px-12">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const isActive = step.id === currentStep;
                  const isCompleted = index < currentStepIndex;
                  return (
                    <div key={step.id} className="flex items-center">
                      <button
                        onClick={() => isCompleted && setCurrentStep(step.id)}
                        disabled={!isCompleted}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                          isActive && "bg-primary text-primary-foreground",
                          isCompleted && "text-primary cursor-pointer hover:bg-primary/10",
                          !isActive && !isCompleted && "text-muted-foreground"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all",
                          isActive && "border-primary-foreground bg-primary-foreground/20",
                          isCompleted && "border-primary bg-primary text-primary-foreground",
                          !isActive && !isCompleted && "border-muted-foreground"
                        )}>
                          {isCompleted ? <Check className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                        </div>
                        <span className="hidden sm:block font-sans text-sm font-medium">{step.label}</span>
                      </button>
                      {index < steps.length - 1 && (
                        <ChevronRight className="w-5 h-5 text-muted-foreground mx-2" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Booking Content */}
        <section className="py-16 marble-texture min-h-[60vh]">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <AnimatePresence mode="wait">
              {/* Step 1: Service Selection */}
              {currentStep === 'service' && (
                <motion.div
                  key="service"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-3xl mb-8 text-center">
                    Select Your <span className="italic">Service</span>
                  </h2>
                  <div className="grid gap-4">
                    {['Couture Hair', 'Skin Artistry', 'Bridal Suite'].map(category => (
                      <div key={category}>
                        <h3 className="font-sans text-sm tracking-widest uppercase text-muted-foreground mb-3">
                          {category}
                        </h3>
                        <div className="grid gap-3">
                          {services.filter(s => s.category === category).map(svc => (
                            <button
                              key={svc.id}
                              onClick={() => setSelectedService(svc.id)}
                              className={cn(
                                "w-full p-5 rounded-lg border-2 text-left transition-all duration-300 flex items-center justify-between",
                                selectedService === svc.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border bg-card hover:border-primary/50"
                              )}
                            >
                              <div>
                                <p className="font-display text-xl">{svc.name}</p>
                                <p className="font-sans text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                  <Clock className="w-4 h-4" /> {svc.duration}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-sans text-lg text-primary font-medium">{svc.price}</p>
                                {selectedService === svc.id && (
                                  <Check className="w-5 h-5 text-primary ml-auto mt-1" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Stylist Selection */}
              {currentStep === 'stylist' && (
                <motion.div
                  key="stylist"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-3xl mb-8 text-center">
                    Choose Your <span className="italic">Stylist</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stylists.map(st => (
                      <button
                        key={st.id}
                        onClick={() => setSelectedStylist(st.id)}
                        className={cn(
                          "p-6 rounded-lg border-2 text-center transition-all duration-300",
                          selectedStylist === st.id
                            ? "border-primary bg-primary/5 shadow-gold"
                            : "border-border bg-card hover:border-primary/50"
                        )}
                      >
                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-background shadow-lg">
                          <img src={st.image} alt={st.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="font-display text-xl">{st.name}</p>
                        <p className="font-sans text-sm text-primary mb-3">{st.title}</p>
                        <div className="flex flex-wrap justify-center gap-1">
                          {st.specialties.map(spec => (
                            <span key={spec} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                              {spec}
                            </span>
                          ))}
                        </div>
                        {selectedStylist === st.id && (
                          <div className="mt-4 flex justify-center">
                            <Check className="w-6 h-6 text-primary" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Date & Time Selection */}
              {currentStep === 'datetime' && (
                <motion.div
                  key="datetime"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-3xl mb-8 text-center">
                    Pick Your <span className="italic">Date & Time</span>
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Calendar */}
                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="font-sans text-sm tracking-widest uppercase text-muted-foreground mb-4">
                        Select Date
                      </h3>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => 
                          !isAfter(date, addDays(startOfToday(), -1)) || 
                          isAfter(date, addDays(startOfToday(), 30))
                        }
                        className="rounded-md border-0 pointer-events-auto"
                      />
                    </div>

                    {/* Time Slots */}
                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="font-sans text-sm tracking-widest uppercase text-muted-foreground mb-4">
                        {selectedDate 
                          ? `Available Times for ${format(selectedDate, 'MMMM d, yyyy')}`
                          : 'Select a date first'
                        }
                      </h3>
                      {selectedDate ? (
                        <div className="grid grid-cols-3 gap-3">
                          {getAvailableTimes().map(time => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={cn(
                                "py-3 px-4 rounded-lg border-2 font-sans text-sm transition-all duration-300",
                                selectedTime === time
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="h-48 flex items-center justify-center text-muted-foreground">
                          <p className="font-sans text-sm">Please select a date to see available times</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact Details */}
              {currentStep === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-3xl mb-8 text-center">
                    Your <span className="italic">Details</span>
                  </h2>
                  <div className="max-w-xl mx-auto">
                    {/* Booking Summary */}
                    <div className="bg-secondary text-cream p-6 rounded-lg mb-8">
                      <h3 className="font-sans text-xs tracking-widest uppercase text-primary mb-4">
                        Booking Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-cream/70">Service</span>
                          <span className="font-medium">{service?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cream/70">Stylist</span>
                          <span className="font-medium">{stylist?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cream/70">Date</span>
                          <span className="font-medium">{selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cream/70">Time</span>
                          <span className="font-medium">{selectedTime}</span>
                        </div>
                        <div className="pt-3 border-t border-charcoal-light/30 flex justify-between">
                          <span className="text-primary font-medium">Total</span>
                          <span className="text-primary font-display text-xl">{service?.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Form */}
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="input-luxury border-border"
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="input-luxury border-border"
                        />
                        <input
                          type="tel"
                          placeholder="Phone *"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="input-luxury border-border"
                          required
                        />
                      </div>
                      <textarea
                        placeholder="Special requests or notes..."
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        rows={3}
                        className="input-luxury border-border resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Confirmation */}
              {currentStep === 'confirmation' && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl mb-4">
                    Booking <span className="italic text-primary">Confirmed!</span>
                  </h2>
                  <p className="font-sans text-muted-foreground max-w-md mx-auto mb-8">
                    Thank you, {formData.name}! Your appointment has been scheduled. 
                    Our concierge will call you to confirm within 24 hours.
                  </p>
                  <div className="bg-card p-8 rounded-lg border border-border max-w-md mx-auto mb-8">
                    <div className="space-y-4 text-left">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service</span>
                        <span className="font-medium">{service?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stylist</span>
                        <span className="font-medium">{stylist?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date & Time</span>
                        <span className="font-medium">
                          {selectedDate && format(selectedDate, 'MMM d')} at {selectedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <a href="/" className="btn-outline-luxury">
                    Return to Home
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep !== 'confirmation' && (
              <div className="flex justify-between mt-12 pt-8 border-t border-border">
                <button
                  onClick={goToPrevious}
                  disabled={currentStep === 'service'}
                  className={cn(
                    "px-8 py-3 font-sans text-sm tracking-widest uppercase transition-all duration-300",
                    currentStep === 'service'
                      ? "opacity-50 cursor-not-allowed"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  Back
                </button>
                
                {currentStep === 'details' ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!canProceed() || isSubmitting}
                    className={cn(
                      "btn-luxury",
                      (!canProceed() || isSubmitting) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span>{isSubmitting ? 'Confirming...' : 'Confirm Booking'}</span>
                  </button>
                ) : (
                  <button
                    onClick={goToNext}
                    disabled={!canProceed()}
                    className={cn(
                      "btn-luxury",
                      !canProceed() && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span>Continue</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
