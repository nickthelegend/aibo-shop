"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Pet } from './mockPets';

interface CartItem {
  pet: Pet;
  quantity: 1; // always 1 per pet
}

interface CartContextType {
  items: CartItem[];
  addItem: (pet: Pet) => void;
  removeItem: (petId: string) => void;
  clearCart: () => void;
  itemCount: number;
  totalMNT: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (pet: Pet) => {
    setItems(prev => {
      if (prev.find(i => i.pet.id === pet.id)) return prev;
      return [...prev, { pet, quantity: 1 }];
    });
  };

  const removeItem = (petId: string) => {
    setItems(prev => prev.filter(i => i.pet.id !== petId));
  };

  const clearCart = () => setItems([]);

  const itemCount = items.length;
  const totalMNT = items.reduce((sum, i) => sum + i.pet.priceMNT, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, itemCount, totalMNT }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
