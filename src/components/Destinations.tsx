import { motion, AnimatePresence } from 'motion/react';
import { Star, MapPin, ArrowRight, X, Calendar, Map, Info, Compass } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const destinations = [
  {
    id: 1,
    name: 'Santorini, Greece',
    country: 'Europe',
    price: '$1,500',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1674312685980-b531a4c9e059?q=80&w=1170&auto=format&fit=crop',
    desc: 'Bask in the iconic white-washed architecture and deep blue domes of Oia, overlooking the majestic volcanic caldera.',
    activities: ['Sunset Cruise', 'Volcanic Hike', 'Wine Tasting'],
    tips: 'Visit in September for perfect weather and fewer crowds.'
  },
  {
    id: 2,
    name: 'Kyoto, Japan',
    country: 'Asia',
    price: '$2,100',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?q=80&w=1171&auto=format&fit=crop',
    desc: 'Step back in time to the heart of traditional Japan, filled with zen gardens, bamboo forests, and sacred shrines.',
    activities: ['Tea Ceremony', 'Arashiyama Forest', 'Gion Walking Tour'],
    tips: 'The cherry blossoms in April are legendary, but the autumn leaves in November are equally stunning.'
  },
  {
    id: 3,
    name: 'Amalfi Coast, Italy',
    country: 'Europe',
    price: '$1,850',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1515400276915-8aa3a8fd70f4?q=80&w=1154&auto=format&fit=crop',
    desc: 'Winding coastal roads, pebble beaches, and pastel-colored villages perched precariously over the Mediterranean.',
    activities: ['Positano Exploration', 'Boat Tour to Capri', 'Cooking Class'],
    tips: 'Rent a scooter to explore the coast at your own pace.'
  },
  {
    id: 4,
    name: 'Machu Picchu, Peru',
    country: 'South America',
    price: '$1,200',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1723134084358-20a2dc177ff1?q=80&w=1157&auto=format&fit=crop',
    desc: 'The lost city of the Incas, a mystical archaeological wonder hidden high in the Andes mountains.',
    activities: ['Inca Trail Trek', 'Sacred Valley Tour', 'Mountain Photography'],
    tips: 'Acclimatize in Cusco for a few days before heading to the ruins.'
  },
  {
    id: 5,
    name: 'Bora Bora, Polynesia',
    country: 'Oceania',
    price: '$3,500',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1738762478614-6b6ef2d09355?q=80&w=1170&auto=format&fit=crop',
    desc: 'The ultimate tropical paradise with overwater bungalows and a vibrant turquoise lagoon full of marine life.',
    activities: ['Snorkeling Safari', 'Jet Ski Tour', 'Overwater Dining'],
    tips: 'The dry season is from May to October.'
  },
  {
    id: 6,
    name: 'Iceland',
    country: 'Europe',
    price: '$1,600',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1488415032361-b7e238421f1b?q=80&w=1169&auto=format&fit=crop',
    desc: 'A land of dramatic contrasts, from geothermal lagoons and active volcanoes to massive glaciers and black sand beaches.',
    activities: ['Blue Lagoon Soak', 'Northern Lights Tour', 'Golden Circle Drive'],
    tips: 'Pack layers, as the weather can change in minutes.'
  }
];

