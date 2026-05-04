/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Destinations from './components/Destinations';
import TourPackages from './components/TourPackages';
import Showcase from './components/Showcase';
import CTAInteraction from './components/CTAInteraction';
import Footer from './components/Footer';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

export default function App() {
  const { scrollYProgress } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    // Velocity was causing issues with 'fetch' property on Window, using GSAP instead for requested smooth scroll
    gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.inOut" });
  };

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    // Fetch a travel-related lottie animation with robust parsing
    fetch('https://assets10.lottiefiles.com/packages/lf20_5njp3v83.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.text();
      })
      .then(text => {
        // Trim and attempt to extract only the JSON part if there is trailing junk
        const trimmed = text.trim();
        const jsonMatch = trimmed.match(/^\{[\s\S]*\}/);
        const cleanJson = jsonMatch ? jsonMatch[0] : trimmed;
        setLottieData(JSON.parse(cleanJson));
      })
      .catch(err => console.error('Lottie load error:', err));
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary selection:text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        
        {/* Lottie Animation Divider */}
        <div className="w-full h-64 flex justify-center items-center bg-brand-bg relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
             <div className="grid grid-cols-12 h-full gap-4">
                {Array.from({length: 12}).map((_, i) => (
                  <div key={i} className="border-r border-brand-secondary h-full" />
                ))}
             </div>
          </div>
          {lottieData && (
            <div className="w-48 h-48">
              <Lottie animationData={lottieData} loop={true} />
            </div>
          )}
        </div>

        <Features />
        
        <Showcase />

        <Destinations />

        <TourPackages />
        
        <CTAInteraction />

        {/* Experience Section */}
        <section className="py-20 bg-brand-bg relative overflow-hidden">
           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                 <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                 >
                    <div className="aspect-[4/5] max-w-sm mx-auto lg:ml-0 rounded-[30px] overflow-hidden shadow-2xl shadow-brand-secondary/10 relative group">
                       <motion.img 
                          initial={{ scale: 1.2 }}
                          whileInView={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          src="https://images.unsplash.com/photo-1544526226-d4568090ffb8?q=80&w=2070" 
                          alt="Bespoke Experience"
                          className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-[filter] duration-700"
                          referrerPolicy="no-referrer"
                       />
                    </div>
                    <motion.div 
                       initial={{ opacity: 0, scale: 0.8 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: false }}
                       transition={{ delay: 0.4, duration: 0.8 }}
                       className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-primary/10 rounded-[30px] -z-10 mix-blend-multiply" 
                    />
                 </motion.div>

                 <div>
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      className="text-brand-primary font-bold tracking-[0.3em] uppercase text-[9px] mb-4 block"
                    >
                      Our Philosophy
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-serif italic text-brand-secondary mb-8 leading-[0.9]">
                       Bespoke <br /> <span className="not-italic font-bold">Journeys.</span>
                    </h2>
                    <p className="text-sm text-brand-secondary/60 mb-10 leading-relaxed max-w-md">
                       We believe that travel is more than just seeing new places. It's about the people you meet, 
                       the cultures you experience, and the stories you bring home.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-10">
                       {[
                         { title: 'Local Guides', desc: 'Authentic connection' },
                         { title: 'Boutique Stay', desc: 'Character driven' },
                         { title: 'Logistics', desc: 'Seamless travel' },
                         { title: 'Access', desc: 'Exclusive events' }
                       ].map((item, i) => (
                         <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                         >
                            <h4 className="text-[9px] font-bold uppercase tracking-widest text-brand-secondary mb-1">{item.title}</h4>
                            <p className="text-[9px] text-brand-secondary/40 font-bold uppercase tracking-[0.2em]">{item.desc}</p>
                         </motion.div>
                       ))}
                    </div>

                    <button className="px-8 py-3.5 border border-brand-secondary text-[9px] font-bold uppercase tracking-widest text-brand-secondary hover:bg-brand-secondary hover:text-white transition-all">
                       Learn More
                    </button>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-2xl z-50 hover:bg-brand-secondary transition-colors"
        >
          <ChevronUp className="w-8 h-8" />
        </motion.button>
      )}
    </div>
  );
}
