'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, Sparkles, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: {
      'Team members': '1 member',
      'API access': 'Limited',
      'Analytics': 'Basic',
      'Support': 'Community',
      'Custom domains': '1 domain',
      'Updates': 'Limited',
      'Security features': 'Basic',
      'Custom integrations': '-',
      'Priority support': '-',
      'Advanced analytics': '-',
    }
  },
  {
    name: 'Basic',
    price: '$9',
    features: {
      'Team members': 'Up to 5',
      'API access': 'Full access',
      'Analytics': 'Basic',
      'Support': '24/7',
      'Custom domains': '3 domains',
      'Updates': 'Regular',
      'Security features': 'Enhanced',
      'Custom integrations': 'Limited',
      'Priority support': '-',
      'Advanced analytics': '-',
    }
  },
  {
    name: 'Pro',
    price: '$49',
    popular: true,
    features: {
      'Team members': 'Unlimited',
      'API access': 'Full access',
      'Analytics': 'Advanced',
      'Support': 'Priority 24/7',
      'Custom domains': 'Unlimited',
      'Updates': 'Priority',
      'Security features': 'Advanced',
      'Custom integrations': 'Unlimited',
      'Priority support': '✓',
      'Advanced analytics': '✓',
    }
  }
];

export function PricingComparison() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto px-6 max-w-7xl"
    >
      <div className="relative space-y-6 mb-24 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative mx-auto w-32 h-32"
        >
          <div className="absolute inset-0 bg-gradient-conic from-primary via-violet-500 to-primary opacity-20 blur-3xl animate-spin-slow" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent blur-2xl" />
          <div className="absolute inset-4 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl rounded-3xl" />
          <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
        </motion.div>

        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative font-bold text-5xl tracking-tight"
        >
          <span className="bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/80 text-transparent animate-text-shimmer">
            Compare Plans
          </span>
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto max-w-2xl text-muted-foreground/80 text-xl"
        >
          Find the perfect plan for your needs
        </motion.p>
      </div>

      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-violet-500/10 to-primary/20 opacity-30 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        </div>

        <div className="relative border-white/10 border rounded-3xl overflow-hidden">
          <div className="bg-black/40 backdrop-blur-xl">
            <table className="w-full">
              <thead>
                <tr className="border-white/10 border-b">
                  <th className="px-10 py-8 text-left text-white/60">
                    <span className="text-lg">Features</span>
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="relative px-10 py-8 text-center group">
                      {plan.popular && (
                        <>
                          <div className="absolute inset-0 bg-primary/5 backdrop-blur-sm">
                            <div className="-top-px absolute inset-x-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px" />
                            <div className="-bottom-px absolute inset-x-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent h-px" />
                          </div>
                          <div className="top-0 -right-px bottom-0 absolute bg-gradient-to-b from-primary/50 via-primary/20 to-transparent w-px" />
                          <div className="top-0 bottom-0 -left-px absolute bg-gradient-to-b from-primary/50 via-primary/20 to-transparent w-px" />
                        </>
                      )}
                      <div className="space-y-4">
                        <div className="group-hover:text-primary font-medium text-2xl text-white transition-all duration-300">
                          {plan.name}
                        </div>
                        <div className="relative">
                          <div className="bg-clip-text bg-gradient-to-b from-white to-white/80 font-bold text-4xl text-transparent">
                            {plan.price}
                          </div>
                          <span className="text-sm text-white/60">/month</span>
                        </div>
                        {plan.popular && (
                          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full">
                            <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
                            <span className="font-medium text-primary text-sm">Most Popular</span>
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(plans[0].features).map((feature, index) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={feature} 
                    className="border-white/5 last:border-0 hover:bg-white/[0.02] border-b transition-all duration-300"
                  >
                    <td className="px-10 py-6 text-white/80">{feature}</td>
                    {plans.map((plan) => (
                      <td key={`${plan.name}-${feature}`} className="px-10 py-6 text-center">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={plan.features[feature as keyof typeof plan.features]}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            {plan.features[feature as keyof typeof plan.features] === '✓' ? (
                              <div className="inline-flex relative group">
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl rounded-full transition-all duration-300" />
                                <Check className="group-hover:scale-110 relative w-5 h-5 text-primary transition-transform duration-300" />
                              </div>
                            ) : plan.features[feature as keyof typeof plan.features] === '-' ? (
                              <Minus className="mx-auto w-5 h-5 text-white/20" />
                            ) : (
                              <span className="text-white/60 hover:text-white transition-colors duration-300">
                                {plan.features[feature as keyof typeof plan.features]}
                              </span>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}