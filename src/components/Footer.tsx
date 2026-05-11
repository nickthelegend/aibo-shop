'use client';
import React from 'react';
import Link from 'next/link';
import { MessageSquare, ExternalLink, ArrowUpRight, Heart, Globe } from 'lucide-react';

const Footer = () => {
  const tickerText = "🐾 ADOPT YOUR AI PET ◆ 📈 FARM YIELD ON MANTLE ◆ ⚔️ BATTLE FOR REWARDS ◆ 💎 GEN 1 COLLECTION LIVE ◆ ";

  return (
    <footer className="bg-charcoal text-white border-t-[3px] border-black overflow-hidden">
      {/* Ticker Strip */}
      <div className="bg-primary border-b-[2.5px] border-black py-4 overflow-hidden select-none">
        <div className="flex whitespace-nowrap ticker-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-black font-display text-sm uppercase tracking-[0.2em] mx-8">
              {tickerText}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Brand Col */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
               <span className="text-4xl">🐾</span>
               <h3 className="font-display text-3xl uppercase tracking-tighter text-primary">AIBO SHOP</h3>
            </div>
            <p className="text-sage text-lg font-bold uppercase tracking-tight leading-relaxed max-w-md mb-10">
              The official pet adoption marketplace on Mantle. <br />
              Raising the next generation of AI-powered on-chain companions.
            </p>
            <div className="flex gap-4">
               {[
                 { icon: <MessageSquare size={20} />, label: 'Discord' },
                 { icon: <Globe size={20} />, label: 'Website' },
                 { icon: <ExternalLink size={20} />, label: 'X (Twitter)' },
               ].map(social => (
                 <button key={social.label} className="w-12 h-12 border-2 border-sage/20 rounded-xl flex items-center justify-center hover:bg-primary hover:text-black hover:border-black transition-all duration-300">
                    {social.icon}
                 </button>
               ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="font-display text-xs uppercase tracking-[0.2em] text-gray-500 mb-8">Marketplace</h4>
              <ul className="space-y-4">
                {['Browse All', 'Legendaries', 'Epic Pets', 'Recent Drops'].map(item => (
                  <li key={item}>
                    <Link href="/shop" className="text-sage hover:text-primary font-bold uppercase text-xs transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-xs uppercase tracking-[0.2em] text-gray-500 mb-8">Resources</h4>
              <ul className="space-y-4">
                {['AIBO Wiki', 'Mantle Network', 'How it Works', 'Whitepaper'].map(item => (
                  <li key={item}>
                    <Link href="#" className="text-sage hover:text-primary font-bold uppercase text-xs transition-colors flex items-center gap-1">
                      {item} <ArrowUpRight size={12} className="opacity-40" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs uppercase tracking-[0.2em] text-gray-500 mb-8">Build</h4>
              <ul className="space-y-4">
                {['Documentation', 'API Access', 'Dev SDK', 'GitHub Repo'].map(item => (
                  <li key={item}>
                    <Link href="#" className="text-sage hover:text-primary font-bold uppercase text-xs transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              © 2025 AIBO Project. <span className="hidden sm:inline">Built with</span> 
              <Heart size={12} className="text-red-500 fill-red-500" /> 
              <span>on Mantle Network.</span>
           </div>
           
           <div className="flex items-center gap-8">
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                Network Status: Online
              </span>
              <div className="flex gap-6">
                 <Link href="#" className="text-[10px] font-bold text-gray-500 uppercase hover:text-white transition-colors">Privacy</Link>
                 <Link href="#" className="text-[10px] font-bold text-gray-500 uppercase hover:text-white transition-colors">Terms</Link>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
