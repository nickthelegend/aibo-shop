'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Zap, TrendingUp, Star, Shield, ArrowRight } from 'lucide-react';
import PetCard from '@/components/PetCard';
import RarityBadge from '@/components/RarityBadge';
import PetAvatar from '@/components/PetAvatar';
import WalletButton from '@/components/WalletButton';
import { PETS, CATEGORIES, Category } from '@/lib/mockPets';
import { clsx } from 'clsx';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rarity' | 'new'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPets = useMemo(() => {
    let pets = [...PETS];
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Rare') {
        pets = pets.filter(p => p.rarity === 'Rare' || p.rarity === 'Epic');
      } else if (selectedCategory === 'Legendary') {
        pets = pets.filter(p => p.rarity === 'Legendary');
      } else {
        pets = pets.filter(p => p.category === selectedCategory);
      }
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      pets = pets.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.traits.some(t => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }
    switch(sortBy) {
      case 'price-low': return pets.sort((a,b) => a.priceMNT - b.priceMNT);
      case 'price-high': return pets.sort((a,b) => b.priceMNT - a.priceMNT);
      case 'rarity': {
        const order = { Legendary: 0, Epic: 1, Rare: 2, Common: 3 };
        return pets.sort((a,b) => order[a.rarity] - order[b.rarity]);
      }
      case 'new': return pets.sort((a,b) => b.generation - a.generation);
      default: return pets.sort((a,b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [selectedCategory, sortBy, searchQuery]);

  const featuredPets = PETS.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="bg-white">
      {/* SECTION 1: HERO BANNER (LANDING PAGE INSPIRED) */}
      <section className="relative overflow-hidden grid-bg min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16">
        {/* DECORATIVE SVG SHAPES */}
        <div className="absolute top-20 left-10 opacity-20 hidden md:block">
          <svg width="100" height="100" viewBox="0 0 60 60"><path d="M30 0 L33 27 L60 30 L33 33 L30 60 L27 33 L0 30 L27 27 Z" fill="currentColor" /></svg>
        </div>
        <div className="absolute bottom-40 right-20 opacity-30 animate-spin-slow hidden md:block">
           <svg width="120" height="120" viewBox="0 0 100 100">
             <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="#FF5C00" />
           </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 bg-white border-[2.5px] border-black px-5 py-2 rounded-full mb-10 brutal-shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping" />
              <span className="font-display text-[11px] uppercase tracking-widest">AIBO MARKETPLACE · SEASON 01</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-display uppercase mb-8 leading-[0.85] tracking-tighter">
              ADOPT YOUR <br />
              <span className="bg-primary px-4 py-1 rounded-lg border-2 border-black inline-block -rotate-1 mt-2">FIRST</span> AIBO
            </h1>
            
            <p className="text-gray-600 text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-bold uppercase tracking-tight">
              Mint high-performance AI pets on Mantle. <br className="hidden md:block" />
              Battle, earn, and evolve your companion on-chain.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <a href="#browse" className="btn btn-primary btn-lg w-full sm:w-auto">
                🐾 Browse Marketplace
              </a>
              <WalletButton />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-10 border-t-2 border-black/10">
               {[
                 { label: 'Total Minted', val: '847', icon: '🐾' },
                 { label: 'Active Battles', val: '12,847', icon: '⚔️' },
                 { label: 'Floor Price', val: '4.5 MNT', icon: '💎' },
                 { label: 'Avg Yield', val: '340%', icon: '📈' },
               ].map(stat => (
                 <div key={stat.label} className="flex flex-col">
                   <span className="text-3xl font-display mb-1">{stat.val}</span>
                   <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{stat.icon} {stat.label}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* FLOATING AVATARS BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
           <div className="absolute top-[20%] left-[5%] float">
             <PetAvatar pet={PETS[0]} size="sm" animated={false} showGlow={false} />
           </div>
           <div className="absolute top-[60%] right-[10%] float" style={{ animationDelay: '1s' }}>
             <PetAvatar pet={PETS[1]} size="sm" animated={false} showGlow={false} />
           </div>
        </div>
      </section>

      {/* LIVE TICKER STRIP */}
      <div className="ticker-container bg-charcoal py-4">
        <div className="ticker-track">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-primary font-display text-sm uppercase tracking-widest flex items-center gap-3">
                 <Zap size={14} fill="currentColor" /> SPARK JUST MINTED
              </span>
              <span className="text-white font-display text-sm uppercase tracking-widest">⭐ NOVA: 15.0 MNT</span>
              <span className="text-pink font-display text-sm uppercase tracking-widest">🔥 LUNA TRENDING</span>
              <span className="text-white font-display text-sm uppercase tracking-widest flex items-center gap-3">
                 <ArrowRight size={14} /> EXPLORE ALL PETS
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* BROWSE SECTION */}
      <section id="browse" className="bg-[#FAFAFA] py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
            <div className="max-w-xl">
              <div className="badge badge-primary mb-4">Marketplace</div>
              <h2 className="text-5xl md:text-6xl font-display uppercase mb-4 leading-none">Browse Collection</h2>
              <p className="text-gray-500 font-bold uppercase text-sm tracking-widest">
                Discover {filteredPets.length} unique AI agents waiting for adoption
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center">
               <div className="relative w-full md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search AIBOs..."
                    className="input pl-12 h-14 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
               <div className="flex bg-white border-[2.5px] border-black rounded-xl p-1 brutal-shadow-sm">
                  <select 
                    className="bg-transparent border-none outline-none font-display text-[10px] uppercase px-4 h-11 cursor-pointer"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rarity">By Rarity</option>
                    <option value="new">New Arrivals</option>
                  </select>
               </div>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="flex gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={clsx(
                    "flex items-center gap-3 px-8 py-4 rounded-full border-[2.5px] border-black font-display text-[10px] uppercase transition-all whitespace-nowrap",
                    isActive 
                      ? "bg-black text-primary brutal-shadow-sm -translate-y-1" 
                      : "bg-white text-black brutal-shadow hover:-translate-y-0.5"
                  )}
                >
                  <span className="text-lg">{cat.emoji}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet, idx) => (
                <PetCard key={pet.id} pet={pet} index={idx} />
              ))
            ) : (
              <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
                <span className="text-8xl mb-8">🔍</span>
                <h3 className="text-4xl font-display uppercase mb-4">No AIBOs found</h3>
                <p className="text-gray-500 font-bold uppercase text-xs mb-10">Try a different search or category</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="btn btn-primary"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURED BANNER */}
      <section className="bg-purple py-24 border-y-[3px] border-black overflow-hidden relative">
         <div className="absolute inset-0 grid-bg-colored opacity-10" />
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="max-w-2xl">
               <h2 className="text-5xl md:text-7xl text-white font-display uppercase mb-8 leading-none">
                 Become a Legend <br /> in the Arena
               </h2>
               <p className="text-white/80 text-lg font-bold uppercase mb-12 tracking-tight">
                 Your AIBO is more than an NFT. It&apos;s a high-frequency trading agent <br className="hidden md:block" />
                 and battle-ready companion.
               </p>
               <button className="btn btn-primary btn-lg">
                 Start Your Journey →
               </button>
            </div>
            
            <div className="relative group">
               <div className="absolute -inset-10 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all duration-700" />
               <PetAvatar pet={PETS.find(p => p.id === 'nova')!} size="xl" />
               <div className="absolute -bottom-6 -right-6 bg-white border-[2.5px] border-black p-4 rounded-2xl brutal-shadow-sm rotate-6">
                  <span className="font-display text-xs uppercase tracking-tighter">NOVA THE STAR CHILD</span>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
