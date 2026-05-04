import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'motion/react';
import { ArrowRight, Plane, MapPin } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo(ctaRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.4'
    )
    .fromTo(decorationRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: 'power2.out' },
      '-=1'
    );

    // Floating animation
    gsap.to('.hero-float', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 z-10">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block text-brand-primary font-medium uppercase tracking-[0.3em] text-[10px] mb-6"
            >
              Curated Travel Agency
            </motion.span>
            
            <h1 
              ref={titleRef}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic text-brand-secondary leading-[0.9] mb-10"
            >
              Escape the <br />
              <span className="not-italic font-bold">Ordinary.</span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-base sm:text-lg text-brand-secondary/60 max-w-md mb-12 leading-relaxed"
            >
              Bespoke journeys designed for the modern explorer. We curate exclusive access to the world's most hidden gems and cultural treasures.
            </p>

            <div ref={ctaRef} className="bg-white shadow-2xl rounded-2xl p-2 flex flex-col sm:flex-row items-center gap-2 w-full max-w-xl border border-brand-secondary/5 mb-12 sm:mb-20">
              <div className="flex-1 px-4 py-2 border-b sm:border-b-0 sm:border-r border-brand-secondary/5 w-full text-left">
                <label className="block text-[8px] uppercase tracking-tighter text-brand-secondary/40 font-bold mb-1">Destination</label>
                <span className="text-sm font-bold text-brand-secondary">Kyoto, Japan</span>
              </div>
              <div className="flex-1 px-4 py-2 w-full text-left">
                <label className="block text-[8px] uppercase tracking-tighter text-brand-secondary/40 font-bold mb-1">Dates</label>
                <span className="text-sm font-bold text-brand-secondary">Sep 12 - Sep 24</span>
              </div>
              <button className="bg-brand-secondary text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-[10px] font-bold uppercase tracking-widest w-full sm:w-auto hover:bg-brand-primary transition-colors">
                Search
              </button>
            </div>
          </div>

          <div ref={decorationRef} className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-3xl shadow-brand-secondary/10 group bg-brand-secondary/5">
              <img 
                src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070" 
                alt="Kyoto Retreat" 
                className="w-full h-full object-cover grayscale-[20%] transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <span className="text-[10px] uppercase tracking-widest opacity-80 block mb-2">Featured Experience</span>
                <h3 className="text-3xl font-serif italic leading-tight">The Kyoto Temple <br/> Retreat</h3>
              </div>
              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/30">
                9.8 Excellence
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-primary rounded-full mix-blend-multiply opacity-20 -z-10" />
          </div>
        </div>
      </div>

      {/* Persistent Decorative Text */}
      <div className="absolute -right-24 top-1/2 -rotate-90 pointer-events-none hidden xl:block">
        <span className="text-[200px] font-bold text-brand-secondary/[0.03] leading-none select-none">EXPLORE</span>
      </div>
    </section>
  );
}
