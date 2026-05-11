// src/app/shop/cart/page.tsx
// BYOOOOOB-STYLE: Huge typography, cream grids, pill buttons with badges, and brutal shadows

'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowLeft, ShieldCheck, Wallet, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PetAvatar from '@/components/PetAvatar';
import RarityBadge from '@/components/RarityBadge';
import WalletButton from '@/components/WalletButton';
import { useCart } from '@/lib/cartStore';
import { useAccount } from 'wagmi';

export default function CartPage() {
  const { items, removeItem, clearCart, totalMNT, itemCount } = useCart();
  const { address, isConnected } = useAccount();
  const router = useRouter();
  
  const [paymentMethod, setPaymentMethod] = useState<'MNT' | 'USDC'>('MNT');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      router.push('/shop/success');
    }, 2000);
  };

  return (
    <div style={{ background: '#F0EEEA', minHeight: '100vh', paddingBottom: 100 }}>
      
      {/* ══════════════════════════════════════
          SECTION 1 — HEADER (Byooooob cream grid)
          ══════════════════════════════════════ */}
      <section className="grid-cream" style={{ 
        padding: '100px 32px 60px', 
        borderBottom: '2.5px solid #000',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floating background elements */}
        <div style={{ position: 'absolute', top: '15%', right: '15%', opacity: 0.15 }} className="animate-spin-slow">
           <svg width="100" height="100" viewBox="0 0 100 100">
             <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="#FF5C00" />
           </svg>
        </div>
        <div style={{ position: 'absolute', bottom: '20%', left: '10%', opacity: 0.15 }}>
          <div className="cursor-deco" style={{ transform: 'rotate(15deg)' }} />
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <Link href="/shop" style={{ 
            display: 'flex', alignItems: 'center', gap: 8, 
            fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, 
            textTransform: 'uppercase', color: '#000', textDecoration: 'none',
            fontSize: '0.85rem', marginBottom: 24, letterSpacing: '0.05em'
          }}>
            <ArrowLeft size={18} />
            BACK TO SHOP
          </Link>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="hero-heading">YOUR</div>
            <div className="hero-heading" style={{ color: '#FF5C00' }}>
              CART
              <span style={{ 
                background: '#FFD700', border: '2.5px solid #000', borderRadius: 14,
                padding: '6px 12px', fontSize: '2rem', display: 'inline-flex', gap: 6,
                boxShadow: '4px 4px 0 #000', marginLeft: 20, verticalAlign: 'middle'
              }}>🛒</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TICKER STRIP — Orange
          ══════════════════════════════════════ */}
      <div className="ticker-wrap" style={{ background: '#FF5C00' }}>
        <div className="ticker-track-l" style={{ display: 'flex' }}>
          {[...Array(2)].map((_, ri) => (
            ['SECURE CHECKOUT', '◆', 'MANTLE L2 SPEED', '◆', 'GAS OPTIMIZED', '◆', 
             'GENESIS DROP ACTIVE', '◆', 'FREE MINT PERIOD', '◆'].map((t, i) => (
              <span key={`${ri}-${i}`} className="ticker-item" style={{ color: '#FFF' }}>{t}</span>
            ))
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 32px' }}>
        
        {itemCount === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              maxWidth: 800, margin: '60px auto', 
              background: '#FFF', border: '2.5px solid #000', borderRadius: 32,
              padding: 60, textAlign: 'center', boxShadow: '10px 10px 0 #000',
              position: 'relative', overflow: 'hidden'
            }}
          >
             {/* Radial lines background */}
             <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.05, pointerEvents: 'none' }} width={800} height={800} viewBox="0 0 600 600">
               {Array.from({ length: 24 }).map((_, i) => {
                 const a = (i / 24) * Math.PI * 2;
                 return <line key={i} x1="300" y1="300" x2={300 + Math.cos(a) * 300} y2={300 + Math.sin(a) * 300} stroke="#000" strokeWidth="2" />;
               })}
             </svg>

             <span style={{ fontSize: '6rem', display: 'block', marginBottom: 20 }}>🐾</span>
             <h2 className="hero-heading" style={{ fontSize: '3rem', marginBottom: 20 }}>CART IS EMPTY</h2>
             <p style={{ 
               fontFamily: "'Satoshi', sans-serif", fontWeight: 500, 
               fontSize: '1.2rem', color: '#555', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px'
             }}>
               You haven&apos;t picked any AI companions yet. Go to the marketplace to find your perfect partner.
             </p>
             <Link href="/shop" className="btn-byoo" style={{ background: '#FFD700' }}>
               BROWSE PETS →
             </Link>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 40, alignItems: 'start' }}>
            
            {/* LEFT - ITEMS LIST */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               <h3 style={{ 
                 fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, 
                 fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' 
               }}>
                 SELECTED PETS ({itemCount})
               </h3>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                 {items.map(({ pet }) => (
                   <motion.div 
                     key={pet.id}
                     layout
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="card-byoo"
                     style={{ display: 'flex', padding: 24, gap: 24, position: 'relative' }}
                   >
                     {/* Remove Button */}
                     <button 
                       onClick={() => removeItem(pet.id)}
                       style={{ 
                         position: 'absolute', top: 16, right: 16,
                         width: 32, height: 32, borderRadius: '50%',
                         border: '2px solid #000', background: '#FFF',
                         display: 'flex', alignItems: 'center', justifyContent: 'center',
                         cursor: 'pointer', transition: 'all 0.12s ease'
                       }}
                       onMouseEnter={e => (e.currentTarget.style.background = '#E83333', e.currentTarget.style.color = '#FFF')}
                       onMouseLeave={e => (e.currentTarget.style.background = '#FFF', e.currentTarget.style.color = '#000')}
                     >
                       <Trash2 size={16} />
                     </button>

                     <div style={{ 
                       width: 120, height: 120, background: pet.bgColor, 
                       borderRadius: 16, border: '2px solid #000',
                       display: 'flex', alignItems: 'center', justifyContent: 'center'
                     }}>
                        <PetAvatar pet={pet} size="sm" animated={false} />
                     </div>

                     <div style={{ flex: 1 }}>
                        <h4 style={{ 
                          fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, 
                          fontSize: '1.5rem', textTransform: 'uppercase', lineHeight: 1, marginBottom: 8 
                        }}>{pet.name}</h4>
                        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                           <RarityBadge rarity={pet.rarity} size="sm" />
                           <span style={{ 
                             fontFamily: "'Satoshi', sans-serif", fontWeight: 700, 
                             fontSize: '0.7rem', color: '#888', textTransform: 'uppercase'
                           }}>
                             {pet.category} · GEN {pet.generation}
                           </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                           <div>
                              <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '1.25rem' }}>
                                {pet.priceMNT} MNT
                              </div>
                              <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.75rem', color: '#888' }}>
                                ≈ ${pet.priceUSD} USD
                              </div>
                           </div>
                           <Link href={`/shop/pet/${pet.id}`} style={{ 
                             fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, 
                             fontSize: '0.75rem', textTransform: 'uppercase', color: '#5B30F6', textDecoration: 'none'
                           }}>
                             DETAILS →
                           </Link>
                        </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </div>

            {/* RIGHT - SUMMARY */}
            <div style={{ position: 'sticky', top: 100 }}>
               <div style={{ 
                 background: '#FFF', border: '3px solid #000', borderRadius: 32,
                 padding: 40, boxShadow: '10px 10px 0 #000'
               }}>
                  <h3 style={{ 
                    fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, 
                    fontSize: '2rem', textTransform: 'uppercase', marginBottom: 32 
                  }}>ORDER SUMMARY</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#888' }}>
                       <span>SUBTOTAL ({itemCount} PETS)</span>
                       <span style={{ color: '#000' }}>{totalMNT.toFixed(2)} MNT</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#888' }}>
                       <span>EST. GAS FEE</span>
                       <span style={{ color: '#000' }}>~0.002 MNT</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#888' }}>
                       <span>PLATFORM FEE</span>
                       <span style={{ color: '#2DB551' }}>FREE 🎉</span>
                    </div>
                    
                    <div style={{ height: '2px', background: '#000', margin: '8px 0' }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                       <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '1.5rem', textTransform: 'uppercase' }}>TOTAL</span>
                       <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '2.5rem', lineHeight: 1 }}>
                            {(totalMNT + 0.002).toFixed(3)} MNT
                          </div>
                          <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.85rem', color: '#888', marginTop: 4 }}>
                            ≈ ${((totalMNT + 0.002) * 0.70).toFixed(2)} USD
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* PAYMENT METHOD */}
                  <div style={{ marginBottom: 32 }}>
                     <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                       PAYMENT METHOD
                     </span>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <button 
                          onClick={() => setPaymentMethod('MNT')}
                          style={{
                            padding: '14px', borderRadius: 16, border: '2.5px solid #000',
                            fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.85rem',
                            background: paymentMethod === 'MNT' ? '#FFD700' : '#FFF',
                            boxShadow: paymentMethod === 'MNT' ? '4px 4px 0 #000' : '2px 2px 0 #000',
                            transform: paymentMethod === 'MNT' ? 'translate(-2px, -2px)' : 'none',
                            transition: 'all 0.12s ease', cursor: 'pointer'
                          }}
                        >
                           💎 MNT
                        </button>
                        <button 
                          onClick={() => setPaymentMethod('USDC')}
                          style={{
                            padding: '14px', borderRadius: 16, border: '2.5px solid #000',
                            fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.85rem',
                            background: paymentMethod === 'USDC' ? '#2DB551' : '#FFF',
                            color: paymentMethod === 'USDC' ? '#FFF' : '#000',
                            boxShadow: paymentMethod === 'USDC' ? '4px 4px 0 #000' : '2px 2px 0 #000',
                            transform: paymentMethod === 'USDC' ? 'translate(-2px, -2px)' : 'none',
                            transition: 'all 0.12s ease', cursor: 'pointer'
                          }}
                        >
                           💵 USDC
                        </button>
                     </div>
                  </div>

                  {/* WALLET STATUS */}
                  <div style={{ marginBottom: 32 }}>
                     {!isConnected ? (
                       <div style={{ 
                         padding: 24, background: '#FFE17C', border: '2.5px solid #000', borderRadius: 20,
                         boxShadow: '4px 4px 0 #000', textAlign: 'center'
                       }}>
                          <p style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: 16 }}>
                            CONNECT WALLET TO CONTINUE
                          </p>
                          <WalletButton />
                       </div>
                     ) : (
                       <div style={{ 
                         padding: 16, background: '#F9F9F9', border: '2.5px solid #000', borderRadius: 16,
                         display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                       }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                             <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#2DB551', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                                <CheckCircle2 size={24} />
                             </div>
                             <div>
                                <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#2DB551' }}>READY TO MINT</span>
                                <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'monospace' }}>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                             </div>
                          </div>
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#888', textTransform: 'uppercase' }}>Mantle L2</span>
                       </div>
                     )}
                  </div>

                  <button 
                    disabled={!isConnected || isProcessing}
                    onClick={handleCheckout}
                    className="btn-byoo"
                    style={{ 
                      width: '100%', height: 64, fontSize: '1.1rem', background: '#5B30F6', color: '#FFF',
                      opacity: (!isConnected || isProcessing) ? 0.5 : 1,
                      pointerEvents: (!isConnected || isProcessing) ? 'none' : 'auto'
                    }}
                  >
                    {isProcessing ? (
                       <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                          CONFIRMING...
                       </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        🔥 MINT {itemCount} AIBO{itemCount > 1 ? 'S' : ''}
                        <span className="btn-badge" style={{ background: '#FFD700', color: '#000' }}>ON MANTLE</span>
                      </div>
                    )}
                  </button>

                  <div style={{ 
                    marginTop: 32, display: 'flex', justifyContent: 'center', gap: 24, opacity: 0.4 
                  }}>
                     <ShieldCheck size={24} />
                     <Wallet size={24} />
                     <Zap size={24} fill="#000" />
                  </div>
                  
                  <p style={{ 
                    marginTop: 24, textAlign: 'center', fontSize: '0.65rem', 
                    fontWeight: 700, color: '#888', textTransform: 'uppercase', lineHeight: 1.5 
                  }}>
                    By minting you agree to our terms and acknowledge on-chain risks.
                  </p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
