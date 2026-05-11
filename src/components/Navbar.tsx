// src/components/Navbar.tsx
// BYOOOOOB-STYLE: White bar, black border-bottom, pill CTA with "NEW" badge

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WalletButton from './WalletButton';
import CartDrawer from './CartDrawer';
import { useCart } from '@/lib/cartStore';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();
  const pathname = usePathname();

  const links = [
    { label: 'Browse', href: '/shop' },
    { label: 'My Pets', href: '/shop/my-pets' },
    { label: 'How It Works', href: '/shop#how-it-works' },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#FFFFFF',
        borderBottom: '2.5px solid #000',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: 68,
      }}>
        {/* Logo */}
        <Link href="/shop" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
          <span style={{
            fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
            fontSize: '1.3rem', textTransform: 'uppercase', color: '#000',
            letterSpacing: '-0.02em',
          }}>
            🐾 AIBO SHOP
          </span>
          <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.65rem', color: '#888', letterSpacing: '0.05em' }}>
            on Mantle
          </span>
        </Link>

        {/* Desktop center links */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden md:flex">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "'Satoshi', sans-serif", fontWeight: 700,
              fontSize: '0.9rem', textTransform: 'uppercase',
              letterSpacing: '0.04em', textDecoration: 'none',
              color: pathname === l.href ? '#000' : '#666',
              borderBottom: pathname === l.href ? '2.5px solid #FFD700' : '2.5px solid transparent',
              paddingBottom: 2,
            }}>
              {l.label}
            </Link>
          ))}

          {/* "JOIN AS PET OWNER" with pink NEW badge — exactly like Byooooob */}
          <Link href="/shop" style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 700,
            fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.04em',
            textDecoration: 'none', color: '#666',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            Join Waitlist
            <span style={{
              background: '#FF6FD8', color: '#FFF',
              borderRadius: 999, padding: '2px 8px',
              fontSize: '0.6rem', fontWeight: 800,
              fontFamily: "'Cabinet Grotesk', sans-serif",
              textTransform: 'uppercase', letterSpacing: '0.06em',
              border: '1.5px solid #000',
            }}>NEW</span>
          </Link>
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            style={{
              position: 'relative', width: 42, height: 42, borderRadius: '50%',
              background: '#FFF', border: '2.5px solid #000',
              boxShadow: '3px 3px 0 #000', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.12s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translate(-2px,-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translate(0,0)')}
          >
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                width: 20, height: 20, borderRadius: '50%',
                background: '#FFD700', border: '2px solid #000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
                fontSize: '0.65rem', color: '#000',
              }}>{itemCount}</span>
            )}
          </button>

          {/* GET IN TOUCH style CTA — white pill, black border, hard shadow */}
          <WalletButton />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            style={{
              background: 'none', border: '2px solid #000', borderRadius: 8,
              padding: '6px 8px', cursor: 'pointer', boxShadow: '2px 2px 0 #000',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Spacer */}
      <div style={{ height: 68 }} />

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed', top: 68, left: 0, right: 0, zIndex: 99,
              background: '#FFF', borderBottom: '2.5px solid #000',
              padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: 20,
            }}
          >
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
                fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
                fontSize: '1.2rem', textTransform: 'uppercase', textDecoration: 'none', color: '#000',
              }}>{l.label}</Link>
            ))}
            <WalletButton />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
