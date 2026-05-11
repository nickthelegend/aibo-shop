// src/app/shop/my-pets/page.tsx
// BYOOOOOB-STYLE: Huge headings, cream grids, colored cards, and brutal shadows

'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ExternalLink, Eye, TrendingUp, Pause, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import PetAvatar from '@/components/PetAvatar';
import RarityBadge from '@/components/RarityBadge';
import WalletButton from '@/components/WalletButton';
import { PETS } from '@/lib/mockPets';
import { useAccount } from 'wagmi';

// MOCK OWNED PETS DATA
const OWNED_PETS_MOCK = PETS.filter(p => ['spark', 'luna', 'pixel'].includes(p.id)).map(p => ({
  ...p,
  level: p.id === 'spark' ? 47 : p.id === 'luna' ? 38 : 14,
  lastFed: p.id === 'spark' ? '2 hours ago' : p.id === 'luna' ? '5 hours ago' : '23 hours ago',
  yieldEarned: p.id === 'spark' ? '0.847' : p.id === 'luna' ? '0.213' : '0.004',
  isActive: p.id === 'spark',
  hungerStatus: p.id === 'spark' ? 'Full' : p.id === 'luna' ? 'Hungry' : 'STARVING',
  tokenId: p.id === 'spark' ? '#0001' : p.id === 'luna' ? '#0024' : '#0189',
  battles: p.id === 'spark' ? 142 : p.id === 'luna' ? 86 : 12,
  wins: p.id === 'spark' ? 128 : p.id === 'luna' ? 64 : 4,
}));

