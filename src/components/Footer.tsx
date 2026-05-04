import { motion } from 'motion/react';
import { Compass, Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-bg pt-24 pb-12 border-t border-brand-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand-primary rounded-full" />
              <span className="text-xl font-bold tracking-tighter text-brand-secondary uppercase">
                NOMADIC.
              </span>
            </div>
            <p className="text-brand-secondary/40 text-[11px] leading-relaxed max-w-xs uppercase tracking-widest font-bold">
              Making your dream vacations a reality. We provide the best travel experiences across the globe since 2010.
            </p>
            <div className="flex gap-6">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, color: '#D46B4E' }}
                  className="text-brand-secondary/40 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Destinations', 'Experiences', 'Journal', 'Our Story'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[10px] uppercase tracking-widest font-bold text-brand-secondary/40 hover:text-brand-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary mb-8">Support</h4>
            <ul className="space-y-4">
              {['Account', 'Help Center', 'Feedback', 'Accessibility', 'Privacy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[10px] uppercase tracking-widest font-bold text-brand-secondary/40 hover:text-brand-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary mb-8">Newsletter</h4>
            <p className="text-[10px] uppercase tracking-widest font-bold text-brand-secondary/40 mb-8">Subscribe for curated travel insights.</p>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Email address"
                className="w-full bg-white border border-brand-secondary/5 rounded-full px-6 py-4 focus:outline-none focus:border-brand-primary/50 text-[10px] uppercase tracking-widest font-bold text-brand-secondary"
              />
              <button className="absolute right-2 top-2 w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center hover:bg-brand-secondary transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-secondary/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-brand-secondary/50">
            © 2026 Wanderlust Travel Agency. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-brand-secondary/40 font-medium">
            <a href="#" className="hover:text-brand-primary">TERMS & CONDITIONS</a>
            <a href="#" className="hover:text-brand-primary">PRIVACY POLICY</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
