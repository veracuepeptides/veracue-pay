'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Lock } from 'lucide-react';
import { HeroButton } from '@/components/hero-button';

export function PaymentForm({ returnUrl, total }: { returnUrl: string; total: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || isProcessing) return;

    setIsProcessing(true);
    setError(null);

    // Validates and collects the Payment Element's state before confirming.
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'Please check your payment details.');
      setIsProcessing(false);
      return;
    }

    // Stripe redirects the customer to returnUrl (the merchant's website) once the payment is
    // confirmed, so this only resolves here when something went wrong.
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
    });

    if (confirmError) {
      setError(confirmError.message || 'Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <PaymentElement options={{ layout: 'tabs' }} />

      {error && (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-[13.5px] text-danger">
          {error}
        </p>
      )}

      <HeroButton
        type="submit"
        size="lg"
        disabled={!stripe || !elements || isProcessing}
        className="w-full"
        icon={<Lock className="h-4 w-4" strokeWidth={2.2} />}
      >
        {isProcessing ? 'Processing…' : `Pay ${total}`}
      </HeroButton>
    </form>
  );
}