export default function MyPetsPage() {
  const { isConnected } = useAccount();
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'resting'>('all');

  const filteredPets = OWNED_PETS_MOCK.filter(p => {
    if (activeFilter === 'active') return p.isActive;
    if (activeFilter === 'resting') return !p.isActive;
    return true;
  });

  return (
    <div style={{ background: '#F0EEEA', minHeight: '100vh' }}>
      
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
        <div style={{ position: 'absolute', top: '15%', right: '10%', opacity: 0.2 }} className="animate-spin-slow">
           <svg width="120" height="120" viewBox="0 0 100 100">
             <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="#5B30F6" />
           </svg>
        </div>
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', opacity: 0.15 }}>
          <div style={{ width: 80, height: 80, background: '#FF6FD8', borderRadius: '50%' }} />
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="hero-heading">MY</div>
              <div className="hero-heading" style={{ color: '#5B30F6' }}>
                PETS
                <span style={{ 
                  background: '#FFD700', border: '2.5px solid #000', borderRadius: 14,
                  padding: '6px 12px', fontSize: '2rem', display: 'inline-flex', gap: 6,
                  boxShadow: '4px 4px 0 #000', marginLeft: 20, verticalAlign: 'middle'
                }}>🐾</span>
              </div>
            </motion.div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
               <div style={{ 
                 background: '#FFD700', border: '2.5px solid #000', borderRadius: 999,
                 padding: '8px 22px', boxShadow: '3px 3px 0 #000',
                 fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.85rem',
                 textTransform: 'uppercase', letterSpacing: '0.04em'
               }}>
                  3 PETS OWNED
               </div>
               <div style={{ 
                 background: '#FFF', border: '2.5px solid #000', borderRadius: 999,
                 padding: '8px 22px', boxShadow: '3px 3px 0 #000',
                 fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.85rem',
                 textTransform: 'uppercase', letterSpacing: '0.04em'
               }}>
                  YIELD: 1.064 MNT
               </div>
               <div style={{ 
                 background: '#FFF', border: '2.5px solid #000', borderRadius: 999,
                 padding: '8px 22px', boxShadow: '3px 3px 0 #000',
                 fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.85rem',
                 textTransform: 'uppercase', letterSpacing: '0.04em'
               }}>
                  47 WINS
               </div>
            </div>

            <div style={{ marginTop: 30 }}>
              <Link href="/shop" className="btn-byoo">
                <ShoppingBag size={18} />
                SHOP MORE PETS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TICKER STRIP — Purple
          ══════════════════════════════════════ */}
      <div className="ticker-wrap" style={{ background: '#5B30F6' }}>
        <div className="ticker-track-l" style={{ display: 'flex' }}>
          {[...Array(2)].map((_, ri) => (
            ['MANAGE YOUR AGENTS', '◆', 'EARN PASSIVE YIELD', '◆', 'BATTLE ON MANTLE', '◆', 
             'TRAIN YOUR PETS', '◆', 'GENESIS COLLECTION', '◆'].map((t, i) => (
              <span key={`${ri}-${i}`} className="ticker-item" style={{ color: '#FFF' }}>{t}</span>
            ))
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 32px' }}>
        
        {/* NOT CONNECTED STATE */}
        {!isConnected ? (
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
             {/* Sunburst background effect */}
             <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.05, pointerEvents: 'none' }} width={800} height={800} viewBox="0 0 600 600">
               {Array.from({ length: 24 }).map((_, i) => {
                 const a = (i / 24) * Math.PI * 2;
                 return <line key={i} x1="300" y1="300" x2={300 + Math.cos(a) * 300} y2={300 + Math.sin(a) * 300} stroke="#000" strokeWidth="2" />;
               })}
             </svg>

             <span style={{ fontSize: '6rem', display: 'block', marginBottom: 20 }}>🛸</span>
             <h2 className="hero-heading" style={{ fontSize: '3rem', marginBottom: 20 }}>READY TO START?</h2>
             <p style={{ 
               fontFamily: "'Satoshi', sans-serif", fontWeight: 500, 
               fontSize: '1.2rem', color: '#555', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px'
             }}>
               Connect your wallet to manage your AI agents and track your yield performance on Mantle.
             </p>
             
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
               <WalletButton />
               <Link href="/shop" style={{ 
                 fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, 
                 textTransform: 'uppercase', color: '#5B30F6', textDecoration: 'none',
                 fontSize: '0.9rem', letterSpacing: '0.05em'
               }}>
                 OR BROWSE THE SHOP FIRST →
               </Link>
             </div>
          </motion.div>
        ) : (
          <>
            {/* FILTERS */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40, borderBottom: '2.5px solid #000', paddingBottom: 24 }}>
               {(['all', 'active', 'resting'] as const).map(filter => (
                 <button
                   key={filter}
                   onClick={() => setActiveFilter(filter)}
                   style={{
                     fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.85rem',
                     textTransform: 'uppercase', letterSpacing: '0.05em',
                     padding: '12px 24px', borderRadius: 999, cursor: 'pointer',
                     border: '2.5px solid',
                     background: activeFilter === filter ? '#5B30F6' : '#FFF',
                     borderColor: '#000',
                     color: activeFilter === filter ? '#FFF' : '#000',
                     boxShadow: activeFilter === filter ? '4px 4px 0 #000' : '2px 2px 0 #000',
                     transform: activeFilter === filter ? 'translate(-2px, -2px)' : 'none',
                     transition: 'all 0.12s ease',
                   }}
                 >
                   {filter} Pets
                 </button>
               ))}
            </div>

            {/* PETS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32 }}>
               {filteredPets.length > 0 ? (
                 filteredPets.map((pet, idx) => (
                   <motion.div 
                     key={pet.id}
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className="card-byoo"
                     style={{ display: 'flex', flexDirection: 'column' }}
                   >
                     {/* TOP CARD SECTION */}
                     <div 
                        style={{ 
                          padding: 32, 
                          background: pet.bgColor,
                          borderBottom: '2.5px solid #000',
                          display: 'flex',
                          gap: 24,
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                     >
                        {/* Subtle background lines */}
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(45deg, #000 12%, transparent 12%, transparent 50%, #000 50%, #000 62%, transparent 62%, transparent 100%)', backgroundSize: '20px 20px' }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                          <PetAvatar pet={pet} size="md" animated={pet.isActive} />
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                           <h3 style={{ 
                             fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, 
                             fontSize: '1.75rem', textTransform: 'uppercase', lineHeight: 1, marginBottom: 8 
                           }}>{pet.name}</h3>
                           <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                             <RarityBadge rarity={pet.rarity} size="sm" />
                             <span style={{ 
                               background: '#000', color: '#FFF', borderRadius: 4, 
                               padding: '2px 6px', fontSize: '0.6rem', fontWeight: 800, 
                               fontFamily: "'Cabinet Grotesk', sans-serif" 
                             }}>{pet.tokenId}</span>
                           </div>
                           
                           {pet.isActive ? (
                             <div style={{ 
                               display: 'flex', alignItems: 'center', gap: 6, 
                               background: '#2DB551', color: '#FFF', border: '1.5px solid #000',
                               borderRadius: 999, padding: '2px 10px', width: 'fit-content',
                               fontSize: '0.65rem', fontWeight: 800, fontFamily: "'Cabinet Grotesk', sans-serif"
                             }}>
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                ACTIVE AGENT
                             </div>
                           ) : (
                             <div style={{ 
                               display: 'flex', alignItems: 'center', gap: 6, 
                               background: '#EEE', color: '#888', border: '1.5px solid #000',
                               borderRadius: 999, padding: '2px 10px', width: 'fit-content',
                               fontSize: '0.65rem', fontWeight: 800, fontFamily: "'Cabinet Grotesk', sans-serif"
                             }}>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                RESTING
                             </div>
                           )}
                        </div>
                     </div>

                     {/* STATS AREA */}
                     <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* XP Progress */}
                        <div>
                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                              <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: '#888' }}>LEVEL {pet.level}</span>
                              <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: '0.75rem' }}>470 / 1000 XP</span>
                           </div>
                           <div className="stat-track">
                              <div className="stat-fill" style={{ width: '47%', background: '#5B30F6' }} />
                           </div>
                        </div>

                        {/* Grid stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                           <div style={{ background: '#F9F9F9', border: '1.5px solid #000', borderRadius: 12, padding: 12 }}>
                              <span style={{ display: 'block', fontSize: '0.6rem', fontWeight: 800, color: '#888', marginBottom: 2 }}>⚡ YIELD</span>
                              <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800 }}>{pet.yieldEarned} MNT</span>
                           </div>
                           <div style={{ background: '#F9F9F9', border: '1.5px solid #000', borderRadius: 12, padding: 12 }}>
                              <span style={{ display: 'block', fontSize: '0.6rem', fontWeight: 800, color: '#888', marginBottom: 2 }}>🏆 WINS</span>
                              <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800 }}>{pet.wins} / {pet.battles}</span>
                           </div>
                        </div>

                        {/* Hunger Status */}
                        <div style={{ 
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                          padding: '14px 18px', background: '#FFF', border: '2px solid #000', borderRadius: 16,
                          boxShadow: '3px 3px 0 #000'
                        }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <span style={{ fontSize: '1.5rem' }}>🥩</span>
                              <div>
                                 <span style={{ display: 'block', fontSize: '0.6rem', fontWeight: 800, color: '#888' }}>HUNGER</span>
                                 <span style={{ 
                                   display: 'block', fontSize: '0.85rem', fontWeight: 800,
                                   color: pet.hungerStatus === 'Full' ? '#2DB551' : pet.hungerStatus === 'Hungry' ? '#FF5C00' : '#E83333'
                                 }}>{pet.hungerStatus}</span>
                              </div>
                           </div>
                           {pet.hungerStatus !== 'Full' && (
                             <button className="btn-byoo" style={{ padding: '6px 12px', fontSize: '0.7rem' }}>FEED</button>
                           )}
                        </div>

                        {/* ACTIONS */}
                        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                           <button className="btn-byoo" style={{ flex: 1, fontSize: '0.8rem', background: pet.isActive ? '#E83333' : '#FFD700', color: pet.isActive ? '#FFF' : '#000' }}>
                              {pet.isActive ? <Pause size={16} /> : <Zap size={16} />}
                              {pet.isActive ? 'DEACTIVATE' : 'ACTIVATE'}
                           </button>
                           <button className="btn-byoo" style={{ flex: 1, fontSize: '0.8rem' }}>
                              <Eye size={16} />
                              VIEW APP
                           </button>
                        </div>
                     </div>
                   </motion.div>
                 ))
               ) : (
                 <div style={{ 
                   gridColumn: '1 / -1', padding: '100px 32px', 
                   background: '#FFF', border: '2.5px solid #000', borderStyle: 'dashed', borderRadius: 32,
                   textAlign: 'center'
                 }}>
                    <span style={{ fontSize: '5rem', display: 'block', marginBottom: 20 }}>🕵️</span>
                    <h3 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '2rem', textTransform: 'uppercase' }}>NO PETS FOUND</h3>
                    <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, color: '#888' }}>Try changing your active filters</p>
                 </div>
               )}
            </div>

            {/* YIELD SUMMARY — Purple Section */}
            <section style={{ marginTop: 100 }}>
               <div className="grid-purple" style={{ 
                 borderRadius: 40, padding: 60, border: '3px solid #000', 
                 boxShadow: '12px 12px 0 #FFD700', position: 'relative', overflow: 'hidden' 
               }}>
                  <div style={{ position: 'absolute', top: -40, right: -40, opacity: 0.1 }}>
                     <TrendingUp size={300} color="#FFF" />
                  </div>
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                     <h2 style={{ 
                       fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, 
                       fontSize: '3rem', color: '#FFD700', textTransform: 'uppercase', marginBottom: 60, lineHeight: 1
                     }}>
                       YIELD SUMMARY
                     </h2>
                     
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 60 }}>
                        <div>
                           <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 12 }}>Total Earnings</span>
                           <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: 800, color: '#FFF', fontFamily: "'Cabinet Grotesk', sans-serif" }}>1.064 MNT</span>
                           <span style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>≈ $0.74 USD</span>
                        </div>
                        <div>
                           <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 12 }}>Best Day</span>
                           <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: 800, color: '#FFF', fontFamily: "'Cabinet Grotesk', sans-serif" }}>0.142 MNT</span>
                           <span style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>April 24, 2025</span>
                        </div>
                        <div>
                           <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 12 }}>Active Streak</span>
                           <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: 800, color: '#FFF', fontFamily: "'Cabinet Grotesk', sans-serif" }}>14 DAYS</span>
                           <span style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>PERSONAL BEST</span>
                        </div>
                        <div>
                           <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 12 }}>Global Rank</span>
                           <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: 800, color: '#FFF', fontFamily: "'Cabinet Grotesk', sans-serif" }}>#847</span>
                           <span style={{ display: 'block', fontSize: '0.85rem', color: '#2DB551', fontWeight: 800, marginTop: 4 }}>TOP 5%</span>
                        </div>
                     </div>
                     
                     <button className="btn-byoo" style={{ background: '#000', color: '#FFD700', boxShadow: '6px 6px 0 #FFD700' }}>
                        VIEW FULL HISTORY →
                     </button>
                  </div>
               </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
