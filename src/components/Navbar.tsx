import { motion } from 'motion/react';
import { Compass, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-brand-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-brand-primary rounded-full" />
            <span className="text-xl font-bold tracking-tighter text-brand-secondary uppercase">
              NOMADIC.
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-10">
            {['Destinations', 'Experiences', 'About', 'Journal'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-brand-secondary/60 text-xs font-bold uppercase tracking-[0.2em] hover:text-brand-secondary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-secondary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            <motion.button
              whileHover={{ backgroundColor: '#2D2D2D', color: '#FFFFFF' }}
              className="px-6 py-3 border border-brand-secondary text-[10px] font-bold uppercase tracking-[0.2em] text-brand-secondary transition-colors"
            >
              Plan a Trip
            </motion.button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-secondary">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: '100vh', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-brand-bg fixed inset-0 z-40 top-24"
      >
        <div className="px-6 py-12 flex flex-col gap-8">
          {['Destinations', 'Experiences', 'About', 'Journal'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, x: -20 }}
              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * 0.1 }}
              className="text-4xl font-serif italic text-brand-secondary border-b border-brand-secondary/5 pb-4"
              onClick={() => setIsOpen(false)}
            >
              <span className="not-italic text-sm font-bold uppercase tracking-[0.4em] block mb-2 text-brand-primary opacity-50">0{i + 1}</span>
              {item}
            </motion.a>
          ))}
          <motion.button 
            initial={{ opacity: 0 }}
            animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full mt-8 bg-brand-secondary text-white px-8 py-5 text-[10px] font-bold uppercase tracking-widest"
          >
            Start Your Journey
          </motion.button>
        </div>
      </motion.div>
    </nav>
  );
}
