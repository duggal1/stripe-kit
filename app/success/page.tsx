'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import confetti from 'canvas-confetti';

const triggerConfetti = () => {
  const colors = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722']; // Modernized color palette
  const duration = 2500;
  const end = Date.now() + duration;

  const runConfetti = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 45,
      origin: { x: 0 },
      colors,
      shapes: ['circle'],
      scalar: 1,
    });

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 45,
      origin: { x: 1 },
      colors,
      shapes: ['circle'],
      scalar: 1,
    });

    if (Date.now() < end) {
      requestAnimationFrame(runConfetti);
    }
  };

  runConfetti();
};

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get('payment_intent');

  useEffect(() => {
    if (paymentIntent) {
      triggerConfetti();
      console.log('Payment successful:', paymentIntent);
    }
  }, [paymentIntent]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="relative z-10 mx-auto px-4 w-full max-w-sm"
    >
      <div className="relative border-white/[0.08] bg-black/20 shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] backdrop-blur-2xl p-6 border rounded-2xl">
        <div className="space-y-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: 0.1
            }}
            className="relative mx-auto w-16 h-16"
          >
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
            <div className="relative flex justify-center items-center h-full">
              <div className="bg-gradient-to-b from-primary/80 to-primary p-4 rounded-full">
                <CheckCircle className="w-8 h-8 text-primary-foreground" strokeWidth={2.5} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 text-center"
          >
            <h1 className="font-medium text-foreground text-xl">
              Payment Successful
            </h1>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Thank you for your purchase. A confirmation email is on its way.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/" className="block">
              <Button 
                className="relative bg-primary/10 hover:bg-primary/15 w-full h-11 text-primary transition-colors duration-200 group"
              >
                <span className="relative flex items-center gap-2 font-medium text-sm">
                  <Home className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 duration-200" />
                  Back to Dashboard 
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const SuccessPage = () => {
  return (
    <main className="relative flex flex-col justify-center items-center bg-gradient-to-b from-background to-background/95 min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay" />
      <div className="top-1/4 -left-32 absolute bg-primary/10 opacity-20 blur-3xl rounded-full w-96 h-96" />
      <div className="-right-32 bottom-1/4 absolute bg-primary/10 opacity-20 blur-3xl rounded-full w-96 h-96" />
      
      <Suspense fallback={
        <div className="flex justify-center items-center">
          <div className="border-primary border-b-2 rounded-full w-32 h-32 animate-spin"></div>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </main>
  );
};

export default SuccessPage;