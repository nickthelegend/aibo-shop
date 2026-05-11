'use client';
import React from 'react';
import { Rarity } from '@/lib/mockPets';
import { clsx } from 'clsx';

interface RarityBadgeProps {
  rarity: Rarity;
  size?: 'sm' | 'md';
}

const RarityBadge: React.FC<RarityBadgeProps> = ({ rarity, size = 'md' }) => {
  const badgeClass = clsx(
    'badge',
    {
      'badge-legendary pulse-glow': rarity === 'Legendary',
      'badge-epic': rarity === 'Epic',
      'badge-rare': rarity === 'Rare',
      'badge-common': rarity === 'Common',
    },
    {
      'text-[0.65rem] py-0.5 px-2': size === 'sm',
      'text-[0.72rem] py-1 px-3': size === 'md',
    }
  );

  const getLabel = () => {
    switch (rarity) {
      case 'Legendary': return '👑 LEGENDARY';
      case 'Epic': return '⭐ EPIC';
      case 'Rare': return '💎 RARE';
      case 'Common': return '🌿 COMMON';
      default: return rarity.toUpperCase();
    }
  };

  return (
    <span className={badgeClass}>
      {getLabel()}
    </span>
  );
};

export default RarityBadge;
