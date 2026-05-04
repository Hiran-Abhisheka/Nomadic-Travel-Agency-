import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import * as animeModule from 'animejs';
const anime = (animeModule as any).default || animeModule;
import { Shield, Sparkles, Headphones, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Briefcase,
    title: 'Expert Planning',
    desc: 'Meticulously crafted itineraries by travel specialists.'
  },
  {
    icon: Sparkles,
    title: 'Best Deals',
    desc: 'Unbeatable value for the worlds most exclusive stays.'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Peace of mind with global assistance at every hour.'
  },
  {
    icon: Shield,
    title: 'Secure Travel',
    desc: 'Vetted partners and comprehensive protection for you.'
  }
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    // Anime.js stagged animation for items
    if (typeof anime === 'function') {
      anime({
        targets: '.feature-card',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(200),
        easing: 'easeOutExpo',
        duration: 1500,
        autoplay: false,
        begin: (anim: any) => {
          containerRef.current?.classList.add('is-animating');
        }
      });

      anime({
        targets: '.feature-icon',
        scale: [0.8, 1.1, 1],
        rotate: '1turn',
        delay: anime.stagger(300),
        easing: 'easeInOutQuad',
        loop: true,
        direction: 'alternate',
        duration: 4000
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="text-brand-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
          >
            Capabilities
          </motion.span>
          <h2 
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-serif italic text-brand-secondary mb-6"
          >
            Bespoke <span className="not-italic font-bold">Standard.</span>
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-brand-secondary/50 font-medium uppercase tracking-[0.2em] text-[10px]"
          >
            The reasons why leading explorers choose us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <div 
              key={feature.title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="feature-card group p-12 rounded-[40px] bg-brand-bg border border-brand-secondary/5 hover:border-brand-primary/20 transition-all duration-700 text-center"
            >
              <div className="feature-icon w-12 h-12 bg-white rounded-full flex items-center justify-center mb-10 mx-auto shadow-sm">
                <feature.icon className="w-5 h-5 text-brand-primary" />
              </div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-secondary mb-4">{feature.title}</h4>
              <p className="text-[10px] text-brand-secondary/40 leading-relaxed font-bold uppercase tracking-wider">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
