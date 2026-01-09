import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays, isAfter, startOfToday } from 'date-fns';
import { Check, ChevronRight, Clock, Scissors, CalendarDays } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const services = [
  // Hair Services
  { id: 'shampoo-f', name: 'Shampoo & Conditioning (Female)', category: 'Hair Services', duration: '30 min', price: '₹349' },
  { id: 'shampoo-m', name: 'Shampoo & Conditioning (Male)', category: 'Hair Services', duration: '20 min', price: '₹149' },
  { id: 'classic-cut', name: 'Classic Cut (U/V/Straight)', category: 'Hair Services', duration: '45 min', price: '₹449' },
  { id: 'advance-cut', name: 'Advance Hair Cut', category: 'Hair Services', duration: '60 min', price: '₹849' },
  { id: 'creative-cut-men', name: 'Creative Cut (Men)', category: 'Hair Services', duration: '45 min', price: '₹349' },
  { id: 'beard-styling', name: 'Beard Styling', category: 'Hair Services', duration: '20 min', price: '₹149' },
  { id: 'blowdry', name: 'Blowdry Setting', category: 'Hair Services', duration: '30 min', price: '₹599' },
  // Hair Treatments
  { id: 'keratin', name: 'Hair Keratin / Cysteine (S)', category: 'Hair Treatments', duration: '180 min', price: '₹5,499' },
  { id: 'smoothing', name: 'Permanent Smoothing (S)', category: 'Hair Treatments', duration: '180 min', price: '₹4,999' },
  { id: 'botox', name: 'Brazilian Hair Botox (S)', category: 'Hair Treatments', duration: '180 min', price: '₹6,599' },
  { id: 'classic-spa', name: 'Classic Hair Spa (S)', category: 'Hair Treatments', duration: '60 min', price: '₹999' },
  // Hair Colour
  { id: 'global-ammonia', name: 'Global Ammonia (S)', category: 'Hair Colour', duration: '120 min', price: '₹1,699' },
  { id: 'balayage', name: 'Balayage Technique (S)', category: 'Hair Colour', duration: '150 min', price: '₹2,799' },
  { id: 'highlights', name: 'Global Highlights Balayage (S)', category: 'Hair Colour', duration: '180 min', price: '₹3,499' },
  // Skin & Facial
  { id: 'classic-facial', name: 'Classic Facial', category: 'Skin Artistry', duration: '60 min', price: '₹999' },
  { id: 'gold-facial', name: 'Pure Gold Facial', category: 'Skin Artistry', duration: '75 min', price: '₹1,299' },
  { id: 'bridal-glow', name: 'Bridal Glow Facial', category: 'Skin Artistry', duration: '90 min', price: '₹5,499' },
  { id: 'cleanup', name: 'Advance Clean Up', category: 'Skin Artistry', duration: '45 min', price: '₹1,199' },
  { id: 'dtan', name: 'Classic D-Tan Face & Neck', category: 'Skin Artistry', duration: '30 min', price: '₹499' },
  // Makeup & Bridal
  { id: 'party-makeup', name: 'Party Makeup', category: 'Bridal Suite', duration: '90 min', price: '₹4,499' },
  { id: 'bridal-look', name: 'Bridal Look', category: 'Bridal Suite', duration: '180 min', price: '₹7,999' },
  { id: 'bridal-hd', name: 'Bridal HD Makeup', category: 'Bridal Suite', duration: '240 min', price: '₹9,999' },
  { id: 'groom-makeup', name: 'Groom Makeup', category: 'Bridal Suite', duration: '90 min', price: '₹4,999' },
  { id: 'mehandi-bridal', name: 'Bridal Mehandi (2 Hands)', category: 'Bridal Suite', duration: '120 min', price: '₹3,999' },
  // Spa & Wellness
  { id: 'body-massage', name: 'Full Body Massage', category: 'Spa & Wellness', duration: '60 min', price: '₹3,499' },
  { id: 'pedi-spa', name: 'Pedicure SPA', category: 'Spa & Wellness', duration: '45 min', price: '₹1,199' },
  { id: 'mani-spa', name: 'Manicure SPA', category: 'Spa & Wellness', duration: '45 min', price: '₹1,199' },
  { id: 'waxing-full', name: 'Full Body Waxing', category: 'Spa & Wellness', duration: '90 min', price: '₹2,999' },
];

const timeSlots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
];

type BookingStep = 'service' | 'datetime' | 'details' | 'confirmation';

const Booking = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<BookingStep>('service');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const service = services.find(s => s.id === selectedService);

  const steps: { id: BookingStep; label: string; icon: React.ElementType }[] = [
    { id: 'service', label: 'Service', icon: Scissors },
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
      case 'datetime': return !!selectedDate && !!selectedTime;
      case 'details': return formData.name && formData.phone;
      default: return false;
    }
  };

  const goToNext = () => {
    const stepOrder: BookingStep[] = ['service', 'datetime', 'details'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const goToPrevious = () => {
    const stepOrder: BookingStep[] = ['service', 'datetime', 'details'];
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

  const categories = [...new Set(services.map(s => s.category))];

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
                Select your service, choose your time, and let us pamper you.
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
                  <div className="grid gap-6">
                    {categories.map(category => (
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
                                <p className="font-display text-lg">{svc.name}</p>
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

              {/* Step 2: Date & Time Selection */}
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

              {/* Step 3: Contact Details */}
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
                          <span className="text-cream/70">Duration</span>
                          <span className="font-medium">{service?.duration}</span>
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
                        className="input-luxury border-border min-h-[100px] resize-none"
                        rows={4}
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
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-10 h-10 text-primary" />
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
                        <span className="text-muted-foreground">Date & Time</span>
                        <span className="font-medium">
                          {selectedDate && format(selectedDate, 'MMM d')} at {selectedTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-medium text-primary">{service?.price}</span>
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
