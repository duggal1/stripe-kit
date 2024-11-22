'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, CreditCard, X } from 'lucide-react';
//
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

console.log('Stripe Key Available:', !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const appearance = {
  theme: 'night' as const,
  variables: {
    colorPrimary: 'hsl(var(--primary))',
    colorBackground: 'transparent',
    colorText: 'hsl(var(--foreground))',
    colorDanger: 'hsl(var(--destructive))',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    borderRadius: '0.875rem',
    fontSizeBase: '0.9375rem',
  },
  rules: {
    '.Input': {
      border: '1px solid rgba(255, 255, 255, 0.08)',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(16px)',
      transition: 'all 0.2s ease',
      fontSize: '0.9375rem',
      fontWeight: '450',
      padding: '12px',
    },
    '.Input:hover': {
      border: '1px solid rgba(255, 255, 255, 0.15)',
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    '.Input:focus': {
      border: '1px solid hsl(var(--primary))',
      boxShadow: '0 0 0 1px hsl(var(--primary))',
    },
    '.Label': {
      color: 'hsl(var(--muted-foreground))',
      fontSize: '0.8125rem',
      fontWeight: '500',
      letterSpacing: '0.01em',
      marginBottom: '6px',
    },
    '.Tab': {
      border: '1px solid rgba(255, 255, 255, 0.08)',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(16px)',
      transition: 'all 0.2s ease',
      fontSize: '0.875rem',
      fontWeight: '450',
      padding: '12px 16px',
    },
    '.Tab:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
    },
    '.Tab--selected': {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      border: 'none',
      fontWeight: '500',
    },
  },
};

function CheckoutForm({ onClose, amount }: { onClose: () => void; amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stripe || !elements) {
      console.log('Stripe or Elements not initialized');
    }
  }, [stripe, elements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe or Elements not initialized');
      return;
    }

    setLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        console.error('Payment error:', error);
        toast.error(error.message);
      }
    } catch (e) {
      console.error('Payment submission error:', e);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <div className="relative border-white/[0.08] bg-black/20 backdrop-blur-2xl border rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-30" />
          <div className="relative flex justify-between items-center p-5">
            <span className="text-muted-foreground text-sm">Amount due</span>
            <span className="font-semibold text-lg text-white/80">
              ${amount / 100}
            </span>
          </div>
        </div>
        <PaymentElement 
          className="[&_*]:!transition-all [&_*]:!duration-200 payment-element"
          options={{
            layout: 'tabs',
          }}
        />
      </div>
      <div className="flex justify-end items-center gap-3 pt-2">
        <Button 
          type="button" 
          variant="ghost" 
          onClick={onClose}
          className="border-gray-700 bg-white/5 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 border font-medium text-sm text-white transition-all duration-200"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={!stripe || loading}
          className="relative bg-transparent disabled:opacity-70 shadow-blue-500/20 shadow-lg hover:shadow-blue-500/30 px-6 py-2.5 rounded-lg"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="-top-12 absolute -inset-x-2 bg-blue-400/20 opacity-0 group-hover:opacity-100 blur-2xl h-40 transition-opacity duration-300" />
          </div>

          <span className="relative z-10 flex justify-center items-center gap-2.5">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 text-white animate-spin" />
                <span className="font-medium text-emerald-600 text-sm">
                  Processing...
                </span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 text-emerald-600 hover:text-white transition-transform duration-300" />
                <span className="font-medium text-sm text-white">
                  Pay ${amount / 100}
                </span>
              </>
            )}
          </span>
        </Button>
      </div>
    </form>
  );
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  priceId: string | null;
}

export function PaymentModal({ isOpen, onClose, priceId }: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const createPaymentIntent = async () => {
      if (!isOpen || !priceId) return;

      try {
        console.log('Creating payment intent:', { priceId });

        const response = await fetch('/api/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ priceId }),
        });

        if (!response.ok) {
          throw new Error(`Payment API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!mounted) return;

        if (data.error) {
          setError(data.error);
          toast.error(data.error);
          return;
        }

        console.log('Payment intent created:', { 
          clientSecret: data.clientSecret,
          amount: data.amount 
        });

        setClientSecret(data.clientSecret);
        setAmount(data.amount);

      } catch (err) {
        console.error('Payment intent creation failed:', err);
        if (!mounted) return;
        
        setError('Failed to initialize payment');
        toast.error('Failed to initialize payment. Please try again.');
      }
    };

    createPaymentIntent();

    return () => {
      mounted = false;
    };
  }, [isOpen, priceId]);

  if (error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="p-6 text-center">
            <p className="text-destructive">{error}</p>
            <Button onClick={onClose} className="mt-4">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-white/[0.08]">
        <button
          onClick={onClose}
          className="top-4 right-4 absolute hover:bg-white/10 focus:ring-opacity-100 p-2.5 rounded-full text-white/70 hover:text-white transition-all duration-200"
          aria-label="Close"
          type="button" // Added type attribute for button
        >
          <X className="-mt-3 w-6 h-6 text-red-500" />
    
        </button>
        <div className="relative">
          <div className="-top-40 -left-40 absolute bg-primary/10 opacity-30 blur-3xl rounded-full w-[500px] h-[500px]" />
          <div className="-right-40 -bottom-40 absolute bg-primary/10 opacity-30 blur-3xl rounded-full w-[500px] h-[500px]" />
          
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" /> 
          
          <div className="relative space-y-6 p-6">
            <div className="space-y-1.5">
              <DialogTitle className="font-semibold text-2xl text-white tracking-tight">
                Complete Your Purchase
              </DialogTitle>
              <p className="text-muted-foreground text-sm">
                Please enter your payment details below
              </p>
            </div>
            
            {clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance,
                }}
              >
                <CheckoutForm onClose={onClose} amount={amount} />
              </Elements>
            ) : (
              <div className="flex justify-center items-center py-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                  <div className="relative bg-gradient-to-b from-primary/80 to-primary p-4 rounded-full">
                    <Loader2 className="w-6 h-6 text-primary-foreground animate-spin" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </DialogContent>
    </Dialog>
  );}