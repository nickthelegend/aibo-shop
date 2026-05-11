'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Download, ArrowRight, Home, Star, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import PetAvatar from '@/components/PetAvatar';
import { PETS } from '@/lib/mockPets';

export default function SuccessPage() {
  const mintedPet = PETS.find(p => p.id === 'spark')!; // Simulated
  const fakeTxHash = '0x7f3a...d8c4';
  const fakeBlockNumber = 12847391;
  const fakeTimestamp = new Date().toLocaleString();

  const [phase, setPhase] = useState<'egg' | 'hatching' | 'hatched'>('egg');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const eggTimer = setTimeout(() => setPhase('hatching'), 1200);
    const hatchTimer = setTimeout(() => {
      setPhase('hatched');
      setShowConfetti(true);
    }, 1800);

    return () => {
      clearTimeout(eggTimer);
      clearTimeout(hatchTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] grid-bg py-12 px-6 flex flex-col items-center justify-center overflow-hidden">
      
      {/* CONFETTI LAYER */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
           {[...Array(30)].map((_, i) => (
             <div 
               key={i}
               className="absolute w-3 h-3 rounded-sm"
               style={{
                 backgroundColor: ['#FFE17C', '#FF6FD8', '#5B30F6', '#1A9E3F', '#FF5C00'][i % 5],
                 left: `${Math.random() * 100}%`,
                 top: '-20px',
                 animation: `confetti-fall ${1.5 + Math.random() * 1.5}s linear forwards`,
                 animationDelay: `${Math.random() * 1}s`
               }}
             />
           ))}
        </div>
      )}

      {/* TOP STRIP */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-primary border-b-[2.5px] border-black py-4 z-40 text-center"
      >
        <h2 className="text-xl font-display uppercase tracking-widest flex items-center justify-center gap-4">
           ⚡ MINT SUCCESSFUL ⚡
        </h2>
      </motion.div>

      {/* MAIN CARD */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white border-[2.5px] border-black rounded-[40px] p-8 md:p-12 brutal-shadow-xl relative z-10 my-16 overflow-hidden"
      >
        {/* PET HATCH ANIMATION */}
        <div className="flex flex-col items-center justify-center mb-12 min-h-[340px]">
           <AnimatePresence mode="wait">
              {phase === 'egg' && (
                <motion.div
                  key="egg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  className="w-48 h-48 rounded-full bg-white border-[2.5px] border-black brutal-shadow-yellow flex items-center justify-center text-8xl bounce"
                >
                  🥚
                </motion.div>
              )}
              {phase === 'hatching' && (
                <motion.div
                  key="hatching"
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="text-9xl"
                >
                  💥
                </motion.div>
              )}
              {phase === 'hatched' && (
                <motion.div
                  key="hatched"
                  className="flex flex-col items-center"
                >
                  <div className="hatch">
                    <PetAvatar pet={mintedPet} size="xl" animated={true} />
                  </div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl font-display uppercase mt-8 text-center"
                  >
                    {mintedPet.name}
                  </motion.h3>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        {/* CELEBRATION INFO */}
        <div className="text-center mb-12">
           <h2 className="text-3xl font-display uppercase mb-2">🎉 Welcome to the Team!</h2>
           <p className="text-lg text-gray-500 font-medium">{mintedPet.name} is now yours and recorded on Mantle.</p>
        </div>

        {/* TRANSACTION DETAILS */}
        <div className="bg-gray-50 border-2 border-black rounded-3xl p-8 mb-12 brutal-shadow-sm">
           <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Transaction Details</h4>
           <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                 <span className="font-bold text-gray-400 uppercase">TX Hash:</span>
                 <div className="flex items-center gap-2 font-mono font-bold">
                    {fakeTxHash}
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors"><ExternalLink size={14} /></button>
                 </div>
              </div>
              <div className="flex justify-between items-center text-xs">
                 <span className="font-bold text-gray-400 uppercase">Block:</span>
                 <span className="font-bold">#{fakeBlockNumber}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                 <span className="font-bold text-gray-400 uppercase">Network:</span>
                 <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded border border-green-200 font-bold">Mantle Sepolia Testnet</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                 <span className="font-bold text-gray-400 uppercase">Timestamp:</span>
                 <span className="font-bold">{fakeTimestamp}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                 <span className="font-bold text-gray-400 uppercase">Status:</span>
                 <span className="flex items-center gap-1.5 text-green-600 font-bold uppercase">
                   <CheckCircle2 size={14} /> Confirmed
                 </span>
              </div>
           </div>
        </div>

        {/* NEXT STEPS */}
        <div className="border-t-2 border-black pt-12 mb-12">
           <h3 className="text-xl font-display uppercase mb-8">What&apos;s Next?</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Install App', desc: 'Train your pet & unlock abilities', icon: '📱' },
                { title: 'AIBOBook', desc: 'Post your new AIBO, flex on everyone', icon: '🐾' },
                { title: 'Battle', desc: 'Your AIBO is ready to fight.', icon: '⚔️' }
              ].map((step, i) => (
                <div key={i} className="p-4 border-2 border-black rounded-2xl bg-white brutal-shadow-sm flex flex-col gap-3">
                   <span className="text-3xl">{step.icon}</span>
                   <div>
                      <h4 className="text-sm font-bold uppercase">{step.title}</h4>
                      <p className="text-[10px] text-gray-400 font-medium leading-tight mt-1">{step.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid gap-4">
           <Link href="/shop/my-pets" className="btn btn-primary btn-lg btn-full h-16 text-lg">
              🐾 View My Pets
           </Link>
           <div className="grid grid-cols-2 gap-4">
              <Link href="/shop" className="btn btn-secondary btn-full h-14">
                 🛒 Mint Another
              </Link>
              <Link href="/shop" className="btn btn-secondary btn-full h-14 flex items-center justify-center gap-2">
                 <Home size={18} />
                 <span>Home</span>
              </Link>
           </div>
        </div>
      </motion.div>

      {/* SHARING */}
      <div className="text-center pb-12">
         <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-6">Share your new AIBO with the world 🌍</p>
         <div className="flex gap-4 justify-center">
            {['Post on 𝕏', 'Share on Discord', 'Copy Link'].map(text => (
              <button key={text} className="btn btn-secondary btn-sm h-10 px-6">
                 {text}
              </button>
            ))}
         </div>
      </div>
    </div>
  );
}
