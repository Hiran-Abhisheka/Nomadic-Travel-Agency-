import { useEffect, useRef } from 'react';
import * as animeModule from 'animejs';
const anime = (animeModule as any).default || animeModule;
import { motion } from 'motion/react';
import { Play, Sparkles } from 'lucide-react';

export default function CTAInteraction() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Anime.js text animation
    if (typeof anime === 'function') {
      anime({
        targets: '.animate-text span',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: (anime as any).stagger(100),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutQuad'
      });
    }
  }, []);

  return (
    <section className="py-24 bg-brand-secondary overflow-hidden relative">
      {/* Background Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             rotate: [0, 90, 0],
           }}
           transition={{ duration: 20, repeat: Infinity }}
           className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 text-white/40 mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-brand-primary" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Limited Edition Trips</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif italic text-white mb-10 animate-text leading-[0.9]">
          { "Ready to redefine your perspective?".split('').map((char, i) => (
             <span key={i} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>

        <p className="text-lg text-white/40 max-w-xl mx-auto mb-12 uppercase tracking-widest font-bold text-xs">
          Join the nomadic collective of modern explorers. 
          Bespoke planning for those who seek the extraordinary.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-primary text-white px-10 py-5 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl shadow-brand-primary/20"
          >
            Start Your Journey
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="border border-white/20 text-white px-10 py-5 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all"
          >
            <Play className="w-3 h-3 fill-white text-white" />
            Watch Journal
          </motion.button>
        </div>
      </div>
    </section>
  );
}
