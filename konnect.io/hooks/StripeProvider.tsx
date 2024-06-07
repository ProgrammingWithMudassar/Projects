"use client";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

const Key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
const stripePromise = loadStripe(Key);

const StripeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    )
}

export default StripeProvider