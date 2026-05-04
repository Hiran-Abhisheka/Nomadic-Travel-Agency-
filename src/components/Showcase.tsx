import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Lottie from 'lottie-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const destinations = [
  {
    id: 1,
    title: 'Norwegian Fjords',
    desc: 'Sail through deep blue waters surrounded by towering snow-capped peaks and cascading waterfalls.',
    image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070',
    accent: '#004E64'
  },
  {
    id: 2,
    title: 'Balkan Shores',
    desc: 'Uncover the untouched beauty of the Adriatic coast, where ancient stone cities meet turquoise waves.',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1972',
    accent: '#ECA400'
  },
  {
    id: 3,
    title: 'Kyoto Gardens',
    desc: 'Experience serenity in the heart of Japan, among zen gardens and historic tea houses.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070',
    accent: '#D46B4E'
  }
];

export default function Showcase() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lottieData, setLottieData] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    // Basic travel icon lottie - using robust parsing
    fetch('https://assets10.lottiefiles.com/packages/lf20_5njp3v83.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.text();
      })
      .then(text => {
        const trimmed = text.trim();
        const jsonMatch = trimmed.match(/^\{[\s\S]*\}/);
        const cleanJson = jsonMatch ? jsonMatch[0] : trimmed;
        setLottieData(JSON.parse(cleanJson));
      })
      .catch(err => console.error('Showcase Lottie error:', err));
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % destinations.length);
  const prev = () => setIndex((prev) => (prev - 1 + destinations.length) % destinations.length);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.showcase-bg', 
        { scale: 1.1 }, 
        { scale: 1, duration: 2, ease: 'power2.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="z-10"
              >
                <span className="text-brand-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
                  Featured Destination
                </span>
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif italic text-brand-secondary mb-10 leading-[0.9]">
                   {destinations[index].title.split(' ')[0]} <br />
                   <span className="not-italic font-bold">{destinations[index].title.split(' ')[1]}</span>
                </h2>
                <p className="text-base sm:text-lg text-brand-secondary/60 mb-12 leading-relaxed max-w-md">
                   {destinations[index].desc}
                </p>
                <button className="px-12 py-5 bg-brand-secondary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-primary transition-colors flex items-center gap-3">
                   Learn More
                   <div className="w-1 h-1 bg-white rounded-full" />
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-4 mt-16">
              <button onClick={prev} className="w-14 h-14 border border-brand-secondary/10 rounded-full flex items-center justify-center hover:bg-brand-secondary hover:text-white transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} className="w-14 h-14 border border-brand-secondary/10 rounded-full flex items-center justify-center hover:bg-brand-secondary hover:text-white transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {lottieData && (
              <div className="absolute -bottom-20 -right-20 w-48 h-48 opacity-10 pointer-events-none">
                <Lottie animationData={lottieData} />
              </div>
            )}
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden drop-shadow-3xl shadow-brand-secondary/10 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "circOut" }}
                  className="w-full h-full relative"
                >
                  <motion.img
                    src={destinations[index].image}
                    style={{ y }}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 1.1 }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    alt={destinations[index].title}
                    className="showcase-bg absolute inset-0 w-full h-[120%] -top-[10%] object-cover grayscale-[10%]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 border-2 border-brand-primary/10 rounded-[60px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
