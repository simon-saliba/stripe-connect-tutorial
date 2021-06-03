import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51IyLknBE4nCaoI6V9xgxz1wcOou9Yx0NItfAkpgGffI3AALNVAZhl8Dp4fGtQs1XsASywXRiIapdjQyofsPsqyOy00uEgR8vBV"
);

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default App;
