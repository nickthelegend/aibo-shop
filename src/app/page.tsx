'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RootPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/shop');
  }, [router]);

  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center p-6 text-center">
      <div className="relative">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl mb-8 animate-bounce"
        >
          🐾
        </motion.div>
        <h1 className="text-3xl md:text-5xl font-display uppercase text-primary mb-4 tracking-tighter">
          Loading AIBO Shop...
        </h1>
        <div className="w-64 h-2 bg-black border border-primary/20 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-primary animate-[shimmer_2s_infinite]" style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  );
}
