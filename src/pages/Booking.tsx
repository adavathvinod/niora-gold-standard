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
  // Hair Wash / Hair Cut
  { id: 'shampoo-f', name: 'Shampoo & Conditioning (Female)', category: 'Hair Wash / Hair Cut', duration: '30 min', price: '₹349' },
  { id: 'shampoo-m', name: 'Shampoo & Conditioning (Male)', category: 'Hair Wash / Hair Cut', duration: '20 min', price: '₹149' },
  { id: 'fringe-cut', name: 'Fringe / Bangs Cut', category: 'Hair Wash / Hair Cut', duration: '20 min', price: '₹299' },
  { id: 'classic-cut', name: 'Classic Cut (U/V/Straight)', category: 'Hair Wash / Hair Cut', duration: '45 min', price: '₹449' },
  { id: 'advance-cut', name: 'Advance Hair Cut', category: 'Hair Wash / Hair Cut', duration: '60 min', price: '₹849' },
  { id: 'kids-creative-girls', name: 'Kids Creative Cut (Below 10yr Girls)', category: 'Hair Wash / Hair Cut', duration: '30 min', price: '₹549' },
  { id: 'kids-creative-boys', name: 'Kids Creative Cut (Below 10yr Boys)', category: 'Hair Wash / Hair Cut', duration: '30 min', price: '₹349' },
  { id: 'kids-cut', name: 'Kids Cut (Below 10 yr)', category: 'Hair Wash / Hair Cut', duration: '20 min', price: '₹199' },
  { id: 'basic-cut-men', name: 'Basic Cut (without hair Wash Men)', category: 'Hair Wash / Hair Cut', duration: '30 min', price: '₹249' },
  { id: 'creative-cut-men', name: 'Creative Cut (Men)', category: 'Hair Wash / Hair Cut', duration: '45 min', price: '₹349' },
  { id: 'head-shave', name: 'Head Shave', category: 'Hair Wash / Hair Cut', duration: '30 min', price: '₹299' },
  { id: 'beard-trim', name: 'Beard Trim / Shave Beard Styling', category: 'Hair Wash / Hair Cut', duration: '15 min', price: '₹99' },
  { id: 'beard-styling', name: 'Beard Styling', category: 'Hair Wash / Hair Cut', duration: '20 min', price: '₹149' },
  // Hair Styling
  { id: 'blowdry', name: 'Blowdry Setting', category: 'Hair Styling', duration: '30 min', price: '₹599' },
  { id: 'fashion-curls', name: 'Fashion Curls', category: 'Hair Styling', duration: '45 min', price: '₹699' },
  { id: 'sleek-straight', name: 'Sleek Straight Ironing', category: 'Hair Styling', duration: '45 min', price: '₹699' },
  { id: 'tongs-setting', name: 'Tongs Setting', category: 'Hair Styling', duration: '45 min', price: '₹799' },
  // Head Massage
  { id: 'head-massage-men', name: '20 min Head Oil Massage (Men)', category: 'Head Massage', duration: '20 min', price: '₹349' },
  { id: 'head-massage-women', name: '20 min Head Oil Massage (Women)', category: 'Head Massage', duration: '20 min', price: '₹499' },
  { id: 'deep-conditioning-men', name: 'Deep Conditioning (Men)', category: 'Head Massage', duration: '30 min', price: '₹599' },
  { id: 'deep-conditioning-women', name: 'Deep Conditioning (Women)', category: 'Head Massage', duration: '30 min', price: '₹799' },
  // Hair Spa
  { id: 'classic-spa-s', name: 'Classic Hair Spa (S)', category: 'Hair Spa', duration: '60 min', price: '₹999' },
  { id: 'classic-spa-m', name: 'Classic Hair Spa (M)', category: 'Hair Spa', duration: '75 min', price: '₹1,199' },
  { id: 'classic-spa-l', name: 'Classic Hair Spa (L)', category: 'Hair Spa', duration: '90 min', price: '₹1,399' },
  { id: 'hydrate-spa-s', name: 'Hydrate / Repair Spa (S)', category: 'Hair Spa', duration: '60 min', price: '₹1,199' },
  { id: 'hydrate-spa-m', name: 'Hydrate / Repair Spa (M)', category: 'Hair Spa', duration: '75 min', price: '₹1,399' },
  { id: 'hydrate-spa-l', name: 'Hydrate / Repair Spa (L)', category: 'Hair Spa', duration: '90 min', price: '₹1,599' },
  { id: 'oil-reflection-spa-s', name: 'Oil Reflection Spa (S)', category: 'Hair Spa', duration: '60 min', price: '₹1,599' },
  { id: 'oil-reflection-spa-m', name: 'Oil Reflection Spa (M)', category: 'Hair Spa', duration: '75 min', price: '₹1,799' },
  { id: 'oil-reflection-spa-l', name: 'Oil Reflection Spa (L)', category: 'Hair Spa', duration: '90 min', price: '₹1,999' },
  { id: 'keratin-restore-spa-s', name: 'Keratin Restore Spa (S)', category: 'Hair Spa', duration: '60 min', price: '₹1,899' },
  { id: 'keratin-restore-spa-m', name: 'Keratin Restore Spa (M)', category: 'Hair Spa', duration: '75 min', price: '₹2,099' },
  { id: 'keratin-restore-spa-l', name: 'Keratin Restore Spa (L)', category: 'Hair Spa', duration: '90 min', price: '₹2,299' },
  { id: 'protein-spa-s', name: 'Protein Spa (S)', category: 'Hair Spa', duration: '60 min', price: '₹1,999' },
  { id: 'protein-spa-m', name: 'Protein Spa (M)', category: 'Hair Spa', duration: '75 min', price: '₹2,199' },
  { id: 'protein-spa-l', name: 'Protein Spa (L)', category: 'Hair Spa', duration: '90 min', price: '₹2,399' },
  { id: 'men-classic-spa', name: 'Men Classic Spa', category: 'Hair Spa', duration: '45 min', price: '₹699' },
  { id: 'men-hydrate-spa', name: 'Men Hydrate', category: 'Hair Spa', duration: '45 min', price: '₹999' },
  { id: 'men-oil-reflection', name: 'Oil Reflection (Men)', category: 'Hair Spa', duration: '45 min', price: '₹1,299' },
  { id: 'men-keratin-restore', name: 'Keratin Restore (Men)', category: 'Hair Spa', duration: '45 min', price: '₹1,499' },
  { id: 'men-protein-spa', name: 'Protein Spa (Men)', category: 'Hair Spa', duration: '45 min', price: '₹1,799' },
  { id: 'anti-hairfall', name: 'Anti-Hairfall Treatment', category: 'Hair Spa', duration: '60 min', price: '₹1,499' },
  { id: 'anti-dandruff', name: 'Anti-Dandruff Treatment', category: 'Hair Spa', duration: '60 min', price: '₹1,499' },
  // Hair Treatments
  { id: 'straightening-s', name: 'Permanent Straightening (S)', category: 'Hair Treatments', duration: '180 min', price: '₹4,999' },
  { id: 'straightening-m', name: 'Permanent Straightening (M)', category: 'Hair Treatments', duration: '210 min', price: '₹5,999' },
  { id: 'straightening-l', name: 'Permanent Straightening (L)', category: 'Hair Treatments', duration: '240 min', price: '₹6,999' },
  { id: 'smoothing-s', name: 'Permanent Smoothing (S)', category: 'Hair Treatments', duration: '180 min', price: '₹4,999' },
  { id: 'smoothing-m', name: 'Permanent Smoothing (M)', category: 'Hair Treatments', duration: '210 min', price: '₹5,999' },
  { id: 'smoothing-l', name: 'Permanent Smoothing (L)', category: 'Hair Treatments', duration: '240 min', price: '₹6,999' },
  { id: 'rebonding-s', name: 'Permanent Rebonding (S)', category: 'Hair Treatments', duration: '180 min', price: '₹4,999' },
  { id: 'rebonding-m', name: 'Permanent Rebonding (M)', category: 'Hair Treatments', duration: '210 min', price: '₹5,999' },
  { id: 'rebonding-l', name: 'Permanent Rebonding (L)', category: 'Hair Treatments', duration: '240 min', price: '₹6,999' },
  { id: 'keratin-s', name: 'Hair Keratin / Cysteine (S)', category: 'Hair Treatments', duration: '180 min', price: '₹5,499' },
  { id: 'keratin-m', name: 'Hair Keratin / Cysteine (M)', category: 'Hair Treatments', duration: '210 min', price: '₹6,499' },
  { id: 'keratin-l', name: 'Hair Keratin / Cysteine (L)', category: 'Hair Treatments', duration: '240 min', price: '₹7,599' },
  { id: 'perming-s', name: 'Hair Perming (S)', category: 'Hair Treatments', duration: '180 min', price: '₹5,999' },
  { id: 'perming-m', name: 'Hair Perming (M)', category: 'Hair Treatments', duration: '210 min', price: '₹7,499' },
  { id: 'perming-l', name: 'Hair Perming (L)', category: 'Hair Treatments', duration: '240 min', price: '₹8,999' },
  { id: 'botox-s', name: 'Brazilian Hair Botox (S)', category: 'Hair Treatments', duration: '180 min', price: '₹6,599' },
  { id: 'botox-m', name: 'Brazilian Hair Botox (M)', category: 'Hair Treatments', duration: '210 min', price: '₹7,999' },
  { id: 'botox-l', name: 'Brazilian Hair Botox (L)', category: 'Hair Treatments', duration: '240 min', price: '₹9,499' },
  { id: 'nanoplastia-s', name: 'Nanoplastia (S)', category: 'Hair Treatments', duration: '180 min', price: '₹6,599' },
  { id: 'nanoplastia-m', name: 'Nanoplastia (M)', category: 'Hair Treatments', duration: '210 min', price: '₹7,999' },
  { id: 'nanoplastia-l', name: 'Nanoplastia (L)', category: 'Hair Treatments', duration: '240 min', price: '₹9,499' },
  { id: 'kera-smoothing-s', name: 'Kera-Smoothing (S)', category: 'Hair Treatments', duration: '180 min', price: '₹6,999' },
  { id: 'kera-smoothing-m', name: 'Kera-Smoothing (M)', category: 'Hair Treatments', duration: '210 min', price: '₹8,499' },
  { id: 'kera-smoothing-l', name: 'Kera-Smoothing (L)', category: 'Hair Treatments', duration: '240 min', price: '₹10,499' },
  { id: 'keratin-men', name: 'Keratin / Straightening Men', category: 'Hair Treatments', duration: '120 min', price: '₹3,499' },
  { id: 'rebonding-men', name: 'Rebonding / Perming Men', category: 'Hair Treatments', duration: '120 min', price: '₹2,999' },
  { id: 'botox-men', name: 'Brazilian Hair Botox Men', category: 'Hair Treatments', duration: '120 min', price: '₹3,499' },
  // Hair Colours
  { id: 'colour-ammonia-men', name: 'Hair Colour (Ammonia) For Men', category: 'Hair Colours', duration: '45 min', price: '₹699' },
  { id: 'colour-ammonia-free-men', name: 'Hair Colour (Ammonia Free) Men', category: 'Hair Colours', duration: '45 min', price: '₹899' },
  { id: 'highlights-men', name: 'Global Highlights For Men', category: 'Hair Colours', duration: '90 min', price: '₹1,999' },
  { id: 'beard-colour', name: 'Beard & Moustache Colour', category: 'Hair Colours', duration: '20 min', price: '₹349' },
  { id: 'root-touchup-ammonia', name: 'Female Root Touchup (Upto 2 Inch Ammonia)', category: 'Hair Colours', duration: '45 min', price: '₹699' },
  { id: 'root-touchup-ammonia-free', name: 'Female Root Touchup (Upto 2 Inch Ammonia Free)', category: 'Hair Colours', duration: '45 min', price: '₹899' },
  // Advance Hair Colour
  { id: 'global-ammonia-s', name: 'Global Ammonia (S)', category: 'Advance Hair Colour', duration: '90 min', price: '₹1,699' },
  { id: 'global-ammonia-m', name: 'Global Ammonia (M)', category: 'Advance Hair Colour', duration: '120 min', price: '₹2,299' },
  { id: 'global-ammonia-l', name: 'Global Ammonia (L)', category: 'Advance Hair Colour', duration: '150 min', price: '₹3,199' },
  { id: 'global-ammonia-free-s', name: 'Global Ammonia Free (S)', category: 'Advance Hair Colour', duration: '90 min', price: '₹1,899' },
  { id: 'global-ammonia-free-m', name: 'Global Ammonia Free (M)', category: 'Advance Hair Colour', duration: '120 min', price: '₹2,899' },
  { id: 'global-ammonia-free-l', name: 'Global Ammonia Free (L)', category: 'Advance Hair Colour', duration: '150 min', price: '₹3,499' },
  { id: 'global-fashion-s', name: 'Global Fashion Colour (S)', category: 'Advance Hair Colour', duration: '90 min', price: '₹2,199' },
  { id: 'global-fashion-m', name: 'Global Fashion Colour (M)', category: 'Advance Hair Colour', duration: '120 min', price: '₹2,999' },
  { id: 'global-fashion-l', name: 'Global Fashion Colour (L)', category: 'Advance Hair Colour', duration: '150 min', price: '₹3,999' },
  { id: 'balayage-s', name: 'Balayage Technique (S)', category: 'Advance Hair Colour', duration: '120 min', price: '₹2,799' },
  { id: 'balayage-m', name: 'Balayage Technique (M)', category: 'Advance Hair Colour', duration: '150 min', price: '₹3,499' },
  { id: 'balayage-l', name: 'Balayage Technique (L)', category: 'Advance Hair Colour', duration: '180 min', price: '₹4,299' },
  { id: 'highlights-balayage-s', name: 'Global Highlights Balayage (S)', category: 'Advance Hair Colour', duration: '150 min', price: '₹3,499' },
  { id: 'highlights-balayage-m', name: 'Global Highlights Balayage (M)', category: 'Advance Hair Colour', duration: '180 min', price: '₹4,299' },
  { id: 'highlights-balayage-l', name: 'Global Highlights Balayage (L)', category: 'Advance Hair Colour', duration: '210 min', price: '₹5,199' },
  { id: 'colour-highlights-s', name: 'Global Colour & Highlights (S)', category: 'Advance Hair Colour', duration: '150 min', price: '₹4,199' },
  { id: 'colour-highlights-m', name: 'Global Colour & Highlights (M)', category: 'Advance Hair Colour', duration: '180 min', price: '₹5,099' },
  { id: 'colour-highlights-l', name: 'Global Colour & Highlights (L)', category: 'Advance Hair Colour', duration: '210 min', price: '₹5,999' },
  { id: 'crazy-colour-streak', name: 'Highlights Crazy Colour Per Streak', category: 'Advance Hair Colour', duration: '30 min', price: '₹499' },
  { id: 'coloured-streak-prelight', name: 'Coloured Streak With Pre-Lighting', category: 'Advance Hair Colour', duration: '45 min', price: '₹399' },
  { id: 'coloured-streak', name: 'Coloured Streak Without Pre-Lighting', category: 'Advance Hair Colour', duration: '30 min', price: '₹299' },
  // Henna Application
  { id: 'black-henna', name: 'Black Henna', category: 'Henna Application', duration: '60 min', price: '₹499' },
  { id: 'red-henna', name: 'Red Henna', category: 'Henna Application', duration: '60 min', price: '₹499' },
  // Threading
  { id: 'threading-eyebrows', name: 'Eyebrows', category: 'Threading', duration: '10 min', price: '₹50' },
  { id: 'threading-forehead', name: 'Forehead', category: 'Threading', duration: '10 min', price: '₹40' },
  { id: 'threading-upperlip', name: 'Upperlip / Chin', category: 'Threading', duration: '10 min', price: '₹40' },
  { id: 'threading-lowerlip', name: 'Lower Lip', category: 'Threading', duration: '10 min', price: '₹40' },
  { id: 'threading-fullface', name: 'Full Face', category: 'Threading', duration: '20 min', price: '₹150' },
  // Waxing
  { id: 'wax-full-arms', name: 'Full Arms', category: 'Waxing', duration: '30 min', price: '₹699' },
  { id: 'wax-full-legs', name: 'Full Legs', category: 'Waxing', duration: '45 min', price: '₹999' },
  { id: 'wax-under-arms', name: 'Under Arms', category: 'Waxing', duration: '15 min', price: '₹249' },
  { id: 'wax-fa-fl-ua', name: 'FA + FL + UA', category: 'Waxing', duration: '75 min', price: '₹1,599' },
  { id: 'wax-full-back', name: 'Full Back', category: 'Waxing', duration: '30 min', price: '₹699' },
  { id: 'wax-midriff', name: 'Midriff', category: 'Waxing', duration: '30 min', price: '₹699' },
  { id: 'wax-half-legs', name: 'Half Legs', category: 'Waxing', duration: '30 min', price: '₹649' },
  { id: 'wax-full-body', name: 'Full Body (excluding Bikini Line)', category: 'Waxing', duration: '90 min', price: '₹2,999' },
  // Brazilian Wax
  { id: 'brazilian-upper-lip', name: 'Upper Lip (Brazilian)', category: 'Brazilian Wax', duration: '10 min', price: '₹99' },
  { id: 'brazilian-chin', name: 'Chin (Brazilian)', category: 'Brazilian Wax', duration: '10 min', price: '₹99' },
  { id: 'brazilian-lower-lip', name: 'Lower Lip (Brazilian)', category: 'Brazilian Wax', duration: '10 min', price: '₹99' },
  { id: 'brazilian-full-face', name: 'Full Face (Brazilian)', category: 'Brazilian Wax', duration: '20 min', price: '₹299' },
  { id: 'brazilian-under-arms', name: 'Under Arms (Brazilian)', category: 'Brazilian Wax', duration: '15 min', price: '₹299' },
  { id: 'brazilian-full-bikini', name: 'Full Bikini', category: 'Brazilian Wax', duration: '45 min', price: '₹2,499' },
  // Clean Up
  { id: 'classic-cleanup', name: 'Classic Clean Up', category: 'Clean Up', duration: '30 min', price: '₹699' },
  { id: 'organic-cleanup', name: 'Organic Clean Up', category: 'Clean Up', duration: '45 min', price: '₹999' },
  { id: 'advance-cleanup', name: 'Advance Clean Up', category: 'Clean Up', duration: '45 min', price: '₹1,199' },
  { id: 'organic-alga-mask', name: 'Organic Power Alga Mask', category: 'Clean Up', duration: '45 min', price: '₹999' },
  // D-Tan
  { id: 'dtan-face-neck', name: 'Classic D-Tan Face & Neck', category: 'D-Tan', duration: '30 min', price: '₹499' },
  { id: 'dtan-blouse-line', name: 'Blouse Line', category: 'D-Tan', duration: '20 min', price: '₹399' },
  { id: 'dtan-under-arms', name: 'Under Arms (D-Tan)', category: 'D-Tan', duration: '15 min', price: '₹199' },
  { id: 'dtan-premium-face', name: 'Premium Face / Neck', category: 'D-Tan', duration: '45 min', price: '₹799' },
  { id: 'dtan-arms-legs', name: 'Full Arms / Half Legs', category: 'D-Tan', duration: '45 min', price: '₹1,199' },
  { id: 'dtan-full-body', name: 'Full Body (Expect Face & Neck)', category: 'D-Tan', duration: '90 min', price: '₹2,799' },
  { id: 'body-polishing', name: 'Body Polishing', category: 'D-Tan', duration: '120 min', price: '₹3,999' },
  // Facial
  { id: 'classic-facial', name: 'Classic Facial', category: 'Facial', duration: '60 min', price: '₹999' },
  { id: 'gold-facial', name: 'Pure Gold Facial', category: 'Facial', duration: '75 min', price: '₹1,299' },
  { id: 'pro-hydra', name: 'Pro Hydra', category: 'Facial', duration: '75 min', price: '₹1,599' },
  { id: 'pro-merga', name: 'Pro Merga', category: 'Facial', duration: '75 min', price: '₹1,599' },
  { id: 'pro-matte', name: 'Pro Matte', category: 'Facial', duration: '75 min', price: '₹1,599' },
  { id: 'dead-sea', name: 'Dead Sea Mineral', category: 'Facial', duration: '90 min', price: '₹1,999' },
  { id: 'papaya-marshmallow', name: 'Papaya & Marshmallow', category: 'Facial', duration: '90 min', price: '₹2,999' },
  { id: 'ginger-walnut', name: 'Ginger & Walnut', category: 'Facial', duration: '90 min', price: '₹2,999' },
  { id: 'jamaican-sorel', name: 'Jamaican Sorel', category: 'Facial', duration: '90 min', price: '₹2,999' },
  { id: 'chocolate-mint-facial', name: 'Chocolate Mint', category: 'Facial', duration: '90 min', price: '₹3,499' },
  { id: 'korean-rice', name: 'Korean (Rice-Water)', category: 'Facial', duration: '90 min', price: '₹3,599' },
  { id: 'blanch', name: 'Blanch', category: 'Facial', duration: '90 min', price: '₹4,999' },
  { id: 'sensi-ace', name: 'Sensi-Ace', category: 'Facial', duration: '90 min', price: '₹4,999' },
  { id: 'upendice', name: 'Upendice', category: 'Facial', duration: '90 min', price: '₹4,999' },
  { id: 'bridal-glow', name: 'Bridal Glow', category: 'Facial', duration: '120 min', price: '₹5,499' },
  { id: 'adden-hydra', name: 'Adden Hydra Machine', category: 'Facial', duration: '45 min', price: '₹1,199' },
  // Pedicure & Manicure
  { id: 'basic-pedi', name: 'Basic Pedicure (Cut, File, Cleanse)', category: 'Pedicure & Manicure', duration: '30 min', price: '₹499' },
  { id: 'basic-mani', name: 'Basic Manicure (Cut, File, Cleanse)', category: 'Pedicure & Manicure', duration: '30 min', price: '₹399' },
  { id: 'classic-pedi', name: 'Classic Pedicure', category: 'Pedicure & Manicure', duration: '45 min', price: '₹699' },
  { id: 'classic-mani', name: 'Classic Manicure', category: 'Pedicure & Manicure', duration: '45 min', price: '₹499' },
  { id: 'spa-pedi', name: 'SPA Pedicure', category: 'Pedicure & Manicure', duration: '60 min', price: '₹1,199' },
  { id: 'spa-mani', name: 'SPA Manicure', category: 'Pedicure & Manicure', duration: '60 min', price: '₹1,199' },
  { id: 'anti-tan-pedi', name: 'Anti Tan Pedicure', category: 'Pedicure & Manicure', duration: '60 min', price: '₹1,399' },
  { id: 'anti-tan-mani', name: 'Anti Tan Manicure', category: 'Pedicure & Manicure', duration: '60 min', price: '₹999' },
  { id: 'lemon-pedi', name: 'Lemon / Blueberry Pedicure', category: 'Pedicure & Manicure', duration: '60 min', price: '₹1,499' },
  { id: 'lemon-mani', name: 'Lemon / Blueberry Manicure', category: 'Pedicure & Manicure', duration: '60 min', price: '₹1,299' },
  { id: 'chocolate-pedi', name: 'Chocolate Mint Pedicure', category: 'Pedicure & Manicure', duration: '60 min', price: '₹1,699' },
  { id: 'chocolate-mani', name: 'Chocolate Mint Manicure', category: 'Pedicure & Manicure', duration: '60 min', price: '₹1,499' },
  { id: 'crystal-pedi', name: 'Crystal Pedicure', category: 'Pedicure & Manicure', duration: '75 min', price: '₹1,999' },
  { id: 'crystal-mani', name: 'Crystal Manicure', category: 'Pedicure & Manicure', duration: '75 min', price: '₹1,699' },
  { id: 'bomb-pedi', name: 'Bomb / Candle Pedicure', category: 'Pedicure & Manicure', duration: '75 min', price: '₹2,199' },
  { id: 'bomb-mani', name: 'Bomb / Candle Manicure', category: 'Pedicure & Manicure', duration: '75 min', price: '₹1,899' },
  { id: 'cut-file', name: 'Cut & File', category: 'Pedicure & Manicure', duration: '15 min', price: '₹149' },
  { id: 'change-polish', name: 'Change of Polish', category: 'Pedicure & Manicure', duration: '15 min', price: '₹199' },
  { id: 'cut-file-polish', name: 'Cut File & Polish', category: 'Pedicure & Manicure', duration: '20 min', price: '₹299' },
  // Nails
  { id: 'gel-polish-hands', name: 'Gel Nail Polish Hands', category: 'Nails', duration: '45 min', price: '₹799' },
  { id: 'gel-polish-feet', name: 'Gel Nail Polish Feet', category: 'Nails', duration: '45 min', price: '₹899' },
  { id: 'gel-extensions', name: 'Gel Nail Extensions', category: 'Nails', duration: '90 min', price: '₹1,799' },
  { id: 'acrylic-extensions', name: 'Acrylic Nail Extensions', category: 'Nails', duration: '120 min', price: '₹1,999' },
  { id: 'nail-art', name: 'Nail Art Per Finger', category: 'Nails', duration: '10 min', price: '₹150' },
  { id: 'cat-eye', name: 'Cat Eye Per Finger', category: 'Nails', duration: '10 min', price: '₹120' },
  // Warts Removal
  { id: 'warts-machine', name: 'Warts Removal (Machine)', category: 'Warts Removal', duration: '15 min', price: '₹199' },
  { id: 'warts-thread', name: 'Warts Removal (Thread)', category: 'Warts Removal', duration: '10 min', price: '₹49' },
  // Makeup
  { id: 'light-makeup', name: 'Light Makeup', category: 'Makeup', duration: '60 min', price: '₹3,499' },
  { id: 'party-makeup', name: 'Party Makeup', category: 'Makeup', duration: '90 min', price: '₹4,499' },
  { id: 'no-makeup-look', name: 'No Makeup Look', category: 'Makeup', duration: '90 min', price: '₹4,999' },
  { id: 'engagement-look', name: 'Engagement Look', category: 'Makeup', duration: '120 min', price: '₹5,499' },
  { id: 'reception-look', name: 'Reception Look', category: 'Makeup', duration: '120 min', price: '₹5,499' },
  { id: 'bridal-look', name: 'Bridal Look', category: 'Makeup', duration: '180 min', price: '₹7,999' },
  { id: 'bridal-hd', name: 'Bridal HD Makeup', category: 'Makeup', duration: '240 min', price: '₹9,999' },
  { id: 'groom-makeup', name: 'Groom Makeup', category: 'Makeup', duration: '90 min', price: '₹4,999' },
  { id: 'saree-draping', name: 'Saree Draping', category: 'Makeup', duration: '30 min', price: '₹800 onwards' },
  { id: 'hair-styling-makeup', name: 'Hair Styling', category: 'Makeup', duration: '45 min', price: '₹800 onwards' },
  // Mehandi
  { id: 'arabic-one-hand', name: 'Arabic One Hand', category: 'Mehandi', duration: '30 min', price: '₹499' },
  { id: 'floral-one-hand', name: 'Floral One Hand', category: 'Mehandi', duration: '30 min', price: '₹499' },
  { id: 'bridal-mehandi', name: 'Bridal 2 Hands', category: 'Mehandi', duration: '120 min', price: '₹3,999' },
  { id: 'baby-shower-mehandi', name: 'Baby Shower 1 Hand', category: 'Mehandi', duration: '45 min', price: '₹999' },
  { id: 'engagement-mehandi', name: 'Engagement 2 Hands', category: 'Mehandi', duration: '90 min', price: '₹3,499' },
  { id: 'party-mehandi', name: 'Party 2 Hands', category: 'Mehandi', duration: '60 min', price: '₹1,499' },
  { id: 'extra-art', name: 'Extra Art', category: 'Mehandi', duration: '15 min', price: '₹200' },
  // Massage
  { id: 'feet-massage', name: 'Feet Massage (20 Min)', category: 'Massage', duration: '20 min', price: '₹699' },
  { id: 'full-body-massage', name: 'Full Body Massage', category: 'Massage', duration: '60 min', price: '₹3,499 onwards' },
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
