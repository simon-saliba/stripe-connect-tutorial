import { CardElement } from "@stripe/react-stripe-js";
import {
  StripeCardElementChangeEvent,
  StripeCardElementOptions,
} from "@stripe/stripe-js";
import React from "react";

const CARD_OPTIONS: StripeCardElementOptions = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const CardField: React.FC<{
  onChange: ((event: StripeCardElementChangeEvent) => any) | undefined;
}> = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

export default CardField;
