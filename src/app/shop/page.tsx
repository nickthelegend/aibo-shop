'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Zap, TrendingUp, Star } from 'lucide-react';
import PetCard from '@/components/PetCard';
import RarityBadge from '@/components/RarityBadge';
import PetAvatar from '@/components/PetAvatar';
import WalletButton from '@/components/WalletButton';
import { PETS, CATEGORIES, Category } from '@/lib/mockPets';

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
  const legendaryPets = PETS.filter(p => p.rarity === 'Legendary');

  return (
    <div className="bg-white">
      {/* SECTION 1: HERO BANNER */}
      <section className="relative overflow-hidden grid-bg border-b-[2.5px] border-black min-h-[500px] flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary px-3 py-1 border-2 border-black rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 brutal-shadow-sm">
                🐾 AIBO SHOP · SEASON 1
              </div>
              
              <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] uppercase mb-8">
                ADOPT YOUR<br />
                FIRST AIBO<br />
                <span className="bg-primary px-4 py-1 rounded-[4px]">TODAY</span>
              </h1>
              
              <p className="text-gray-500 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-medium">
                Mint AI-powered pets on Mantle. They trade, farm yield, and battle — all on-chain.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <a href="#browse" className="btn btn-primary btn-lg">
                  🐾 Browse Pets
                </a>
                <WalletButton />
              </div>
              
              <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-black">847</span> Pets Minted
                </div>
                <div className="w-[1px] h-4 bg-gray-200" />
                <div className="flex items-center gap-2">
                  <span className="text-black">12,847</span> Battles
                </div>
                <div className="w-[1px] h-4 bg-gray-200" />
                <div className="flex items-center gap-2">
                  <span className="text-black">340%</span> Avg APY
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="lg:col-span-5 relative h-[400px] hidden lg:block">
             <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
                {/* NOVA */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <PetAvatar pet={PETS.find(p => p.id === 'nova')!} size="lg" />
                </div>
                {/* SPARK */}
                <div className="absolute top-10 left-0 z-10">
                  <PetAvatar pet={PETS.find(p => p.id === 'spark')!} size="md" />
                </div>
                {/* LUNA */}
                <div className="absolute bottom-10 right-0 z-10">
                  <PetAvatar pet={PETS.find(p => p.id === 'luna')!} size="md" />
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE TICKER */}
      <div className="bg-primary border-b-[2.5px] border-black py-3 overflow-hidden select-none">
        <div className="flex whitespace-nowrap ticker-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-black text-sm font-bold uppercase mx-4">
              🔥 SPARK just minted! ◆ 3 NOVA remaining ◆ ⭐ NOVA: 15 MNT ◆ 🌙 LUNA: 8 MNT ◆ 47 AIBOs minted today ◆ 
            </span>
          ))}
        </div>
      </div>

      {/* SECTION 3: BROWSE */}
      <section id="browse" className="bg-[#FAFAFA] py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl uppercase mb-4 flex items-center gap-4">
                <span className="w-12 h-12 bg-white border-2 border-black rounded-lg flex items-center justify-center brutal-shadow-sm">🛒</span>
                Browse All Pets
              </h2>
              <p className="text-gray-500 font-bold uppercase text-sm tracking-widest">
                {filteredPets.length} AIBOs found matching your criteria
              </p>
            </div>

            {/* FILTERS & SEARCH */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
               <div className="relative w-full md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search by name, trait, or type..."
                    className="input pl-12 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
               
               <div className="flex items-center gap-2 bg-white border-2 border-black p-1 rounded-[12px] brutal-shadow-sm w-full md:w-auto overflow-x-auto no-scrollbar">
                  <select 
                    className="bg-transparent border-none outline-none font-bold uppercase text-xs px-4 h-10 cursor-pointer"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low → High</option>
                    <option value="price-high">Price: High → Low</option>
                    <option value="rarity">Rarity</option>
                    <option value="new">Newest</option>
                  </select>
               </div>
            </div>
          </div>

          {/* CATEGORY TABS */}
          <div className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={clsx(
                    "flex items-center gap-2 px-6 py-3 rounded-full border-2 border-black font-bold uppercase text-xs transition-all whitespace-nowrap",
                    isActive 
                      ? "bg-black text-primary brutal-shadow-sm translate-y-[-2px]" 
                      : "bg-white text-black brutal-shadow hover:translate-y-[-1px]"
                  )}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* PET GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet, idx) => (
                <PetCard key={pet.id} pet={pet} index={idx} />
              ))
            ) : (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                <span className="text-6xl mb-6">😔</span>
                <h3 className="text-3xl uppercase mb-2">No AIBOs found</h3>
                <p className="text-gray-500 mb-8">Try adjusting your search or filters.</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setSortBy('featured'); }}
                  className="btn btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED PETS CAROUSEL */}
      <section className="bg-charcoal grid-bg-dark py-24 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-primary uppercase mb-12 flex items-center gap-4">
             <Star className="text-primary" fill="currentColor" />
             Featured This Week
          </h2>
          
          <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar px-2 -mx-2">
            {featuredPets.map((pet, idx) => (
              <div key={pet.id} className="min-w-[300px] flex-shrink-0">
                <PetCard pet={pet} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: EARLY ACCESS BANNER */}
      <section className="bg-purple relative py-24 px-6 md:px-12 border-t-[2.5px] border-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
           <div className="w-full h-full grid-bg-yellow" />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
           <div>
              <div className="inline-block bg-orange-500 text-white border-2 border-black rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest mb-6">
                ⚡ LIMITED EARLY ACCESS
              </div>
              <h2 className="text-4xl md:text-6xl text-white uppercase mb-8 leading-none">
                Only 10 Legendary<br />AIBOs Exist
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-md">
                Once they&apos;re gone, they&apos;re gone forever. No re-mints. No second chances. The future is limited.
              </p>
              <button 
                onClick={() => setSelectedCategory('Legendary')}
                className="btn btn-primary btn-lg"
              >
                View Legendary Pets →
              </button>
           </div>
           
           <div className="relative h-[300px] flex items-center justify-center">
              <div className="absolute left-0">
                <PetAvatar pet={PETS.find(p => p.id === 'nova')!} size="lg" />
              </div>
              <div className="absolute right-0">
                <PetAvatar pet={PETS.find(p => p.id === 'spark')!} size="lg" />
              </div>
              
              <div className="absolute bottom-0 bg-white border-2 border-black rounded-full px-6 py-2 brutal-shadow-sm flex items-center gap-3">
                 <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                 <span className="text-xs font-bold uppercase tracking-widest text-black">
                   3 of 5 NOVA remaining
                 </span>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
