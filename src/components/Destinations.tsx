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
    image: 'https://picsum.photos/seed/greece/600/800',
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
    image: 'https://picsum.photos/seed/kyoto/600/800',
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
    image: 'https://picsum.photos/seed/italy/600/800',
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
    image: 'https://picsum.photos/seed/peru/600/800',
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
    image: 'https://picsum.photos/seed/beach/600/800',
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
    image: 'https://picsum.photos/seed/iceland/600/800',
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-y-auto"
          >
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-brand-secondary/40 backdrop-blur-xl"
              onClick={closeDetail}
            />
            
            {/* Modal */}
            <div 
              ref={detailRef}
              className="relative bg-white w-full max-w-3xl rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-6xl grid lg:grid-cols-2 min-h-[350px] lg:min-h-[450px] z-10 my-4 sm:my-auto"
            >
              <button 
                onClick={closeDetail}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-xl z-30 hover:bg-brand-primary hover:text-white transition-all ring-1 ring-brand-secondary/5"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-[200px] lg:h-full">
                <img 
                  src={selectedDest.image} 
                  alt={selectedDest.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/40 to-transparent" />
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                   <div className="bg-brand-primary text-white text-[7px] font-bold uppercase tracking-[0.3em] px-2.5 py-1 rounded-full mb-2 inline-block">
                     Featured Trip
                   </div>
                   <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white leading-tight">
                     {selectedDest.name.split(',')[0]}
                   </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-center overflow-y-auto max-h-[60vh] lg:max-h-none">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-brand-bg rounded-xl">
                       <MapPin className="text-brand-primary w-3.5 h-3.5" />
                    </div>
                    <div>
                       <span className="block text-[7px] uppercase tracking-widest font-bold text-brand-secondary/40">Location</span>
                       <span className="text-[11px] font-bold text-brand-secondary">{selectedDest.name}</span>
                    </div>
                 </div>

                 <p className="text-xs sm:text-sm text-brand-secondary/60 italic font-serif mb-6 leading-relaxed">
                   "{selectedDest.desc}"
                 </p>

                 <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <div>
                       <div className="flex items-center gap-2 mb-3">
                          <Compass className="w-3 h-3 text-brand-primary" />
                          <h4 className="text-[8px] font-bold uppercase tracking-widest text-brand-secondary">Activities</h4>
                       </div>
                       <ul className="space-y-1.5">
                          {selectedDest.activities.map((act) => (
                            <li key={act} className="text-[8px] font-bold uppercase tracking-wider text-brand-secondary/60 flex items-center gap-2">
                               <div className="w-1 h-1 rounded-full bg-brand-primary/40" />
                               {act}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-3">
                          <Info className="w-3 h-3 text-brand-primary" />
                          <h4 className="text-[8px] font-bold uppercase tracking-widest text-brand-secondary">Travel Tip</h4>
                       </div>
                       <p className="text-[8px] text-brand-secondary/60 leading-relaxed uppercase tracking-wider font-medium">
                          {selectedDest.tips}
                       </p>
                    </div>
                 </div>

                 <div className="mt-auto border-t border-brand-secondary/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                       <span className="block text-[8px] uppercase tracking-widest font-bold text-brand-secondary/20 mb-0.5">Price</span>
                       <span className="text-lg sm:text-xl font-serif italic text-brand-secondary">{selectedDest.price}</span>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-2.5 bg-brand-secondary text-white text-[8px] font-bold uppercase tracking-widest hover:bg-brand-primary transition-all">
                       Book Now
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
