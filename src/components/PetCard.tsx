'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import RarityBadge from './RarityBadge';
import PetAvatar from './PetAvatar';
import { useCart } from '@/lib/cartStore';
import { Pet } from '@/lib/mockPets';
import { clsx } from 'clsx';
import { Star } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
  index?: number;
}

const PetCard: React.FC<PetCardProps> = ({ pet, index = 0 }) => {
  const { addItem, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  
  const isInCart = items.some(i => i.pet.id === pet.id);

  const handleMintClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart) {
      addItem(pet);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };

  const progressPercent = (pet.available / pet.totalSupply) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className={clsx(
        "card group relative",
        {
          "card-legendary": pet.rarity === 'Legendary',
          "card-epic": pet.rarity === 'Epic',
          "card-rare": pet.rarity === 'Rare',
        }
      )}
    >
      {/* Decorative star for legendaries */}
      {pet.rarity === 'Legendary' && (
        <div className="absolute top-2 right-2 z-10 text-primary drop-shadow-[0_0_8px_rgba(255,225,124,0.6)]">
          <Star size={24} fill="currentColor" strokeWidth={1} />
        </div>
      )}

      {/* TOP - Pet Preview Area */}
      <div 
        className="relative h-[200px] flex items-center justify-center p-4"
        style={{ backgroundColor: pet.bgColor }}
      >
        <PetAvatar pet={pet} size="md" animated={true} />
        
        <div className="absolute top-3 left-3">
          <RarityBadge rarity={pet.rarity} size="sm" />
        </div>

        {pet.isEarlyAccess && (
          <div className="absolute top-3 right-3 badge badge-early text-[10px]">
            ⚡ EARLY ACCESS
          </div>
        )}

        {/* Available Supply Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/20 to-transparent">
          <div className="flex justify-between items-center mb-1">
             <span className="text-[10px] font-bold text-black uppercase">
               {pet.available}/{pet.totalSupply} remaining
             </span>
          </div>
          <div className="h-1.5 w-full bg-white/50 border border-black rounded-full overflow-hidden">
            <div 
              className="h-full"
              style={{ 
                width: `${progressPercent}%`, 
                backgroundColor: pet.color 
              }}
            />
          </div>
        </div>
      </div>

      {/* BOTTOM - Info Area */}
      <div className="p-4">
        <h3 className="text-xl mb-0.5 uppercase">{pet.name}</h3>
        <p className="text-[10px] text-gray-500 font-bold uppercase mb-3">
          {pet.category}
        </p>

        {/* Stats Row */}
        <div className="flex gap-2 mb-4">
          {pet.stats.slice(0, 2).map((stat, i) => (
            <div key={i} className="flex items-center gap-1 bg-charcoal text-white text-[10px] px-2 py-0.5 rounded-full border border-black">
              <span>{stat.icon}</span>
              <span className="font-bold">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Price Row */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div>
            <div className="font-display text-lg leading-none">
              {pet.priceMNT} MNT
            </div>
            <div className="text-[10px] text-gray-400 font-bold">
              ≈ {pet.priceUSD} USD
            </div>
          </div>

          <button 
            onClick={handleMintClick}
            disabled={isInCart}
            className={clsx(
              "btn btn-sm",
              isInCart ? "bg-green-500 text-white border-black cursor-default" : "btn-primary"
            )}
          >
            {justAdded ? "ADDED! ✓" : isInCart ? "✓ IN CART" : "MINT →"}
          </button>
        </div>
      </div>

      {/* Entire card link */}
      <Link 
        href={`/shop/pet/${pet.id}`}
        className="absolute inset-0 z-0 opacity-0"
      >
        View {pet.name}
      </Link>
    </motion.div>
  );
};

export default PetCard;
