'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const tickerText = "🔥 SPARK: 12.5 MNT ◆ ⭐ NOVA: 15.0 MNT ◆ 🌙 LUNA: 8.0 MNT ◆ 💻 BYTE: 4.5 MNT ◆ LIVE PRICES ON MANTLE ◆ ";

  return (
    <footer className="bg-charcoal grid-bg-dark border-t-[3px] border-black text-white">
      {/* Top Zone */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="lg:col-span-1">
          <div className="flex flex-col mb-6">
             <span className="text-2xl uppercase text-primary mb-1">🐾 AIBO SHOP</span>
             <p className="text-sage text-sm leading-relaxed max-w-[240px]">
               The official AIBO pet marketplace on Mantle. Mint, trade, and battle with AI-powered companions.
             </p>
          </div>
          
          <div className="flex gap-4">
             {['𝕏', 'Discord', 'GitHub'].map(social => (
               <button key={social} className="w-10 h-10 border border-sage/30 rounded-lg flex items-center justify-center text-sm hover:bg-white hover:text-black transition-all">
                 {social === '𝕏' ? '𝕏' : social.charAt(0)}
               </button>
             ))}
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-bold">Shop</h4>
          <ul className="space-y-3">
            {['Browse All Pets', 'My Pets', 'Leaderboard', 'Rare Drops'].map(link => (
              <li key={link}>
                <Link href="/shop" className="text-sage hover:text-white transition-colors text-sm font-bold uppercase">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-bold">Learn</h4>
          <ul className="space-y-3">
            {['What is AIBO?', 'Mantle Network', 'How to Mint', 'FAQ'].map(link => (
              <li key={link}>
                <Link href="#" className="text-sage hover:text-white transition-colors text-sm font-bold uppercase">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-bold">Build</h4>
          <ul className="space-y-3">
            {['Docs', 'API', 'SDK', 'GitHub'].map(link => (
              <li key={link}>
                <Link href="#" className="text-sage hover:text-white transition-colors text-sm font-bold uppercase">{link}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ticker Strip */}
      <div className="bg-primary border-y-[2.5px] border-black py-3 overflow-hidden select-none">
        <div className="flex whitespace-nowrap ticker-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-black text-sm font-bold uppercase mx-4">
              {tickerText}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
        <div>
          © 2025 AIBO. Built on Mantle. Made in India 🇮🇳
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full border border-green-500/30">
            Mantle Testnet Live
          </span>
          <span className="opacity-50">
            Mainnet Coming Soon
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
