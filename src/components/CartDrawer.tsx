'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import PetAvatar from './PetAvatar';
import { useCart } from '@/lib/cartStore';
import RarityBadge from './RarityBadge';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, itemCount, totalMNT } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="cart-overlay"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="cart-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-[2.5px] border-black">
              <h2 className="flex items-center gap-3 text-xl uppercase">
                <ShoppingCart size={24} />
                YOUR CART ({itemCount})
              </h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center brutal-shadow bg-white hover:translate-y-[-2px] transition-transform"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6">
              {itemCount === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <span className="text-6xl mb-4">🐾</span>
                  <h3 className="text-2xl mb-2 uppercase">Your cart is empty</h3>
                  <p className="text-gray-500 mb-8 max-w-[240px]">
                    Find your perfect AIBO companion in the shop.
                  </p>
                  <Link 
                    href="/shop" 
                    onClick={onClose}
                    className="btn btn-primary"
                  >
                    Browse Pets →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(({ pet }) => (
                    <div 
                      key={pet.id}
                      className="p-3 border-2 border-black rounded-[12px] bg-white flex gap-4 brutal-shadow-sm relative"
                    >
                      <PetAvatar pet={pet} size="sm" animated={false} />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="uppercase font-bold text-lg leading-tight truncate">{pet.name}</h4>
                        <div className="flex items-center gap-2 mb-1">
                          <RarityBadge rarity={pet.rarity} size="sm" />
                        </div>
                        <div className="font-display text-primary-dark">
                          {pet.priceMNT} MNT
                        </div>
                        
                        {pet.available <= 3 && (
                          <p className="text-[10px] text-orange-600 font-bold mt-1 uppercase">
                            ⚠️ Only {pet.available} left!
                          </p>
                        )}
                      </div>

                      <button 
                        onClick={() => removeItem(pet.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {itemCount > 0 && (
              <div className="p-6 border-t-[2.5px] border-black bg-gray-50">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-bold uppercase">Subtotal</span>
                    <span className="font-bold">{totalMNT.toFixed(2)} MNT</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-bold uppercase">Est. Gas</span>
                    <span className="font-bold">~0.002 MNT</span>
                  </div>
                  <div className="h-[2px] bg-black my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg uppercase">Total</span>
                    <span className="text-2xl font-display">{(totalMNT + 0.002).toFixed(3)} MNT</span>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Link 
                    href="/shop/cart" 
                    onClick={onClose}
                    className="btn btn-primary btn-full btn-lg"
                  >
                    💎 Pay with MNT
                  </Link>
                  <Link 
                    href="/shop/cart" 
                    onClick={onClose}
                    className="btn btn-secondary btn-full"
                  >
                    💵 Pay with USDC
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
