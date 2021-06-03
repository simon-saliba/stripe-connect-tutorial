import { StripeError } from "@stripe/stripe-js";
import React from "react";

const SubmitButton: React.FC<{
  processing: boolean | undefined;
  error: StripeError | undefined | null;
  children: string;
  disabled: boolean | undefined;
}> = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

export default SubmitButton;
