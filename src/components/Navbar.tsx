'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WalletButton from './WalletButton';
import { useCart } from '@/lib/cartStore';
import CartDrawer from './CartDrawer';
import { clsx } from 'clsx';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Browse', href: '/shop' },
    { label: 'My Pets', href: '/shop/my-pets' },
    { label: 'Leaderboard', href: '#' },
  ];

  return (
    <>
      <nav className={clsx(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b-[2.5px] border-black",
        scrolled ? "bg-white/90 backdrop-blur-md py-3" : "bg-white py-5"
      )}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/shop" className="flex items-center gap-3 group">
            <span className="text-3xl group-hover:scale-125 transition-transform duration-300">🐾</span>
            <div className="flex flex-col">
              <span className="font-display text-2xl leading-none uppercase tracking-tight">AIBO SHOP</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">Live on Mantle</span>
              </div>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "font-display text-xs uppercase tracking-widest transition-all relative group",
                    isActive ? "text-black" : "text-gray-400 hover:text-black"
                  )}
                >
                  {link.label}
                  <span className={clsx(
                    "absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              );
            })}
            
            <div className="w-[1px] h-6 bg-black/10 mx-2" />
            
            <div className="flex items-center gap-2 bg-charcoal text-white px-3 py-1.5 rounded-full border border-black text-[10px] font-bold uppercase tracking-wider">
               <Globe size={12} className="text-primary" />
               Mantle L2
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            {/* Search (Desktop) */}
            <div className="hidden xl:flex relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Find an AIBO..."
                className="input pl-12 pr-4 h-11 w-[200px] focus:w-[280px] transition-all duration-500"
              />
            </div>

            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative w-12 h-12 border-[2.5px] border-black rounded-xl flex items-center justify-center bg-white brutal-shadow hover:translate-y-[-2px] hover:bg-primary transition-all duration-200"
            >
              <ShoppingCart size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[24px] h-[24px] bg-pink border-[2.5px] border-black rounded-full flex items-center justify-center text-[10px] font-bold text-white brutal-shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Wallet Button */}
            <div className="hidden sm:block">
              <WalletButton />
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden w-12 h-12 flex items-center justify-center border-2 border-black rounded-xl bg-white brutal-shadow"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className={scrolled ? "h-[74px]" : "h-[90px]"} />

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-white border-l-[3px] border-black md:max-w-md ml-auto flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
               <span className="font-display text-2xl uppercase">Menu</span>
               <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-full brutal-shadow">
                  <X size={24} />
               </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-display uppercase tracking-tight hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-6">
               <div className="p-6 bg-primary border-[2.5px] border-black rounded-2xl brutal-shadow-sm">
                  <h4 className="font-display text-sm uppercase mb-2">New Season Live!</h4>
                  <p className="text-xs font-bold text-black/60 uppercase tracking-widest leading-relaxed">
                    Adopt a GEN 1 Pet today and get early access to the Battle Royale.
                  </p>
               </div>
               <div className="flex flex-col gap-4">
                  <WalletButton />
                  <button className="btn btn-secondary w-full">Leaderboard</button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
