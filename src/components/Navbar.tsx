'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WalletButton from './WalletButton';
import { useCart } from '@/lib/cartStore';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  const navLinks = [
    { label: 'Browse', href: '/shop' },
    { label: 'Explore', href: '/shop?tab=explore' },
    { label: 'My Pets', href: '/shop/my-pets' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-[100] h-[68px] bg-white border-b-[2.5px] border-black px-6 md:px-12 flex items-center justify-between">
        {/* LEFT - Logo */}
        <div className="flex flex-col">
          <Link href="/shop" className="text-xl leading-none flex items-center gap-2 group">
            <span className="group-hover:rotate-12 transition-transform">🐾</span>
            <span className="uppercase">AIBO SHOP</span>
          </Link>
          <span className="text-[10px] text-gray-400 font-bold uppercase ml-7">on Mantle</span>
        </div>

        {/* CENTER - Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href}
                className={`relative text-sm font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}
              >
                {link.label}
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-[24px] left-0 right-0 h-[4px] bg-primary border-x border-t border-black"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT - Actions */}
        <div className="flex items-center gap-4">
          {/* Search (Desktop) */}
          <div className="hidden lg:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search AIBOs..."
              className="input pl-10 py-2 w-[220px] focus:w-[320px] transition-all duration-300 h-10"
            />
          </div>

          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 border-2 border-black rounded-full flex items-center justify-center bg-white brutal-shadow hover:translate-y-[-2px] transition-all"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary border-2 border-black rounded-full flex items-center justify-center text-[10px] font-bold">
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
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[68px] z-[90] bg-white border-b-[2.5px] border-black md:hidden p-6"
          >
            <div className="flex flex-col gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search AIBOs..."
                  className="input pl-10 w-full"
                />
              </div>
              
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl uppercase font-bold"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100">
                <WalletButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
