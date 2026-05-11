'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ExternalLink, Play, Eye, Clock, TrendingUp, Pause, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import PetAvatar from '@/components/PetAvatar';
import RarityBadge from '@/components/RarityBadge';
import WalletButton from '@/components/WalletButton';
import { PETS } from '@/lib/mockPets';
import { useAccount } from 'wagmi';
import { clsx } from 'clsx';

// MOCK OWNED PETS DATA
const OWNED_PETS_MOCK = PETS.filter(p => ['spark', 'luna', 'pixel'].includes(p.id)).map(p => ({
  ...p,
  level: p.id === 'spark' ? 47 : p.id === 'luna' ? 38 : 14,
  lastFed: p.id === 'spark' ? '2 hours ago' : p.id === 'luna' ? '5 hours ago' : '23 hours ago',
  yieldEarned: p.id === 'spark' ? '0.847' : p.id === 'luna' ? '0.213' : '0.004',
  isActive: p.id === 'spark',
  hungerStatus: p.id === 'spark' ? 'Full' : p.id === 'luna' ? 'Hungry' : 'STARVING',
  tokenId: p.id === 'spark' ? '#0001' : p.id === 'luna' ? '#0024' : '#0189',
  battles: p.id === 'spark' ? 142 : p.id === 'luna' ? 86 : 12,
  wins: p.id === 'spark' ? 128 : p.id === 'luna' ? 64 : 4,
}));

