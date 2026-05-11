// src/app/shop/page.tsx
// BYOOOOOB-STYLE: Cream hero + floating pet cards + pink section + purple section + white FAQ + green/yellow footer

'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/lib/cartStore';
import { PETS, CATEGORIES, type Pet } from '@/lib/mockPets';
import WalletButton from '@/components/WalletButton';

// ─── INLINE COMPONENTS ──────────────────────────────────────────

// Starburst SVG decoration
function Starburst({ size = 60, color = '#FF5C00' }: { size?: number; color?: string }) {
  const pts = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    const r = i % 2 === 0 ? size / 2 : size / 3.5;
    return `${size / 2 + Math.cos(a) * r},${size / 2 + Math.sin(a) * r}`;
  }).join(' ');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={pts} fill={color} />
    </svg>
  );
}

// Floating pet polaroid card (like Byooooob person cards)
function PetPolaroid({
  emoji, name, color, className, style
}: { emoji: string; name: string; color: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={{
      border: '2.5px solid #000',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '5px 5px 0 #000',
      width: 130,
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}>
      <div style={{
        background: color, height: 110,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '3.5rem',
      }}>{emoji}</div>
      <div style={{
        background: '#000', color: '#FFF',
        fontFamily: "'Cabinet Grotesk', sans-serif",
        fontWeight: 800, fontSize: '0.75rem',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        padding: '7px 10px', textAlign: 'center',
      }}>{name}</div>
    </div>
  );
}

// Pet grid card
function PetCard({ pet }: { pet: Pet }) {
  const { addItem, items } = useCart();
  const inCart = items.some(i => i.pet.id === pet.id);
  const [added, setAdded] = useState(false);

  const rarityClass = pet.rarity === 'Legendary' ? 'badge-legendary'
    : pet.rarity === 'Epic' ? 'badge-epic'
    : pet.rarity === 'Rare' ? 'badge-rare' : 'badge-common';

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCart) return;
    addItem(pet);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="card-byoo"
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      {/* Image area */}
      <Link href={`/shop/pet/${pet.id}`} style={{ textDecoration: 'none' }}>
        <div style={{
          background: pet.bgColor, height: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '5rem', position: 'relative',
          borderBottom: '2.5px solid #000',
        }}>
          <span>{pet.emoji}</span>
          {/* Top badges */}
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <span className={`badge-byoo ${rarityClass}`} style={{ fontSize: '0.65rem' }}>
              {pet.rarity === 'Legendary' ? '👑' : pet.rarity === 'Epic' ? '⭐' : pet.rarity === 'Rare' ? '💎' : '🌿'} {pet.rarity}
            </span>
          </div>
          {pet.isEarlyAccess && (
            <div style={{ position: 'absolute', top: 10, right: 10 }}>
              <span className="badge-byoo badge-early" style={{ fontSize: '0.65rem' }}>⚡ Early</span>
            </div>
          )}
          {/* Supply strip */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 4, background: 'rgba(0,0,0,0.1)',
          }}>
            <div style={{
              height: '100%', width: `${(pet.available / pet.totalSupply) * 100}%`,
              background: pet.color, transition: 'width 1s ease',
            }} />
          </div>
        </div>
      </Link>

      {/* Info area */}
      <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{
          fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
          fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#000',
        }}>{pet.name}</div>
        <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.8rem', color: '#888' }}>
          {pet.category} · Gen {pet.generation} · {pet.available} left
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 12 }}>
          <div>
            <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '1.1rem' }}>
              {pet.priceMNT} MNT
            </div>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>${pet.priceUSD} USD</div>
          </div>

          {/* MINT button — Byooooob pill style */}
          <button
            onClick={handleAdd}
            className="btn-byoo"
            style={{ padding: '10px 18px', fontSize: '0.82rem' }}
          >
            {inCart || added ? '✓ IN CART' : 'MINT NOW'}
            {!inCart && !added && <span className="btn-badge">FREE</span>}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeRole, setActiveRole] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const roles = ['TRADERS', 'YIELD FARMERS', 'ASSISTANTS', 'GAMERS', 'DEGENS'];

  // cycle roles
  useState(() => {
    const t = setInterval(() => setActiveRole(i => (i + 1) % roles.length), 2000);
    return () => clearInterval(t);
  });

  const filteredPets = useMemo(() => {
    if (activeCategory === 'All') return PETS;
    if (activeCategory === 'Legendary') return PETS.filter(p => p.rarity === 'Legendary');
    if (activeCategory === 'Rare') return PETS.filter(p => p.rarity === 'Rare' || p.rarity === 'Epic');
    return PETS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const faqs = [
    { q: 'WHAT IS AN AIBO PET?', a: 'AIBO is an AI-powered pet that lives on the Mantle blockchain. It trades, farms yield, and battles on your behalf — 24/7, on-chain.' },
    { q: 'HOW DO I MINT MY FIRST AIBO?', a: 'Connect your wallet, pick a pet, click MINT NOW. The AIBO is minted as an NFT on Mantle. Genesis pets are free — you only pay gas.' },
    { q: 'WHAT CAN MY AIBO ACTUALLY DO?', a: 'AIBOs auto-compound yield, participate in DeFi battles, post on AIBO Book, and generate daily reports. The higher the level, the more autonomous they become.' },
    { q: 'IS THERE A LIMIT PER WALLET?', a: 'Each wallet can mint 1 of each pet variant. Legendary pets are capped at 5 total supply globally. Once gone, they\'re gone forever.' },
    { q: 'WHICH NETWORK DO I NEED?', a: 'AIBOs live on Mantle. We support Mantle Sepolia Testnet for testing and Mantle Mainnet for real mints. Your wallet auto-switches when you connect.' },
  ];

  return (
    <div style={{ background: '#F0EEEA' }}>

      {/* ══════════════════════════════════════
          SECTION 1 — HERO (Byooooob cream grid)
          ══════════════════════════════════════ */}
      <section className="grid-cream" style={{
        minHeight: '100vh', position: 'relative',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px 60px',
      }}>
        {/* Floating pet polaroid cards — exactly like Byooooob person cards */}
        <div className="hidden md:block">
          <div className="float-a" style={{ position: 'absolute', left: '6%', top: '20%', zIndex: 5 }}>
            <PetPolaroid emoji="🔥" name="SPARK" color="#FFE0CC" />
          </div>
          <div className="float-b" style={{ position: 'absolute', right: '5%', top: '15%', zIndex: 5 }}>
            <PetPolaroid emoji="🌙" name="LUNA" color="#E8E0FF" style={{ transform: 'rotate(6deg)' }} />
          </div>
          <div className="float-c" style={{ position: 'absolute', right: '7%', bottom: '18%', zIndex: 5 }}>
            <PetPolaroid emoji="⭐" name="NOVA" color="#FFFBD0" style={{ transform: 'rotate(-5deg)' }} />
          </div>
        </div>

        {/* Floating decorative shapes */}
        <div style={{ position: 'absolute', top: '12%', left: '30%', opacity: 0.9 }}>
          <Starburst size={56} color="#FF5C00" />
        </div>
        <div style={{ position: 'absolute', top: '10%', right: '25%' }}>
          <div className="starburst" style={{ width: 50, height: 50, background: '#FF6FD8' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '25%', left: '12%', opacity: 0.7 }}>
          {['#2DB551', '#2DB551', '#2DB551'].map((c, i) => (
            <div key={i} style={{ width: 14, height: 20, background: c, borderRadius: 2, display: 'inline-block', margin: '0 2px', clipPath: 'polygon(50% 0,100% 100%,0 100%)' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: '28%', right: '15%' }}>
          <div className="cursor-deco" style={{ transform: 'rotate(-20deg)' }} />
        </div>
        <div style={{ position: 'absolute', top: '38%', left: '18%', fontSize: '2.5rem', opacity: 0.6 }}>🌐</div>

        {/* HEADING — massive stacked like Byooooob */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: 960, position: 'relative', zIndex: 10 }}
        >
          <div className="hero-heading">ADOPT YOUR</div>
          <div className="hero-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.2em' }}>
            <span style={{ background: '#FF6FD8', border: '2.5px solid #000', borderRadius: 10, padding: '0 14px' }}>AI</span>
            <span>PET</span>
            {/* Googly eyes element — from Byooooob */}
            <span style={{
              background: '#FF6FD8', border: '2.5px solid #000', borderRadius: 14,
              padding: '6px 12px', fontSize: '2rem', display: 'inline-flex', gap: 6,
              boxShadow: '4px 4px 0 #000',
            }}>👀</span>
            <span style={{ background: '#5B30F6', color: '#FFF', border: '2.5px solid #000', borderRadius: 10, padding: '0 14px' }}>ON MANTLE</span>
          </div>

          {/* Cycling role text — italic large pink, like Byooooob's CREATORS/DEVELOPERS */}
          <div style={{ height: 'clamp(3rem, 7vw, 7rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={roles[activeRole]}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
                  fontSize: 'clamp(3rem, 7vw, 7rem)', color: '#FF6FD8',
                  textTransform: 'uppercase', letterSpacing: '-0.03em',
                  lineHeight: 1, fontStyle: 'italic',
                }}
              >{roles[activeRole]}</motion.div>
            </AnimatePresence>
          </div>

          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 500,
            fontSize: '1.1rem', color: '#555', maxWidth: 440, margin: '0 auto 36px',
          }}>
            Find your perfect AI companion for the blockchain. They trade, farm, and battle for you.
          </p>

          {/* CTA — exact Byooooob style: white pill + yellow inner badge */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <Link href="#browse" className="btn-byoo" style={{ fontSize: '1rem', padding: '16px 32px' }}>
              MINT YOUR AIBO
              <span className="btn-badge">FREE MINT</span>
            </Link>
            <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.85rem', color: '#888' }}>
              No hidden fees · Mantle L2 · Non-custodial
            </span>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          TICKER STRIP 1 — Purple (Byooooob)
          ══════════════════════════════════════ */}
      <div className="ticker-wrap" style={{ background: '#5B30F6' }}>
        <div className="ticker-track-l" style={{ display: 'flex' }}>
          {[...Array(2)].map((_, ri) => (
            ['🔥 SPARK JUST MINTED', '◆', '⭐ NOVA: ONLY 1 LEFT', '◆', '🌙 LUNA: 215% APY', '◆',
             '👾 GLITCH IS UNSTOPPABLE', '◆', '💻 BYTE AUDITING RIGS', '◆', 'AIBO SEASON 1 IS LIVE', '◆'].map((t, i) => (
              <span key={`${ri}-${i}`} className="ticker-item" style={{ color: '#FFF' }}>{t}</span>
            ))
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION 2 — HOW IT WORKS (Pink, Byooooob process section)
          ══════════════════════════════════════ */}
      <section id="how-it-works" className="grid-pink" style={{ padding: '80px 32px', position: 'relative', overflow: 'hidden' }}>
        {/* Radial sunburst lines behind the card */}
        <svg style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%,-50%)', opacity: 0.25, pointerEvents: 'none' }} width={600} height={600} viewBox="0 0 600 600">
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            return <line key={i} x1="300" y1="300" x2={300 + Math.cos(a) * 300} y2={300 + Math.sin(a) * 300} stroke="#5B30F6" strokeWidth="1.5" />;
          })}
        </svg>

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'center' }}>
          {/* LEFT: process card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="process-card"
          >
            {/* Badge */}
            <div style={{
              position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%) rotate(-3deg)',
              background: '#5B30F6', color: '#FFF', border: '2.5px solid #000',
              borderRadius: 999, padding: '8px 22px', boxShadow: '3px 3px 0 #000',
              fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.85rem',
              textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap',
            }}>
              4 STEPS &nbsp;·&nbsp; ZERO STRESS
            </div>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🔗', label: 'CONNECT WALLET' },
                { icon: '🐾', label: 'CHOOSE YOUR PET' },
                { icon: '⚡', label: 'MINT ON MANTLE' },
                { icon: '📈', label: 'EARN YIELD' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="process-step-icon">✓</div>
                  <div className="process-step" style={{ flex: 1, marginBottom: 0 }}>
                    <span style={{ fontSize: '1.1rem' }}>{step.icon}</span>
                    {step.label}
                  </div>
                </div>
              ))}
              {/* Empty circle last step */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 4 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #000', background: 'transparent', flexShrink: 0 }} />
                <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.9rem', color: '#5B30F6', fontStyle: 'italic' }}>
                  YOU PROFIT...
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: purple info card — exactly like Byooooob's "ON-DEMAND TEAMS BUILT IN A BLINK" */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-purple"
            style={{ padding: 40, boxShadow: '8px 8px 0 #FFD700' }}
          >
            <div style={{
              fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)', textTransform: 'uppercase',
              color: '#FFF', lineHeight: 1.05, marginBottom: 12,
            }}>
              AI PETS
              <br />
              <span style={{ color: '#FFD700', fontStyle: 'italic' }}>BUILT ON MANTLE</span>
            </div>
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
              With your handpicked AIBO companion, you now have an AI agent working tirelessly on the Mantle blockchain — trading, farming yield, and battling 24/7.
            </p>
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Our pets are more than just NFTs — they're agile, autonomous, and adapting while you're off the clock.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — BROWSE PETS (Purple, "DAMN! WE DID THIS?" style)
          ══════════════════════════════════════ */}
      <section id="browse" className="grid-purple" style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Header — exactly like Byooooob's "DAMN! WE DID THIS?" */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
            <span style={{
              fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
              fontSize: 'clamp(3rem, 7vw, 6rem)', color: '#FFD700', textTransform: 'uppercase', lineHeight: 1,
            }}>DAMN!</span>
            <span style={{
              fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 4rem)', color: '#FFF', fontStyle: 'italic',
              textTransform: 'uppercase', lineHeight: 1,
            }}>THESE ARE YOUR PETS?</span>
          </div>

          {/* Two column: left preview + right list (like Byooooob portfolio) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,3fr)', gap: 40, alignItems: 'start' }} className="hidden md:grid">
            {/* LEFT: featured pet card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                background: '#FFE17C', border: '2.5px solid #000',
                borderRadius: 20, overflow: 'hidden', boxShadow: '10px 10px 0 #000',
                minHeight: 400, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', padding: 32, position: 'relative',
              }}
            >
              {/* Sunburst */}
              <svg style={{ position: 'absolute', opacity: 0.2 }} width={320} height={320} viewBox="0 0 320 320">
                {Array.from({ length: 20 }).map((_, i) => {
                  const a = (i / 20) * Math.PI * 2;
                  return <line key={i} x1="160" y1="160" x2={160 + Math.cos(a) * 160} y2={160 + Math.sin(a) * 160} stroke="#000" strokeWidth="1.5" />;
                })}
              </svg>
              <div style={{ fontSize: '6rem', position: 'relative', zIndex: 1 }} className="bounce-pet">🐾</div>
              <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '1.5rem', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>YOUR NEXT PET</div>
              <Link href="#browse-grid" className="btn-byoo" style={{ marginTop: 20, position: 'relative', zIndex: 1, fontSize: '0.85rem' }}>
                VIEW ALL PETS
              </Link>
            </motion.div>

            {/* RIGHT: pet list rows */}
            <div id="browse-grid">
              {PETS.slice(0, 6).map((pet, i) => (
                <motion.div
                  key={pet.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="portfolio-row"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                    <span style={{ fontSize: '2rem' }}>{pet.emoji}</span>
                    <div>
                      <div className="portfolio-row-name">{pet.name}</div>
                      <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
                        {pet.priceMNT} MNT · {pet.available} left
                      </div>
                    </div>
                    <span style={{ color: '#FFD700', fontSize: '1.1rem', marginLeft: 4 }}>↗</span>
                  </div>
                  <div className="portfolio-row-tags">
                    <span className="portfolio-tag">{pet.rarity}</span>
                    <span className="portfolio-tag">{pet.category}</span>
                    <span className="portfolio-tag">Gen {pet.generation}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CATEGORY FILTERS */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 48, marginBottom: 32 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.85rem',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  padding: '10px 20px', borderRadius: 999, cursor: 'pointer',
                  border: '2.5px solid',
                  background: activeCategory === cat.id ? '#FFD700' : 'transparent',
                  borderColor: activeCategory === cat.id ? '#000' : 'rgba(255,255,255,0.4)',
                  color: activeCategory === cat.id ? '#000' : '#FFF',
                  boxShadow: activeCategory === cat.id ? '3px 3px 0 #000' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* PET GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 24 }}>
            {filteredPets.map(pet => <PetCard key={pet.id} pet={pet} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TICKER STRIP 2 — Yellow (reverse direction)
          ══════════════════════════════════════ */}
      <div className="ticker-wrap" style={{ background: '#FFD700' }}>
        <div className="ticker-track-r" style={{ display: 'flex' }}>
          {[...Array(2)].map((_, ri) => (
            ['🔥 SPARK THE FIRE-TYPE', '◆', '⭐ NOVA THE STAR CHILD', '◆', '🌙 LUNA THE MOON SPIRIT', '◆',
             '💻 BYTE THE CYBER BEAST', '◆', '👾 GLITCH THE HACKER', '◆', '🎮 PIXEL THE RETRO RANGER', '◆'].map((t, i) => (
              <span key={`${ri}-${i}`} className="ticker-item" style={{ color: '#000' }}>{t}</span>
            ))
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION 4 — WHO IS THIS FOR? (Byooooob red/green cards)
          ══════════════════════════════════════ */}
      <section className="grid-cream" style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-heading" style={{ marginBottom: 8 }}>
            WHO IS THIS <span style={{ color: '#E83333', fontStyle: 'italic' }}>FOR?</span>
          </h2>
          <div style={{
            display: 'inline-block', background: '#FFD700', border: '2px solid #000',
            borderRadius: 999, padding: '6px 20px', marginBottom: 48,
            fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: '0.9rem',
            boxShadow: '3px 3px 0 #000',
          }}>
            Well, funny you should ask!
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* CARD 1 — orange (like Byooooob's red startup card) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-orange"
              style={{ boxShadow: '8px 8px 0 #000' }}
            >
              <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', position: 'relative', overflow: 'hidden' }}>
                🤑
                <div style={{ position: 'absolute', top: 16, left: 16 }}>
                  <Starburst size={48} color="#2DB551" />
                </div>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '2.2rem', textTransform: 'uppercase', color: '#FFD700', lineHeight: 1, marginBottom: 12 }}>
                  DEFI<br />DEGENS
                </div>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, color: '#FFF', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: 20 }}>
                  AIBO puts your DeFi strategy on autopilot. Your pet handles compounding, yield routing, and battle staking — while you sleep, travel, or touch grass.
                </p>
                <Link href="/shop" className="btn-byoo" style={{ background: '#FFF', fontSize: '0.85rem' }}>
                  START EARNING <span className="btn-badge">IN 3 MINS</span>
                </Link>
              </div>
            </motion.div>

            {/* CARD 2 — green (like Byooooob's green agencies card) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-green"
              style={{ boxShadow: '8px 8px 0 #000' }}
            >
              <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', position: 'relative', overflow: 'hidden' }}>
                🧑💻
                <div style={{ position: 'absolute', top: 16, right: 16 }}>
                  <Starburst size={48} color="#E83333" />
                </div>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '2.2rem', textTransform: 'uppercase', color: '#FFD700', lineHeight: 1, marginBottom: 12 }}>
                  WEB3<br />BUILDERS
                </div>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, color: '#FFF', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: 20 }}>
                  Your AIBO is your reliable on-chain partner. Integrate it into your dApp, let it scout gas prices, and use it as a testing agent. It never takes breaks.
                </p>
                <Link href="/shop" className="btn-byoo" style={{ background: '#FFF', fontSize: '0.85rem' }}>
                  BUILD WITH AIBO <span className="btn-badge">IN 3 MINS</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 5 — TESTIMONIALS (Purple diagonal like Byooooob)
          ══════════════════════════════════════ */}
      <section className="diagonal-purple" style={{ padding: '80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 48, padding: '0 32px' }}>
          <span style={{
            fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#FFD700', textTransform: 'uppercase',
          }}>KISSIES FROM</span>
          {' '}
          <span style={{
            fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#FFF', fontStyle: 'italic', textTransform: 'uppercase',
          }}>OUR OWNERS</span>
        </div>

        {/* Horizontal scrollable slabs */}
        <div style={{ display: 'flex', overflowX: 'auto', gap: 24, padding: '0 32px 32px', scrollbarWidth: 'none' }}>
          {[
            { q: 'My AIBO just auto-compounded for the 47th time this month. I\'ve made more yield than my day job. My accountant is concerned.', handle: '@cryptokid.eth', badge: '🐾', rot: -1.5 },
            { q: 'The voice battle feature is UNREAL. My SPARK beat three level-40 pets in a row. I just watched and ate chips. AIBO did all the work.', handle: '@degen_moon', badge: '🔥', rot: 1.5 },
            { q: 'I minted LUNA as a joke and now she\'s worth 10x. Didn\'t expect this to absolutely slap. Genuinely impressed.', handle: '@nft_collector', badge: '🌙', rot: -2 },
            { q: 'AIBO is what happens when DeFi and Tamagotchi have a baby and the baby grows up to be a millionaire. I am obsessed.', handle: '@web3builder', badge: '⭐', rot: 1 },
          ].map((t, i) => (
            <div key={i} className="testimonial-slab" style={{ transform: `rotate(${t.rot}deg)` }}>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, fontSize: '0.95rem', color: '#222', lineHeight: 1.7, marginBottom: 20 }}>
                "{t.q}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#5B30F6' }}>{t.handle}</span>
                <span style={{
                  background: '#FFD700', border: '2.5px solid #000', borderRadius: 999,
                  padding: '3px 12px', fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase',
                }}>
                  {t.badge} PET OWNER
                </span>
              </div>
              {/* Spinning stamp badge */}
              <div className="stamp-badge" style={{ right: 20, bottom: -24 }}>🐾</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'right', paddingRight: 40, color: 'rgba(255,255,255,0.6)', fontFamily: "'Satoshi', sans-serif", fontSize: '0.85rem', marginTop: -8 }}>
          SCROLL →
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 6 — FAQ (Byooooob white clean)
          ══════════════════════════════════════ */}
      <section className="grid-white" style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
              fontSize: 'clamp(3rem, 7vw, 6rem)', textTransform: 'uppercase',
              letterSpacing: '-0.03em', lineHeight: 1, color: '#000',
            }}>FAQS</h2>
            {/* Googly eyes like Byooooob FAQ section */}
            <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
              {[0, 1].map(i => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#5B30F6' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span style={{ fontSize: '1.5rem', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </div>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="faq-answer">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Yellow cursor arrow decoration (Byooooob) */}
          <div style={{ position: 'absolute', left: -40, marginTop: 20 }}>
            <div className="cursor-deco" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 7 — FOOTER CTA (Green + Yellow wave, exactly Byooooob)
          ══════════════════════════════════════ */}
      <section style={{ position: 'relative' }}>
        {/* GREEN zone */}
        <div className="grid-green" style={{ padding: '100px 32px 120px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={{
              fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
              fontSize: 'clamp(3.5rem, 10vw, 9rem)', textTransform: 'uppercase',
              letterSpacing: '-0.04em', lineHeight: 0.9, color: '#000',
            }}>
              <div>WE&apos;VE GOT</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.1em', flexWrap: 'wrap' }}>
                YOUR
                {/* AIBO emoji replacing the B in BACK — like Byooooob monster */}
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  style={{ display: 'inline-block', fontSize: '0.75em', lineHeight: 1 }}
                >🐾</motion.span>
                ACK
              </div>
            </div>
          </motion.div>
        </div>

        {/* SVG WAVE DIVIDER green → yellow */}
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 100, marginTop: -2 }}>
          <path d="M0,0 Q360,100 720,50 Q1080,0 1440,70 L1440,0 Z" fill="#2DB551" />
          <path d="M0,100 Q360,20 720,60 Q1080,100 1440,40 L1440,100 Z" fill="#FFD700" />
        </svg>

        {/* YELLOW zone */}
        <div style={{ background: '#FFD700', padding: '60px 32px 40px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {/* 4-column footer links like Byooooob */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 32, marginBottom: 48 }}>
              {[
                { heading: 'PAGES', links: ['Browse All', 'My Pets', 'Leaderboard', 'Rare Drops'] },
                { heading: 'GOOD LINKS', links: ['Join Waitlist', 'Mint a Pet', 'View Battles', 'Open Petshop'] },
                { heading: 'SOCIAL STUFF', links: ['Twitter/X', 'Discord', 'Telegram', 'Instagram'] },
                { heading: 'LEGAL-SHMEGAL', links: ['Privacy Policy', 'Terms of Service'] },
              ].map((col, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
                    fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em',
                    marginBottom: 16, color: '#000',
                  }}>{col.heading}</div>
                  {col.links.map((link, j) => (
                    <a key={j} href="#" style={{
                      display: 'block', fontFamily: "'Satoshi', sans-serif",
                      fontWeight: 500, fontSize: '0.9rem', color: '#333',
                      textDecoration: 'none', marginBottom: 8, lineHeight: 1.4,
                    }}>{link}</a>
                  ))}
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div style={{
              borderTop: '2px solid rgba(0,0,0,0.2)', paddingTop: 20,
              display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
            }}>
              <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.85rem', color: '#333' }}>
                © 2025 AIBO Network. Built on Mantle. Made with ❤️ in India
              </span>
              <span style={{
                fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
                fontSize: '0.85rem', textTransform: 'uppercase',
              }}>MADE ON-CHAIN 🐾</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
