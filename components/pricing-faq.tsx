'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

export function PricingFAQ() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto px-6 max-w-3xl"
    >
      <div className="relative space-y-4 mb-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <div className="relative bg-gradient-to-b from-primary/30 to-primary/10 p-4 rounded-full">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
        </motion.div>

        <h2 className="font-bold text-4xl">
          <span className="bg-clip-text bg-gradient-to-r from-white via-white to-white/80 text-transparent animate-text-shimmer">
            Frequently Asked Questions
          </span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about our pricing and products
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {[
          {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely through Stripe."
          },
         
          {
            question: "Can I switch between plans?",
            answer: "Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle."
          },
          {
            question: "Is there a free trial available?",
            answer: "Yes, all paid plans come with a 14-day free trial. No credit card required to start."
          },
          {
            question: "What happens after my trial ends?",
            answer: "After your trial ends, you'll be automatically switched to your selected plan. You can cancel or change plans at any time."
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AccordionItem 
              value={`item-${index + 1}`} 
              className="relative border-white/10 bg-black/20 backdrop-blur-xl px-6 rounded-xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <AccordionTrigger className="relative text-white/90 hover:text-white hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="relative text-white/70">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
}