export default function MyPetsPage() {
  const { isConnected } = useAccount();
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'resting'>('all');

  const filteredPets = OWNED_PETS_MOCK.filter(p => {
    if (activeFilter === 'active') return p.isActive;
    if (activeFilter === 'resting') return !p.isActive;
    return true;
  });

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-24">
      {/* HEADER */}
      <section className="bg-white border-b-[2.5px] border-black py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-display uppercase mb-6 leading-none">My Pets</h1>
            <div className="flex flex-wrap gap-4">
               <div className="bg-primary border-2 border-black rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest brutal-shadow-sm">
                  3 Pets Owned
               </div>
               <div className="bg-white border-2 border-black rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest brutal-shadow-sm">
                  Total Yield: 1.064 MNT
               </div>
               <div className="bg-white border-2 border-black rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest brutal-shadow-sm">
                  47 Battles Won
               </div>
            </div>
          </div>
          
          <Link href="/shop" className="btn btn-secondary flex items-center gap-2 group">
             <ShoppingBag size={18} />
             <span>← Shop More Pets</span>
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* NOT CONNECTED STATE */}
        {!isConnected ? (
          <div className="max-w-2xl mx-auto mt-12 bg-white border-[2.5px] border-black rounded-[40px] p-16 flex flex-col items-center text-center brutal-shadow-xl">
             <span className="text-8xl mb-8">🔗</span>
             <h2 className="text-3xl font-display uppercase mb-4">Connect Your Wallet</h2>
             <p className="text-gray-500 mb-12 text-lg font-medium max-w-sm">
               See your AIBO collection across all Mantle chains and manage your AI agents.
             </p>
             <WalletButton />
             <div className="flex items-center gap-4 my-8 w-full">
                <div className="flex-1 h-[2px] bg-gray-100" />
                <span className="text-[10px] font-bold text-gray-300 uppercase">Or</span>
                <div className="flex-1 h-[2px] bg-gray-100" />
             </div>
             <Link href="/shop" className="text-gray-400 font-bold uppercase text-xs hover:text-black transition-colors">
               Browse the shop first →
             </Link>
          </div>
        ) : (
          <>
            {/* CONNECTED + HAS PETS */}
            <div className="flex gap-4 mb-12 border-b-[2.5px] border-black pb-8">
               {(['all', 'active', 'resting'] as const).map(filter => (
                 <button
                   key={filter}
                   onClick={() => setActiveFilter(filter)}
                   className={clsx(
                     "px-6 py-2 rounded-full border-2 border-black font-bold uppercase text-xs transition-all",
                     activeFilter === filter ? "bg-black text-primary brutal-shadow-sm translate-y-[-2px]" : "bg-white brutal-shadow hover:translate-y-[-1px]"
                   )}
                 >
                   {filter} Pets
                 </button>
               ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
               {filteredPets.length > 0 ? (
                 filteredPets.map((pet, idx) => (
                   <motion.div 
                     key={pet.id}
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: idx * 0.1 }}
                     className="bg-white border-[2.5px] border-black rounded-[32px] overflow-hidden brutal-shadow hover:translate-y-[-4px] transition-all group"
                   >
                     {/* TOP SECTION */}
                     <div 
                        className="p-6 border-b-[2.5px] border-black flex gap-6"
                        style={{ backgroundColor: pet.bgColor }}
                     >
                        <PetAvatar pet={pet} size="md" animated={pet.isActive} />
                        <div className="flex flex-col justify-center">
                           <h3 className="text-2xl font-display uppercase leading-tight mb-2">{pet.name}</h3>
                           <div className="flex flex-wrap gap-2 mb-2">
                             <RarityBadge rarity={pet.rarity} size="sm" />
                           </div>
                           <span className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Token ID: {pet.tokenId}</span>
                           
                           {/* Status Badge */}
                           <div className="mt-3">
                              {pet.isActive ? (
                                <span className="bg-green-100 text-green-600 border border-green-200 text-[8px] font-bold px-2 py-1 rounded uppercase flex items-center gap-1.5 w-fit">
                                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                   Active Agent
                                </span>
                              ) : (
                                <span className="bg-gray-100 text-gray-500 border border-gray-200 text-[8px] font-bold px-2 py-1 rounded uppercase flex items-center gap-1.5 w-fit">
                                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                   Resting
                                </span>
                              )}
                           </div>
                        </div>
                     </div>

                     {/* STATS SECTION */}
                     <div className="p-6">
                        <div className="mb-6">
                           <div className="flex justify-between items-end mb-2">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Level {pet.level}</span>
                              <span className="text-[10px] font-bold uppercase tracking-widest">XP to Next: 470/1000</span>
                           </div>
                           <div className="h-3 w-full bg-gray-100 border-[1.5px] border-black rounded-full overflow-hidden brutal-shadow-sm">
                              <div className="h-full bg-primary" style={{ width: '47%' }} />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                           <div className="p-3 bg-gray-50 border border-black/5 rounded-xl">
                              <span className="text-[8px] font-bold uppercase text-gray-400 block mb-1">⚡ Yield Earned</span>
                              <span className="text-xs font-bold">{pet.yieldEarned} MNT</span>
                           </div>
                           <div className="p-3 bg-gray-50 border border-black/5 rounded-xl">
                              <span className="text-[8px] font-bold uppercase text-gray-400 block mb-1">⏰ Last Fed</span>
                              <span className="text-xs font-bold">{pet.lastFed}</span>
                           </div>
                           <div className="p-3 bg-gray-50 border border-black/5 rounded-xl">
                              <span className="text-[8px] font-bold uppercase text-gray-400 block mb-1">🏆 Battles</span>
                              <span className="text-xs font-bold">{pet.battles}</span>
                           </div>
                           <div className="p-3 bg-gray-50 border border-black/5 rounded-xl">
                              <span className="text-[8px] font-bold uppercase text-gray-400 block mb-1">📈 Win Rate</span>
                              <span className="text-xs font-bold">{Math.round((pet.wins / pet.battles) * 100)}%</span>
                           </div>
                        </div>

                        {/* Hunger Status */}
                        <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-black bg-white brutal-shadow-sm mb-6">
                           <div className="flex items-center gap-3">
                              <span className="text-xl">🥩</span>
                              <div className="flex flex-col">
                                 <span className="text-[10px] font-bold uppercase text-gray-400">Hunger</span>
                                 <span className={clsx(
                                   "text-xs font-bold uppercase",
                                   pet.hungerStatus === 'Full' ? "text-green-500" : 
                                   pet.hungerStatus === 'Hungry' ? "text-primary-dark" : "text-red-500"
                                 )}>{pet.hungerStatus}</span>
                              </div>
                           </div>
                           {pet.hungerStatus !== 'Full' && (
                             <button className="btn btn-primary btn-sm px-4">Feed</button>
                           )}
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-3 pt-6 border-t border-gray-100">
                           <button className={clsx(
                             "flex-1 btn btn-sm h-12 flex items-center justify-center gap-2",
                             pet.isActive ? "btn-danger" : "btn-primary"
                           )}>
                              {pet.isActive ? <Pause size={16} /> : <Zap size={16} />}
                              <span>{pet.isActive ? 'Deactivate' : 'Activate'}</span>
                           </button>
                           <button className="btn btn-secondary btn-sm h-12 flex items-center justify-center gap-2">
                              <Eye size={16} />
                              <span>View App</span>
                           </button>
                           <button className="w-12 h-12 border-2 border-black rounded-lg flex items-center justify-center text-gray-300 hover:text-black transition-colors">
                              <ExternalLink size={18} />
                           </button>
                        </div>
                     </div>
                   </motion.div>
                 ))
               ) : (
                 <div className="col-span-full py-20 bg-white border-2 border-black border-dashed rounded-[32px] flex flex-col items-center justify-center text-center">
                    <div className="w-32 h-32 mb-8 grayscale opacity-30">
                       <PetAvatar pet={PETS.find(p => p.id === 'nova')!} size="lg" animated={false} />
                    </div>
                    <h3 className="text-2xl font-display uppercase mb-2">No matching pets</h3>
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Try changing your active filters</p>
                 </div>
               )}
            </div>

            {/* YIELD SUMMARY CARD */}
            <section className="mt-24">
               <div className="bg-charcoal grid-bg-dark border-[3px] border-black rounded-[40px] p-12 brutal-shadow-yellow relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <TrendingUp size={200} className="text-primary" />
                  </div>
                  
                  <div className="relative z-10">
                     <h2 className="text-2xl md:text-3xl font-display text-primary uppercase mb-12">📈 Total Yield Summary</h2>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Total Earnings</span>
                           <span className="text-3xl text-white font-display">1.064 MNT</span>
                           <span className="text-xs text-gray-500 mt-1">≈ $0.74 USD</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Best Day</span>
                           <span className="text-3xl text-white font-display">0.142 MNT</span>
                           <span className="text-xs text-gray-500 mt-1">April 24, 2025</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Active Streak</span>
                           <span className="text-3xl text-white font-display">14 Days</span>
                           <span className="text-xs text-gray-500 mt-1">Personal Best</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Global Rank</span>
                           <span className="text-3xl text-white font-display">#847</span>
                           <span className="text-xs text-green-500 mt-1">Top 5%</span>
                        </div>
                     </div>
                     
                     <button className="btn btn-dark">
                        View Full History →
                     </button>
                  </div>
               </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
