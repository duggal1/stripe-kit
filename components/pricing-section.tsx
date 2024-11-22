'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Check, Zap } from 'lucide-react';22
import { PaymentModal } from '@/components/payment-modal';
import { ErrorBoundary } from '@/components/error-boundary';
import Particles from '@/components/ui/particles';
import NumberTicker from '@/components/ui/number-ticker';
import { Switch } from '@/components/ui/switch';
import { Spotlight } from './ui/spotlight';
import { Label } from "@/components/ui/label";

const plans = [
  {
    name: 'Basic',
    monthlyPrice: 9,
    yearlyPrice: 75,
    displayYearlyPrice: 6.25,
    monthlyPriceId: 'price_1QNtn7Rw85cV5wwQLLQ8GwOH',
    yearlyPriceId: 'price_1QNwQTRw85cV5wwQdUyY5iot',
    features: [
      'Up to 5 team members',
      'Basic analytics',
      '24/7 support',
      'API access',
    ],
    gradient: 'from-blue-500/10 via-blue-400/5 to-transparent',
    glowColor: 'group-hover:shadow-blue-500/20 text-white',
  },
  {
    name: 'Pro',
    monthlyPrice: 49,
    yearlyPrice: 412,
    displayYearlyPrice: 34.99,
    monthlyPriceId: 'price_1QNtlcRw85cV5wwQsYt86EYT',
    yearlyPriceId: 'price_1QNwSERw85cV5wwQIoVovgaU',
    popular: true,
    features: [
      'Unlimited team members',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
      'Advanced security',
    ],
    gradient: 'from-violet-500/10 via-violet-400/5 to-transparent',
    glowColor: 'group-hover:shadow-violet-500/20',
  },
];

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(true);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (

    <section className="relative py-32 overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60"
        fill="white"
       
      />
      <Particles
        className="absolute inset-0 opacity-40"
        quantity={100}
        ease={100}
        color="#ffffff"
        refresh={false}
      />
      

      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background/100" />

      <div className="flex flex-col gap-24">
        <div className="relative space-y-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative space-y-8 mb-24 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center items-center bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-2xl mx-auto rounded-full ring-1 ring-primary/10 hover:ring-primary/20 w-20 h-20 transition-all duration-300"
            >
              <Sparkles className="w-10 h-10 text-primary/80" />
            </motion.div>

            <div className="space-y-4">
              <h1 className="font-bold text-7xl tracking-tight">
                <span className="bg-clip-text bg-gradient-to-r from-primary/90 via-violet-400 to-primary/90 text-9xl text-transparent animate-text-shimmer">
                  Simple pricing,
                </span>
                <br />
                <span className="text-8xl text-foreground/80">powerful features</span>
              </h1>
              <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
                Choose the perfect plan for your needs. All plans include a 14-day free trial.
              </p>
            </div>
          </motion.div>
          <div className="flex justify-center mb-16">
            <div className="relative flex items-center gap-3 border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] backdrop-blur-xl px-2 py-2 border rounded-full">
              <button
                onClick={() => setIsYearly(false)}
                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  !isYearly 
                    ? 'text-white' 
                    : 'text-muted-foreground hover:text-white/70'
                }`}
              >
                Monthly
                {!isYearly && (
                  <motion.div
                    layoutId="pricing-toggle"
                    className="-z-10 absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 backdrop-blur-xl rounded-full"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </button>

              <div className="relative px-4 py-2">
                <Switch
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                  className="relative flex border-2 data-[state=checked]:bg-primary data-[state=unchecked]:bg-white/10 border-transparent rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background w-11 h-6 transition-colors duration-300 cursor-pointer ease-in-out"
                >
                  <span className="block relative bg-white shadow-lg rounded-full ring-0 w-5 h-5 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 duration-300 pointer-events-none ease-in-out">
                    <span className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-violet-500 opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
                    <span className="absolute inset-0.5 bg-white rounded-full" />
                  </span>
                </Switch>
              </div>

              <button
                onClick={() => setIsYearly(true)}
                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  isYearly 
                    ? 'text-white' 
                    : 'text-white/90 hover:text-white/70'
                }`}
              >
                Yearly
                {isYearly && (
                  <motion.div
                    layoutId="pricing-toggle"
                    className="-z-10 absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 backdrop-blur-xl rounded-full"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <span className="inline-flex items-center bg-primary/10 ml-2 px-2 py-0.5 rounded-full font-medium text-primary/80 text-xs">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative gap-8 grid grid-cols-1 md:grid-cols-2 mx-auto px-6 max-w-7xl"
          >
            {plans.map((plan) => (
              <motion.div key={plan.name} variants={item}>
                <Card className={`
                  relative overflow-hidden
                  backdrop-blur-3xl
                  bg-gradient-to-br ${plan.gradient}
                  border-0 ring-1 ring-white/10
                  transition-all duration-500
                  group
                  hover:ring-primary/20
                  hover:-translate-y-2
                  hover:shadow-[0_20px_80px_-10px_rgba(var(--primary-rgb),0.3)]
                  ${plan.glowColor}
                  p-3
                `}>
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>

                  {plan.popular && (
                    <>
                      <div className="-top-px right-0 left-0 absolute bg-gradient-to-r from-transparent via-primary to-transparent h-[2px]" />
                      <div className="top-6 right-6 absolute">
                        <span className="flex items-center gap-1.5 bg-primary/10 backdrop-blur-xl px-4 py-1.5 rounded-full font-medium text-primary text-sm">
                          <Zap className="w-4 h-4" />
                          Most Popular
                        </span>
                      </div>
                    </>
                  )}

                  <div className="relative space-y-8 p-8">
                    <div className="space-y-3">
                      <h3 className="bg-clip-text bg-gradient-to-br from-white to-white/70 font-bold text-3xl text-transparent">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-5xl">$
                          <NumberTicker
                            value={isYearly ? plan.displayYearlyPrice : plan.monthlyPrice}
                          />
                        </span>
                        <span className="text-lg text-muted-foreground">
                          {isYearly ? '/month' : '/month'}
                        </span>
                      </div>
                      {isYearly && (
                        <div className="text-muted-foreground text-sm">
                          ${plan.yearlyPrice} billed yearly
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 pt-4">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <div className="bg-primary/10 p-1.5 rounded-full">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-lg text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="relative mt-8 w-full overflow-hidden group/button"
                      size="lg"
                      variant={plan.popular ? 'default' : 'secondary'}
                      onClick={() => setSelectedPlan(isYearly ? plan.yearlyPriceId : plan.monthlyPriceId)}
                    >
                      <span className="relative z-10 font-medium text-lg">
                        Get Started
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover/button:opacity-100 blur-md transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/button:opacity-100 blur-sm transition-all duration-500" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="relative mx-auto px-6 w-full max-w-2xl">
          <a
            href="https://github.com/duggal1"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <Button
              className="relative border-white/10 hover:border-white/20 bg-gradient-to-br from-indigo-600 via-blue-700 to-violet-800 shadow-[0_0_30px_rgba(79,70,229,0.15)] backdrop-blur-xl border rounded-2xl w-full h-[4.5rem] transition-all duration-500 overflow-hidden"
              variant="ghost"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-violet-500/0 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500" />
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 blur-3xl transition-all group-hover:animate-pulse duration-700" />
              </div>
              <div className="relative z-10 flex justify-center items-center gap-4">
                <svg className="group-hover:text-white group-hover:scale-110 w-7 h-7 text-white/90 transition-all duration-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="group-hover:to-white bg-clip-text bg-gradient-to-r from-white via-white/95 to-white/90 font-semibold text-lg text-transparent transition-all duration-500">
                  Star on GitHub 
                </span>
                <span className="pr-8 text-xl">🌟 </span>
                <div className="right-4 absolute bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 w-px h-8 transition-all duration-500" />
              </div>
            </Button>
          </a>
        </div>
      </div>

      <ErrorBoundary>
        <PaymentModal
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          priceId={selectedPlan}
        />
      </ErrorBoundary>
    </section>
  );
}