export default function Destinations() {
  const [selectedDest, setSelectedDest] = useState<typeof destinations[0] | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleExploreAll = () => {
    if (sectionRef.current) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: sectionRef.current, offsetY: 80 },
        ease: 'power3.inOut'
      });
    }
  };

  useEffect(() => {
    if (selectedDest && detailRef.current) {
      gsap.fromTo(detailRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [selectedDest]);

  useEffect(() => {
    if (selectedDest) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedDest]);

  const closeDetail = () => {
    if (detailRef.current) {
      gsap.to(detailRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => setSelectedDest(null)
      });
    } else {
      setSelectedDest(null);
    }
  };

  return (
    <section ref={sectionRef} id="destinations" className="py-24 overflow-hidden bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="text-brand-primary font-bold tracking-[0.3em] uppercase text-[10px] block mb-4"
            >
              Curated Selection
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-5xl md:text-7xl font-serif italic text-brand-secondary leading-[0.9]"
            >
              The Modern <br /> <span className="not-italic font-bold">Journeys.</span>
            </motion.h2>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            onClick={handleExploreAll}
            className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary border-b border-brand-secondary pb-1"
          >
            Explore All
          </motion.button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {destinations.map((destination, i) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.8 }}
              viewport={{ once: false }}
              onClick={() => setSelectedDest(destination)}
              className="group cursor-pointer"
            >
              <div className="relative h-[420px] rounded-[40px] overflow-hidden mb-6 border border-brand-secondary/5 shadow-sm group-hover:shadow-2xl group-hover:shadow-brand-secondary/10 transition-all duration-700">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/30">
                  <Star className="w-3 h-3 text-white inline-block mr-1 fill-white" />
                  {destination.rating}
                </div>
              </div>
              
              <div className="pl-2">
                <div className="flex items-center gap-2 text-brand-primary mb-2">
                   <span className="text-[10px] font-bold uppercase tracking-widest">{destination.country}</span>
                </div>
                <h3 className="text-2xl font-serif italic text-brand-secondary mb-2">{destination.name}</h3>
                <p className="text-[10px] text-brand-secondary/40 font-bold uppercase tracking-widest">
                  Starting at {destination.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedDest && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          >
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-brand-secondary/40 backdrop-blur-xl"
              onClick={closeDetail}
            />
            
            {/* Modal */}
            <div 
              ref={detailRef}
              className="relative bg-white w-full max-w-4xl rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-6xl flex flex-col lg:grid lg:grid-cols-2 z-10 my-4 lg:my-auto max-h-[92vh] sm:max-h-[85vh] lg:max-h-[90vh]"
            >
              <button 
                onClick={closeDetail}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl z-30 hover:bg-brand-primary hover:text-white transition-all ring-1 ring-brand-secondary/5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-[200px] sm:h-[280px] lg:h-full shrink-0">
                <img 
                  src={selectedDest.image} 
                  alt={selectedDest.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/60 to-transparent" />
                <div className="absolute bottom-4 left-6 sm:bottom-10 sm:left-10">
                   <div className="bg-brand-primary text-white text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.3em] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full mb-2 sm:mb-3 inline-block">
                     Featured Trip
                   </div>
                   <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight">
                     {selectedDest.name.split(',')[0]}
                   </h3>
                </div>
              </div>

              <div className="p-5 sm:p-8 lg:p-10 flex flex-col overflow-y-auto overflow-x-hidden custom-scrollbar min-h-0">
                 <div className="flex items-center gap-4 mb-4 lg:mb-8">
                    <div className="p-2 sm:p-3 bg-brand-bg rounded-xl">
                       <MapPin className="text-brand-primary w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                       <span className="block text-[7px] sm:text-[8px] uppercase tracking-widest font-bold text-brand-secondary/40 mb-0.5 sm:mb-1">Location</span>
                       <span className="text-xs sm:text-sm font-bold text-brand-secondary tracking-wide">{selectedDest.name}</span>
                    </div>
                 </div>

                 <p className="text-xs sm:text-base text-brand-secondary/70 italic font-serif mb-6 lg:mb-8 leading-relaxed">
                   "{selectedDest.desc}"
                 </p>

                 <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 lg:mb-10">
                    <div>
                       <div className="flex items-center gap-2 mb-3 lg:mb-4">
                          <Compass className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-brand-primary" />
                          <h4 className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-brand-secondary">Activities</h4>
                       </div>
                       <ul className="space-y-1.5 sm:space-y-2.5">
                          {selectedDest.activities.map((act) => (
                            <li key={act} className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-brand-secondary/60 flex items-center gap-2 lg:gap-2.5">
                               <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-brand-primary/40" />
                               {act}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-3 lg:mb-4">
                          <Info className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-brand-primary" />
                          <h4 className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-brand-secondary">Travel Tip</h4>
                       </div>
                       <p className="text-[8px] sm:text-[9px] text-brand-secondary/60 leading-relaxed uppercase tracking-widest font-medium">
                          {selectedDest.tips}
                       </p>
                    </div>
                 </div>

                 <div className="mt-auto pt-6 lg:pt-8 border-t border-brand-secondary/10 flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-6">
                    <div className="text-center sm:text-left w-full sm:w-auto">
                       <span className="block text-[8px] sm:text-[9px] uppercase tracking-widest font-bold text-brand-secondary/20 mb-0.5 sm:mb-1">Price</span>
                       <span className="text-xl sm:text-3xl font-serif italic text-brand-secondary">{selectedDest.price}</span>
                    </div>
                    <button className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-brand-secondary text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hover:bg-brand-primary transition-all shadow-xl shadow-brand-secondary/10">
                       Plan My Trip
                    </button>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
