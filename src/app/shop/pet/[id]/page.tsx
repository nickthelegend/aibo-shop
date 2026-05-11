'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Share2, ExternalLink, Zap, ShoppingCart, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import PetAvatar from '@/components/PetAvatar';
import RarityBadge from '@/components/RarityBadge';
import StatBar from '@/components/StatBar';
import PetCard from '@/components/PetCard';
import { PETS } from '@/lib/mockPets';
import { useCart } from '@/lib/cartStore';
import { clsx } from 'clsx';

export default function PetDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem, items } = useCart();
  const [activeTab, setActiveTab] = useState<'overview' | 'traits' | 'history'>('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);

  const pet = PETS.find(p => p.id === id);

  if (!pet) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center">
        <span className="text-6xl mb-6">🐾</span>
        <h1 className="text-4xl uppercase mb-4">This AIBO doesn&apos;t exist...</h1>
        <p className="text-gray-500 mb-8 max-w-md font-medium">
          The blockchain records are clear: this AIBO has not been minted yet or belongs to a different timeline.
        </p>
        <Link href="/shop" className="btn btn-primary">
          Navigate to Browse →
        </Link>
      </div>
    );
  }

  const isInCart = items.some(i => i.pet.id === pet.id);
  const avgPower = Math.round(pet.stats.reduce((acc, s) => acc + s.value, 0) / pet.stats.length);

  const relatedPets = PETS
    .filter(p => p.id !== pet.id && (p.category === pet.category || p.rarity === pet.rarity))
    .slice(0, 3);

  const handleMint = () => {
    setMintSuccess(true);
    setTimeout(() => {
      router.push('/shop/success');
    }, 1500);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-24">
      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 font-bold uppercase text-xs hover:text-black transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN - Sticky Preview */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="bg-white border-[2.5px] border-black rounded-[24px] overflow-hidden brutal-shadow-xl">
              <div 
                className="relative h-[400px] flex items-center justify-center p-8"
                style={{ backgroundColor: pet.bgColor }}
              >
                <PetAvatar pet={pet} size="xl" animated={true} showGlow={true} />
                
                <div className="absolute top-6 left-6 scale-110">
                   <RarityBadge rarity={pet.rarity} />
                </div>

                {pet.isEarlyAccess && (
                  <div className="absolute top-6 right-6 badge badge-early px-4 py-2">
                    ⚡ EARLY ACCESS
                  </div>
                )}
              </div>

              <div className="border-t-[2.5px] border-black p-6 bg-white">
                 <div className="flex justify-between items-end mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Supply: {pet.available} of {pet.totalSupply} remaining
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest bg-charcoal text-white px-2 py-0.5 rounded border border-black">
                      GEN {pet.generation}
                    </span>
                 </div>
                 <div className="h-2 w-full bg-gray-100 border border-black rounded-full overflow-hidden">
                    <div 
                      className="h-full" 
                      style={{ 
                        width: `${(pet.available / pet.totalSupply) * 100}%`,
                        backgroundColor: pet.color
                      }}
                    />
                 </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={clsx(
                  "flex-1 btn btn-secondary h-12 flex items-center justify-center",
                  isWishlisted && "bg-red-50"
                )}
              >
                <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
              </button>
              <button className="flex-1 btn btn-secondary h-12 flex items-center justify-center">
                <Share2 size={20} />
              </button>
              <button className="flex-1 btn btn-secondary h-12 flex items-center justify-center gap-2">
                <ExternalLink size={18} />
                <span className="text-[10px] hidden sm:inline">EXPLORER</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Info & Actions */}
        <div className="lg:col-span-7">
          <div className="mb-8">
            <h1 className={clsx(
              "text-5xl md:text-7xl uppercase leading-none mb-6",
              pet.rarity === 'Legendary' && "text-transparent bg-clip-text bg-gradient-to-r from-black via-primary to-black animate-pulse"
            )}>
              {pet.name}
            </h1>
            
            <div className="flex flex-wrap gap-3 items-center">
              <RarityBadge rarity={pet.rarity} />
              <div className="badge border-black bg-white px-4 py-2 uppercase font-bold text-xs">
                📈 {pet.category}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-auto flex items-center gap-2">
                <span className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-5 h-5 rounded-full border border-black" style={{ backgroundColor: ['#FFE17C', '#FF6FD8', '#5B30F6'][i-1] }} />
                   ))}
                </span>
                Owned by @847 collectors
              </p>
            </div>
          </div>

          {/* PRICE SECTION */}
          <div className="bg-white border-[2.5px] border-black rounded-[20px] p-8 mb-12 brutal-shadow-yellow relative overflow-hidden">
             <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Current Price</span>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-5xl md:text-6xl font-display leading-none">{pet.priceMNT} MNT</span>
                  <span className="text-xl text-gray-400 font-bold">≈ ${pet.priceUSD} USD</span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-8">
                  Gas estimate: ~0.002 MNT
                </p>

                <div className="flex flex-col gap-4">
                   <button 
                     onClick={handleMint}
                     disabled={mintSuccess}
                     className={clsx(
                       "btn btn-primary btn-lg btn-full text-xl h-16 relative overflow-hidden",
                       mintSuccess && "opacity-50 pointer-events-none"
                     )}
                   >
                     {mintSuccess ? "⏳ MINTING..." : "🔥 MINT ON MANTLE"}
                     {mintSuccess && (
                        <motion.div 
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                     )}
                   </button>
                   
                   <button 
                     onClick={() => !isInCart && addItem(pet)}
                     className={clsx(
                       "btn btn-secondary btn-full h-14 uppercase font-bold",
                       isInCart && "bg-green-500 text-white border-black"
                     )}
                   >
                      {isInCart ? "✓ Added to Cart" : "🛒 Add to Cart"}
                   </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                      <ShieldCheck size={14} className="text-green-500" />
                      Secured by Mantle Network
                   </div>
                   <div className="text-[9px] text-gray-300 font-bold uppercase tracking-widest text-center sm:text-right">
                     Non-custodial · You own the NFT · No hidden fees
                   </div>
                </div>
             </div>
          </div>

          {/* TABS */}
          <div className="mb-12">
            <div className="flex gap-8 border-b-[2.5px] border-black mb-8">
               {(['overview', 'traits', 'history'] as const).map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={clsx(
                     "pb-4 text-sm font-display uppercase tracking-widest transition-all relative",
                     activeTab === tab ? "text-black" : "text-gray-400 hover:text-black"
                   )}
                 >
                   {tab}
                   {activeTab === tab && (
                     <motion.div 
                       layoutId="tab-indicator"
                       className="absolute -bottom-[2.5px] left-0 right-0 h-[2.5px] bg-primary"
                     />
                   )}
                 </button>
               ))}
            </div>

            <div className="min-h-[300px]">
               <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed text-lg font-medium">
                          {pet.description}
                        </p>
                        <div className="p-6 bg-white border-2 border-black rounded-xl border-l-[8px] border-l-primary italic text-gray-500 relative">
                           <span className="absolute -top-3 -left-1 text-4xl text-primary-dark opacity-20">“</span>
                           {pet.backstory}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                         <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">⚡ Base Stats</h4>
                            {pet.stats.map((stat, idx) => (
                              <StatBar 
                                key={stat.name} 
                                label={stat.name} 
                                value={stat.value} 
                                icon={stat.icon} 
                                index={idx}
                                color={pet.color}
                              />
                            ))}
                         </div>
                         
                         <div className="bg-white border-2 border-black rounded-2xl p-8 flex flex-col items-center justify-center text-center brutal-shadow-sm">
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Overall Power</h4>
                            <div className="text-6xl font-display mb-2" style={{ color: pet.color }}>{avgPower}</div>
                            <div className="px-4 py-1 border-2 border-black rounded-full bg-primary text-[10px] font-bold uppercase">
                               Power Score: Optimized
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'traits' && (
                    <motion.div
                      key="traits"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">🧬 Traits & Abilities</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                         {pet.traits.map((trait, idx) => (
                           <motion.div 
                             key={trait}
                             whileHover={{ scale: 1.05, backgroundColor: pet.color, color: '#000' }}
                             className="p-4 border-2 rounded-xl border-black flex flex-col gap-1 transition-colors group"
                             style={{ 
                               borderColor: pet.color,
                               backgroundColor: `${pet.color}11`
                             }}
                           >
                              <span className="text-xs font-bold uppercase tracking-wider">{trait.split(' ')[1] || trait}</span>
                              <span className="text-[10px] text-gray-400 font-bold group-hover:text-black/50 transition-colors">{trait.split(' ')[0]}</span>
                           </motion.div>
                         ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'history' && (
                    <motion.div
                      key="history"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">📊 Mint History</h4>
                      <div className="space-y-4">
                         {[1,2,3,4,5].map(i => (
                           <div key={i} className="flex items-center justify-between p-4 border-2 border-black rounded-xl bg-white brutal-shadow-sm">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full border border-black bg-gray-100 flex items-center justify-center text-[10px]">
                                    0x{i}
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-sm font-bold">0x7f3a...d8c4 minted 1 {pet.name}</span>
                                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{i * 12} mins ago</span>
                                 </div>
                              </div>
                              <ExternalLink size={14} className="text-gray-300" />
                           </div>
                         ))}
                      </div>
                      <p className="mt-8 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Showing last 5 on-chain events</p>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PETS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-24 border-t-[2.5px] border-black pt-16">
         <h2 className="text-3xl font-display uppercase mb-12">You May Also Like</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPets.map((p, idx) => (
              <PetCard key={p.id} pet={p} index={idx} />
            ))}
         </div>
      </section>
    </div>
  );
}
