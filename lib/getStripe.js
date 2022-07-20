import { loadStripe } from "@stripe/stripe-js";

let stripe;

// Connecter à Stripe
const getStripe = async () => {
  if (!stripe) {
    stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripe;
};

export default getStripe;
