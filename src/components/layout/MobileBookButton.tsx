import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const MobileBookButton = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-4 bg-gradient-to-t from-secondary/90 to-transparent pointer-events-none">
      <Link
        to="/booking"
        className="pointer-events-auto flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground font-sans font-semibold text-sm tracking-widest uppercase rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-300"
      >
        <Calendar className="w-5 h-5" />
        Book Now
      </Link>
    </div>
  );
};

export default MobileBookButton;
