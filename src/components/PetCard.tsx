'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import RarityBadge from './RarityBadge';
import PetAvatar from './PetAvatar';
import { useCart } from '@/lib/cartStore';
import { Pet } from '@/lib/mockPets';
import { clsx } from 'clsx';
import { Star, Shield, Zap, Info } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
  index?: number;
}

const PetCard: React.FC<PetCardProps> = ({ pet, index = 0 }) => {
  const { addItem, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  
  const isInCart = items.some(i => i.pet.id === pet.id);
  const progressPercent = (pet.available / pet.totalSupply) * 100;

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart) {
      addItem(pet);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="card group relative"
    >
      {/* HEADER STRIP */}
      <div className="absolute top-0 left-0 right-0 h-[6px]" style={{ backgroundColor: pet.color }} />

      {/* TOP - Pet Preview Area */}
      <div 
        className="relative h-[240px] flex items-center justify-center p-6 overflow-hidden"
        style={{ backgroundColor: `${pet.bgColor}CC` }}
      >
        {/* Decorative Grid on Card */}
        <div className="absolute inset-0 grid-bg opacity-10" />
        
        <PetAvatar pet={pet} size="md" animated={true} showGlow={true} />
        
        <div className="absolute top-6 left-6">
          <RarityBadge rarity={pet.rarity} size="sm" />
        </div>

        {pet.rarity === 'Legendary' && (
           <div className="absolute top-6 right-6 text-primary drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
             <Star size={20} fill="currentColor" />
           </div>
        )}

        {/* SUPPLY BAR */}
        <div className="absolute bottom-4 left-6 right-6">
           <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9px] font-bold text-black uppercase tracking-[0.1em]">
                 Supply Remaining: {pet.available}/{pet.totalSupply}
              </span>
              <span className="text-[9px] font-bold text-black uppercase">
                 {Math.round(progressPercent)}%
              </span>
           </div>
           <div className="h-2 w-full bg-black/10 border border-black rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${progressPercent}%`, 
                  backgroundColor: pet.color 
                }}
              />
           </div>
        </div>
      </div>

      {/* BOTTOM - Info Area */}
      <div className="p-6 bg-white flex flex-col h-[200px]">
        <div className="flex justify-between items-start mb-4">
           <div>
              <h3 className="text-2xl font-display uppercase leading-none mb-1">{pet.name}</h3>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{pet.category}</span>
                 <div className="w-1 h-1 bg-gray-200 rounded-full" />
                 <span className="text-[10px] font-bold text-gray-400 uppercase">GEN {pet.generation}</span>
              </div>
           </div>
           <div className="text-right">
              <div className="font-display text-xl leading-none">{pet.priceMNT} MNT</div>
              <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">≈ ${pet.priceUSD}</div>
           </div>
        </div>

        {/* STATS PREVIEW */}
        <div className="grid grid-cols-2 gap-2 mb-6">
           {pet.stats.slice(0, 2).map((stat, i) => (
             <div key={i} className="flex items-center justify-between p-2 bg-gray-50 border border-black/5 rounded-lg group-hover:border-black/20 transition-colors">
                <span className="text-[10px] flex items-center gap-1">
                   {stat.icon} <span className="text-gray-400 uppercase font-bold tracking-tighter">{stat.name.slice(0, 3)}</span>
                </span>
                <span className="text-[10px] font-bold">{stat.value}</span>
             </div>
           ))}
        </div>

        {/* ACTIONS */}
        <div className="mt-auto flex items-center gap-3">
           <Link 
             href={`/shop/pet/${pet.id}`}
             className="flex-1 btn btn-secondary btn-sm h-11"
           >
              Details
           </Link>
           <button 
             onClick={handleAction}
             disabled={isInCart}
             className={clsx(
               "flex-[1.5] btn btn-sm h-11",
               isInCart ? "bg-green-500 text-white border-black cursor-default" : "btn-primary"
             )}
           >
             {justAdded ? "ADDED! ✓" : isInCart ? "IN CART ✓" : "MINT NOW →"}
           </button>
        </div>
      </div>

      {/* HIDDEN LINK OVERLAY FOR CARDS */}
      <Link 
        href={`/shop/pet/${pet.id}`}
        className="absolute inset-0 z-0 opacity-0 pointer-events-none md:pointer-events-auto"
        tabIndex={-1}
      />
    </motion.div>
  );
};

export default PetCard;
