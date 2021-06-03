import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  PaymentMethod,
  StripeCardElementChangeEvent,
  StripeError,
} from "@stripe/stripe-js";
import "./styles.css";
import CardField from "../CardField/CardField";
import Field from "../Field/Field";
import SubmitButton from "../SubmitButton/SubmitButton";
import ResetButton from "../ResetButton/ResetButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod | null | undefined>(null);
  const [error, setError] = useState<StripeError | null | undefined>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined =
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      if (error) {
        elements.getElement("card")?.focus();
        return;
      }

      if (cardComplete) {
        setProcessing(true);
      }

      const cardElement = elements.getElement(CardElement);

      if (cardElement) {
        const payload = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: billingDetails,
        });

        setProcessing(false);

        if (payload.error) {
          setError(payload.error);
        } else {
          setPaymentMethod(payload.paymentMethod);
        }
      }
    };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: "",
      phone: "",
      name: "",
    });
  };

  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        Thanks for trying Stripe Elements. No money was charged, but we
        generated a PaymentMethod: {paymentMethod.id}
      </div>
      <ResetButton onClick={reset} />
    </div>
  ) : (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="janedoe@gmail.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="(941) 555-0123"
          required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value });
          }}
        />
      </fieldset>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e: StripeCardElementChangeEvent) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Pay $25
      </SubmitButton>
    </form>
  );
};

export default CheckoutForm;
