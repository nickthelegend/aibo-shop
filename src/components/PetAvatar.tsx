'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { Pet } from '@/lib/mockPets';
import { clsx } from 'clsx';

interface PetAvatarProps {
  pet: Pet;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  showGlow?: boolean;
}

const PetAvatar: React.FC<PetAvatarProps> = ({ 
  pet, 
  size = 'md', 
  animated = true, 
  showGlow = true 
}) => {
  const sizeConfig = {
    sm: { emoji: '3rem', container: '80px', radius: '12px' },
    md: { emoji: '5rem', container: '140px', radius: '12px' },
    lg: { emoji: '8rem', container: '220px', radius: '20px' },
    xl: { emoji: '10rem', container: '300px', radius: '20px' },
  };

  const currentSize = sizeConfig[size];

  const containerClass = clsx(
    'relative flex items-center justify-center border-[2.5px] overflow-hidden',
    {
      'brutal-shadow-yellow pulse-glow': pet.rarity === 'Legendary',
      'brutal-shadow': pet.rarity !== 'Legendary' && pet.rarity !== 'Epic',
    }
  );

  const containerStyle: React.CSSProperties = {
    width: currentSize.container,
    height: currentSize.container,
    borderRadius: currentSize.radius,
    borderColor: pet.color,
    backgroundColor: pet.bgColor,
    boxShadow: pet.rarity === 'Epic' ? `6px 6px 0 ${pet.color}` : undefined,
  };

  return (
    <motion.div
      className={containerClass}
      style={containerStyle}
      initial={animated ? { scale: 0.8, opacity: 0 } : false}
      animate={animated ? { scale: 1, opacity: 1 } : false}
      transition={{ duration: 0.4 }}
    >
      {/* Radial Glow for Legendaries */}
      {showGlow && pet.rarity === 'Legendary' && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${pet.color}22 10%, transparent 70%)`
          }}
        />
      )}

      {/* Pet Emoji */}
      <motion.div
        className="z-10 select-none"
        style={{ fontSize: currentSize.emoji }}
        animate={animated ? { 
          y: [0, -12, 0],
          rotate: [0, 2, -1, 0]
        } : false}
        transition={animated ? { 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        } : undefined}
      >
        {pet.emoji}
      </motion.div>

      {/* Bottom rarity strip */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ backgroundColor: pet.color }}
      />
    </motion.div>
  );
};

export default PetAvatar;
