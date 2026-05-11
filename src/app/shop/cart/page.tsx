'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowLeft, ShieldCheck, Wallet, ExternalLink, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PetAvatar from '@/components/PetAvatar';
import RarityBadge from '@/components/RarityBadge';
import WalletButton from '@/components/WalletButton';
import { useCart } from '@/lib/cartStore';
import { useAccount } from 'wagmi';
import { clsx } from 'clsx';

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
    <div className="bg-[#FAFAFA] min-h-screen pb-24">
      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 font-bold uppercase text-xs hover:text-black transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-display uppercase mb-12 flex items-center gap-4">
          <span className="w-16 h-16 bg-white border-[2.5px] border-black rounded-2xl flex items-center justify-center brutal-shadow-lg">🛒</span>
          Your Cart
        </h1>

        {itemCount === 0 ? (
          <div className="bg-white border-[2.5px] border-black rounded-[32px] p-16 flex flex-col items-center justify-center text-center brutal-shadow-xl">
             <span className="text-8xl mb-8">🐾</span>
             <h2 className="text-3xl font-display uppercase mb-4">Your cart is empty</h2>
             <p className="text-gray-500 mb-12 max-w-sm text-lg font-medium">
               Go find your perfect AI companion in the marketplace.
             </p>
             <Link href="/shop" className="btn btn-primary btn-lg px-12">
               Browse Pets →
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT - ITEMS LIST */}
            <div className="lg:col-span-7 space-y-8">
               <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Selected Pets ({itemCount})</h3>
               
               <div className="space-y-6">
                 {items.map(({ pet }) => (
                   <motion.div 
                     key={pet.id}
                     layout
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="bg-white border-[2.5px] border-black rounded-[24px] p-6 brutal-shadow flex flex-col sm:flex-row gap-6 relative"
                   >
                     <div className="flex-shrink-0 flex items-center justify-center">
                        <PetAvatar pet={pet} size="md" animated={false} />
                     </div>

                     <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                           <div>
                              <h4 className="text-2xl font-display uppercase leading-none mb-2">{pet.name}</h4>
                              <div className="flex flex-wrap gap-2 items-center">
                                 <RarityBadge rarity={pet.rarity} size="sm" />
                                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                                   {pet.category} · GEN {pet.generation}
                                 </span>
                              </div>
                           </div>
                           
                           <div className="text-right sm:text-right">
                              <div className="text-xl font-display">{pet.priceMNT} MNT</div>
                              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">≈ ${pet.priceUSD} USD</div>
                           </div>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                          {pet.stats.slice(0, 2).map(s => (
                             <div key={s.name} className="flex items-center gap-1.5 bg-charcoal text-white px-3 py-1 rounded-full border border-black text-[10px] font-bold">
                                <span>{s.icon}</span>
                                <span>{s.value}</span>
                             </div>
                          ))}
                          {pet.available <= 3 && (
                            <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest ml-auto">
                              ⚠️ Only {pet.available} left!
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Quantity: 1 (Max 1 per wallet)</span>
                           <div className="flex items-center gap-4">
                              <Link href={`/shop/pet/${pet.id}`} className="text-[10px] font-bold uppercase tracking-widest hover:text-primary-dark transition-colors">
                                View Details →
                              </Link>
                              <button 
                                onClick={() => removeItem(pet.id)}
                                className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                           </div>
                        </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </div>

            {/* RIGHT - ORDER SUMMARY */}
            <div className="lg:col-span-5">
               <div className="bg-white border-[2.5px] border-black rounded-[32px] p-8 brutal-shadow-xl sticky top-24">
                  <h3 className="text-2xl font-display uppercase mb-8">Order Summary</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider">
                       <span className="text-gray-400">Subtotal ({itemCount} pets)</span>
                       <span>{totalMNT.toFixed(2)} MNT</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider">
                       <span className="text-gray-400">Est. Gas Fee</span>
                       <span>~0.002 MNT</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider">
                       <span className="text-gray-400">Platform Fee (0%)</span>
                       <span className="text-green-500">FREE 🎉</span>
                    </div>
                    
                    <div className="h-[2.5px] bg-black my-6" />
                    
                    <div className="flex justify-between items-end">
                       <span className="text-xl font-display uppercase">Total</span>
                       <div className="text-right">
                          <div className="text-3xl font-display">{(totalMNT + 0.002).toFixed(3)} MNT</div>
                          <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">≈ ${((totalMNT + 0.002) * 0.70).toFixed(2)} USD</div>
                       </div>
                    </div>
                  </div>

                  {/* PAYMENT METHOD */}
                  <div className="mb-8">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Select Payment Method</span>
                     <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => setPaymentMethod('MNT')}
                          className={clsx(
                            "flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-black font-bold uppercase text-xs transition-all",
                            paymentMethod === 'MNT' ? "bg-primary brutal-shadow-sm translate-y-[-2px]" : "bg-white brutal-shadow hover:translate-y-[-1px]"
                          )}
                        >
                           <span>💎</span> MNT
                        </button>
                        <button 
                          onClick={() => setPaymentMethod('USDC')}
                          className={clsx(
                            "flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-black font-bold uppercase text-xs transition-all",
                            paymentMethod === 'USDC' ? "bg-green-500 text-white brutal-shadow-sm translate-y-[-2px]" : "bg-white brutal-shadow hover:translate-y-[-1px]"
                          )}
                        >
                           <span>💵</span> USDC
                        </button>
                     </div>
                  </div>

                  {/* WALLET SECTION */}
                  <div className="mb-8">
                     {!isConnected ? (
                       <div className="p-6 bg-yellow-100 border-2 border-black rounded-2xl brutal-shadow-sm flex flex-col items-center text-center gap-4">
                          <span className="text-3xl">🔗</span>
                          <p className="text-xs font-bold uppercase leading-relaxed">
                            Connect your wallet to<br />continue to checkout
                          </p>
                          <WalletButton />
                       </div>
                     ) : (
                       <div className="flex items-center justify-between p-4 border-2 border-black rounded-2xl bg-gray-50">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-green-500 rounded-full border-2 border-black flex items-center justify-center text-white">
                                <CheckCircle2 size={24} />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Wallet Connected</span>
                                <span className="text-xs font-mono font-bold">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                             </div>
                          </div>
                          <span className="bg-green-100 text-green-700 text-[8px] font-bold px-2 py-1 rounded border border-green-200 uppercase">
                            Mantle Sepolia
                          </span>
                       </div>
                     )}
                  </div>

                  <button 
                    disabled={!isConnected || isProcessing}
                    onClick={handleCheckout}
                    className={clsx(
                      "btn btn-primary btn-lg btn-full h-16 text-lg relative overflow-hidden",
                      (!isConnected || isProcessing) && "opacity-50 pointer-events-none"
                    )}
                  >
                    {isProcessing ? (
                       <span className="flex items-center gap-3">
                          <span className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                          Confirming on Mantle...
                       </span>
                    ) : (
                      `🔥 MINT ${itemCount} AIBO${itemCount > 1 ? 'S' : ''} ON MANTLE`
                    )}
                  </button>

                  <div className="mt-8 flex items-center justify-center gap-6 text-gray-400">
                     <div className="flex flex-col items-center gap-1">
                        <ShieldCheck size={20} />
                        <span className="text-[8px] font-bold uppercase tracking-widest">Audited</span>
                     </div>
                     <div className="flex flex-col items-center gap-1">
                        <Wallet size={20} />
                        <span className="text-[8px] font-bold uppercase tracking-widest">Secure</span>
                     </div>
                     <div className="flex flex-col items-center gap-1">
                        <Zap size={20} className="text-primary" fill="currentColor" />
                        <span className="text-[8px] font-bold uppercase tracking-widest">Mantle L2</span>
                     </div>
                  </div>
                  
                  <p className="mt-8 text-center text-[9px] text-gray-400 font-bold uppercase tracking-[0.1em] px-8 leading-relaxed">
                    By minting you agree to our Terms of Service and acknowledge the risks of on-chain assets.
                  </p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
