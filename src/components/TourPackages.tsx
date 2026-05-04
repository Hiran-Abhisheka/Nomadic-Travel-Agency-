import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Clock, Users, ArrowRight, X, Calendar, CheckCircle2 } from 'lucide-react';

const packages = [
  {
    id: 1,
    name: 'Tuscan Wine Trails',
    price: '$2,400',
    highlight: 'Private Vineyard Tours',
    icon: Clock,
    itinerary: [
      { day: 1, title: 'Arrival & Welcome Dinner', desc: 'Arrive at your boutique villa in the heart of Chianti. Enjoy a sunset welcome dinner with local sommeliers.' },
      { day: 2, title: 'Private Vineyard Experience', desc: 'Visit three historic estates. Learn about the Sangiovese grape and enjoy vertical tastings with the winemakers.' },
      { day: 3, title: 'Florence Art & Soul', desc: 'A guided walk through the Uffizi Gallery followed by a specialized leather-working workshop with artisans.' },
      { day: 4, title: 'Culinary Heritage Workshop', desc: 'Spend the morning foraging for truffles (seasonal) or visiting a local cheese producer, followed by a cooking class.' },
      { day: 5, title: 'The Silent Hillside Hike', desc: 'A meditative walk through olive groves before a final gourmet lunch and departure.' }
    ]
  },
  {
    id: 2,
    name: 'Alpine Serenity',
    price: '$3,100',
    highlight: 'Heli-Skiing Included',
    icon: Users,
    itinerary: [
      { day: 1, title: 'Heli-Arrival in Zermatt', desc: 'Skip the train and arrive by private helicopter. Settle into an exclusive chalet with Matterhorn views.' },
      { day: 2, title: 'Pristine First Tracks', desc: 'Private heli-skiing flight to the highest accessible peaks for untouched powder and professional guiding.' },
      { day: 3, title: 'Glacier & Ice Crystal tour', desc: 'Explore the glacier caves and enjoy a unique mountaintop lunch at 3,800m above sea level.' },
      { day: 4, title: 'Thermal Wellness Day', desc: 'Full access to high-altitude thermal baths followed by a personalized sports massage session.' },
      { day: 5, title: 'Farewell Swiss Fondue', desc: 'A final morning run followed by a gourmet fondue lunch at a historic mountain hut.' }
    ]
  },
  {
    id: 3,
    name: 'Sahara Luxury',
    price: '$1,950',
    highlight: 'Glamping Under Stars',
    icon: Package,
    itinerary: [
      { day: 1, title: 'Marrakech Immersion', desc: 'Privileged access to the Secret Garden followed by a chef-led tour of the Rahba Kedima spice market.' },
      { day: 2, title: 'High Atlas Transit', desc: 'Travel by luxury 4x4 through the Tizi n\'Tichka pass, visiting ancient Kasbahs and local weaver cooperatives.' },
      { day: 3, title: 'The Deep Dunes Trek', desc: 'Traditional camel caravan into the Erg Chebbi dunes. Arrival at your luxury tented camp for stargazing.' },
      { day: 4, title: 'Nomadic Traditions', desc: 'Spend the morning with a local family. Learn about desert survival, traditional music, and bread-making.' },
      { day: 5, title: 'Sunrise Over Sand', desc: 'Dawn meditation on the dunes before returning to Ouarzazate for your flight.' }
    ]
  }
];

export default function TourPackages() {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedPkg(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (selectedPkg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedPkg]);

  return (
    <section className="py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-brand-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
          >
            Exclusive Collection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-4xl md:text-6xl font-serif italic text-brand-secondary mb-6"
          >
            Tour <span className="not-italic font-bold">Packages.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {packages.map((pkg, i) => (
            <motion.div 
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: false }}
              className="bg-white p-6 sm:p-7 rounded-[32px] border border-brand-secondary/5 group hover:border-brand-primary/20 transition-all duration-700 shadow-sm hover:shadow-xl hover:shadow-brand-secondary/5"
            >
              <div className="w-12 h-12 bg-brand-bg rounded-full flex items-center justify-center mb-8">
                <pkg.icon className="w-5 h-5 text-brand-primary" />
              </div>
              
              <h3 className="text-2xl font-serif italic text-brand-secondary mb-2">{pkg.name}</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary/40 mb-6">
                Starting from {pkg.price}
              </p>
              
              <div className="h-[1px] w-full bg-brand-secondary/5 mb-6" />
              
              <p className="text-xs font-bold uppercase tracking-wider text-brand-secondary/60 mb-8">
                Highlight: <span className="text-brand-secondary">{pkg.highlight}</span>
              </p>

              <button
                onClick={() => setSelectedPkg(pkg)}
                className="w-full py-4 border border-brand-secondary text-[10px] font-bold uppercase tracking-[0.2em] text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-all flex items-center justify-center gap-2"
              >
                View Itinerary <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Itinerary Modal */}
      <AnimatePresence>
        {selectedPkg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPkg(null)}
              className="absolute inset-0 bg-brand-secondary/40 backdrop-blur-md"
            />
            
            <motion.div 
              layoutId={`pkg-${selectedPkg.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="sticky top-0 bg-white z-10 px-8 py-8 border-b border-brand-secondary/5 flex items-center justify-between">
                <div>
                  <span className="text-brand-primary font-bold tracking-widest uppercase text-[9px] mb-1 block">Full Experience</span>
                  <h3 className="text-3xl font-serif italic text-brand-secondary">{selectedPkg.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedPkg(null)}
                  className="w-10 h-10 bg-brand-bg rounded-full flex items-center justify-center text-brand-secondary hover:bg-brand-primary hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar">
                <div className="space-y-12">
                  {selectedPkg.itinerary.map((item, idx) => (
                    <div key={item.day} className="relative pl-12 sm:pl-16">
                      {/* Timeline line */}
                      {idx !== selectedPkg.itinerary.length - 1 && (
                        <div className="absolute left-6 top-10 bottom-[-48px] w-[2px] bg-brand-secondary/5" />
                      )}
                      
                      {/* Day Circle */}
                      <div className="absolute left-0 top-0 w-12 h-12 bg-white rounded-full border-2 border-brand-primary/20 flex flex-col items-center justify-center shadow-lg shadow-brand-primary/5">
                        <span className="text-[8px] font-bold uppercase tracking-tighter text-brand-primary/60 leading-none">Day</span>
                        <span className="text-sm font-serif italic font-bold text-brand-primary">{item.day}</span>
                      </div>

                      <div className="group">
                        <h4 className="text-lg font-serif italic text-brand-secondary mb-3 group-hover:text-brand-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] sm:text-[13px] text-brand-secondary/60 leading-relaxed font-medium uppercase tracking-wide">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-16 p-8 bg-brand-bg rounded-[24px]">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary">What's Included</h4>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {['Expert Local Concierge', 'Luxury Transportation', 'Boutique Accommodations', 'Curated Gastronomy'].map((text) => (
                      <div key={text} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-brand-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary/60">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-brand-secondary/5 bg-white sm:flex items-center justify-between gap-8">
                <div className="mb-4 sm:mb-0">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-brand-secondary/20 block mb-1">Estimated Package Price</span>
                  <span className="text-2xl font-serif italic text-brand-secondary">{selectedPkg.price} <span className="text-xs uppercase not-italic font-bold text-brand-secondary/40 tracking-wider">/ Person</span></span>
                </div>
                <button className="w-full sm:w-auto px-12 py-4 bg-brand-secondary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-primary transition-all shadow-xl shadow-brand-secondary/20">
                  Reserve This Journey
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
