import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Define price mapping
const PRICE_MAPPING = {
  'price_1QNtlcRw85cV5wwQsYt86EYT': 4900, // Pro plan monthly
  'price_1QNtn7Rw85cV5wwQLLQ8GwOH': 900,  // Basic plan monthly
  'price_1QNwSERw85cV5wwQIoVovgaU': 41200, // Pro plan yearly
  'price_1QNwQTRw85cV5wwQdUyY5iot': 7500,  // Basic plan yearly
} as const;

// Add type safety for price IDs
type PriceId = keyof typeof PRICE_MAPPING;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { priceId } = body;

    console.log('Received request:', { priceId });

    // Validate priceId
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }

    // Get amount from price mapping
    const amount = PRICE_MAPPING[priceId as PriceId];
    if (!amount) {
      return NextResponse.json(
        { error: `Invalid price ID: ${priceId}` },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        priceId,
      },
    });

    console.log('Created payment intent:', paymentIntent.id);

    // Return client secret and amount
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount,
    });

  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Add OPTIONS handler for CORS
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}