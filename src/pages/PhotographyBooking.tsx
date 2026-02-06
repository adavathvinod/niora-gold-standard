import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays, isAfter, startOfToday } from 'date-fns';
import { Check, ChevronRight, Camera, CalendarDays, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const photographyPackages = [
  {
    id: 'wedding',
    name: 'Wedding Package',
    description: 'Complete wedding photography & videography capturing every precious moment of your special day.',
    price: 'From ₹80,000',
    features: ['Bride & Groom Packages', 'Traditional Photos', 'Traditional Videos', 'Cinematic Teaser', 'Candid Photos', 'Drone Video'],
    popular: true,
  },
  {
    id: 'pre-wedding',
    name: 'Pre-Wedding Shoot',
    description: 'Romantic pre-wedding photoshoot at your choice of location with cinematic quality.',
    price: 'From ₹35,000',
    features: ['Cinematic Teaser', 'Candid Photos', 'Drone Videos'],
    popular: false,
  },
  {
    id: 'birthday',
    name: 'Birthday Shoots',
    description: 'Capture the joy and celebration of your special birthday moments.',
    price: 'From ₹25,000',
    features: ['Cinematic Teaser', 'Candid Photos'],
    popular: false,
  },
  {
    id: 'saree-dhoti',
    name: 'Saree & Dhoti Ceremonies',
    description: 'Traditional ceremony photography capturing cultural moments beautifully.',
    price: 'From ₹45,000',
    features: ['Traditional Photos', 'Traditional Videos', 'Cinematic Teaser', 'Candid Photos', 'Drone Video'],
    popular: false,
  },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

type BookingStep = 'package' | 'datetime' | 'details' | 'confirmation';

const PhotographyBooking = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<BookingStep>('package');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pkg = photographyPackages.find(p => p.id === selectedPackage);

  const steps: { id: BookingStep; label: string; icon: React.ElementType }[] = [
    { id: 'package', label: 'Package', icon: Camera },
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
      title: "Photography Booking Confirmed!",
      description: "Our team will contact you within 24 hours to discuss details.",
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'package': return !!selectedPackage;
      case 'datetime': return !!selectedDate && !!selectedTime;
      case 'details': return formData.name && formData.phone;
      default: return false;
    }
  };

  const goToNext = () => {
    const stepOrder: BookingStep[] = ['package', 'datetime', 'details'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const goToPrevious = () => {
    const stepOrder: BookingStep[] = ['package', 'datetime', 'details'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
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
                Photography Booking
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-light mb-6">
                Book Your <span className="italic text-primary">Photoshoot</span>
              </h1>
              <p className="font-sans text-lg text-cream/70">
                Choose your photography package and schedule your session.
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
        <section className="py-16 marble-texture min-h-[60vh] overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <AnimatePresence mode="wait">
              {/* Step 1: Package Selection */}
              {currentStep === 'package' && (
                <motion.div
                  key="package"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-3xl mb-8 text-center">
                    Select Your <span className="italic">Package</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {photographyPackages.map(pkgItem => (
                      <button
                        key={pkgItem.id}
                        onClick={() => setSelectedPackage(pkgItem.id)}
                        className={cn(
                          "relative p-6 rounded-lg border-2 text-left transition-all duration-300",
                          selectedPackage === pkgItem.id
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/50"
                        )}
                      >
                        {pkgItem.popular && (
                          <div className="absolute -top-3 left-4">
                            <span className="bg-primary text-secondary px-3 py-1 rounded-full font-sans text-xs font-medium">
                              Most Popular
                            </span>
                          </div>
                        )}
                        <div className="pt-2">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-display text-xl">{pkgItem.name}</h3>
                            <span className="font-sans text-lg text-primary font-medium">{pkgItem.price}</span>
                          </div>
                          <p className="font-sans text-sm text-muted-foreground mb-4">{pkgItem.description}</p>
                          <ul className="space-y-2">
                            {pkgItem.features.map(feature => (
                              <li key={feature} className="font-sans text-sm text-muted-foreground flex items-center gap-2">
                                <Star className="w-3 h-3 text-primary" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          {selectedPackage === pkgItem.id && (
                            <div className="absolute top-4 right-4">
                              <Check className="w-5 h-5 text-primary" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Time Selection */}
              {currentStep === 'datetime' && (
                <motion.div
                  key="datetime"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-3xl mb-8 text-center">
                    Pick Your <span className="italic">Date & Time</span>
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                          isAfter(date, addDays(startOfToday(), 60))
                        }
                        className="rounded-md border-0 pointer-events-auto"
                      />
                    </div>

                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="font-sans text-sm tracking-widest uppercase text-muted-foreground mb-4">
                        {selectedDate 
                          ? `Available Times for ${format(selectedDate, 'MMMM d, yyyy')}`
                          : 'Select a date first'
                        }
                      </h3>
                      {selectedDate ? (
                        <div className="grid grid-cols-2 gap-3">
                          {timeSlots.map(time => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={cn(
                                "py-4 px-4 rounded-lg border-2 font-sans text-sm transition-all duration-300",
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-3xl mb-8 text-center">
                    Your <span className="italic">Details</span>
                  </h2>
                  <div className="max-w-xl mx-auto">
                    <div className="bg-secondary text-cream p-6 rounded-lg mb-8">
                      <h3 className="font-sans text-xs tracking-widest uppercase text-primary mb-4">
                        Booking Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-cream/70">Package</span>
                          <span className="font-medium">{pkg?.name}</span>
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
                          <span className="text-primary font-display text-xl">{pkg?.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="font-sans text-sm font-medium mb-2 block">Full Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:outline-none transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="font-sans text-sm font-medium mb-2 block">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:outline-none transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="font-sans text-sm font-medium mb-2 block">Phone Number *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:outline-none transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="font-sans text-sm font-medium mb-2 block">Additional Notes</label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:outline-none transition-colors resize-none"
                          placeholder="Location preference, special requirements, etc."
                        />
                      </div>
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
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="font-display text-4xl mb-4">
                    Booking <span className="italic text-primary">Confirmed!</span>
                  </h2>
                  <p className="font-sans text-muted-foreground max-w-md mx-auto mb-8">
                    Thank you for choosing Niora! Our photography team will contact you 
                    within 24 hours to discuss your session details and location preferences.
                  </p>
                  <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-auto">
                    <h3 className="font-sans text-sm tracking-widest uppercase text-muted-foreground mb-4">
                      Booking Details
                    </h3>
                    <div className="space-y-2 text-left">
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Package:</span>
                        <span className="font-medium">{pkg?.name}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{selectedDate && format(selectedDate, 'MMMM d, yyyy')}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-medium text-primary">{pkg?.price}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep !== 'confirmation' && (
              <div className="flex justify-between mt-12">
                <button
                  onClick={goToPrevious}
                  disabled={currentStep === 'package'}
                  className={cn(
                    "px-6 py-3 rounded-lg font-sans text-sm font-medium transition-all",
                    currentStep === 'package'
                      ? "opacity-0 pointer-events-none"
                      : "border border-border hover:border-primary"
                  )}
                >
                  Back
                </button>

                {currentStep === 'details' ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!canProceed() || isSubmitting}
                    className={cn(
                      "px-8 py-3 rounded-lg font-sans text-sm font-medium transition-all",
                      canProceed() && !isSubmitting
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                ) : (
                  <button
                    onClick={goToNext}
                    disabled={!canProceed()}
                    className={cn(
                      "px-8 py-3 rounded-lg font-sans text-sm font-medium transition-all flex items-center gap-2",
                      canProceed()
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    Continue <ChevronRight className="w-4 h-4" />
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

export default PhotographyBooking;
